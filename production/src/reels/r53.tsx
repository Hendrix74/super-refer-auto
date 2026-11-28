import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Logo, OR} from '../lib';
// Réel 53 — « Comment récupérer les clients de vos concurrents ? » (28/11/2026)
// Mécanique reprise de la pépite @qs_seo du 27/11 (« Voler les clients de tes concurrents sur Google Maps », 17 k vues ≈ 25× ses
// réels habituels, 105 commentaires) : prendre des clients aux concurrents, légalement et gratuitement. Transposé aux PME, sans outil payant :
// les avis 1-2 étoiles des concurrents → les reproches qui reviennent → y répondre sur son site, près du bouton devis.
// Décor unique : la fiche du concurrent, ses avis triés, le tableau des reproches, puis votre page qui y répond.
// Temps = temps réel de audio/r53.wav (voix déjà accélérée ×1,05).
export const dur = 50.3;
const INK = '#1C2320', BG = '#EEF2EC', LINE = '#D9E0D6', MID = '#7C867F', GR = '#16A05A', RED = '#E0362C', STAR = '#F2B01E', FOREST = '#123D2E', PAPER = '#FFF8D6';
const cl = (x: number) => Math.max(0, Math.min(1, x));
const P = (t: number, a: number, b: number) => cl((t - a) / (b - a));
const oc = (x: number) => 1 - Math.pow(1 - x, 3);
const io = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const ob = (x: number) => { const c = 1.9; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
const L = (a: number, b: number, x: number) => a + (b - a) * x;
const win = (t: number, a: number, b: number, f = 0.3) => P(t, a, a + f) * (1 - P(t, b - f, b));

// ---------- sous-titres ----------
const CAP: [number, number, string, string?][] = [
  [1.85, 3.4, 'Légalement, et gratuitement.', 'gratuitement'],
  [3.5, 5.5, 'Leurs avis Google vous disent quoi faire.', 'avis Google'],
  [5.6, 8.3, 'Ouvrez la fiche de vos 3 principaux concurrents.', 'fiche'],
  [8.35, 10.9, 'Triez les avis : note la plus basse d’abord.', 'note la plus basse'],
  [11.0, 13.4, 'Les 1 et 2 étoiles : leurs clients déçus.', 'clients déçus'],
  [13.45, 15.2, 'Donc vos futurs clients.', 'vos futurs clients'],
  [15.3, 19.75, 'Notez ce qui revient.', 'ce qui revient'],
  [19.8, 24.3, 'Sur votre site : répondez à chaque reproche, à côté du bouton devis.', 'à côté du bouton devis'],
  [24.4, 26.4, 'Seulement ce que vous tenez vraiment.', 'vraiment'],
  [26.45, 29.8, 'Exemple : un fabricant de menuiseries. Ses concurrents ne rappellent jamais.', 'ne rappellent jamais'],
  [29.85, 34.2, 'En haut de sa page : un seul interlocuteur, qui vous rappelle.', 'qui vous rappelle'],
  [34.25, 37.5, 'Le prospect qui compare voit enfin quelqu’un qui règle son problème.', 'règle son problème'],
];
const Cap: React.FC<{t: number}> = ({t}) => { const c = CAP.find((x) => t >= x[0] && t < x[1]); if (!c) return null;
  const [a, , txt, hi] = c; const p = oc(P(t, a, a + 0.22)); const i = hi ? txt.indexOf(hi) : -1;
  return <div style={{position: 'absolute', left: 70, width: 940, top: 1530, textAlign: 'center', fontSize: 56, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.13, color: INK, opacity: p, transform: `translateY(${(1 - p) * 18}px)`}}>
    {i < 0 ? txt : <>{txt.slice(0, i)}<span style={{color: OR}}>{hi}</span>{txt.slice(i + hi!.length)}</>}</div>; };

const Pill: React.FC<{c: string; bg: string; a?: number; fs?: number; children: React.ReactNode}> = ({c, bg, a = 1, fs = 30, children}) => (
  <div style={{fontSize: fs, fontWeight: 800, color: c, background: bg, borderRadius: 14, padding: '9px 18px', opacity: a, whiteSpace: 'nowrap', transform: `scale(${0.7 + 0.3 * ob(cl(a))})`, display: 'inline-block'}}>{children}</div>);

// ---------- icônes dessinées (aucune marque) ----------
const Ico: React.FC<{k: string; c?: string; s?: number; w?: number}> = ({k, c = INK, s = 64, w = 2}) => {
  const st = {fill: 'none', stroke: c, strokeWidth: w, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
  return <svg width={s} height={s} viewBox="0 0 24 24">
    {k === 'pin' && <><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0113 0c0 5-6.5 11-6.5 11z" {...st}/><circle cx="12" cy="10" r="2.3" {...st}/></>}
    {k === 'phone' && <path d="M6.5 3.5l3 .5 1.2 4-2 1.5a11 11 0 005.8 5.8l1.5-2 4 1.2.5 3c0 1-1 2-2 2C10.5 19.5 4.5 13.5 4.5 5.5c0-1 1-2 2-2z" {...st}/>}
    {k === 'clock' && <><circle cx="12" cy="12" r="8.5" {...st}/><path d="M12 7.5V12l3 2" {...st}/></>}
    {k === 'user' && <><circle cx="12" cy="8" r="3.6" {...st}/><path d="M4.5 20c.8-4 3.8-6 7.5-6s6.7 2 7.5 6" {...st}/></>}
    {k === 'doc' && <><path d="M7 3h7l4 4v14H7z" {...st}/><path d="M14 3v4h4M9.5 12h6M9.5 15.5h6" {...st}/></>}
    {k === 'clip' && <><rect x="5" y="4.5" width="14" height="16.5" rx="2" {...st}/><path d="M9 4.5V3h6v1.5M8.5 10h7M8.5 13.5h7M8.5 17h4" {...st}/></>}
    {k === 'sort' && <><path d="M7 5v14M4 16l3 3 3-3M14 7h6M14 12h4M14 17h2" {...st}/></>}
    {k === 'chk' && <path d="M5 12.5l4.5 4.5L19 7.5" {...st}/>}
  </svg>; };

const Stars: React.FC<{n: number; s?: number; dim?: boolean}> = ({n, s = 30, dim}) => (
  <div style={{display: 'flex', gap: 3}}>{[0, 1, 2, 3, 4].map((i) => <svg key={i} width={s} height={s} viewBox="0 0 24 24">
    <path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.1l-5.7 3.2 1.2-6.4-4.7-4.4 6.4-.8z" fill={i < n ? (dim ? '#C9CFC7' : STAR) : '#E3E7E1'}/></svg>)}</div>);

// ---------- un avis ----------
const Review: React.FC<{n: number; txt: string; hl?: number; w?: number; fs?: number}> = ({n, txt, hl = 0, w = 860, fs = 32}) => (
  <div style={{width: w, height: 112, borderRadius: 20, background: hl > 0 ? '#FFF4EF' : '#FFF', border: `${hl > 0 ? 5 : 3}px solid ${hl > 0 ? OR : LINE}`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 24px', boxSizing: 'border-box', boxShadow: hl > 0 ? `0 12px 30px ${OR}26` : '0 4px 12px #0000000A'}}>
    <div style={{width: 60, height: 60, borderRadius: 30, background: ['#D4DCE8', '#E3D7EA', '#D6E6D9', '#EADFD0', '#D9E2E6'][n % 5], flexShrink: 0}}/>
    <div><Stars n={n} s={30}/><div style={{fontSize: fs, fontWeight: 700, color: n <= 2 ? INK : MID, marginTop: 4, whiteSpace: 'nowrap'}}>{txt}</div></div>
  </div>);

// ---------- fiche Google stylisée d'un concurrent ----------
const Fiche: React.FC<{x: number; y: number; w: number; name: string; s?: number; a?: number; stamp?: number; children?: React.ReactNode}> = ({x, y, w, name, s = 1, a = 1, stamp = 0, children}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, transform: `scale(${s})`, transformOrigin: '50% 0%', opacity: a}}>
    <div style={{borderRadius: 30, background: '#FFF', border: `3px solid ${LINE}`, overflow: 'hidden', boxShadow: '0 22px 54px #1C232018'}}>
      <div style={{height: 150, background: 'linear-gradient(135deg, #DDE7DA 0%, #CBD9D3 100%)', position: 'relative', overflow: 'hidden'}}>
        {[0, 1, 2, 3].map((i) => <div key={i} style={{position: 'absolute', left: -40 + i * 260, top: -20, width: 30, height: 220, background: '#FFFFFF88', transform: 'rotate(28deg)'}}/>)}
        <div style={{position: 'absolute', left: '50%', top: 40, transform: 'translateX(-50%)'}}><Ico k="pin" s={70} c={RED} w={2.4}/></div>
      </div>
      <div style={{padding: '22px 30px 26px'}}>
        <div style={{fontSize: w < 400 ? 34 : 44, fontWeight: 800, color: INK, letterSpacing: '-0.03em', whiteSpace: 'nowrap'}}>{name}</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 6}}><Stars n={3} s={w < 400 ? 30 : 34}/>{w < 500 ? null : <div style={{fontSize: 26, fontWeight: 600, color: MID}}>Avis Google</div>}</div>
        {children}
      </div>
    </div>
    {stamp > 0 ? <div style={{position: 'absolute', left: 0, right: 0, margin: '0 auto', width: 'fit-content', top: 330, transform: `rotate(-6deg) scale(${0.6 + 0.4 * ob(stamp)})`, opacity: oc(stamp), fontSize: 38, fontWeight: 800, color: RED, border: `6px solid ${RED}`, borderRadius: 16, padding: '4px 18px', background: '#FFFFFFE8', whiteSpace: 'nowrap'}}>ne rappelle jamais</div> : null}
  </div>);

// ---------- les avis triés ----------
const LIST: [number, string][] = [[5, 'Très bon travail, merci.'], [4, 'Correct, rien à dire.'], [1, 'Jamais rappelé…'], [5, 'Équipe sympathique.'], [2, 'Devis reçu trop tard.'], [1, 'Délais pas tenus.']];
const ORDER_LOW = [2, 5, 4, 1, 0, 3];   // ordre après tri « note la plus basse »

// ---------- post-it de reproche ----------
const NOTES = [{l: 'Jamais rappelé', at: 16.76, n: 5}, {l: 'Devis trop long', at: 17.75, n: 4}, {l: 'Délais pas tenus', at: 18.7, n: 3}];
const ANS = [{l: 'On vous rappelle, toujours', k: 'phone'}, {l: 'Devis détaillé, délai annoncé', k: 'doc'}, {l: 'Planning suivi, chantier par chantier', k: 'clock'}];

export const R53: React.FC = () => { const t = useCurrentFrame() / 30;
  // ---------- fin : marque puis appel à l'action ----------
  if (t >= 40.0) { const p = oc(P(t, 40.0, 40.4)); const cta = P(t, 45.8, 46.15);
    return <AbsoluteFill style={{fontFamily: 'ID, sans-serif', background: FOREST}}>
      <AbsoluteFill style={{background: `radial-gradient(90% 50% at 50% 0%, #1D5A44 0%, ${FOREST} 60%)`}}/>
      <div style={{position: 'absolute', left: 0, width: 1080, top: 430, display: 'flex', justifyContent: 'center', opacity: p, transform: `translateY(${(1 - p) * -20}px)`}}><div style={{background: BG, borderRadius: 36, padding: '26px 44px'}}><Logo s={66}/></div></div>
      <div style={{position: 'absolute', left: 80, width: 920, top: 640, textAlign: 'center', fontSize: 56, fontWeight: 700, color: BG, lineHeight: 1.2, letterSpacing: '-0.025em', opacity: oc(P(t, 40.6, 41.0))}}>On pilote votre site<br/>et son référencement,<br/><span style={{color: OR, opacity: oc(P(t, 43.45, 43.8))}}>pour que ceux qui comparent<br/>vous choisissent.</span></div>
      <div style={{position: 'absolute', left: 60, width: 960, top: 1080, textAlign: 'center', opacity: oc(cta), transform: `translateY(${(1 - oc(cta)) * 30}px)`}}>
        <div style={{fontSize: 104, fontWeight: 800, color: BG, letterSpacing: '-0.04em', lineHeight: 1}}>Commentez <span style={{color: OR}}>« SEO »</span></div>
        <div style={{fontSize: 54, fontWeight: 600, color: BG, marginTop: 28, lineHeight: 1.2, opacity: oc(P(t, 47.35, 47.7))}}>pour réserver<br/>votre premier échange</div>
      </div></AbsoluteFill>; }

  // ---------- phases ----------
  const hookBig = 1 - P(t, 1.35, 1.75);
  const pA = 1 - P(t, 5.35, 5.7);                    // fiche + avis 1 étoile (problème visible dès la 1re image)
  const pB = win(t, 5.55, 8.45, 0.3);                // les 3 concurrents
  const pC = win(t, 8.35, 15.35, 0.35);              // avis triés
  const pD = win(t, 15.25, 21.5, 0.35);              // tableau des reproches
  const pE = win(t, 19.85, 26.5, 0.4);               // votre page qui répond
  const pF = win(t, 26.4, 34.35, 0.35);              // exemple menuiseries
  const pG = win(t, 34.2, 37.7, 0.3);                // le prospect compare
  const pH = P(t, 37.6, 37.95);                      // conclusion

  return <AbsoluteFill style={{fontFamily: 'ID, sans-serif', background: BG, overflow: 'hidden'}}>
    <AbsoluteFill style={{backgroundImage: `radial-gradient(${LINE} 3px, transparent 3px)`, backgroundSize: '48px 48px', opacity: 0.7}}/>
    {/* question : en entier dès la première image, puis rappel en bandeau */}
    {t < 37.6 ? <div style={{position: 'absolute', left: 50, width: 980, top: L(80, 120, 1 - hookBig), textAlign: 'center', fontWeight: 800, letterSpacing: '-0.035em', color: INK, fontSize: L(48, 86, hookBig), lineHeight: 1.04}}>
      Comment récupérer<br/>les clients de vos<br/><span style={{color: OR}}>concurrents</span> ?</div> : null}

    {/* A — la fiche du concurrent, un avis 1 étoile en évidence */}
    {pA > 0 ? <div style={{opacity: pA}}>
      <Fiche x={110} y={L(430, 400, 1 - hookBig)} w={860} name="Concurrent A">
        <div style={{marginTop: 22}}><Review n={1} txt="Jamais rappelé…" hl={1} w={796}/></div>
        <div style={{marginTop: 14, opacity: 0.55}}><Review n={5} txt="Très bon travail, merci." w={796}/></div>
      </Fiche>
      {t >= 1.9 ? <div style={{position: 'absolute', left: 0, width: 1080, top: 1120, display: 'flex', justifyContent: 'center', gap: 18}}>
        <Pill c={GR} bg="#DDF3E5" a={oc(P(t, 1.92, 2.2))}>légalement</Pill><Pill c={GR} bg="#DDF3E5" a={oc(P(t, 2.75, 3.05))}>gratuitement</Pill></div> : null}
      {t >= 3.75 ? <div style={{position: 'absolute', left: 0, width: 1080, top: 1230, display: 'flex', justifyContent: 'center'}}>
        <Pill c="#FFF" bg={OR} fs={36} a={oc(P(t, 3.75, 4.1))}>client déçu = votre futur client</Pill></div> : null}
    </div> : null}

    {/* B — vos 3 principaux concurrents */}
    {pB > 0 ? <div style={{opacity: pB}}>
      {['A', 'B', 'C'].map((n, i) => { const a = oc(P(t, 5.7 + i * 0.35, 6.05 + i * 0.35));
        return <Fiche key={n} x={40 + i * 340} y={L(520, 470, a)} w={320} s={1} a={a} name={`Concurrent ${n}`}/>; })}
      {t >= 6.9 ? <div style={{position: 'absolute', left: 0, width: 1080, top: 1010, display: 'flex', justifyContent: 'center'}}><Pill c={INK} bg="#FFF" fs={34} a={oc(P(t, 6.9, 7.2))}>vos 3 principaux concurrents</Pill></div> : null}
    </div> : null}

    {/* C — tri « note la plus basse » : les clients déçus remontent */}
    {pC > 0 ? (() => { const so = io(P(t, 9.4, 10.3)); const dec = P(t, 11.1, 11.45); const fut = P(t, 13.5, 13.85);
      return <div style={{opacity: pC}}>
        <div style={{position: 'absolute', left: 110, top: 400, width: 860, display: 'flex', alignItems: 'center', gap: 16}}>
          <div style={{fontSize: 40, fontWeight: 800, color: INK}}>Avis · Concurrent A</div><div style={{flex: 1}}/>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 28, fontWeight: 800, color: so > 0 ? OR : INK, background: '#FFF', border: `3px solid ${so > 0 ? OR : LINE}`, borderRadius: 16, padding: '10px 16px', transform: `scale(${1 + 0.08 * Math.sin(Math.PI * P(t, 9.3, 9.6))})`}}>
            <Ico k="sort" s={34} c={so > 0 ? OR : INK} w={2.4}/>{so > 0 ? 'Note la plus basse' : 'Les plus pertinents'}</div>
        </div>
        {LIST.map(([n, txt], i) => { const to = ORDER_LOW.indexOf(i); const y = 500 + L(i, to, so) * 128; const bad = n <= 2;
          return <div key={i} style={{position: 'absolute', left: 110, top: y, opacity: oc(P(t, 8.45 + i * 0.08, 8.75 + i * 0.08)) * (bad ? 1 : 1 - 0.55 * dec)}}>
            <Review n={n} txt={txt} hl={bad ? dec : 0}/></div>; })}
        {/* accolade « clients déçus » → « vos futurs clients » */}
        {dec > 0 ? <div style={{position: 'absolute', left: 110, top: 500 + 3 * 128 + 4, width: 860, display: 'flex', justifyContent: 'center', opacity: oc(dec)}}>
          <div style={{position: 'relative', height: 70}}>
            <div style={{opacity: 1 - fut}}><Pill c={RED} bg="#FDE3E0" fs={34}>leurs clients déçus</Pill></div>
            {fut > 0 ? <div style={{position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)'}}><Pill c="#FFF" bg={OR} fs={34} a={oc(fut)}>vos futurs clients</Pill></div> : null}
          </div></div> : null}
      </div>; })() : null}

    {/* D — le tableau des reproches : ce qui revient */}
    {pD > 0 ? <div style={{opacity: pD}}>
      <div style={{position: 'absolute', left: 90, top: 400, width: 900, height: 920, borderRadius: 30, background: '#FBFAF5', border: `3px solid ${LINE}`, boxShadow: '0 22px 54px #1C232014'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '34px 44px 0'}}><Ico k="clip" s={56} c={INK}/><div style={{fontSize: 44, fontWeight: 800, color: INK, letterSpacing: '-0.03em'}}>Ce qui revient</div></div>
        {NOTES.map((nt, i) => { const a = P(t, nt.at, nt.at + 0.3);
          return <div key={i} style={{position: 'absolute', left: 44, top: 150 + i * 245, display: 'flex', alignItems: 'center', gap: 34, opacity: t < 16.6 ? 0.25 : oc(a) * 0.85 + 0.15}}>
            <div style={{width: 400, height: 190, background: PAPER, borderRadius: 8, boxShadow: '0 10px 24px #0000001A', transform: `rotate(${[-2.5, 1.8, -1.2][i]}deg) scale(${0.85 + 0.15 * ob(a)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, boxSizing: 'border-box'}}>
              <div style={{fontSize: 46, fontWeight: 800, color: INK, textAlign: 'center', lineHeight: 1.05, fontFamily: 'ID, sans-serif'}}>{nt.l}</div></div>
            {/* bâtons : chaque avis qui revient ajoute un trait */}
            <svg width={380} height={150} viewBox="0 0 380 150">
              {Array.from({length: nt.n}).map((_, k) => { const g = P(t, nt.at + 0.25 + k * 0.12, nt.at + 0.37 + k * 0.12);
                return k === 4 ? <line key={k} x1={10} y1={120} x2={290} y2={30} stroke={OR} strokeWidth={9} strokeLinecap="round" strokeDasharray="300" strokeDashoffset={300 * (1 - g)}/> :
                  <line key={k} x1={40 + k * 64} y1={20} x2={40 + k * 64} y2={130} stroke={INK} strokeWidth={9} strokeLinecap="round" strokeDasharray="110" strokeDashoffset={110 * (1 - g)}/>; })}
            </svg></div>; })}
      </div>
    </div> : null}

    {/* E — votre page : chaque reproche devient une réponse, à côté du bouton devis */}
    {pE > 0 ? (() => { const btn = P(t, 22.9, 23.3); const only = P(t, 24.6, 24.95);
      return <div style={{opacity: pE}}>
        <div style={{position: 'absolute', left: 90, top: 400, width: 900, height: 980, borderRadius: 32, background: '#FFF', border: `3px solid ${LINE}`, boxShadow: '0 24px 60px #1C232020', overflow: 'hidden', transform: `translateY(${(1 - oc(P(t, 19.9, 20.4))) * 60}px)`}}>
          <div style={{height: 64, background: '#E6ECE4', display: 'flex', alignItems: 'center', padding: '0 26px', gap: 10}}>
            {[0, 1, 2].map((i) => <div key={i} style={{width: 16, height: 16, borderRadius: 8, background: ['#F26B5B', '#F5BD4F', '#5BC46B'][i]}}/>)}
            <div style={{marginLeft: 18, flex: 1, height: 38, borderRadius: 19, background: '#FFF', fontSize: 23, fontWeight: 600, color: MID, display: 'flex', alignItems: 'center', padding: '0 18px'}}>votre-site.fr/<span style={{color: OR}}>devis</span></div></div>
          <div style={{padding: '36px 44px'}}>
            <div style={{width: 520, height: 34, borderRadius: 10, background: '#DCE3DA'}}/><div style={{marginTop: 14, width: 700, height: 18, borderRadius: 9, background: '#EEF1EC'}}/><div style={{marginTop: 10, width: 610, height: 18, borderRadius: 9, background: '#EEF1EC'}}/>
            {ANS.map((an, i) => { const a = P(t, 21.4 + i * 0.75, 21.75 + i * 0.75);
              return <div key={i} style={{marginTop: i === 0 ? 40 : 18, height: 104, borderRadius: 20, display: 'flex', alignItems: 'center', gap: 20, padding: '0 22px', background: a > 0 ? '#F1FAF4' : '#FAFBF9', border: `3px ${a > 0 ? 'solid' : 'dashed'} ${a > 0 ? '#BFE6CF' : LINE}`}}>
                <div style={{width: 56, height: 56, borderRadius: 28, background: a > 0 ? GR : 'transparent', border: a > 0 ? 'none' : `3px solid ${LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + 0.25 * Math.sin(Math.PI * a)})`}}>{a > 0 ? <Ico k="chk" s={34} c="#FFF" w={3.4}/> : null}</div>
                <Ico k={an.k} s={44} c={a > 0 ? GR : '#C4CBC2'}/>
                <div style={{fontSize: 33, fontWeight: 800, color: a > 0 ? INK : '#B9C0B7', opacity: 0.3 + 0.7 * oc(a), whiteSpace: 'nowrap'}}>{an.l}</div></div>; })}
            <div style={{marginTop: 36, display: 'flex', alignItems: 'center', gap: 20}}>
              <div style={{height: 96, width: 470, borderRadius: 48, background: OR, color: '#FFF', fontSize: 38, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: btn > 0 ? `0 0 0 ${12 * Math.sin(Math.PI * btn)}px ${OR}33, 0 14px 30px ${OR}44` : `0 14px 30px ${OR}44`}}>Demander un devis</div>
              {btn > 0 && t < 24.5 ? <div style={{fontSize: 30, fontWeight: 800, color: OR, opacity: oc(btn)}}>← juste ici</div> : null}
            </div>
          </div>
        </div>
        {only > 0 ? <div style={{position: 'absolute', left: 0, width: 1080, top: 1180, display: 'flex', justifyContent: 'center', opacity: oc(only), transform: `rotate(-3deg) scale(${0.6 + 0.4 * ob(only)})`}}>
          <div style={{fontSize: 40, fontWeight: 800, color: INK, background: PAPER, borderRadius: 10, padding: '16px 28px', boxShadow: '0 12px 28px #0000002A'}}>Seulement ce que vous <span style={{color: OR}}>tenez vraiment</span>.</div></div> : null}
      </div>; })() : null}

    {/* F — exemple : un fabricant de menuiseries */}
    {pF > 0 ? (() => { const st = P(t, 28.5, 28.8); const page = P(t, 29.95, 30.4); const hero = P(t, 31.0, 31.35); const call = P(t, 32.2, 32.5); const delay = P(t, 32.95, 33.3);
      return <div style={{opacity: pF}}>
        <div style={{position: 'absolute', left: 0, width: 1080, top: 400, display: 'flex', justifyContent: 'center', opacity: oc(P(t, 26.55, 26.85))}}><Pill c="#FFF" bg={INK} fs={34}>Exemple : un fabricant de menuiseries</Pill></div>
        {/* ses concurrents */}
        <div style={{opacity: 1 - P(t, 29.8, 30.15)}}>
          {[0, 1].map((i) => <Fiche key={i} x={70 + i * 480} y={530} w={460} name={`Concurrent ${'AB'[i]}`} a={oc(P(t, 27.4 + i * 0.25, 27.75 + i * 0.25))} stamp={P(t, 28.5 + i * 0.3, 28.8 + i * 0.3)}/>)}
          {st > 0 ? null : null}
        </div>
        {/* sa page : bandeau tout en haut */}
        {page > 0 ? <div style={{position: 'absolute', left: 90, top: 500, width: 900, height: 820, borderRadius: 32, background: '#FFF', border: `3px solid ${LINE}`, boxShadow: '0 24px 60px #1C232020', overflow: 'hidden', opacity: oc(page), transform: `translateY(${(1 - oc(page)) * 50}px)`}}>
          <div style={{height: 64, background: '#E6ECE4', display: 'flex', alignItems: 'center', padding: '0 26px', gap: 10}}>
            {[0, 1, 2].map((i) => <div key={i} style={{width: 16, height: 16, borderRadius: 8, background: ['#F26B5B', '#F5BD4F', '#5BC46B'][i]}}/>)}
            <div style={{marginLeft: 18, flex: 1, height: 38, borderRadius: 19, background: '#FFF', fontSize: 23, fontWeight: 600, color: MID, display: 'flex', alignItems: 'center', padding: '0 18px'}}>menuiseries-exemple.fr</div></div>
          <div style={{margin: 30, borderRadius: 26, background: hero > 0 ? '#FFF1EB' : '#F3F5F2', border: `4px solid ${hero > 0 ? OR : '#F3F5F2'}`, padding: '34px 36px', minHeight: 300, boxSizing: 'border-box'}}>
            {hero > 0 ? <>
              <div style={{display: 'flex', alignItems: 'center', gap: 22, opacity: oc(hero)}}>
                <div style={{width: 110, height: 110, borderRadius: 55, background: '#FFF', border: `5px solid ${OR}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico k="user" s={66} c={OR}/></div>
                <div style={{fontSize: 52, fontWeight: 800, color: INK, letterSpacing: '-0.03em', lineHeight: 1.05}}>Un seul interlocuteur,<br/><span style={{color: OR, opacity: oc(call)}}>qui vous rappelle.</span></div></div>
              {delay > 0 ? <div style={{marginTop: 28, display: 'flex', alignItems: 'center', gap: 12, fontSize: 32, fontWeight: 800, color: GR, background: '#DDF3E5', borderRadius: 14, padding: '10px 18px', width: 'fit-content', opacity: oc(delay), transform: `scale(${0.7 + 0.3 * ob(delay)})`, transformOrigin: '0 50%'}}><Ico k="clock" s={40} c={GR} w={2.4}/>avec un délai annoncé</div> : null}
            </> : <div style={{width: 600, height: 40, borderRadius: 12, background: '#E1E6DF'}}/>}
          </div>
          {[0, 1, 2].map((i) => <div key={i} style={{margin: '18px 40px 0', width: [760, 690, 520][i], height: 20, borderRadius: 10, background: '#EEF1EC'}}/>)}
          <div style={{margin: '34px 40px', height: 84, width: 400, borderRadius: 42, background: OR, color: '#FFF', fontSize: 32, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Demander un devis</div>
        </div> : null}
      </div>; })() : null}

    {/* G — le prospect compare : il choisit celui qui règle son problème */}
    {pG > 0 ? (() => { const go = io(P(t, 35.6, 36.6)); const pick = P(t, 36.55, 36.85);
      return <div style={{opacity: pG}}>
        {[0, 1].map((i) => { const me = i === 1;
          return <div key={i} style={{position: 'absolute', left: 70 + i * 490, top: 470, width: 450, height: 560, borderRadius: 30, background: '#FFF', border: `${me && pick > 0 ? 6 : 3}px solid ${me && pick > 0 ? OR : LINE}`, boxShadow: me && pick > 0 ? `0 20px 50px ${OR}33` : '0 16px 40px #1C232014', padding: 30, boxSizing: 'border-box', opacity: me ? 1 : 1 - 0.45 * pick, transform: `scale(${me ? 1 + 0.04 * oc(pick) : 1 - 0.04 * oc(pick)})`}}>
            <div style={{fontSize: 38, fontWeight: 800, color: INK}}>{me ? 'Vous' : 'Concurrent'}</div>
            <div style={{marginTop: 8}}><Stars n={me ? 4 : 3} s={32} dim={!me}/></div>
            <div style={{marginTop: 34, borderRadius: 18, padding: '18px 20px', background: me ? '#F1FAF4' : '#FDE9E6', fontSize: 28, whiteSpace: 'nowrap', fontWeight: 800, color: me ? GR : RED, display: 'flex', alignItems: 'center', gap: 12}}>
              <Ico k={me ? 'phone' : 'clock'} s={38} c={me ? GR : RED} w={2.4}/>{me ? 'On vous rappelle' : '« Jamais rappelé… »'}</div>
            <div style={{marginTop: 22, width: 330, height: 18, borderRadius: 9, background: '#EEF1EC'}}/><div style={{marginTop: 12, width: 280, height: 18, borderRadius: 9, background: '#EEF1EC'}}/>
            <div style={{marginTop: 46, height: 80, borderRadius: 40, background: me ? OR : '#C9CFC7', color: '#FFF', fontSize: 30, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Demander un devis</div>
          </div>; })}
        {/* le prospect hésite, puis va chez vous */}
        <div style={{position: 'absolute', left: L(492, 742, go) + Math.sin(t * 5) * 30 * (1 - P(t, 35.4, 35.6)), top: L(1080, 1010, go), width: 96, height: 96, borderRadius: 48, background: '#FFF', border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 24px #0002'}}><Ico k="user" s={58} c={INK}/></div>
        {pick > 0 ? <div style={{position: 'absolute', left: 560, width: 450, top: 1140, display: 'flex', justifyContent: 'center'}}><Pill c="#FFF" bg={OR} fs={34} a={oc(pick)}>choisi</Pill></div> : null}
      </div>; })() : null}

    {/* H — conclusion */}
    {pH > 0 ? <div style={{position: 'absolute', left: 80, width: 920, top: 560, textAlign: 'center', opacity: oc(pH), transform: `translateY(${(1 - oc(pH)) * 30}px)`}}>
      <div style={{display: 'flex', justifyContent: 'center', marginBottom: 44}}><div style={{width: 180, height: 180, borderRadius: 46, background: '#FFF', border: `5px solid ${OR}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 18px 44px ${OR}33`, transform: `rotate(${L(-8, 0, oc(pH))}deg)`}}><Ico k="clip" s={110} c={OR}/></div></div>
      <div style={{fontSize: 80, fontWeight: 800, color: INK, letterSpacing: '-0.04em', lineHeight: 1.08}}>Vos concurrents vous ont<br/>déjà fait <span style={{color: OR}}>l’étude<br/>de marché.</span></div>
    </div> : null}

    <Cap t={t}/>
  </AbsoluteFill>; };
