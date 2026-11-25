import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Logo, OR} from '../lib';
// Réel 50 — « Combien de temps pour remonter sur Google ? » Nouveau format (25/11/2026) :
// un seul décor qui évolue (une page de résultats), au lieu d'une suite de cartons. Temps = temps réel de audio/r50.wav.
export const dur = 52.4;
const INK = '#141412', CREAM = '#F7F5F0', GREY = '#D9D5CC', MID = '#8C877C', GR = '#17A34A';
const cl = (x: number) => Math.max(0, Math.min(1, x));
const P = (t: number, a: number, b: number) => cl((t - a) / (b - a));
const oc = (x: number) => 1 - Math.pow(1 - x, 3);
const io = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const ob = (x: number) => { const c = 1.9; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
const L = (a: number, b: number, x: number) => a + (b - a) * x;

// Sous-titres : [début, fin, texte, mot(s) en orange]
const CAP: [number, number, string, string?][] = [
  [2.5, 5.2, 'Site refait il y a 3 mois.'], [5.3, 7.1, 'Et toujours rien.', 'rien'], [7.2, 8.4, 'C’est normal.', 'normal'],
  [8.45, 10.3, 'Google ne vous connaît pas encore.'], [10.35, 12.25, 'Il doit lire vos pages,', 'lire'],
  [12.3, 16.05, 'les comparer à vos concurrents,', 'comparer'], [16.1, 19.2, 'vérifier qu’on parle de vous.', 'parle de vous'],
  [19.3, 21.9, 'Exemple : maintenance industrielle.'], [21.95, 24.3, 'Mois 1 : une page par prestation.', 'Mois 1'],
  [24.35, 26.8, 'Mois 2 : Google les découvre.', 'Mois 2'], [26.85, 30.4, 'Ensuite, elles gagnent des places.', 'gagnent des places'],
  [30.45, 35.5, 'Premières demandes : les recherches précises.', 'recherches précises'],
  [35.6, 36.8, 'Alors, combien de temps ?'], [36.85, 39.9, 'Google répond lui-même.', 'Google'],
  [40.0, 42.3, 'Une page bien placée', 'bien placée'], [42.35, 45.0, 'travaille sans payer chaque clic.', 'sans payer'],
];
const Cap: React.FC<{t: number}> = ({t}) => { const c = CAP.find((x) => t >= x[0] && t < x[1]); if (!c) return null;
  const [a, , txt, hi] = c; const p = oc(P(t, a, a + 0.22)); const i = hi ? txt.indexOf(hi) : -1;
  return <div style={{position: 'absolute', left: 70, width: 940, top: 1245, textAlign: 'center', fontSize: 62, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.12, color: INK, opacity: p, transform: `translateY(${(1 - p) * 18}px)`}}>
    {i < 0 ? txt : <>{txt.slice(0, i)}<span style={{color: OR}}>{hi}</span>{txt.slice(i + hi!.length)}</>}</div>; };

// Classement de notre page dans le temps (0 = premier ; 6 = sous la liste, « page 3 »)
const RANKS: [number, number][] = [[0, 6], [26.9, 5], [27.6, 4], [28.5, 3], [29.3, 2], [33.4, 1], [40.1, 0]];
const rankAt = (t: number) => { let r = 6; for (let k = 1; k < RANKS.length; k++) { const [a, v] = RANKS[k]; const prev = RANKS[k - 1][1]; if (t >= a) r = L(prev, v, io(P(t, a, a + 0.5))); } return r; };
const ROW_Y = 425, ROW_H = 86, ROW_X = 90, ROW_W = 900;
const SITES = ['concurrent-a.fr', 'concurrent-b.fr', 'concurrent-c.fr', 'annuaire-pro.fr', 'concurrent-d.fr', 'concurrent-e.fr'];

const Row: React.FC<{y: number; ours?: boolean; name: string; badge?: React.ReactNode; glow?: number; pos: number | string}> = ({y, ours, name, badge, glow = 0, pos}) => (
  <div style={{position: 'absolute', left: ROW_X, top: y, width: ROW_W, height: ROW_H - 14, borderRadius: 18, background: ours ? '#FFF' : '#FFFFFFB0', border: `3px solid ${ours ? OR : GREY}`, boxShadow: ours ? `0 ${8 + glow * 10}px ${24 + glow * 30}px ${OR}${glow > 0.5 ? '55' : '2A'}` : 'none', display: 'flex', alignItems: 'center', padding: '0 22px', boxSizing: 'border-box', zIndex: ours ? 5 : 1}}>
    <div style={{width: 46, fontSize: 30, fontWeight: 800, color: ours ? OR : MID}}>{pos}</div>
    <div style={{flex: 1}}>
      <div style={{fontSize: 31, fontWeight: 700, color: ours ? INK : MID, letterSpacing: '-0.02em'}}>{name}</div>
      <div style={{marginTop: 5, height: 8, width: ours ? 420 : 360, borderRadius: 5, background: ours ? '#FFD9CC' : GREY}}/>
    </div>{badge}
  </div>);
const Badge: React.FC<{c?: string; bg?: string; o?: number; children: React.ReactNode}> = ({c = MID, bg = '#EDEAE3', o = 1, children}) => (
  <div style={{fontSize: 23, fontWeight: 700, color: c, background: bg, borderRadius: 12, padding: '7px 13px', opacity: o, whiteSpace: 'nowrap'}}>{children}</div>);

const MONTHS = 12, TL_X = 96, TL_W = 888, TL_Y = 1128;
export const R50: React.FC = () => { const t = useCurrentFrame() / 30;
  // ---------- fin : marque puis appel à l'action ----------
  if (t >= 45.05) { const u = t - 45.05; const p = oc(P(u, 0, 0.4)); const cta = P(t, 48.3, 48.6);
    return <AbsoluteFill style={{fontFamily: 'ID, sans-serif', background: INK}}>
      <AbsoluteFill style={{background: `radial-gradient(110% 60% at 50% 0%, #3A2A22 0%, ${INK} 60%)`}}/>
      <div style={{position: 'absolute', left: 0, width: 1080, top: 430, display: 'flex', justifyContent: 'center', opacity: p, transform: `scale(${0.92 + 0.08 * p})`}}><div style={{background: CREAM, borderRadius: 36, padding: '26px 44px'}}><Logo s={66}/></div></div>
      <div style={{position: 'absolute', left: 80, width: 920, top: 640, textAlign: 'center', fontSize: 58, fontWeight: 700, color: CREAM, lineHeight: 1.18, letterSpacing: '-0.025em', opacity: oc(P(u, 0.5, 0.9))}}>On fait ce travail<br/><span style={{color: OR}}>mois après mois.</span></div>
      <div style={{position: 'absolute', left: 96, top: 850, width: 888, height: 14, borderRadius: 7, background: '#FFFFFF22', opacity: oc(P(u, 0.6, 1))}}><div style={{width: `${io(P(u, 0.8, 3.0)) * 100}%`, height: '100%', borderRadius: 7, background: OR}}/></div>
      <div style={{position: 'absolute', left: 60, width: 960, top: 960, textAlign: 'center', opacity: oc(cta), transform: `translateY(${(1 - oc(cta)) * 30}px)`}}>
        <div style={{fontSize: 104, fontWeight: 800, color: CREAM, letterSpacing: '-0.04em', lineHeight: 1}}>Commentez <span style={{color: OR}}>« SEO »</span></div>
        <div style={{fontSize: 54, fontWeight: 600, color: CREAM, marginTop: 28, lineHeight: 1.2, opacity: oc(P(t, 49.3, 49.7))}}>pour réserver<br/>votre premier échange</div>
      </div></AbsoluteFill>; }

  const hook = 1 - P(t, 2.2, 2.6);                      // titre plein écran au début
  const rank = rankAt(t); const ourY = ROW_Y + rank * ROW_H + (rank > 5.5 ? 26 : 0);
  const stuck = t > 5.4 && t < 6.3 ? Math.sin((t - 5.4) * 42) * 7 * (1 - P(t, 5.4, 6.3)) : 0;   // « toujours rien » : la ligne tremble sans bouger
  const precise = t >= 30.5;                             // la recherche devient précise
  const q0 = 'maintenance industrielle lyon', q1 = 'contrat maintenance compresseur lyon';
  const query = t < 19.35 ? '' : !precise ? q0.slice(0, Math.round(P(t, 19.4, 20.9) * q0.length)) : q1.slice(0, Math.round(P(t, 30.5, 32.2) * q1.length));
  const scan = P(t, 10.4, 12.2);                         // la loupe lit notre page
  const cmp = P(t, 12.35, 13.0) * (1 - P(t, 18.6, 19.2));  // badges « depuis des années »
  const links = t >= 16.16 && t < 19.3;
  const pages = P(t, 22.0, 22.4);                        // mois 1 : les pages apparaissent
  const found = P(t, 24.7, 25.1);                        // mois 2 : Google les découvre
  const tlOn = oc(P(t, 19.35, 19.9));
  const month = t < 21.98 ? 0 : t < 24.38 ? 1 : t < 26.86 ? 2 : t < 35.6 ? L(2, 5, P(t, 26.86, 34.5)) : t < 40 ? 5 : L(5, 12, P(t, 40.0, 44.8));
  const band = io(P(t, 37.6, 39.0));                     // la réponse : de 4 mois à 1 an
  const notif = oc(P(t, 32.7, 33.1)) * (1 - P(t, 35.3, 35.6));
  const rest = t >= 40 ? [41.2, 42.6, 43.9].filter((x) => t >= x) : [];
  const glow = t >= 26.9 ? 0.3 + 0.7 * Math.max(...RANKS.slice(1).map(([a]) => 1 - P(t, a, a + 0.7))) : 0;
  const PAGES = ['Maintenance préventive', 'Dépannage', 'Contrats'];
  return <AbsoluteFill style={{fontFamily: 'ID, sans-serif', background: CREAM, overflow: 'hidden'}}>
    <AbsoluteFill style={{background: `radial-gradient(120% 60% at 15% 100%, #F3DFCF 0%, ${CREAM} 60%)`}}/>
    <div style={{opacity: 1 - hook * 0.86}}>
      {/* barre de recherche */}
      <div style={{position: 'absolute', left: 90, top: 300, width: 900, height: 104, borderRadius: 52, background: '#FFF', border: `3px solid ${GREY}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', padding: '0 34px', boxShadow: '0 10px 30px #0000000F'}}>
        <svg width="44" height="44" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke={MID} strokeWidth="2.4"/><path d="M15.5 15.5L21 21" stroke={MID} strokeWidth="2.4" strokeLinecap="round"/></svg>
        <div style={{marginLeft: 18, fontSize: precise ? 37 : 42, fontWeight: 600, color: query ? INK : MID, letterSpacing: '-0.02em', whiteSpace: 'nowrap'}}>{query || 'votre métier + votre ville'}{query && Math.floor(t * 2.5) % 2 === 0 ? <span style={{color: OR}}>|</span> : null}</div>
      </div>
      {/* résultats concurrents */}
      {SITES.map((s, i) => { const shift = rank <= i ? io(cl(i + 1 - rank)) : 0;
        const y = ROW_Y + (i + shift) * ROW_H; if (i + shift > 5.4) return null; const few = i >= 2 ? 1 - P(t, 30.5, 31.0) : 1; if (few <= 0) return null;
        return <div key={s} style={{opacity: few}}><Row y={y} name={s} pos={Math.round(i + shift) + 1}
          badge={cmp > 0 && i < 4 ? <Badge o={oc(P(cmp, i * 0.15, i * 0.15 + 0.4))}>en ligne depuis des années</Badge> : links && i < 3 ? <Badge c={GR} bg="#E3F4E8" o={oc(P(t, 16.3 + i * 0.3, 16.6 + i * 0.3))}>cité par d’autres sites</Badge> : undefined}/></div>; })}
      {/* séparation « page 3 » tant qu'on est hors de la première page */}
      {rank > 5.5 ? <div style={{position: 'absolute', left: ROW_X, top: ROW_Y + 6 * ROW_H - 6, width: ROW_W, textAlign: 'center', fontSize: 22, fontWeight: 700, color: MID, letterSpacing: '0.08em'}}>· · ·  PAGE 3  · · ·</div> : null}
      {/* notre page */}
      <div style={{position: 'absolute', left: stuck, top: 0}}>
        <Row y={ourY} ours name="votre-entreprise.fr" pos={rank > 5.5 ? '…' : Math.round(rank) + 1} glow={glow}
          badge={links ? <Badge c={OR} bg="#FFE9E1" o={oc(P(t, 17.3, 17.6))}>personne n’en parle</Badge> : cmp > 0 ? <Badge c={OR} bg="#FFE9E1" o={oc(P(cmp, 0.5, 0.9))}>site refait, tout neuf</Badge> : found > 0 && t < 26.8 ? <Badge c={GR} bg="#E3F4E8" o={found}>✓ pages lues par Google</Badge> : t >= 40.6 ? <Badge c={GR} bg="#E3F4E8" o={oc(P(t, 42.4, 42.8))}>sans payer chaque clic</Badge> : undefined}/>
        {scan > 0 && scan < 1 ? <div style={{position: 'absolute', left: ROW_X + 30 + io(scan) * (ROW_W - 150), top: ourY - 24, width: 120, height: 120, borderRadius: 60, border: `7px solid ${INK}`, background: '#FFFFFF66', boxSizing: 'border-box', zIndex: 9}}><div style={{position: 'absolute', right: -30, bottom: -22, width: 44, height: 9, borderRadius: 5, background: INK, transform: 'rotate(45deg)'}}/></div> : null}
      </div>
      {/* mois 1 : une page par prestation (au-dessus de la frise) */}
      {pages > 0 && t < 26.8 ? <div style={{position: 'absolute', left: ROW_X, top: 1052, width: ROW_W, display: 'flex', gap: 14, justifyContent: 'center', opacity: 1 - P(t, 26.4, 26.8)}}>
        {PAGES.map((p, i) => { const a = oc(P(t, 22.2 + i * 0.3, 22.55 + i * 0.3)); const ok = P(t, 24.9 + i * 0.3, 25.15 + i * 0.3);
          return <div key={p} style={{fontSize: 26, fontWeight: 700, color: INK, background: '#FFF', border: `3px solid ${ok > 0 ? GR : OR}`, borderRadius: 14, padding: '8px 15px', opacity: a, transform: `translateY(${(1 - ob(a)) * 30}px)`}}>{ok > 0 ? <span style={{color: GR}}>✓ </span> : null}{p}</div>; })}</div> : null}
      {/* première demande */}
      {notif > 0 ? <div style={{position: 'absolute', left: 250, top: 1012, width: 580, height: 84, borderRadius: 22, background: INK, color: CREAM, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontSize: 34, fontWeight: 700, opacity: notif, transform: `translateY(${(1 - ob(notif)) * 40}px)`}}><span style={{width: 18, height: 18, borderRadius: 9, background: OR, display: 'inline-block'}}/>Nouvelle demande de devis</div> : null}
      {rest.map((x, i) => { const a = oc(P(t, x, x + 0.3)) * (1 - P(t, x + 1.0, x + 1.3)); return <div key={x} style={{position: 'absolute', left: 250 + (i - 1) * 40, top: 1012, width: 580, height: 84, borderRadius: 22, background: INK, color: CREAM, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontSize: 34, fontWeight: 700, opacity: a, transform: `translateY(${(1 - a) * 30}px)`}}><span style={{width: 18, height: 18, borderRadius: 9, background: OR, display: 'inline-block'}}/>Nouvelle demande de devis</div>; })}
      {/* calendrier du début : trois mois passent, rien ne bouge */}
      {t >= 2.6 && t < 8.4 ? <div style={{position: 'absolute', left: 0, width: 1080, top: 1058, display: 'flex', gap: 22, justifyContent: 'center', opacity: 1 - P(t, 8.0, 8.4)}}>
        {[0, 1, 2].map((i) => { const a = oc(P(t, 2.9 + i * 0.45, 3.2 + i * 0.45)); return <div key={i} style={{width: 170, height: 84, borderRadius: 18, background: '#FFF', border: `3px solid ${GREY}`, overflow: 'hidden', opacity: a, transform: `scale(${0.8 + 0.2 * ob(a)})`}}><div style={{height: 20, background: OR}}/><div style={{textAlign: 'center', fontSize: 34, fontWeight: 800, color: INK, marginTop: 8}}>Mois {i + 1}</div></div>; })}</div> : null}
      {/* les trois vérifications de Google */}
      {t >= 10.35 && t < 19.3 ? <div style={{position: 'absolute', left: 0, width: 1080, top: 1064, display: 'flex', gap: 16, justifyContent: 'center', opacity: 1 - P(t, 18.9, 19.3)}}>
        {[['1', 'Lire', 10.4], ['2', 'Comparer', 12.35], ['3', 'Vérifier', 16.16]].map(([n, lab, at]) => { const a = oc(P(t, at as number, (at as number) + 0.3)); const nxt = at === 10.4 ? 12.35 : at === 12.35 ? 16.16 : 99; const cur = t >= (at as number) && t < nxt;
          return <div key={n as string} style={{display: 'flex', alignItems: 'center', gap: 12, background: cur ? INK : '#FFF', color: cur ? CREAM : MID, border: `3px solid ${cur ? INK : GREY}`, borderRadius: 44, padding: '12px 24px 12px 14px', fontSize: 34, fontWeight: 700, opacity: a}}><span style={{width: 48, height: 48, borderRadius: 24, background: cur ? OR : GREY, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800}}>{n}</span>{lab}</div>; })}</div> : null}
      {/* frise des mois */}
      {tlOn > 0 ? <div style={{position: 'absolute', left: 0, top: 0, opacity: tlOn}}>
        <div style={{position: 'absolute', left: TL_X, top: TL_Y + 40, width: TL_W, height: 16, borderRadius: 8, background: GREY}}/>
        {band > 0 ? <div style={{position: 'absolute', left: TL_X + TL_W * (3.5 / MONTHS), top: TL_Y + 28, width: TL_W * (8.5 / MONTHS) * band, height: 40, borderRadius: 20, background: OR}}/> : null}
        {band <= 0 ? <div style={{position: 'absolute', left: TL_X, top: TL_Y + 40, width: TL_W * cl((month - 0.5) / MONTHS), height: 16, borderRadius: 8, background: OR}}/> : null}
        {Array.from({length: MONTHS}, (_, i) => { const on = month >= i + 1; const inBand = band > 0 && i >= 3;
          return <div key={i} style={{position: 'absolute', left: TL_X + TL_W * ((i + 0.5) / MONTHS) - 30, top: TL_Y - 8, width: 60, textAlign: 'center', fontSize: 25, fontWeight: 800, color: inBand ? OR : on ? INK : MID}}>{i + 1}</div>; })}
        {band <= 0 && month > 0 ? <div style={{position: 'absolute', left: TL_X + TL_W * cl((month - 0.5) / MONTHS) - 17, top: TL_Y + 31, width: 34, height: 34, borderRadius: 17, background: '#FFF', border: `7px solid ${OR}`, boxSizing: 'border-box'}}/> : null}
        <div style={{position: 'absolute', left: TL_X, top: TL_Y + 70, fontSize: 23, fontWeight: 700, color: MID, letterSpacing: '0.08em'}}>MOIS</div>
      </div> : null}
      {/* la réponse */}
      {t >= 37.3 && t < 40 ? <div style={{position: 'absolute', left: 0, width: 1080, top: 700, textAlign: 'center', zIndex: 30, opacity: oc(P(t, 37.3, 37.7)) * (1 - P(t, 39.7, 40))}}>
        <div style={{display: 'inline-block', background: INK, borderRadius: 40, padding: '34px 54px', boxShadow: '0 30px 80px #00000040', transform: `scale(${0.85 + 0.15 * ob(P(t, 37.3, 37.75))})`}}>
          <div style={{fontSize: 128, fontWeight: 800, color: CREAM, letterSpacing: '-0.045em', lineHeight: 1}}><span style={{color: OR}}>4 mois</span> à <span style={{color: OR}}>1 an</span></div>
          <div style={{fontSize: 32, fontWeight: 600, color: '#B9B4A8', marginTop: 16}}>Source : documentation de Google pour les sites web</div>
        </div></div> : null}
    </div>
    {/* titre d'ouverture */}
    {hook > 0 ? <div style={{position: 'absolute', left: 70, width: 940, top: 520, textAlign: 'center', opacity: hook, transform: `scale(${1 + (1 - hook) * 0.06})`}}>
      <div style={{fontSize: 118, fontWeight: 800, color: INK, letterSpacing: '-0.045em', lineHeight: 1.02}}>Combien de <span style={{color: OR}}>temps</span><br/>pour remonter<br/>sur Google ?</div></div> : null}
    <Cap t={t}/>
  </AbsoluteFill>; };
