import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Logo, OR} from '../lib';
// Réel 52 — « Comment attirer plus de candidats ? » (27/11/2026)
// Mécanique reprise de la pépite @qs_seo du 25/11 (« C'est FOU que personne ne sache qu'on peut faire ça sur nos FICHES Google »,
// 12,6 k vues ≈ 15× sa moyenne) : levier gratuit que personne n'utilise + réponse concrète. Transposé au recrutement.
// Décor unique : une recherche d'emploi sur Google (encadré « Offres d'emploi ») et la page d'offre qui se construit.
// Temps = temps réel de audio/r52.wav (voix déjà accélérée ×1,05).
export const dur = 51.2;
const INK = '#1B1D22', CREAM = '#F6F2EA', LINE = '#E2DCD0', MID = '#8A8478', GR = '#16A05A', RED = '#E0362C', BLUE = '#2558D9', NAVY = '#14213D';
const cl = (x: number) => Math.max(0, Math.min(1, x));
const P = (t: number, a: number, b: number) => cl((t - a) / (b - a));
const oc = (x: number) => 1 - Math.pow(1 - x, 3);
const io = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const ob = (x: number) => { const c = 1.9; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
const L = (a: number, b: number, x: number) => a + (b - a) * x;
const win = (t: number, a: number, b: number, f = 0.3) => P(t, a, a + f) * (1 - P(t, b - f, b));

// ---------- sous-titres ----------
const CAP: [number, number, string, string?][] = [
  [1.78, 5.0, 'Un levier gratuit, que presque personne n’utilise.', 'gratuit'],
  [5.2, 8.1, 'Vous cherchez un emploi : « soudeur Lyon »…', 'soudeur Lyon'],
  [8.2, 10.1, 'Google affiche un encadré d’offres d’emploi.', 'encadré'],
  [10.2, 11.7, 'Vos offres peuvent y apparaître.', 'y apparaître'],
  [11.8, 14.0, 'Mais souvent, elles dorment dans un PDF.', 'PDF'],
  [14.1, 16.1, 'Pour Google, ce n’est pas une offre.', 'pas une offre'],
  [17.55, 19.7, '1. Une page par poste, sur votre site.', '1.'],
  [19.8, 21.95, '2. Le titre que les candidats tapent.', '2.'],
  [22.0, 24.1, '« Soudeur », pas « Ninja de l’atelier ».', '« Soudeur »'],
  [24.3, 27.2, '3. Le lieu, les horaires, le salaire.', '3.'],
  [27.4, 31.4, '4. Un marquage invisible : « ceci est une offre d’emploi ».', '4.'],
  [31.6, 34.1, 'Exemple : une chaudronnerie qui cherche des soudeurs.', 'Exemple'],
  [34.15, 37.5, 'Une vraie page + le marquage = l’offre sort dans l’encadré.', 'dans l’encadré'],
  [37.6, 39.8, 'Le candidat arrive chez elle, directement.', 'directement'],
];
const Cap: React.FC<{t: number}> = ({t}) => { const c = CAP.find((x) => t >= x[0] && t < x[1]); if (!c) return null;
  const [a, , txt, hi] = c; const p = oc(P(t, a, a + 0.22)); const i = hi ? txt.indexOf(hi) : -1;
  return <div style={{position: 'absolute', left: 70, width: 940, top: 1500, textAlign: 'center', fontSize: 58, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.13, color: INK, opacity: p, transform: `translateY(${(1 - p) * 18}px)`}}>
    {i < 0 ? txt : <>{txt.slice(0, i)}<span style={{color: OR}}>{hi}</span>{txt.slice(i + hi!.length)}</>}</div>; };

const Pill: React.FC<{c: string; bg: string; a?: number; fs?: number; children: React.ReactNode}> = ({c, bg, a = 1, fs = 29, children}) => (
  <div style={{fontSize: fs, fontWeight: 800, color: c, background: bg, borderRadius: 13, padding: '9px 16px', opacity: a, whiteSpace: 'nowrap', transform: `scale(${0.7 + 0.3 * ob(cl(a))})`, display: 'inline-block'}}>{children}</div>);

// ---------- icônes dessinées (aucune marque) ----------
const Ico: React.FC<{k: string; c?: string; s?: number; w?: number}> = ({k, c = INK, s = 64, w = 2}) => {
  const st = {fill: 'none', stroke: c, strokeWidth: w, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
  return <svg width={s} height={s} viewBox="0 0 24 24">
    {k === 'brief' && <><rect x="3" y="7" width="18" height="13" rx="2" {...st}/><path d="M9 7V5h6v2M3 12.5h18" {...st}/></>}
    {k === 'pin' && <><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0113 0c0 5-6.5 11-6.5 11z" {...st}/><circle cx="12" cy="10" r="2.3" {...st}/></>}
    {k === 'clock' && <><circle cx="12" cy="12" r="8.5" {...st}/><path d="M12 7.5V12l3 2" {...st}/></>}
    {k === 'euro' && <><circle cx="12" cy="12" r="8.5" {...st}/><path d="M15 8.6a4 4 0 100 6.8M7.5 11h5.5M7.5 13.2h5" {...st}/></>}
    {k === 'user' && <><circle cx="12" cy="8" r="3.6" {...st}/><path d="M4.5 20c.8-4 3.8-6 7.5-6s6.7 2 7.5 6" {...st}/></>}
    {k === 'mag' && <><circle cx="10.5" cy="10.5" r="6.5" {...st}/><path d="M15.5 15.5L21 21" {...st}/></>}
    {k === 'eye' && <><path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" {...st}/><circle cx="12" cy="12" r="3" {...st}/></>}
    {k === 'eyeoff' && <><path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" {...st}/><circle cx="12" cy="12" r="3" {...st}/><path d="M4 4l16 16" {...st}/></>}
    {k === 'site' && <><rect x="3" y="4" width="18" height="16" rx="2" {...st}/><path d="M3 8.5h18M6.5 12.5h7M6.5 15.5h11" {...st}/></>}
  </svg>; };

// ---------- la page de résultats Google (stylisée) ----------
const JOBS = [
  {co: 'Entreprise A', ti: 'Soudeur H/F'},
  {co: 'Site d’annonces', ti: 'Soudeur MIG H/F'},
  {co: 'Entreprise C', ti: 'Soudeur TIG H/F'},
];
const Serp: React.FC<{t: number; q: string; caret: boolean; box: number; slot: number; slotFill: number; hl: number}> = ({t, q, caret, box, slot, slotFill, hl}) => (
  <div style={{position: 'absolute', left: 70, top: 400, width: 940, height: 1000, borderRadius: 34, background: '#FFF', border: `3px solid ${LINE}`, boxShadow: '0 24px 60px #3A2A1018', overflow: 'hidden'}}>
    {/* barre de recherche */}
    <div style={{margin: '34px 36px 0', height: 92, borderRadius: 46, border: `3px solid ${LINE}`, display: 'flex', alignItems: 'center', padding: '0 30px', gap: 18, boxShadow: '0 4px 14px #00000010'}}>
      <Ico k="mag" s={42} c={MID} w={2.4}/><div style={{fontSize: 40, fontWeight: 600, color: INK, letterSpacing: '-0.01em'}}>{q}{caret && Math.floor(t * 3) % 2 === 0 ? <span style={{color: OR}}>|</span> : null}</div></div>
    {/* encadré offres d'emploi */}
    <div style={{margin: '30px 36px 0', borderRadius: 26, border: `${hl > 0 ? 5 : 3}px solid ${hl > 0 ? OR : LINE}`, padding: '22px 26px 10px', opacity: box, transform: `translateY(${(1 - oc(box)) * -40}px)`, background: hl > 0 ? '#FFF8F3' : '#FFF', boxShadow: hl > 0 ? `0 14px 40px ${OR}22` : 'none'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 34, fontWeight: 800, color: INK}}><Ico k="brief" s={42} c={BLUE}/>Offres d’emploi</div>
      {JOBS.map((j, i) => <div key={i} style={{marginTop: 16, height: 104, borderRadius: 18, background: '#F7F8FA', display: 'flex', alignItems: 'center', padding: '0 22px', gap: 18, opacity: oc(P(box, 0.3 + i * 0.2, 0.6 + i * 0.2))}}>
        <div style={{width: 58, height: 58, borderRadius: 14, background: ['#CFD8E6', '#D9D2E8', '#D3E4D8'][i]}}/>
        <div><div style={{fontSize: 32, fontWeight: 800, color: INK}}>{j.ti}</div><div style={{fontSize: 24, fontWeight: 600, color: MID, marginTop: 2}}>{j.co} · Lyon</div></div></div>)}
      {/* emplacement pour votre offre */}
      <div style={{marginTop: 16, marginBottom: 14, height: 104, borderRadius: 18, border: slotFill > 0 ? `4px solid ${OR}` : `4px dashed ${slot > 0 ? OR : LINE}`, background: slotFill > 0 ? '#FFF1EB' : 'transparent', display: 'flex', alignItems: 'center', padding: '0 22px', gap: 18,
        transform: `scale(${1 + (slot > 0 && slotFill === 0 ? Math.sin(t * 6) * 0.012 : 0) + 0.04 * Math.sin(Math.PI * slotFill)})`}}>
        {slotFill > 0 ? <><div style={{width: 58, height: 58, borderRadius: 14, background: OR, opacity: slotFill}}/>
          <div style={{opacity: slotFill}}><div style={{fontSize: 32, fontWeight: 800, color: OR}}>Soudeur H/F</div><div style={{fontSize: 24, fontWeight: 600, color: MID, marginTop: 2}}>Votre entreprise · votre-site.fr</div></div></> :
          <div style={{fontSize: 30, fontWeight: 700, color: slot > 0 ? OR : MID, opacity: 0.4 + 0.6 * slot}}>votre offre ?</div>}
      </div>
    </div>
    {/* résultats classiques, en dessous */}
    {[0, 1].map((i) => <div key={i} style={{margin: '30px 40px 0', opacity: 0.6 * box}}>
      <div style={{width: 300, height: 16, borderRadius: 8, background: LINE}}/><div style={{marginTop: 12, width: 560, height: 24, borderRadius: 8, background: '#B9C8EC'}}/><div style={{marginTop: 12, width: 820, height: 14, borderRadius: 7, background: '#EEE9DF'}}/></div>)}
  </div>);

// ---------- le PDF qui dort ----------
const Pdf: React.FC<{x: number; y: number; s: number; a: number; grey?: number}> = ({x, y, s, a, grey = 1}) => (
  <div style={{position: 'absolute', left: x, top: y, width: 300, height: 380, transform: `scale(${s})`, transformOrigin: '50% 50%', opacity: a}}>
    <div style={{position: 'absolute', inset: 0, background: '#FFF', borderRadius: 18, border: `4px solid ${grey ? '#C9C2B4' : INK}`, boxShadow: '0 18px 40px #3A2A1022', clipPath: 'polygon(0 0, 78% 0, 100% 18%, 100% 100%, 0 100%)'}}/>
    <div style={{position: 'absolute', right: 0, top: 0, width: 66, height: 68, background: '#E9E3D7', borderBottomLeftRadius: 14}}/>
    <div style={{position: 'absolute', left: 26, top: 34, fontSize: 30, fontWeight: 800, color: '#FFF', background: grey ? '#C46B63' : RED, borderRadius: 10, padding: '4px 14px'}}>PDF</div>
    {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{position: 'absolute', left: 28, top: 120 + i * 38, width: [220, 240, 180, 230, 200, 150][i], height: 14, borderRadius: 7, background: '#E4DED2'}}/>)}
    <div style={{position: 'absolute', left: 0, width: 300, bottom: 22, textAlign: 'center', fontSize: 22, fontWeight: 700, color: MID}}>offre_soudeur.pdf</div>
  </div>);

// ---------- la page d'offre qui se construit ----------
const JobPage: React.FC<{t: number; a: number}> = ({t, a}) => {
  const ninja = P(t, 19.95, 20.3), soud = P(t, 22.0, 22.35), strike = P(t, 22.65, 22.95), ninjaOut = P(t, 23.5, 23.9);
  const rows = [{k: 'pin', l: 'Lieu', at: 24.81}, {k: 'clock', l: 'Horaires', at: 25.6}, {k: 'euro', l: 'Salaire', at: 26.42}];
  const tag = P(t, 27.5, 27.95), gsee = P(t, 29.86, 30.25);
  return <div style={{position: 'absolute', left: 90, top: 470, width: 900, height: 900, opacity: a, transform: `translateY(${(1 - oc(a)) * 50}px) scale(${0.94 + 0.06 * oc(a)})`}}>
    <div style={{position: 'absolute', inset: 0, borderRadius: 32, background: '#FFF', border: `3px solid ${LINE}`, boxShadow: '0 24px 60px #3A2A1020', overflow: 'hidden'}}>
      <div style={{height: 64, background: '#EFEAE0', display: 'flex', alignItems: 'center', padding: '0 26px', gap: 10}}>
        {[0, 1, 2].map((i) => <div key={i} style={{width: 16, height: 16, borderRadius: 8, background: ['#F26B5B', '#F5BD4F', '#5BC46B'][i]}}/>)}
        <div style={{marginLeft: 18, flex: 1, height: 38, borderRadius: 19, background: '#FFF', fontSize: 23, fontWeight: 600, color: MID, display: 'flex', alignItems: 'center', padding: '0 18px'}}>votre-site.fr/emploi/<span style={{color: OR}}>soudeur</span></div></div>
      <div style={{padding: '34px 44px'}}>
        <div style={{fontSize: 26, fontWeight: 700, color: MID}}>Offre d’emploi</div>
        {/* titre : « Ninja de l'atelier » barré, remplacé par « Soudeur » */}
        <div style={{position: 'relative', height: 150, marginTop: 8}}>
          <div style={{position: 'absolute', left: 0, top: L(soud > 0 ? 0 : 20, -60, oc(ninjaOut)), fontSize: soud > 0 ? 40 : 64, fontWeight: 800, color: soud > 0 ? MID : INK, opacity: ninja * (1 - ninjaOut), letterSpacing: '-0.03em', whiteSpace: 'nowrap'}}>
            Ninja de l’atelier H/F
            {strike > 0 ? <div style={{position: 'absolute', left: -6, top: '52%', height: 6, width: `${104 * strike}%`, background: RED, borderRadius: 3}}/> : null}</div>
          {soud > 0 ? <div style={{position: 'absolute', left: 0, top: L(58, 20, oc(ninjaOut)), fontSize: 74, fontWeight: 800, color: OR, letterSpacing: '-0.035em', opacity: oc(soud), transform: `scale(${0.8 + 0.2 * ob(soud)})`, transformOrigin: '0 50%'}}>Soudeur H/F</div> : null}
          {t >= 22.0 && t < 24.3 ? <div style={{position: 'absolute', right: 0, top: 18, opacity: oc(P(t, 22.2, 22.5))}}><Pill c={GR} bg="#E1F5EA" fs={24}>ce qu’on tape sur Google</Pill></div> : null}
        </div>
        {/* lieu, horaires, salaire */}
        <div style={{marginTop: 10}}>
          {rows.map((r) => { const p = P(t, r.at, r.at + 0.3);
            return <div key={r.l} style={{display: 'flex', alignItems: 'center', gap: 20, height: 92, marginTop: 14, borderRadius: 18, background: p > 0 ? '#F4FBF7' : '#FAF8F4', border: `3px solid ${p > 0 ? '#BFE6CF' : '#EEE9DF'}`, padding: '0 22px'}}>
              <Ico k={r.k} s={46} c={p > 0 ? GR : '#C9C2B4'}/><div style={{fontSize: 34, fontWeight: 800, color: p > 0 ? INK : '#B8B1A4', width: 190}}>{r.l}</div>
              <div style={{flex: 1, height: 16, borderRadius: 8, background: p > 0 ? '#CFE9DA' : '#EEE9DF'}}/>
              <div style={{width: 48, height: 48, borderRadius: 24, background: p > 0 ? GR : 'transparent', border: p > 0 ? 'none' : `3px solid #E2DCD0`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + 0.2 * Math.sin(Math.PI * p)})`}}>
                {p > 0 ? <svg width="30" height="30" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#FFF" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="24" strokeDashoffset={24 * (1 - p)}/></svg> : null}</div>
            </div>; })}
        </div>
        <div style={{marginTop: 30, display: 'flex', gap: 16}}><div style={{height: 76, width: 330, borderRadius: 38, background: INK, color: '#FFF', fontSize: 30, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Postuler</div></div>
      </div>
    </div>
    {/* le marquage : étiquette « code » collée sur la page */}
    {tag > 0 ? <div style={{position: 'absolute', right: -24, top: 92, opacity: oc(tag), transform: `rotate(${L(-14, 4, oc(tag))}deg) scale(${0.6 + 0.4 * ob(tag)})`}}>
      <div style={{fontFamily: 'monospace', fontSize: 30, fontWeight: 700, color: '#FFF', background: OR, borderRadius: 14, padding: '12px 20px', boxShadow: `0 14px 34px ${OR}55`, border: '3px dashed #FFFFFFAA'}}>{'{ offre d’emploi }'}</div>
    </div> : null}
    {t >= 28.2 && t < 31.4 ? <div style={{position: 'absolute', left: 0, width: 900, top: 920, display: 'flex', justifyContent: 'center', gap: 18, opacity: win(t, 28.2, 31.4, 0.3)}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 27, fontWeight: 700, color: MID, background: '#FFF', borderRadius: 14, padding: '8px 16px', border: `3px solid ${LINE}`}}><Ico k="eyeoff" s={36} c={MID}/>invisible pour le visiteur</div>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 27, fontWeight: 800, color: GR, background: '#E1F5EA', borderRadius: 14, padding: '8px 16px', opacity: oc(gsee), transform: `scale(${0.7 + 0.3 * ob(gsee)})`}}><Ico k="eye" s={36} c={GR}/>lu par Google</div>
    </div> : null}
  </div>; };

export const R52: React.FC = () => { const t = useCurrentFrame() / 30;
  // ---------- fin : marque puis appel à l'action ----------
  if (t >= 42.4) { const u = t - 42.4; const p = oc(P(u, 0, 0.4)); const cta = P(t, 47.45, 47.8);
    return <AbsoluteFill style={{fontFamily: 'ID, sans-serif', background: NAVY}}>
      <AbsoluteFill style={{background: `radial-gradient(90% 50% at 50% 100%, #24365E 0%, ${NAVY} 65%)`}}/>
      <div style={{position: 'absolute', left: 0, width: 1080, top: 430, display: 'flex', justifyContent: 'center', opacity: p, transform: `translateY(${(1 - p) * -20}px)`}}><div style={{background: CREAM, borderRadius: 36, padding: '26px 44px'}}><Logo s={66}/></div></div>
      <div style={{position: 'absolute', left: 80, width: 920, top: 640, textAlign: 'center', fontSize: 56, fontWeight: 700, color: CREAM, lineHeight: 1.2, letterSpacing: '-0.025em', opacity: oc(P(t, 43.6, 44.0))}}>On pilote votre site<br/>et son référencement,<br/><span style={{color: OR, opacity: oc(P(t, 45.8, 46.1))}}>offres d’emploi comprises.</span></div>
      <div style={{position: 'absolute', left: 60, width: 960, top: 1010, textAlign: 'center', opacity: oc(cta), transform: `translateY(${(1 - oc(cta)) * 30}px)`}}>
        <div style={{fontSize: 104, fontWeight: 800, color: CREAM, letterSpacing: '-0.04em', lineHeight: 1}}>Commentez <span style={{color: OR}}>« SEO »</span></div>
        <div style={{fontSize: 54, fontWeight: 600, color: CREAM, marginTop: 28, lineHeight: 1.2, opacity: oc(P(t, 49.0, 49.4))}}>pour réserver<br/>votre premier échange</div>
      </div></AbsoluteFill>; }

  // ---------- phases ----------
  const hookBig = 1 - P(t, 1.3, 1.7);
  const pSerp = (1 - P(t, 11.7, 12.1)) + (t >= 34.1 && t < 39.9 ? oc(P(t, 35.2, 35.6)) : 0);     // page de résultats
  const pPdf = win(t, 11.75, 16.25, 0.35);                                                         // le PDF à la loupe
  const pPage = win(t, 16.15, 31.6, 0.4);                                                          // la page d'offre
  const pEx = win(t, 31.55, 35.6, 0.35);                                                           // exemple : PDF → page
  const pEnd = P(t, 39.85, 40.2);                                                                  // conclusion
  // requête : déjà là au début (problème visible), effacée puis retapée à 5,2 s
  const q = 'soudeur Lyon'; let qs = q, caret = false;
  if (t >= 5.2 && t < 8.1) { const n = Math.round(P(t, 6.6, 7.9) * q.length); qs = q.slice(0, n); caret = true; }
  const box = t < 5.2 ? 1 : t < 8.2 ? 0 : oc(P(t, 8.23, 8.9));
  const hl = (t >= 8.9 && t < 10.3) || t >= 36.0 ? 1 : 0;
  const slot = t >= 10.25 ? 1 : t < 5.2 ? 0.6 : 0;
  const fill = t >= 36.0 ? oc(P(t, 36.0, 36.4)) : 0;
  const steps = [17.58, 19.84, 24.36, 27.47];

  return <AbsoluteFill style={{fontFamily: 'ID, sans-serif', background: CREAM, overflow: 'hidden'}}>
    <AbsoluteFill style={{backgroundImage: `linear-gradient(${LINE}66 2px, transparent 2px)`, backgroundSize: '100% 64px', opacity: 0.5}}/>
    {/* question : en entier dès la première image, puis rappel en bandeau */}
    {t < 39.85 ? <div style={{position: 'absolute', left: 60, width: 960, top: L(120, 150, 1 - hookBig), textAlign: 'center', fontWeight: 800, letterSpacing: '-0.035em', color: INK, fontSize: L(54, 88, hookBig), lineHeight: 1.05}}>
      Comment attirer plus de <span style={{color: OR}}>candidats</span> ?</div> : null}

    {/* progression des 4 étapes, sous la question */}
    {t >= 16.2 && t < 31.6 ? <div style={{position: 'absolute', left: 0, width: 1080, top: 300, display: 'flex', justifyContent: 'center', gap: 22, opacity: win(t, 16.2, 31.6, 0.35)}}>
      {steps.map((s, i) => { const on = P(t, s, s + 0.25); const cur = t >= s && (i === 3 || t < steps[i + 1]);
        return <div key={i} style={{width: 92, height: 92, borderRadius: 46, background: on > 0 ? (cur ? OR : INK) : '#FFF', border: `4px solid ${on > 0 ? (cur ? OR : INK) : LINE}`, color: on > 0 ? '#FFF' : MID, fontSize: 44, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${cur ? 1.08 : 1})`}}>{i + 1}</div>; })}
    </div> : null}

    {/* A/B/E — page de résultats */}
    {pSerp > 0 && t < 39.9 ? <div style={{opacity: Math.min(1, pSerp) * (t >= 37.6 ? 1 - 0.2 * P(t, 37.6, 38) : 1)}}>
      <Serp t={t} q={qs} caret={caret} box={box} slot={slot} slotFill={fill} hl={hl}/>
    </div> : null}
    {/* A — le PDF, à côté, invisible pour Google */}
    {t < 5.3 ? <div style={{opacity: 1 - P(t, 4.9, 5.25)}}>
      <Pdf x={700} y={1080} s={0.72} a={oc(P(t, 0.1, 0.4))}/>
      <div style={{position: 'absolute', left: 560, top: 1395, opacity: oc(P(t, 0.3, 0.6))}}><Pill c={RED} bg="#FDE3E0">invisible pour Google</Pill></div>
    </div> : null}
    {/* A — l'interrupteur « Vos offres sur Google » en position OFF */}
    {t >= 1.78 && t < 5.3 ? (() => { const a = oc(P(t, 1.8, 2.15)) * (1 - P(t, 4.9, 5.25)); return <div style={{position: 'absolute', left: 90, top: 1170, opacity: a, transform: `translateY(${(1 - a) * 20}px)`, display: 'flex', alignItems: 'center', gap: 18, background: '#FFF', borderRadius: 24, padding: '18px 24px', border: `3px solid ${LINE}`, boxShadow: '0 12px 30px #3A2A1018'}}>
      <div style={{width: 110, height: 60, borderRadius: 30, background: '#D7D1C5', position: 'relative'}}><div style={{position: 'absolute', left: 6, top: 6, width: 48, height: 48, borderRadius: 24, background: '#FFF', boxShadow: '0 2px 6px #0003'}}/></div>
      <div><div style={{fontSize: 30, fontWeight: 800, color: INK}}>Vos offres sur Google</div><div style={{fontSize: 24, fontWeight: 700, color: GR, opacity: oc(P(t, 2.4, 2.7))}}>gratuit · souvent éteint</div></div></div>; })() : null}

    {/* C — le PDF passe à la loupe de Google */}
    {pPdf > 0 ? <div style={{opacity: pPdf}}>
      <Pdf x={390} y={560} s={L(1.1, 1.45, oc(P(t, 11.8, 12.4)))} a={1} grey={0}/>
      {t >= 14.1 ? (() => { const m = io(P(t, 14.15, 15.4)); return <div style={{position: 'absolute', left: L(260, 640, m), top: L(560, 860, Math.sin(m * Math.PI) * 0.5 + m * 0.5), opacity: oc(P(t, 14.1, 14.4))}}>
        <div style={{width: 170, height: 170, borderRadius: 85, background: '#FFFFFF99', border: `8px solid ${INK}`, boxShadow: '0 14px 30px #0003'}}/><div style={{position: 'absolute', left: 140, top: 140, width: 26, height: 90, borderRadius: 13, background: INK, transform: 'rotate(-45deg)', transformOrigin: '13px 0'}}/></div>; })() : null}
      {t >= 15.7 ? <div style={{position: 'absolute', left: 300, top: 1060, transform: `rotate(-7deg) scale(${0.6 + 0.4 * ob(P(t, 15.72, 16.05))})`, opacity: oc(P(t, 15.72, 15.9)), fontSize: 54, fontWeight: 800, color: RED, border: `7px solid ${RED}`, borderRadius: 18, padding: '6px 26px', background: '#FFFFFFE8'}}>PAS UNE OFFRE</div> : null}
    </div> : null}

    {/* « Voici quoi faire » */}
    {t >= 16.15 && t < 17.6 ? <div style={{position: 'absolute', left: 0, width: 1080, top: 1500, textAlign: 'center', fontSize: 64, fontWeight: 800, color: INK, letterSpacing: '-0.03em', opacity: win(t, 16.15, 17.6, 0.25)}}>Voici quoi <span style={{color: OR}}>faire</span>.</div> : null}

    {/* D — la page d'offre qui se construit (étape 1 : elle apparaît) */}
    {pPage > 0 ? <JobPage t={t} a={pPage * (t < 17.58 ? 0.35 : 1)}/> : null}

    {/* E — exemple : la chaudronnerie, du PDF à la vraie page, puis dans l'encadré */}
    {pEx > 0 ? <div style={{opacity: pEx}}>
      <div style={{position: 'absolute', left: 0, width: 1080, top: 420, display: 'flex', justifyContent: 'center', opacity: oc(P(t, 31.7, 32.0))}}><Pill c="#FFF" bg={INK} fs={34}>Exemple : une chaudronnerie</Pill></div>
      <Pdf x={390} y={640} s={1.2 * (1 - P(t, 34.15, 34.6))} a={1 - P(t, 34.3, 34.6)} grey={0}/>
      {t >= 32.7 && t < 34.4 ? <div style={{position: 'absolute', left: 0, width: 1080, top: 1180, display: 'flex', justifyContent: 'center', opacity: oc(P(t, 32.7, 33.0))}}><Pill c={MID} bg="#FFF">cherche des soudeurs</Pill></div> : null}
      {t >= 34.3 ? (() => { const a = oc(P(t, 34.35, 34.75)); const fly = io(P(t, 35.15, 35.9));
        return <div style={{position: 'absolute', left: L(240, 400, fly), top: L(620, 1090, fly), width: 600, opacity: a * (1 - P(t, 35.75, 35.95)), transform: `scale(${L(1, 0.35, fly)})`, transformOrigin: '50% 0%'}}>
          <div style={{borderRadius: 28, background: '#FFF', border: `4px solid ${OR}`, padding: '26px 30px', boxShadow: `0 20px 50px ${OR}33`}}>
            <div style={{fontSize: 22, fontWeight: 700, color: MID}}>votre-site.fr/emploi/soudeur</div>
            <div style={{fontSize: 56, fontWeight: 800, color: OR, letterSpacing: '-0.03em'}}>Soudeur H/F</div>
            {['pin', 'clock', 'euro'].map((k) => <div key={k} style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 10}}><Ico k={k} s={34} c={GR}/><div style={{width: 260, height: 12, borderRadius: 6, background: '#CFE9DA'}}/></div>)}
            <div style={{marginTop: 14, display: 'inline-block', fontFamily: 'monospace', fontSize: 22, fontWeight: 700, color: '#FFF', background: OR, borderRadius: 10, padding: '4px 12px'}}>{'{ offre d’emploi }'}</div>
          </div></div>; })() : null}
    </div> : null}

    {/* E — le candidat arrive directement chez vous */}
    {t >= 37.6 && t < 39.95 ? (() => { const d = io(P(t, 37.7, 38.7)); const a = win(t, 37.6, 39.95, 0.25); return <div style={{opacity: a}}>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        <path d={`M 540 1240 C 540 ${L(1240, 1330, d)}, 540 ${L(1240, 1360, d)}, 540 ${L(1240, 1400, d)}`} stroke={OR} strokeWidth={9} fill="none" strokeLinecap="round" strokeDasharray="20 10"/></svg>
      <div style={{position: 'absolute', left: 540 - 48, top: L(1150, 1330, d), width: 96, height: 96, borderRadius: 48, background: '#FFF', border: `5px solid ${OR}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 24px #0002'}}><Ico k="user" s={58} c={OR}/></div>
      <div style={{position: 'absolute', left: 300, top: 1405, width: 480, height: 80, borderRadius: 22, background: OR, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, opacity: oc(P(t, 38.4, 38.7)), transform: `scale(${0.8 + 0.2 * ob(P(t, 38.4, 38.8))})`}}>
        <Ico k="site" s={44} c="#FFF"/><div style={{fontSize: 32, fontWeight: 800, color: '#FFF'}}>chez vous, directement</div></div>
    </div>; })() : null}

    {/* F — conclusion */}
    {pEnd > 0 ? <div style={{position: 'absolute', left: 80, width: 920, top: 640, textAlign: 'center', opacity: oc(pEnd), transform: `translateY(${(1 - oc(pEnd)) * 30}px)`}}>
      <div style={{display: 'flex', justifyContent: 'center', marginBottom: 40}}><div style={{width: 170, height: 170, borderRadius: 44, background: '#FFF', border: `5px solid ${OR}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 18px 44px ${OR}33`}}><Ico k="brief" s={100} c={OR}/></div></div>
      <div style={{fontSize: 84, fontWeight: 800, color: INK, letterSpacing: '-0.04em', lineHeight: 1.08}}>Vos offres d’emploi aussi,<br/><span style={{color: OR}}>ça se référence.</span></div>
    </div> : null}

    <Cap t={t}/>
  </AbsoluteFill>; };
