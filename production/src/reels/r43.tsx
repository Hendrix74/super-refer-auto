import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Logo, OR} from '../lib';
// Réel sans voix : le texte reste au centre pendant que des fonds graphiques défilent très vite ; le texte change en rythme.
export const dur = 9.2;
const G = '#141412', C = '#F7F5F0', S = '#2B2B27', L = '#E7E2D8';
export const STEP = 8 / 30;                       // un fond toutes les 8 images
export const TXT: [number, string[]][] = [[0, ["Besoin d'un", 'site internet ?']], [1.87, ['qui vous rapporte', 'des clients.']], [3.47, ['visible', 'par les IA.']], [5.07, ['bien placé', 'sur Google.']]];
export const END = 6.67;
type B = {dark: boolean; el: React.ReactNode};
const full: React.CSSProperties = {position: 'absolute', inset: 0};
const BGS: B[] = [
  {dark: false, el: <div style={{...full, background: C}}/>},
  {dark: true, el: <div style={{...full, background: G}}><div style={{position: 'absolute', left: 90, top: 260, display: 'grid', gridTemplateColumns: 'repeat(6, 130px)', gap: 24}}>{[...Array(60)].map((_, i) => <div key={i} style={{width: 130, height: 130, borderRadius: 18, background: i === 16 ? OR : S}}/>)}</div></div>},
  {dark: false, el: <div style={{...full, background: C}}><div style={{position: 'absolute', left: -200, top: 300, width: 1480, height: 1480, borderRadius: 740, border: `6px solid ${L}`}}/><div style={{position: 'absolute', left: 60, top: 560, width: 960, height: 960, borderRadius: 480, border: `6px solid ${L}`}}/></div>},
  {dark: true, el: <div style={{...full, background: `linear-gradient(160deg, #3A2A22, ${G} 60%)`}}/>},
  {dark: true, el: <div style={{...full, background: OR}}/>},
  {dark: false, el: <div style={{...full, background: C}}>{[...Array(9)].map((_, i) => <div key={i} style={{position: 'absolute', left: 90, top: 220 + i * 170, width: 900 - (i % 3) * 180, height: 26, borderRadius: 13, background: L}}/>)}</div>},
  {dark: true, el: <div style={{...full, background: G}}>{[...Array(7)].map((_, i) => <div key={i} style={{position: 'absolute', left: 110 + i * 130, bottom: 0, width: 84, height: 300 + i * 190, background: i === 6 ? OR : S, borderTopLeftRadius: 16, borderTopRightRadius: 16}}/>)}</div>},
  {dark: false, el: <div style={{...full, background: '#fff'}}><div style={{position: 'absolute', left: 70, top: 200, width: 940, height: 1500, borderRadius: 44, border: `5px solid ${L}`}}><div style={{height: 96, borderBottom: `5px solid ${L}`, display: 'flex', alignItems: 'center', gap: 16, paddingLeft: 36}}>{[OR, L, L].map((c, i) => <div key={i} style={{width: 26, height: 26, borderRadius: 13, background: c}}/>)}</div></div></div>},
  {dark: true, el: <div style={{...full, background: G, backgroundImage: `repeating-linear-gradient(135deg, ${S} 0 40px, transparent 40px 120px)`}}/>},
  {dark: false, el: <div style={{...full, background: `radial-gradient(90% 60% at 50% 100%, #FFC9B3, ${C} 70%)`}}/>},
  {dark: true, el: <div style={{...full, background: G}}><div style={{position: 'absolute', left: 0, top: 0, width: 540, height: 1920, background: S}}/></div>},
  {dark: false, el: <div style={{...full, background: C, backgroundImage: `radial-gradient(${L} 7px, transparent 8px)`, backgroundSize: '72px 72px'}}/>},
  {dark: true, el: <div style={{...full, background: G}}><div style={{position: 'absolute', left: 190, top: 1180, width: 700, height: 700, borderRadius: 350, background: OR, opacity: 0.9}}/></div>},
  {dark: false, el: <div style={{...full, background: C}}><div style={{position: 'absolute', left: 0, right: 0, top: 1290, bottom: 0, background: OR}}/></div>},
  {dark: true, el: <div style={{...full, background: S}}><div style={{position: 'absolute', left: 120, top: 180, fontSize: 1500, fontWeight: 800, color: G, lineHeight: 1}}>S</div></div>},
  {dark: false, el: <div style={{...full, background: '#fff'}}>{[...Array(4)].map((_, i) => <div key={i} style={{position: 'absolute', left: 80, top: 230 + i * 400, width: 920, height: 340, borderRadius: 36, background: i === 0 ? 'rgba(255,79,31,.12)' : C, border: i === 0 ? `5px solid ${OR}` : 'none'}}/>)}</div>},
];
const cl = (x: number) => Math.max(0, Math.min(1, x));
export const R43: React.FC = () => { const t = useCurrentFrame() / 30;
  if (t >= END) { const u = t - END;
    return <AbsoluteFill style={{fontFamily: 'ID, sans-serif', background: C, alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
      <div style={{fontSize: 96, fontWeight: 800, color: G, letterSpacing: '-0.04em', lineHeight: 1.12, marginTop: -120}}>Commentez <span style={{color: OR}}>SEO</span><br/>pour réserver<br/>votre premier échange.</div>
      <div style={{position: 'absolute', top: 1270, opacity: cl((u - 0.5) / 0.25)}}><Logo s={58}/></div>
    </AbsoluteFill>; }
  const k = Math.floor(t / STEP); const bg = BGS[(k * 7 + 3) % BGS.length];
  let lines = TXT[0][1], a = 0; for (const [s, l] of TXT) if (t >= s) { lines = l; a = s; }
  const fg = bg.dark ? '#fff' : G; const p = 1 - Math.pow(1 - cl((t - a) / 0.14), 3);
  return <AbsoluteFill style={{fontFamily: 'ID, sans-serif'}}>{bg.el}
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
      <div style={{fontSize: 112, fontWeight: 800, color: fg, letterSpacing: '-0.04em', lineHeight: 1.1, marginTop: -120, transform: `scale(${0.92 + 0.08 * p})`, textShadow: bg.dark ? '0 4px 30px rgba(0,0,0,.45)' : '0 2px 24px rgba(247,245,240,.9)'}}>{lines.map((l, i) => <div key={i}>{l}</div>)}</div>
    </AbsoluteFill></AbsoluteFill>; };
