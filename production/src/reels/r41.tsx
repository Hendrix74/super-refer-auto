import React from 'react';
import {AbsoluteFill, useCurrentFrame, OffthreadVideo, staticFile} from 'remotion';
import {Logo, OR} from '../lib';
// Réel court sans voix : frappe de ballon (clip Pexels, libre de droits), coupe à l'impact, puis cartons texte.
export const dur = 9.4;
const G = '#141412', C = '#F7F5F0';
const W: React.FC<{bg: string; fg: string; s?: number; children: React.ReactNode}> = ({bg, fg, s = 150, children}) =>
  <AbsoluteFill style={{background: bg, alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}><div style={{fontSize: s, fontWeight: 700, color: fg, letterSpacing: '-0.04em', lineHeight: 1.12}}>{children}</div></AbsoluteFill>;
export const R41: React.FC = () => { const t = useCurrentFrame() / 30;
  return <AbsoluteFill style={{fontFamily: 'ID, sans-serif', background: '#000'}}>
    {t < 1.8 ? <OffthreadVideo src={staticFile('foot.mp4')} muted style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
      : t < 2.8 ? <W bg={C} fg={G} s={104}>Besoin d'un<br/>site internet ?</W>
      : t < 3.83 ? <W bg={G} fg={C} s={112}>qui vous rapporte<br/>des clients.</W> : t < 4.87 ? <W bg={C} fg={OR} s={112}>visible<br/>par les IA.</W> : t < 5.9 ? <W bg={OR} fg="#fff" s={112}>bien placé<br/>sur Google.</W>
      : t < 8.1 ? <W bg={C} fg={G} s={84}>Commentez <span style={{color: OR}}>SEO</span><br/>pour réserver<br/>votre premier échange.</W>
      : <AbsoluteFill style={{background: G, alignItems: 'center', justifyContent: 'center'}}><div style={{background: C, padding: '36px 56px', borderRadius: 40}}><Logo s={84}/></div></AbsoluteFill>}
  </AbsoluteFill>; };
