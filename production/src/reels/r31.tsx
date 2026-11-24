import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Type, Cubes, CtaPanel, Logo, useT, useTh, OR, GR, RED, P, io, oc, L, Scene, Phrase} from '../lib';
import {BrowserBar} from './r29';
import T from '../../spec/r31_t.json';

// maquette d'un beau site (vue humaine)
const Pretty: React.FC<{p?: number}> = ({p = 1}) => { const th = useTh();
  return <div style={{position: 'absolute', left: 0, top: 78, width: 940, height: 600, overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: 0, top: 0, width: 940, height: 300, background: 'linear-gradient(120deg,#FF4F1F 0%,#FF9A5A 55%,#FFD3A8 100%)', opacity: p}}/>
    <Tx s={54} w={800} c="#fff" style={{position: 'absolute', left: 44, top: 60, width: 600, lineHeight: 1.05, opacity: p}}>Maintenance industrielle à Lyon</Tx>
    <Box x={44} y={210} style={{opacity: p}}><div style={{background: '#141412', color: '#fff', fontSize: 28, fontWeight: 700, padding: '14px 28px', borderRadius: 30}}>Demander un devis</div></Box>
    {['Services', 'Références', 'Zone d\'intervention'].map((x, i) => <Box key={i} x={30 + i * 300} y={330} w={280} h={230} style={{borderRadius: 22, background: th.soft, padding: 22, opacity: p}}>
      <Dot s={64} c={OR} n={['building', 'star', 'pin'][i]}/><Tx s={30} w={800} style={{marginTop: 18}}>{x}</Tx><div style={{height: 12, width: '80%', borderRadius: 6, background: th.line, marginTop: 14}}/></Box>)}
  </div>;
};

// A — beau site / page blanche
const A0: React.FC = () => { const t = useT(); const th = useTh(); const w = io(P(t, 1.19, 1.7));
  return <><Card x={0} y={20} w={940} h={680} style={{overflow: 'hidden'}}><BrowserBar url="votre-entreprise.fr"/><Pretty/>
      <div style={{position: 'absolute', left: 0, top: 78, width: 940 * w, height: 602, background: th.card, borderRight: w > 0 && w < 1 ? `6px solid ${OR}` : 'none', overflow: 'hidden'}}>
        <Tx s={30} w={500} c={th.mut} style={{position: 'absolute', left: 44, top: 270, fontFamily: 'monospace', whiteSpace: 'nowrap'}}>{'<div id="root"></div>'}</Tx></div></Card>
    <A at={0.2} kind="pop"><Box x={30} y={-30}><Chip fill c={GR} s={34}><Ic n="eye" s={36} c="#fff"/>Vous</Chip></Box></A>
    <A at={1.25} kind="pop"><Box x={640} y={-30}><Chip fill c={RED} s={34}><Ic n="bot" s={36} c="#fff"/>ChatGPT</Chip></Box></A></>; };

// B — le site se construit avec du code dans le navigateur
const B0: React.FC = () => { const t = useT(); const th = useTh(); const blocks = [0, 1, 2, 3, 4];
  return <><A at={0.1} kind="left"><Card x={0} y={0} w={330} h={420}><Label style={{position: 'absolute', left: 30, top: 30}}>app.js</Label>
      {[...Array(8)].map((_, i) => <div key={i} style={{position: 'absolute', left: 30 + (i % 3) * 20, top: 90 + i * 38, height: 14, width: 180 + ((i * 53) % 80), borderRadius: 7, background: i % 3 === 0 ? OR : th.line, opacity: t > 0.2 + i * 0.1 ? 1 : 0.2}}/>)}
      <Box x={110} y={340}><div style={{transform: `rotate(${t * 220}deg)`}}><Ic n="star" s={60} c={OR}/></div></Box></Card></A>
    <Card x={380} y={0} w={560} h={760}><BrowserBar url="votre-site.fr" w={560}/>
      {blocks.map((i) => { const p = oc(P(t, 0.6 + i * 0.35, 1.0 + i * 0.35));
        return <div key={i} style={{position: 'absolute', left: 30, top: 100 + i * 128, width: 500, height: 108, borderRadius: 18, background: i === 0 ? OR : th.soft, opacity: p, transform: `translateX(${(1 - p) * -420}px)`}}/>; })}</Card>
    {blocks.map((i) => <Cubes key={i} at={0.95 + i * 0.35} x={420} y={150 + i * 128} seed={100 + i} n={6} spread={100}/>)}</>; };

