#!/usr/bin/env python3
"""Super Refer — publication planifiée des réels Instagram et réponse automatique aux commentaires « SEO ».

Tourne toutes les 10 minutes sur GitHub Actions. Clé lue dans le secret IG_PAGE_TOKEN (jamais écrite dans le dépôt).
"""
import json, os, re, sys, time, datetime as dt, urllib.request, urllib.parse, urllib.error

G = 'https://graph.facebook.com/v21.0'
TOKEN = os.environ['IG_PAGE_TOKEN']
IG_ID = '17841465086872076'      # @super_refer
HERE = os.path.dirname(os.path.abspath(__file__))
CFG = json.load(open(os.path.join(HERE, 'config.json'), encoding='utf-8'))
STATE_F = os.path.join(HERE, 'state.json')
STATE = json.load(open(STATE_F, encoding='utf-8')) if os.path.exists(STATE_F) else {}
STATE.setdefault('published', {}); STATE.setdefault('replied', [])
SEO = re.compile(r'(?<![a-zà-ÿ])s\W?e\W?o(?![a-zà-ÿ])', re.I)
NOW = dt.datetime.now(dt.timezone.utc)


def call(method, path, params=None, data=None, headers=None, base=G):
    params = dict(params or {}); params['access_token'] = TOKEN
    url = (path if path.startswith('http') else base + path)
    if method == 'GET':
        url += '?' + urllib.parse.urlencode(params); body = None
    else:
        body = data if data is not None else urllib.parse.urlencode(params).encode()
        if data is not None: url += '?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, data=body, method=method, headers=headers or {})
    try:
        with urllib.request.urlopen(req, timeout=300) as r: return json.loads(r.read() or b'{}')
    except urllib.error.HTTPError as e:
        msg = e.read().decode(errors='replace'); print('ERREUR', method, path.split('?')[0], e.code, msg[:400]); return {'error': msg}


def publish_due():
    for item in CFG['schedule']:
        key = item['file']
        if key in STATE['published']: continue
        if dt.datetime.fromisoformat(item['at']) > NOW: continue
        path = os.path.join(HERE, 'videos', key); size = os.path.getsize(path)
        print('Publication', key)
        c = call('POST', f'/{IG_ID}/media', {'media_type': 'REELS', 'upload_type': 'resumable', 'caption': CFG['caption'], 'share_to_feed': 'true'})
        cid = c.get('id')
        if not cid: continue
        up = call('POST', f'https://rupload.facebook.com/ig-api-upload/v21.0/{cid}', {}, data=open(path, 'rb').read(),
                  headers={'Authorization': 'OAuth ' + TOKEN, 'offset': '0', 'file_size': str(size), 'Content-Type': 'application/octet-stream'})
        print('  envoi', up)
        for _ in range(60):
            st = call('GET', f'/{cid}', {'fields': 'status_code,status'})
            if st.get('status_code') in ('FINISHED', 'ERROR', 'EXPIRED'): break
            time.sleep(10)
        print('  traitement', st)
        if st.get('status_code') != 'FINISHED': continue
        p = call('POST', f'/{IG_ID}/media_publish', {'creation_id': cid})
        if p.get('id'):
            STATE['published'][key] = {'media_id': p['id'], 'at': NOW.isoformat()}
            print('  publié', p['id'])


def answer_comments():
    since = dt.datetime.fromisoformat(STATE.setdefault('since', NOW.isoformat()))
    media = call('GET', f'/{IG_ID}/media', {'fields': 'id,timestamp', 'limit': 30}).get('data', [])
    for m in media:
        cm = call('GET', f"/{m['id']}/comments", {'fields': 'id,text,username,timestamp', 'limit': 50}).get('data', [])
        for c in cm:
            if c['id'] in STATE['replied'] or c.get('username') == 'super_refer': continue
            if dt.datetime.fromisoformat(c['timestamp'].replace('+0000', '+00:00')) < since: continue
            if not SEO.search(c.get('text', '')): continue
            print('Commentaire SEO de', c.get('username'), c['id'])
            dm = call('POST', '/me/messages', data=json.dumps({'recipient': {'comment_id': c['id']}, 'message': {'text': CFG['dm']}}).encode(),
                      headers={'Content-Type': 'application/json'})
            print('  message privé', 'ok' if dm.get('message_id') or dm.get('recipient_id') else dm)
            rp = call('POST', f"/{c['id']}/replies", {'message': CFG['reply']})
            print('  réponse publique', 'ok' if rp.get('id') else rp)
            STATE['replied'].append(c['id'])


if __name__ == '__main__':
    publish_due()
    answer_comments()
    STATE['replied'] = STATE['replied'][-2000:]
    json.dump(STATE, open(STATE_F, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
