import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Cubes, CtaPanel, LogoPanel, useT, useTh, OR, GR, RED, P, io, oc, L, Scene, Phrase} from '../lib';
import {BrowserBar} from './r29';
import T from '../../spec/r45_t.json';
// temps en secondes de la voix d'origine (la vidéo tourne à 1,05)
const VIO = '#5B5BF0';
const Stars: React.FC<{n?: number; s?: number; at?: number}> = ({n = 5, s = 34, at = 0}) => { const t = useT();
  return <div style={{display: 'flex', gap: 4}}>{[...Array(n)].map((_, i) => <Ic key={i} n="star" s={s} c="#F5B301" style={{opacity: P(t, at + i * 0.07, at + i * 0.07 + 0.15), transform: `scale(${L(0.6, 1, oc(P(t, at + i * 0.07, at + i * 0.07 + 0.2)))})`}}/>)}</div>; };

// A — des visiteurs passent… et repartent
const A0: React.FC = () => { const t = useT(); const th = useTh();
  return <><Card x={170} y={0} w={600} h={430}>
      <BrowserBar url="votre-entreprise.fr" w={600}/>
      <div style={{position: 'absolute', left: 28, top: 104, width: 544, height: 150, borderRadius: 20, background: `linear-gradient(135deg, ${OR}, #FFB08F)`}}/>
      <Box x={150} y={290} w={300} h={90} style={{borderRadius: 45, background: OR, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Tx s={32} w={800} c="#fff">Demander un devis</Tx></Box>
    </Card>
    {[0, 1, 2, 3, 4].map((i) => { const p = ((t * 0.42 + i * 0.2) % 1); const x = L(-80, 1020, p); return <div key={i} style={{position: 'absolute', left: x, top: 520 + (i % 2) * 70, opacity: Math.sin(p * Math.PI)}}><Dot s={74} c={i % 2 ? th.mut : VIO} n="user"/></div>; })}
    <A at={1.6} kind="pop"><Box x={250} y={700}><Chip fill c={RED} s={36}>Devis reçus : 0</Chip></Box></A>
  </>; };

// B — la balance promesse / preuve
const B0: React.FC = () => { const t = useT(); const th = useTh(); const tilt = L(0, 12, io(P(t, 2.9, 3.8)));
  const Pan: React.FC<{x: number; dy: number; children: React.ReactNode}> = ({x, dy, children}) => <div style={{position: 'absolute', left: x, top: 260 + dy, width: 360, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <div style={{width: 4, height: 120, background: th.mut}}/>{children}<div style={{width: 340, height: 18, borderRadius: 9, background: th.ink, marginTop: 10}}/></div>;
  return <>
    <div style={{position: 'absolute', left: 462, top: 210, width: 16, height: 480, background: th.ink, borderRadius: 8}}/>
    <div style={{position: 'absolute', left: 340, top: 670, width: 260, height: 30, background: th.ink, borderRadius: 15}}/>
    <div style={{position: 'absolute', left: 90, top: 250, width: 760, height: 16, background: th.ink, borderRadius: 8, transform: `rotate(${tilt}deg)`}}/>
    <Pan x={-10} dy={-tilt * 6.4}><A at={0.3} kind="pop" style={{position: 'relative', inset: undefined}}><Box x={0} y={0} w={360} h={150} style={{position: 'relative', borderRadius: 26, background: th.card, boxShadow: th.sh, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><Label>Promesse</Label><Tx s={30} w={600} style={{marginTop: 8}}>« Les meilleurs »</Tx></Box></A></Pan>
    <Pan x={590} dy={tilt * 6.4}><A at={2.7} kind="pop" style={{position: 'relative', inset: undefined}}><Box x={0} y={0} w={360} h={150} style={{position: 'relative', borderRadius: 26, background: th.card, boxShadow: th.sh, border: `3px solid ${OR}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><Label style={{color: OR}}>Preuve</Label><div style={{marginTop: 8}}><Stars at={2.8} s={36}/></div></Box></A></Pan>
  </>; };

// C — trois preuves
const C0: React.FC = () => <>{[['star', 'Avis clients'], ['folder', 'Réalisations'], ['flag', 'Certifications']].map(([ic, k], i) => <A key={k} at={0.15 + i * 0.18} kind="up"><Box x={0} y={60 + i * 200} w={940} h={160} style={{display: 'flex', alignItems: 'center', gap: 34}}>
  <Dot s={140} c={OR} n={ic}/><Tx s={62} w={800}>{k}</Tx></Box></A>)}</>;

// D — des avis avec un nom et une entreprise
const D0: React.FC = () => { const th = useTh();
  const r: [string, string, number][] = [['Claire M.', 'Responsable achats · industrie', 0.5], ['Thomas R.', 'Directeur de site · logistique', 1.3], ['Sophie L.', 'Gérante · BTP', 2.1]];
  return <>{r.map(([n, s, a], i) => <A key={n} at={a} kind="right"><Card x={i % 2 ? 80 : 0} y={i * 240} w={860} h={210}>
      <Dot s={96} c={[VIO, OR, GR][i]} n="user" style={{position: 'absolute', left: 30, top: 30}}/>
      <Tx s={38} w={800} style={{position: 'absolute', left: 150, top: 34}}>{n}</Tx>
      <Tx s={26} w={500} c={th.mut} style={{position: 'absolute', left: 150, top: 84}}>{s}</Tx>
      <Box x={150} y={132}><Stars at={a + 0.25} s={34}/></Box>
      <div style={{position: 'absolute', left: 420, top: 145, width: 400, height: 14, borderRadius: 7, background: th.line}}/>
    </Card></A>)}
    <A at={2.6} kind="pop"><Box x={640} y={-60}><Chip s={26} c={th.mut}>Exemple</Chip></Box></A></>; };

// E — des réalisations : photos et résultats
const E0: React.FC = () => { const t = useT(); const th = useTh();
  const g: [string, string, number][] = [['Ligne de production', 'Livrée dans les délais', 0.4], ['Entrepôt rénové', 'Avant / après', 1.4], ['Siège social', 'Chantier en site occupé', 2.4]];
  return <>{g.map(([k, s, a], i) => <A key={k} at={a} kind="up"><Card x={0} y={i * 250} w={940} h={220}>
      <div style={{position: 'absolute', left: 20, top: 20, width: 260, height: 180, borderRadius: 20, overflow: 'hidden', background: `linear-gradient(${120 + i * 40}deg, #FFD2B8, ${OR})`}}>
        <div style={{position: 'absolute', left: 30, bottom: 0, width: 80, height: 90, background: 'rgba(255,255,255,.5)', borderRadius: '8px 8px 0 0'}}/>
        <div style={{position: 'absolute', left: 130, bottom: 0, width: 100, height: 130 * oc(P(t, a + 0.2, a + 0.8)), background: 'rgba(255,255,255,.75)', borderRadius: '8px 8px 0 0'}}/></div>
      <Tx s={40} w={800} style={{position: 'absolute', left: 320, top: 50}}>{k}</Tx>
      <A at={a + 0.5} kind="left"><Box x={320} y={120}><Chip fill c={GR} s={28}><Ic n="check" s={28} c="#fff"/>{s}</Chip></Box></A>
    </Card></A>)}</>; };

// F — les preuves collées au bouton devis
const F0: React.FC = () => { const t = useT(); const th = useTh();
  const b: [string, string, number, number, number][] = [['flag', 'Certifié', 1.0, 40, 40], ['star', 'Label qualité', 1.5, 500, 40], ['building', 'Ils nous confient leurs sites', 2.2, 120, 520]];
  return <>
    <A at={0.2} kind="pop"><Box x={170} y={270} w={600} h={160} style={{borderRadius: 80, background: OR, boxShadow: '0 28px 60px rgba(255,79,31,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}><Ic n="doc" s={54} c="#fff"/><Tx s={48} w={800} c="#fff">Demander un devis</Tx></Box></A>
    {b.map(([ic, k, a, x, y]) => { const p = oc(P(t, a, a + 0.5)); return <div key={k} style={{position: 'absolute', left: x, top: L(y < 300 ? -200 : 900, y + 60, p), opacity: P(t, a, a + 0.2)}}>
      <Box x={0} y={0} h={110} style={{position: 'relative', borderRadius: 26, background: th.card, boxShadow: th.sh, border: `3px solid ${th.line}`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 28px'}}><Dot s={66} c={th.ink} n={ic}/><Tx s={32} w={700}>{k}</Tx></Box></div>; })}
    <Cubes at={2.6} x={470} y={350} seed={4}/>
  </>; };

const G0: React.FC = () => <LogoPanel sub="Confiance · Demandes" at={0.1} subAt={1.3}/>;

export const phrases: Phrase[] = T.phrases;
export const dur = T.dur;
export const scenes: Scene[] = [
  {a: 0, theme: 'light', Panel: A0}, {a: 3.55, theme: 'light', Panel: B0}, {a: 9.2, theme: 'dark', Panel: C0},
  {a: 10.6, theme: 'light', Panel: D0}, {a: 14.05, theme: 'light', Panel: E0}, {a: 17.8, theme: 'light', Panel: F0},
  {a: 22.1, theme: 'dark', Panel: G0},
  {a: 26.95, theme: 'light', Panel: () => <CtaPanel k="SEO" tType={27.2} tCard={28.83} t30={29.5} line="Votre premier échange" label="Premier échange" chip="Réservé" ok/>},
];
