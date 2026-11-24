import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Logo, OR} from '../lib';
// Réel typographique sans voix : un mot par battement, fonds clair/sombre alternés, rythme qui accélère.
export const dur = 10.6;
const G = '#141412', C = '#F7F5F0';
// [début, petit mot au-dessus, mot principal, accent orange]
export const SEG: [number, string, string, boolean?][] = [
  [0, '', 'on'], [0.73, 'on', 'ne fait pas'], [1.4, '', 'que'], [2.07, 'que', 'des sites.', true], [2.53, '', 'on'], [3.07, '', 'vous apporte'],
  [3.53, '', 'de la visibilité'], [4.0, '', 'sur Google'], [4.4, '', 'dans les IA'], [4.73, '', 'des clients'], [5.2, '', 'des devis'], [5.53, '', 'des appels'],
  [5.93, '', 'des ventes'], [6.27, '', 'de la confiance'], [6.6, '', 'de la clarté'], [6.93, '', 'de la vitesse'], [7.27, '', 'des résultats'],
];
export const END = 7.6;
const cl = (x: number) => Math.max(0, Math.min(1, x));
const Bg: React.FC<{dark: boolean}> = ({dark}) => <AbsoluteFill style={{background: dark
  ? `radial-gradient(120% 70% at 85% 0%, #3A2A22 0%, ${G} 55%)` : `radial-gradient(120% 70% at 15% 100%, #F3DFCF 0%, ${C} 60%)`}}/>;
export const R42: React.FC = () => { const t = useCurrentFrame() / 30;
  if (t >= END) { const u = t - END; const txt = 'Commentez SEO'; const n = Math.round(cl(u / 0.8) * txt.length); const shown = txt.slice(0, n);
    return <AbsoluteFill style={{fontFamily: 'ID, sans-serif'}}><Bg dark={false}/>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
        <div style={{fontSize: 132, fontWeight: 800, color: G, letterSpacing: '-0.045em', marginTop: -160}}>{shown.slice(0, 10)}<span style={{color: OR}}>{shown.slice(10)}</span></div>
        <div style={{fontSize: 62, fontWeight: 600, color: G, marginTop: 30, lineHeight: 1.2, opacity: cl((u - 1.0) / 0.25)}}>pour réserver<br/>votre premier échange</div>
        <div style={{position: 'absolute', top: 1260, opacity: cl((u - 1.5) / 0.25)}}><Logo s={58}/></div>
      </AbsoluteFill></AbsoluteFill>; }
  let i = 0; for (let k = 0; k < SEG.length; k++) if (t >= SEG[k][0]) i = k;
  const [a, small, big, hi] = SEG[i]; const dark = i % 2 === 1; const fg = dark ? C : G; const p = 1 - Math.pow(1 - cl((t - a) / 0.14), 3);
  return <AbsoluteFill style={{fontFamily: 'ID, sans-serif'}}><Bg dark={dark}/>
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
      <div style={{marginTop: -160, transform: `scale(${0.9 + 0.1 * p})`, opacity: 0.4 + 0.6 * p}}>
        {small ? <div style={{fontSize: 70, fontWeight: 700, color: fg, letterSpacing: '-0.03em', marginBottom: 4}}>{small}</div> : null}
        <div style={{fontSize: hi ? 176 : 128, fontWeight: 800, color: hi ? OR : fg, letterSpacing: '-0.045em', lineHeight: 1}}>{big}</div>
      </div>
    </AbsoluteFill></AbsoluteFill>; };
