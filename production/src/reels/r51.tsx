import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Logo, OR} from '../lib';
// Réel 51 — « Comment être mieux placé sur Google, sans payer ? » (26/11/2026)
// Mécanique reprise de la pépite @qs_seo du 24/11 (« Tu savais que tu pouvais booster ton site gratuitement… ») :
// question entière dès la première image + action gratuite méconnue + réponse concrète.
// Décor unique : la carte des relations de l'entreprise (partenaires → votre site). Temps = temps réel de audio/r51.wav.
export const dur = 50.6;
const INK = '#16181D', PAPER = '#F4F6F8', LINE = '#D5DAE1', MID = '#7D8794', GR = '#159E5A', RED = '#E0362C', BLUE = '#2F6BFF';
const cl = (x: number) => Math.max(0, Math.min(1, x));
const P = (t: number, a: number, b: number) => cl((t - a) / (b - a));
const oc = (x: number) => 1 - Math.pow(1 - x, 3);
const io = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const ob = (x: number) => { const c = 1.9; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
const L = (a: number, b: number, x: number) => a + (b - a) * x;
const win = (t: number, a: number, b: number, f = 0.3) => P(t, a, a + f) * (1 - P(t, b - f, b));

// ---------- sous-titres ----------
const CAP: [number, number, string, string?][] = [
  [2.87, 5.45, 'Une action gratuite, souvent oubliée.', 'gratuite'],
  [5.6, 8.7, 'Google regarde qui parle de vous.', 'qui parle de vous'],
  [8.95, 12.35, 'Un lien d’un site de votre métier = une recommandation.', 'recommandation'],
  [12.5, 14.8, 'Ces recommandeurs, vous les avez déjà.', 'déjà'],
  [14.9, 18.6, 'Fournisseur, fédération, salon, clients.'],
  [18.75, 20.95, 'Votre nom est sur leur site…'],
  [21.0, 22.05, '… mais sans lien.', 'sans lien'],
  [22.1, 23.65, '1. Listez vos partenaires.', '1.'],
  [23.7, 25.25, '2. Cherchez votre nom chez eux.', '2.'],
  [25.3, 27.1, '3. Demandez un lien vers la bonne page.', '3.'],
  [27.2, 29.8, 'Exemple : un fabricant de portails industriels.', 'Exemple'],
  [29.9, 32.2, 'Cité par son fournisseur. Sans lien.', 'Sans lien'],
  [32.25, 35.4, 'Un e-mail : son nom devient un lien.', 'un lien'],
  [35.5, 38.5, 'De vrais partenaires. Jamais de liens achetés.', 'Jamais'],
  [38.6, 41.3, 'Vos concurrents ne peuvent pas les copier.', 'pas les copier'],
];
const Cap: React.FC<{t: number}> = ({t}) => { const c = CAP.find((x) => t >= x[0] && t < x[1]); if (!c) return null;
  const [a, , txt, hi] = c; const p = oc(P(t, a, a + 0.22)); const i = hi ? txt.indexOf(hi) : -1;
  return <div style={{position: 'absolute', left: 70, width: 940, top: 1430, textAlign: 'center', fontSize: 60, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.13, color: INK, opacity: p, transform: `translateY(${(1 - p) * 18}px)`}}>
    {i < 0 ? txt : <>{txt.slice(0, i)}<span style={{color: OR}}>{hi}</span>{txt.slice(i + hi!.length)}</>}</div>; };

// ---------- petites icônes (dessinées, aucune marque) ----------
const Ico: React.FC<{k: string; c?: string; s?: number}> = ({k, c = INK, s = 64}) => {
  const st = {fill: 'none', stroke: c, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
  return <svg width={s} height={s} viewBox="0 0 24 24">
    {k === 'box' && <><path d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5z" {...st}/><path d="M3 7.5L12 12l9-4.5M12 12v9" {...st}/></>}
    {k === 'fed' && <><path d="M3 9l9-5 9 5" {...st}/><path d="M5 10v7M9.5 10v7M14.5 10v7M19 10v7M3 20h18" {...st}/></>}
    {k === 'fair' && <><rect x="3" y="4" width="18" height="10" rx="1.5" {...st}/><path d="M7 14v6M17 14v6M3 20h18M7.5 8h9M7.5 10.5h5" {...st}/></>}
    {k === 'client' && <><circle cx="8.5" cy="8" r="3" {...st}/><circle cx="16.5" cy="9" r="2.5" {...st}/><path d="M3 19c.5-3.5 3-5.5 5.5-5.5S13.5 15.5 14 19M14.5 14c2.5-.4 5.5 1 6 5" {...st}/></>}
    {k === 'site' && <><rect x="3" y="4" width="18" height="16" rx="2" {...st}/><path d="M3 8.5h18M6 6.3h.01M8.3 6.3h.01M6.5 12.5h7M6.5 15.5h11" {...st}/></>}
    {k === 'mail' && <><rect x="3" y="5.5" width="18" height="13" rx="2" {...st}/><path d="M3.5 6.5l8.5 6.5 8.5-6.5" {...st}/></>}
    {k === 'eye' && <><path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" {...st}/><circle cx="12" cy="12" r="3" {...st}/></>}
  </svg>; };

// ---------- carte des relations ----------
const C = {x: 540, y: 830};
const NODES = [
  {k: 'box', name: 'Fournisseur', x: 225, y: 520, at: 14.95},
  {k: 'fed', name: 'Fédération', x: 855, y: 520, at: 15.75},
  {k: 'fair', name: 'Salon', x: 225, y: 1145, at: 16.75},
  {k: 'client', name: 'Clients', x: 855, y: 1145, at: 17.55},
];
const Node: React.FC<{x: number; y: number; k: string; name: string; a: number; hl?: number; tag?: React.ReactNode}> = ({x, y, k, name, a, hl = 0, tag}) => (
  <div style={{position: 'absolute', left: x - 130, top: y - 105, width: 260, height: 215, opacity: a, transform: `scale(${0.6 + 0.4 * ob(a)})`}}>
    <div style={{width: 260, height: 168, borderRadius: 32, background: '#FFF', border: `4px solid ${hl > 0 ? OR : LINE}`, boxShadow: `0 12px 30px #1B263B${hl > 0 ? '22' : '12'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, boxSizing: 'border-box'}}>
      <Ico k={k} s={70} c={hl > 0 ? OR : INK}/><div style={{fontSize: 34, fontWeight: 800, color: INK, letterSpacing: '-0.02em'}}>{name}</div></div>
    {tag}
  </div>);
const Tag: React.FC<{c: string; bg: string; a: number; children: React.ReactNode; top?: number}> = ({c, bg, a, children, top = 176}) => (
  <div style={{position: 'absolute', left: 0, width: 260, top, display: 'flex', justifyContent: 'center', opacity: a, transform: `translateY(${(1 - a) * 12}px)`}}>
    <div style={{fontSize: 26, fontWeight: 800, color: c, background: bg, borderRadius: 11, padding: '6px 13px', whiteSpace: 'nowrap'}}>{children}</div></div>);

// flèche partenaire → centre : pointillée qui s'arrête dans le vide, puis pleine et orange
const Arrow: React.FC<{x: number; y: number; draw: number; solid: number; t: number; i: number}> = ({x, y, draw, solid, t, i}) => {
  const dx = C.x - x, dy = C.y - y, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d;
  const sx = x + ux * 120, sy = y + uy * 105; const full = d - 120 - 140; const len = full * (solid > 0 ? L(0.55, 1, io(solid)) : 0.55) * draw;
  const ex = sx + ux * len, ey = sy + uy * len; const col = solid > 0 ? OR : MID;
  const flow = solid > 0 ? (t * 60 + i * 9) % 30 : 0;
  return <g opacity={draw > 0 ? 1 : 0}>
    <line x1={sx} y1={sy} x2={ex} y2={ey} stroke={col} strokeWidth={solid > 0 ? 9 : 6} strokeDasharray={solid > 0 ? '22 8' : '12 14'} strokeDashoffset={-flow} strokeLinecap="round"/>
    {solid > 0.6 ? <path d={`M${ex + ux * 18} ${ey + uy * 18} L${ex - ux * 14 - uy * 16} ${ey - uy * 14 + ux * 16} L${ex - ux * 14 + uy * 16} ${ey - uy * 14 - ux * 16} Z`} fill={OR}/> :
      draw > 0.95 ? <g><line x1={ex - 14} y1={ey - 14} x2={ex + 14} y2={ey + 14} stroke={RED} strokeWidth={6} strokeLinecap="round"/><line x1={ex - 14} y1={ey + 14} x2={ex + 14} y2={ey - 14} stroke={RED} strokeWidth={6} strokeLinecap="round"/></g> : null}
  </g>; };

// page « Nos installateurs agréés » d'un fournisseur (début et exemple)
const SupplierPage: React.FC<{t: number; y: number; title: string; site: string; rows: string[]; ours: number; link: number; tag: React.ReactNode; scale?: number}> = ({t, y, title, site, rows, ours, link, tag, scale = 1}) => (
  <div style={{position: 'absolute', left: 90, top: y, width: 900, borderRadius: 30, background: '#FFF', border: `3px solid ${LINE}`, boxShadow: '0 20px 50px #1B263B18', overflow: 'hidden', transform: `scale(${scale})`, transformOrigin: '50% 0%'}}>
    <div style={{height: 64, background: '#EBEEF2', display: 'flex', alignItems: 'center', padding: '0 26px', gap: 10}}>
      {[0, 1, 2].map((i) => <div key={i} style={{width: 16, height: 16, borderRadius: 8, background: ['#F26B5B', '#F5BD4F', '#5BC46B'][i]}}/>)}
      <div style={{marginLeft: 18, flex: 1, height: 38, borderRadius: 19, background: '#FFF', fontSize: 23, fontWeight: 600, color: MID, display: 'flex', alignItems: 'center', padding: '0 18px'}}>{site}</div></div>
    <div style={{padding: '30px 40px 34px'}}>
      <div style={{fontSize: 44, fontWeight: 800, color: INK, letterSpacing: '-0.03em'}}>{title}</div>
      <div style={{marginTop: 8, height: 10, width: 420, borderRadius: 5, background: LINE}}/>
      {rows.map((r, i) => { const me = i === ours; const lk = me ? link : 0;
        return <div key={r} style={{marginTop: 20, height: 84, borderRadius: 18, border: `3px solid ${me ? (lk > 0 ? OR : '#F1B2AC') : LINE}`, background: me ? (lk > 0 ? '#FFF1EB' : '#FFF7F6') : '#FAFBFC', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 18, position: 'relative'}}>
          <div style={{width: 46, height: 46, borderRadius: 12, background: me ? (lk > 0 ? OR : '#E9C9C5') : LINE}}/>
          <div style={{flex: 1, fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: me ? (lk > 0 ? OR : MID) : '#4A5462', textDecoration: lk > 0.5 ? 'underline' : 'none', textDecorationThickness: 4, textUnderlineOffset: 6}}>{r}</div>
          {me ? tag : <div style={{fontSize: 24, fontWeight: 700, color: BLUE, textDecoration: 'underline'}}>voir le site</div>}
        </div>; })}
    </div></div>);
const Pill: React.FC<{c: string; bg: string; a?: number; children: React.ReactNode}> = ({c, bg, a = 1, children}) => (
  <div style={{fontSize: 29, fontWeight: 800, color: c, background: bg, borderRadius: 13, padding: '9px 16px', opacity: a, whiteSpace: 'nowrap', transform: `scale(${0.7 + 0.3 * ob(cl(a))})`}}>{children}</div>);

export const R51: React.FC = () => { const t = useCurrentFrame() / 30;
  // ---------- fin : marque puis appel à l'action ----------
  if (t >= 41.3) { const u = t - 41.3; const p = oc(P(u, 0, 0.4)); const cta = P(t, 45.6, 45.95);
    return <AbsoluteFill style={{fontFamily: 'ID, sans-serif', background: INK}}>
      <AbsoluteFill style={{background: `radial-gradient(100% 55% at 50% 0%, #2A3140 0%, ${INK} 62%)`}}/>
      <div style={{position: 'absolute', left: 0, width: 1080, top: 440, display: 'flex', justifyContent: 'center', opacity: p, transform: `scale(${0.92 + 0.08 * p})`}}><div style={{background: PAPER, borderRadius: 36, padding: '26px 44px'}}><Logo s={66}/></div></div>
      <div style={{position: 'absolute', left: 80, width: 920, top: 650, textAlign: 'center', fontSize: 58, fontWeight: 700, color: PAPER, lineHeight: 1.18, letterSpacing: '-0.025em', opacity: oc(P(u, 1.5, 1.9))}}>On pilote votre référencement,<br/><span style={{color: OR, opacity: oc(P(t, 44.4, 44.7))}}>liens compris.</span></div>
      <div style={{position: 'absolute', left: 60, width: 960, top: 960, textAlign: 'center', opacity: oc(cta), transform: `translateY(${(1 - oc(cta)) * 30}px)`}}>
        <div style={{fontSize: 104, fontWeight: 800, color: PAPER, letterSpacing: '-0.04em', lineHeight: 1}}>Commentez <span style={{color: OR}}>« SEO »</span></div>
        <div style={{fontSize: 54, fontWeight: 600, color: PAPER, marginTop: 28, lineHeight: 1.2, opacity: oc(P(t, 47.0, 47.4))}}>pour réserver<br/>votre premier échange</div>
      </div></AbsoluteFill>; }

  // ---------- phases ----------
  const pA = 1 - P(t, 5.35, 5.75);                       // page du fournisseur (problème visible dès la 1re image)
  const pNet = win(t, 5.45, 27.2, 0.4) + (t >= 38.45 ? oc(P(t, 38.45, 38.85)) : 0);   // carte des relations
  const pList = win(t, 21.95, 27.15, 0.35);              // checklist
  const pEx = win(t, 27.1, 35.5, 0.35);                  // exemple
  const pBuy = win(t, 35.45, 38.6, 0.3);                 // vrais partenaires vs liens achetés
  const fin = t >= 38.45;                                // réseau final : tout s'allume
  const hookBig = 1 - P(t, 2.5, 2.9);                    // titre en grand, puis il remonte en bandeau

  return <AbsoluteFill style={{fontFamily: 'ID, sans-serif', background: PAPER, overflow: 'hidden'}}>
    <AbsoluteFill style={{backgroundImage: `radial-gradient(${LINE} 2.2px, transparent 2.4px)`, backgroundSize: '44px 44px', opacity: 0.55}}/>
    {/* question : en entier dès la première image, puis rappel en haut */}
    <div style={{position: 'absolute', left: 70, width: 940, top: L(150, 150, 0), textAlign: 'center', fontWeight: 800, letterSpacing: '-0.035em', color: INK, fontSize: L(50, 74, hookBig), lineHeight: 1.08, opacity: t < 41.3 ? 1 : 0}}>
      Comment être <span style={{color: OR}}>mieux placé</span> sur Google, <span style={{whiteSpace: 'nowrap'}}>sans payer ?</span></div>

    {/* A — la page du fournisseur : votre nom y est, mais sans lien */}
    {pA > 0 ? <div style={{opacity: pA, transform: `translateY(${(1 - pA) * -40}px)`}}>
      <SupplierPage t={t} y={L(470, 430, P(t, 2.5, 2.9))} title="Nos installateurs agréés" site="fournisseur.fr/installateurs" ours={2}
        rows={['Installateur A', 'Installateur B', 'Votre entreprise', 'Installateur D']} link={0}
        tag={<Pill c={RED} bg="#FDE3E0" a={oc(P(t, 0.15, 0.45))}>aucun lien</Pill>}/>
      {t > 2.87 ? <div style={{position: 'absolute', left: 640, top: 340, transform: `rotate(-8deg) scale(${0.6 + 0.4 * ob(P(t, 2.9, 3.25))})`, opacity: oc(P(t, 2.9, 3.1)), fontSize: 46, fontWeight: 800, color: GR, border: `6px solid ${GR}`, borderRadius: 16, padding: '6px 20px', background: '#FFFFFFE6'}}>GRATUIT</div> : null}
      {t > 3.9 ? <div style={{position: 'absolute', left: 90, width: 900, top: 1290, textAlign: 'center', fontSize: 30, fontWeight: 700, color: MID, opacity: oc(P(t, 3.9, 4.2))}}>… et presque toujours oublié</div> : null}
    </div> : null}

    {/* B / F — carte des relations */}
    {pNet > 0 ? <div style={{opacity: pNet * (1 - 0.82 * pList)}}>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        {/* « un site de votre métier » : la recommandation type (9 → 12,4 s) */}
        {t >= 8.9 && t < 12.6 ? (() => { const d = io(P(t, 9.0, 9.8)); return <g opacity={1 - P(t, 12.2, 12.6)}>
          <line x1={540} y1={470} x2={540} y2={L(470, 680, d)} stroke={OR} strokeWidth={9} strokeLinecap="round"/>
          {d > 0.9 ? <path d="M540 700 L522 672 L558 672 Z" fill={OR}/> : null}</g>; })() : null}
        {NODES.map((n, i) => { const draw = io(P(t, 21.0 + i * 0.12, 21.45 + i * 0.12)); const solid = fin ? P(t, 38.7 + i * 0.25, 39.2 + i * 0.25) : 0;
          return <Arrow key={n.name} x={n.x} y={n.y} draw={fin ? 1 : draw} solid={solid} t={t} i={i}/>; })}
      </svg>
      {/* le site du métier qui recommande */}
      {t >= 8.9 && t < 12.6 ? <div style={{position: 'absolute', left: 540 - 170, top: 360, width: 340, opacity: oc(P(t, 8.95, 9.3)) * (1 - P(t, 12.2, 12.6))}}>
        <div style={{height: 110, borderRadius: 26, background: '#FFF', border: `4px solid ${LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, boxShadow: '0 12px 30px #1B263B14'}}><Ico k="site" s={54}/><div style={{fontSize: 30, fontWeight: 800, color: INK}}>site du métier</div></div>
        <div style={{position: 'absolute', left: 230, top: 210, opacity: oc(P(t, 11.1, 11.4)), transform: `scale(${0.7 + 0.3 * ob(P(t, 11.1, 11.5))})`}}><Pill c="#FFF" bg={OR}>= recommandation</Pill></div>
      </div> : null}
      {/* l'œil de Google qui regarde autour de votre site */}
      {t >= 5.6 && t < 8.95 ? <div style={{position: 'absolute', left: 540 - 60 + Math.sin((t - 5.6) * 2.4) * 160, top: 560 + Math.cos((t - 5.6) * 2.4) * 40, width: 120, height: 120, borderRadius: 60, background: '#FFF', border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: oc(P(t, 5.7, 6.0)) * (1 - P(t, 8.6, 8.95)), boxShadow: '0 10px 28px #1B263B22'}}><Ico k="eye" s={70}/></div> : null}
      {t >= 5.6 && t < 8.95 ? <div style={{position: 'absolute', left: 0, width: 1080, top: 1040, display: 'flex', justifyContent: 'center', gap: 16, opacity: oc(P(t, 6.6, 7.0)) * (1 - P(t, 8.6, 8.95))}}>
        {['qui vous cite ?', 'qui vous recommande ?'].map((q, i) => <Pill key={q} c={INK} bg="#FFF" a={oc(P(t, 6.6 + i * 0.5, 6.9 + i * 0.5))}>{q}</Pill>)}</div> : null}
      {/* votre site, au centre */}
      <div style={{position: 'absolute', left: C.x - 140, top: C.y - 120, width: 280, height: 240, borderRadius: 40, background: fin ? OR : '#FFF', border: `5px solid ${OR}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
        boxShadow: `0 ${fin ? 24 : 14}px ${fin ? 70 : 34}px ${OR}${fin ? '66' : '33'}`, transform: `scale(${0.75 + 0.25 * ob(P(t, 5.5, 6.0)) + (t >= 12.5 && t < 13.4 ? Math.sin((t - 12.5) * 7) * 0.04 : 0)})`}}>
        <Ico k="site" s={78} c={fin ? '#FFF' : OR}/><div style={{fontSize: 33, fontWeight: 800, color: fin ? '#FFF' : INK, letterSpacing: '-0.02em'}}>votre site</div></div>
      {/* les 4 partenaires */}
      {t >= 14.9 ? NODES.map((n, i) => { const a = oc(P(t, n.at, n.at + 0.35));
        const named = P(t, 18.8 + i * 0.25, 19.1 + i * 0.25); const nolink = P(t, 21.05 + i * 0.12, 21.35 + i * 0.12);
        const tag = fin ? <Tag c="#FFF" bg={GR} a={P(t, 38.9 + i * 0.25, 39.2 + i * 0.25)}>✓ lien vers vous</Tag> :
          nolink > 0 ? <Tag c={RED} bg="#FDE3E0" a={nolink}>sans lien</Tag> : named > 0 ? <Tag c={INK} bg="#FFF" a={named}>votre nom ✓</Tag> : null;
        return <Node key={n.name} {...n} a={a} hl={fin ? 1 : 0} tag={tag}/>; }) : null}
      {/* concurrent, à l'écart : aucune flèche */}
      {fin ? <div style={{position: 'absolute', left: 820, top: 1290, opacity: oc(P(t, 39.5, 39.9)), transform: `translateY(${(1 - oc(P(t, 39.5, 39.9))) * 20}px)`, display: 'flex', alignItems: 'center', gap: 12}}>
        <div style={{width: 160, height: 70, borderRadius: 18, border: `3px dashed ${MID}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, color: MID, background: '#FFF'}}>concurrent</div></div> : null}
      {fin ? <div style={{position: 'absolute', left: 70, top: 1300, opacity: oc(P(t, 39.9, 40.3))}}><Pill c="#FFF" bg={INK}>impossible à copier</Pill></div> : null}
    </div> : null}

    {/* C — checklist en 3 étapes */}
    {pList > 0 ? <div style={{position: 'absolute', left: 90, top: 430, width: 900, opacity: pList, transform: `translateY(${(1 - oc(pList)) * 60}px)`}}>
      <div style={{borderRadius: 34, background: '#FFF', border: `3px solid ${LINE}`, boxShadow: '0 24px 60px #1B263B22', padding: '34px 38px'}}>
        <div style={{fontSize: 40, fontWeight: 800, color: INK, letterSpacing: '-0.03em', marginBottom: 10}}>Faites ceci :</div>
        {[{a: 22.15, txt: 'Listez vos partenaires', sub: <div style={{display: 'flex', gap: 10, marginTop: 12}}>{NODES.map((n, i) => <div key={n.name} style={{opacity: oc(P(t, 22.4 + i * 0.15, 22.7 + i * 0.15)), display: 'flex', alignItems: 'center', gap: 6, fontSize: 22, fontWeight: 700, color: INK, background: PAPER, borderRadius: 10, padding: '5px 10px'}}><Ico k={n.k} s={26}/>{n.name}</div>)}</div>},
          {a: 23.75, txt: 'Cherchez votre nom chez eux', sub: (() => { const q = '« votre entreprise »'; const n = Math.round(P(t, 23.9, 24.8) * q.length);
            return <div style={{marginTop: 12, height: 56, borderRadius: 28, border: `3px solid ${LINE}`, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 10, fontSize: 25, fontWeight: 600, color: INK, width: 560}}>
              <svg width="28" height="28" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke={MID} strokeWidth="2.4"/><path d="M15.5 15.5L21 21" stroke={MID} strokeWidth="2.4" strokeLinecap="round"/></svg>
              <span style={{color: MID}}>fournisseur.fr</span>&nbsp;{q.slice(0, n)}{t < 25.3 && Math.floor(t * 3) % 2 === 0 ? <span style={{color: OR}}>|</span> : null}</div>; })()},
          {a: 25.35, txt: 'Demandez un lien vers la bonne page', sub: <div style={{display: 'flex', gap: 14, marginTop: 12, alignItems: 'center'}}>
            <div style={{fontSize: 24, fontWeight: 700, color: MID, textDecoration: P(t, 26.0, 26.2) > 0 ? 'line-through' : 'none', textDecorationColor: RED, textDecorationThickness: 4, opacity: oc(P(t, 25.6, 25.9))}}>votre-site.fr/</div>
            <Pill c={OR} bg="#FFF1EB" a={oc(P(t, 26.1, 26.4))}>votre-site.fr/portails-industriels</Pill></div>},
        ].map((r, i) => { const on = P(t, r.a, r.a + 0.25); const ck = P(t, r.a + 0.35, r.a + 0.55);
          return <div key={i} style={{marginTop: 26, opacity: 0.25 + 0.75 * oc(on), display: 'flex', gap: 22}}>
            <div style={{width: 56, height: 56, flex: 'none', borderRadius: 14, border: `4px solid ${ck > 0 ? GR : LINE}`, background: ck > 0 ? GR : '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + 0.15 * Math.sin(Math.PI * ck)})`}}>
              {ck > 0 ? <svg width="36" height="36" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#FFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="24" strokeDashoffset={24 * (1 - ck)}/></svg> : null}</div>
            <div><div style={{fontSize: 38, fontWeight: 800, color: INK, letterSpacing: '-0.02em', lineHeight: 1.1}}><span style={{color: OR}}>{i + 1}.</span> {r.txt}</div>{on > 0 ? r.sub : null}</div></div>; })}
      </div></div> : null}

    {/* D — l'exemple : portails industriels */}
    {pEx > 0 ? <div style={{opacity: pEx}}>
      <SupplierPage t={t} y={420} title="Nos installateurs" site="fournisseur-moteurs.fr/installateurs" ours={1}
        rows={['Installateur A', 'Fabricant de portails industriels', 'Installateur C']} link={P(t, 33.1, 33.5)}
        tag={P(t, 33.1, 33.5) > 0 ? <Pill c="#FFF" bg={OR} a={oc(P(t, 33.2, 33.5))}>lien ✓</Pill> : <Pill c={RED} bg="#FDE3E0" a={oc(P(t, 30.6, 30.9))}>sans lien</Pill>}/>
      {/* l'e-mail qui part */}
      {t >= 32.2 && t < 33.5 ? (() => { const f = io(P(t, 32.25, 33.1)); return <div style={{position: 'absolute', left: L(80, 760, f), top: L(1240, 640, f), opacity: 1 - P(t, 33.0, 33.3), transform: `rotate(${L(-12, 8, f)}deg) scale(${L(1, 0.6, f)})`}}>
        <div style={{width: 200, height: 140, borderRadius: 22, background: '#FFF', border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 36px #1B263B30'}}><Ico k="mail" s={90}/></div></div>; })() : null}
      {/* le lien mène à la bonne page */}
      {t >= 33.4 ? (() => { const d = io(P(t, 33.5, 34.2)); const a = oc(P(t, 33.9, 34.3)); return <>
        <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}><path d={`M540 905 C 540 ${L(905, 1010, d)}, 540 ${L(905, 1040, d)}, 540 ${L(905, 1080, d)}`} stroke={OR} strokeWidth={9} fill="none" strokeLinecap="round"/>
          {d > 0.9 ? <path d="M540 1100 L522 1072 L558 1072 Z" fill={OR}/> : null}</svg>
        <div style={{position: 'absolute', left: 190, top: 1110, width: 700, height: 150, borderRadius: 26, background: '#FFF', border: `4px solid ${OR}`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 28px', boxSizing: 'border-box', opacity: a, transform: `scale(${0.8 + 0.2 * ob(a)})`, boxShadow: `0 16px 40px ${OR}33`}}>
          <Ico k="site" s={70} c={OR}/><div><div style={{fontSize: 22, fontWeight: 700, color: MID}}>votre-site.fr/portails-industriels</div><div style={{fontSize: 38, fontWeight: 800, color: INK, letterSpacing: '-0.02em'}}>Portails industriels</div></div></div>
        <div style={{position: 'absolute', left: 0, width: 1080, top: 1290, display: 'flex', justifyContent: 'center', opacity: oc(P(t, 34.3, 34.6))}}><Pill c={GR} bg="#E1F5EA">recommandé, sur ce sujet précis</Pill></div></>; })() : null}
    </div> : null}

    {/* E — vrais partenaires vs liens achetés */}
    {pBuy > 0 ? <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, opacity: pBuy}}>
      <div style={{position: 'absolute', left: 90, top: 470, width: 420, height: 640, borderRadius: 34, background: '#FFF', border: `4px solid ${GR}`, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', boxSizing: 'border-box', gap: 18, opacity: oc(P(t, 35.5, 35.85))}}>
        <div style={{fontSize: 36, fontWeight: 800, color: GR}}>✓ Vrais partenaires</div>
        {NODES.map((n, i) => <div key={n.name} style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 30, fontWeight: 700, color: INK, opacity: oc(P(t, 35.7 + i * 0.15, 36.0 + i * 0.15))}}><Ico k={n.k} s={44}/>{n.name}</div>)}</div>
      <div style={{position: 'absolute', left: 570, top: 470, width: 420, height: 640, borderRadius: 34, background: '#FFF', border: `4px solid ${LINE}`, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', boxSizing: 'border-box', gap: 16, opacity: oc(P(t, 37.15, 37.5))}}>
        <div style={{fontSize: 36, fontWeight: 800, color: MID}}>Liens achetés</div>
        {[0, 1, 2, 3].map((i) => <div key={i} style={{display: 'flex', alignItems: 'center', gap: 10, opacity: oc(P(t, 37.25 + i * 0.08, 37.5 + i * 0.08))}}>
          <div style={{width: 180, height: 16, borderRadius: 8, background: '#9DB6F2'}}/><div style={{fontSize: 26, fontWeight: 800, color: MID, border: `3px solid ${LINE}`, borderRadius: 10, padding: '2px 10px'}}>€</div></div>)}
        {t > 37.6 ? <svg width={300} height={300} viewBox="0 0 100 100" style={{position: 'absolute', left: 60, top: 220}}>
          <line x1={10} y1={10} x2={L(10, 90, io(P(t, 37.6, 37.85)))} y2={L(10, 90, io(P(t, 37.6, 37.85)))} stroke={RED} strokeWidth={9} strokeLinecap="round"/>
          <line x1={90} y1={10} x2={L(90, 10, io(P(t, 37.75, 38.0)))} y2={L(10, 90, io(P(t, 37.75, 38.0)))} stroke={RED} strokeWidth={9} strokeLinecap="round"/></svg> : null}
        <div style={{position: 'absolute', bottom: 34, opacity: oc(P(t, 37.9, 38.2))}}><Pill c={RED} bg="#FDE3E0">sanctionné par Google</Pill></div></div>
    </div> : null}

    <Cap t={t}/>
  </AbsoluteFill>; };