// C — vous, vous voyez tout
const C0: React.FC = () => { const t = useT(); const th = useTh();
  return <><Card x={0} y={40} w={940} h={680} style={{overflow: 'hidden'}}><BrowserBar url="votre-entreprise.fr"/><Pretty/></Card>
    <A at={0.05} kind="pop"><Box x={370} y={-40}><Dot s={190} c={GR} n="eye"/></Box></A>
    {[0, 1, 2].map((i) => <A key={i} at={0.25 + i * 0.12} kind="pop"><Box x={200 + i * 300} y={430}><Dot s={66} c={GR} n="check"/></Box></A>)}</>; };

// D — le robot lit la page brute : presque rien
const D0: React.FC = () => { const t = useT(); const th = useTh();
  const code = ['<!DOCTYPE html>', '<html>', '  <head><title>…</title></head>', '  <body>', '    <div id="root"></div>', '    <script src="app.js"></script>', '  </body>', '</html>'];
  return <><A at={0.05} kind="pop"><Box x={0} y={0} w={940} style={{display: 'flex', justifyContent: 'center', gap: 20, alignItems: 'center'}}><Dot s={110} c={OR} n="bot"/><Tx s={44} w={800}>Robot d'une IA</Tx></Box></A>
    <A at={0.2} kind="up"><Card x={0} y={150} w={940} h={520} style={{background: '#0E0E0C'}}><Label style={{position: 'absolute', left: 36, top: 30, color: '#9a9a92'}}>Page brute</Label>
      {code.map((c, i) => <Tx key={i} s={34} w={500} c={i === 4 ? OR : '#E8E6E1'} style={{position: 'absolute', left: 36, top: 90 + i * 50, fontFamily: 'monospace', whiteSpace: 'pre', opacity: t > 0.3 + i * 0.1 ? 1 : 0}}>{c}</Tx>)}
      <div style={{position: 'absolute', left: 30, top: 286, width: 520, height: 56, borderRadius: 10, border: `3px solid ${OR}`, opacity: t > 1.4 ? 1 : 0}}/></Card></A>
    <A at={2.03} kind="pop"><Box x={0} y={710} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill c={RED} s={42}>Presque rien</Chip></Box></A></>; };

// E — pas vos services, pas vos références, pas votre ville
const E0: React.FC = () => { const t = useT(); const th = useTh();
  const it: [string, string, number][] = [['building', 'Vos services', 0.13], ['star', 'Vos références', 0.66], ['pin', 'Votre ville', 1.3]];
  return <>{it.map(([ic, s, a], i) => { const off = t >= a;
      return <A key={i} at={0.05 + i * 0.08} kind="left"><Card x={0} y={20 + i * 250} w={940} h={210} style={{opacity: off ? 0.55 : 1}}>
        <Dot s={110} c={off ? th.mut : OR} n={ic} style={{position: 'absolute', left: 40, top: 50}}/>
        <Tx s={56} w={800} style={{position: 'absolute', left: 190, top: 68, textDecoration: off ? 'line-through' : 'none', textDecorationColor: RED, textDecorationThickness: 7}}>{s}</Tx>
        {off ? <Box x={800} y={55}><Dot s={100} c={RED} n="x"/></Box> : null}</Card></A>; })}</>; };

