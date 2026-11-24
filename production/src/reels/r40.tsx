import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Logo, OR} from '../lib';
// Réel court sans voix (7,6 s) : une bille roule vers le bord de la table, tombe, puis 3 mots et l'appel à commenter.
export const dur = 7.6;
const CREAM = '#F7F5F0', INK = '#141412';
const cl = (x: number) => Math.max(0, Math.min(1, x));
const out3 = (x: number) => 1 - Math.pow(1 - cl(x), 3);

const Ball: React.FC<{t: number}> = ({t}) => {
  const R = 78, EDGE = 760, TOP = 1150;
  let x = 130 + 600 * out3(t / 2.0), y = TOP - R;
  if (t > 2.0) x += 42 * cl((t - 2.0) / 0.45);               // il hésite au bord
  if (t > 2.45) { const f = t - 2.45; x += 260 * f; y += 0.5 * 5200 * f * f; }  // puis tombe
  const rot = (x - 130) / R * 180 / Math.PI;
  const onTable = x < EDGE + 10;
  return <AbsoluteFill style={{background: CREAM}}>
    <div style={{position: 'absolute', left: 80, right: 80, top: 330, textAlign: 'center', fontSize: 104, fontWeight: 800, color: INK, letterSpacing: '-0.035em', lineHeight: 1.05}}>Besoin d'un<br/><span style={{color: OR}}>site internet ?</span></div>
    <div style={{position: 'absolute', left: 0, top: TOP, width: EDGE, height: 1920 - TOP, background: INK, borderTopRightRadius: 18}}/>
    <div style={{position: 'absolute', left: 0, top: TOP, width: EDGE, height: 26, background: '#2B2B27', borderTopRightRadius: 18}}/>
    {onTable ? <div style={{position: 'absolute', left: Math.min(x, EDGE - 40) - 70, top: TOP - 10, width: 140, height: 20, borderRadius: 10, background: 'rgba(0,0,0,.35)', filter: 'blur(8px)'}}/> : null}
    <div style={{position: 'absolute', left: x - R, top: y - R, width: 2 * R, height: 2 * R, borderRadius: R, background: `radial-gradient(circle at 35% 30%, #FF8A5C, ${OR} 60%, #C93A12)`, transform: `rotate(${rot}deg)`, boxShadow: '0 10px 24px rgba(201,58,18,.35)'}}>
      <div style={{position: 'absolute', left: R - 9, top: 14, width: 18, height: 18, borderRadius: 9, background: 'rgba(255,255,255,.75)'}}/>
    </div>
  </AbsoluteFill>;
};

const Word: React.FC<{t: number; w: string; bg: string; fg: string}> = ({t, w, bg, fg}) =>
  <AbsoluteFill style={{background: bg, alignItems: 'center', justifyContent: 'center'}}>
    <div style={{fontSize: 172, fontWeight: 800, color: fg, letterSpacing: '-0.045em', transform: `scale(${1.08 - 0.08 * out3(t / 0.18)})`, marginTop: -120}}>{w}</div>
  </AbsoluteFill>;

const Cta: React.FC<{t: number}> = ({t}) => { const a = (d: number) => ({opacity: cl((t - d) / 0.2), transform: `translateY(${24 * (1 - out3((t - d) / 0.3))}px)`});
  return <AbsoluteFill style={{background: CREAM, alignItems: 'center'}}>
    <div style={{position: 'absolute', top: 520, fontSize: 110, fontWeight: 800, color: INK, letterSpacing: '-0.035em', ...a(0)}}>Commentez</div>
    <div style={{position: 'absolute', top: 690, background: OR, color: '#fff', fontSize: 170, fontWeight: 800, padding: '18px 84px', borderRadius: 999, letterSpacing: '-0.02em', boxShadow: '0 24px 54px rgba(255,79,31,.4)', ...a(0.25), transform: `scale(${0.9 + 0.1 * out3((t - 0.25) / 0.3)})`}}>SEO</div>
    <div style={{position: 'absolute', top: 1010, width: 900, textAlign: 'center', fontSize: 62, fontWeight: 600, color: INK, lineHeight: 1.2, ...a(0.7)}}>pour réserver<br/>votre premier échange</div>
    <div style={{position: 'absolute', top: 1270, ...a(1.1)}}><Logo s={58}/></div>
  </AbsoluteFill>; };

export const R40: React.FC = () => { const t = useCurrentFrame() / 30;
  return <AbsoluteFill style={{fontFamily: 'ID, sans-serif'}}>
    {t < 3.0 ? <Ball t={t}/> : t < 3.8 ? <Word t={t - 3.0} w="Épuré." bg={INK} fg={CREAM}/> : t < 4.6 ? <Word t={t - 3.8} w="Moderne." bg={CREAM} fg={OR}/> : t < 5.4 ? <Word t={t - 4.6} w="Performant." bg={OR} fg="#fff"/> : <Cta t={t - 5.4}/>}
  </AbsoluteFill>; };