// F — un acheteur demande à l'IA : vous n'existez pas
const F0: React.FC = () => { const t = useT(); const th = useTh(); const names = ['Concurrent A', 'Concurrent B', 'Concurrent C'];
  return <><A at={0.05} kind="up"><Card x={0} y={0} w={940} h={150} style={{borderRadius: 75}}><Dot s={96} c="#5B5BF0" n="user" style={{position: 'absolute', left: 26, top: 27}}/>
      <Tx s={36} w={700} style={{position: 'absolute', left: 146, top: 52}}><Type text="Quel prestataire de maintenance à Lyon ?" a={0.15} b={1.0}/></Tx></Card></A>
    <A at={1.1} kind="up"><Card x={0} y={200} w={940} h={420}><Dot s={80} c={OR} n="chat" style={{position: 'absolute', left: 30, top: 30}}/>
      <Label style={{position: 'absolute', left: 130, top: 52}}>Réponse de l'IA</Label>
      {names.map((n, i) => <A key={i} at={1.3 + i * 0.15} kind="left"><Box x={130} y={120 + i * 92} w={760} h={76} style={{borderRadius: 18, background: th.soft, display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px'}}><Dot s={46} c={th.ink} ic={th.card}>{i + 1}</Dot><Tx s={34} w={700}>{n}</Tx></Box></A>)}</Card></A>
    <A at={2.02} kind="pop"><Box x={0} y={670} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill c={RED} s={44}><Ic n="x" s={44} c="#fff"/>Vous n'existez pas</Chip></Box></A></>; };

// G — le test : clic droit, code source, rechercher son métier
const G0: React.FC = () => { const t = useT(); const th = useTh(); const menu = t > 0.35 && t < 2.3; const src = t >= 2.3;
  const items = ['Retour', 'Actualiser', 'Enregistrer sous…', 'Afficher le code source', 'Inspecter'];
  return <><Card x={0} y={0} w={940} h={700} style={{overflow: 'hidden'}}><BrowserBar url={src ? 'view-source:votre-entreprise.fr' : 'votre-entreprise.fr'}/>
      {!src ? <Pretty p={0.5}/> : <>{['<html>', '  <body>', '    <div id="root"></div>', '    <script src="app.js"></script>', '  </body>', '</html>'].map((c, i) => <Tx key={i} s={32} w={500} c={th.mut} style={{position: 'absolute', left: 36, top: 200 + i * 52, fontFamily: 'monospace', whiteSpace: 'pre'}}>{c}</Tx>)}</>}
      {menu ? <Box x={360} y={170} w={440} h={330} style={{borderRadius: 20, background: th.card, boxShadow: '0 20px 60px rgba(0,0,0,.25)', padding: '14px 0', border: `2px solid ${th.line}`}}>
        {items.map((x, i) => { const hl = i === 3 && t > 1.75; return <div key={i} style={{height: 58, display: 'flex', alignItems: 'center', padding: '0 26px', background: hl ? OR : 'transparent'}}><Tx s={28} w={hl ? 800 : 500} c={hl ? '#fff' : th.ink}>{x}</Tx></div>; })}</Box> : null}
      {src ? <Box x={430} y={96} w={480} h={80} style={{borderRadius: 16, background: th.card, boxShadow: th.sh, border: `3px solid ${t > 4.26 ? RED : th.line}`, display: 'flex', alignItems: 'center', gap: 14, padding: '0 20px'}}>
        <Ic n="search" s={36} c={th.mut}/><Tx s={30} w={700}><Type text="maintenance" a={2.9} b={3.5}/></Tx><div style={{flex: 1}}/>{t > 4.26 ? <Tx s={28} w={800} c={RED}>0 / 0</Tx> : null}</Box> : null}
    </Card>
    <A at={0.35} kind="pop"><Box x={110} y={720}><Chip s={34} c={OR}>Clic droit</Chip></Box></A>
    <A at={4.26} kind="pop"><Box x={420} y={720}><Chip fill c={RED} s={38}>Introuvable</Chip></Box></A>
    {!src ? <div style={{position: 'absolute', left: L(200, 380, io(P(t, 0, 0.3))), top: L(500, 190, io(P(t, 0, 0.3))), opacity: t < 2.3 ? 1 : 0}}><Ic n="hand" s={80} c={th.ink}/></div> : null}</>; };

// H — lisible par les humains et par les robots
const H0: React.FC = () => { const t = useT(); const th = useTh();
  return <><A at={0.08} kind="pop"><Box x={0} y={0} w={940} style={{display: 'flex', justifyContent: 'center'}}><Logo s={76}/></Box></A>
    {[['eye', 'Les humains', 0.4], ['bot', 'Les robots', 2.76]].map(([ic, s, a], k) => <A key={k} at={a as number} kind="up"><Card x={k * 490} y={150} w={450} h={520} hl={t > (a as number) + 0.3}>
      <Box x={0} y={50} w={450} style={{display: 'flex', justifyContent: 'center'}}><Dot s={150} c={OR} n={ic as string}/></Box>
      <Tx s={42} w={800} style={{position: 'absolute', left: 0, right: 0, top: 240, textAlign: 'center'}}>{s as string}</Tx>
      {['Services', 'Références', 'Ville'].map((x, i) => <Box key={i} x={60} y={318 + i * 62} w={330} style={{display: 'flex', alignItems: 'center', gap: 14}}><Dot s={42} c={GR} n="check"/><Tx s={30} w={600}>{x}</Tx></Box>)}</Card></A>)}
    <Cubes at={2.9} x={715} y={420} seed={120} n={14} spread={260}/></>; };

export const phrases: Phrase[] = T.phrases;
export const dur = T.dur;
export const scenes: Scene[] = [
  {a: 0, theme: 'light', Panel: A0}, {a: 2.6, theme: 'dark', Panel: B0}, {a: 5.55, theme: 'light', Panel: C0}, {a: 6.5, theme: 'dark', Panel: D0},
  {a: 9.9, theme: 'light', Panel: E0}, {a: 11.85, theme: 'dark', Panel: F0}, {a: 15.1, theme: 'light', Panel: G0}, {a: 20.95, theme: 'dark', Panel: H0},
  {a: 24.6, theme: 'light', Panel: () => <CtaPanel k="SEO" tType={25.44} tCard={26.77} t30={27.86} line="Votre premier échange" label="Premier échange" chip="Réservé" ok/>},
];
