import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Count, Cubes, CtaPanel, Logo, Bar, useT, useTh, OR, GR, RED, P, io, oc, L, rnd, Scene, Phrase} from '../lib';
import T from '../../spec/r32_t.json';

// A — tableau de bord pub : interrupteur coupé, demandes à zéro
const A0: React.FC = () => { const t = useT(); const th = useTh(); const off = io(P(t, 0.7, 1.0));
  const pts = [...Array(12)].map((_, i) => { const before = 0.55 + 0.25 * Math.sin(i * 1.3); const cut = i >= 7; const v = cut ? before * (1 - io(P(t, 1.2 + (i - 7) * 0.12, 1.5 + (i - 7) * 0.12))) : before; return [40 + i * 72, 400 - v * 260]; });
  return <><Card x={0} y={0} w={940} h={560}><Label style={{position: 'absolute', left: 36, top: 36}}>Campagne publicitaire</Label>
      <Box x={690} y={24} w={210} h={84} style={{borderRadius: 42, background: off > 0.5 ? th.soft : GR, transition: 'none'}}>
        <div style={{position: 'absolute', left: L(132, 12, off), top: 10, width: 64, height: 64, borderRadius: 32, background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,.2)'}}/>
        <Tx s={26} w={800} c={off > 0.5 ? th.mut : '#fff'} style={{position: 'absolute', left: off > 0.5 ? 92 : 26, top: 26}}>{off > 0.5 ? 'OFF' : 'ON'}</Tx></Box>
      <svg width={940} height={520} style={{position: 'absolute', left: 0, top: 40}}><polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={OR} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round"/>
        {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={10} fill={i >= 7 && t > 1.3 ? RED : OR}/>)}</svg>
      <Tx s={26} w={600} c={th.mut} style={{position: 'absolute', left: 36, top: 500}}>Demandes de devis / semaine</Tx></Card>
    <A at={3.39} kind="pop"><Box x={0} y={610} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill c={RED} s={50}>Lundi : 0 devis</Chip></Box></A></>; };

// B — la pub est un robinet
const B0: React.FC = () => { const t = useT(); const th = useTh(); const flow = t > 0.9 && t < 1.8; const shut = io(P(t, 1.75, 2.0));
  return <><svg width={940} height={760} style={{position: 'absolute', left: 0, top: 0}}>
      <rect x={120} y={120} width={360} height={70} rx={20} fill={th.mut}/><rect x={420} y={120} width={90} height={190} rx={22} fill={th.mut}/>
      <g transform={`rotate(${L(0, 90, shut)} 300 100)`}><rect x={210} y={84} width={180} height={34} rx={17} fill={OR}/><circle cx={300} cy={100} r={26} fill={OR}/></g>
      <rect x={300} y={600} width={300} height={140} rx={24} fill="none" stroke={th.mut} strokeWidth={8}/>
      {flow ? [...Array(10)].map((_, i) => { const ph = ((t * 1.6 + i / 10) % 1); return <circle key={i} cx={465 + Math.sin(i * 3) * 10} cy={320 + ph * 300} r={22} fill={OR} stroke="#fff" strokeWidth={4} opacity={ph < 0.95 ? 1 : 0}/>; }) : null}
      {[...Array(Math.min(8, Math.floor(P(t, 1.0, 1.8) * 8)))].map((_, i) => <circle key={i} cx={350 + i * 30} cy={700 - (i % 2) * 22} r={20} fill={OR} opacity={L(1, 0.25, P(t, 2.4, 2.8))}/>)}
    </svg>
    <A at={1.0} kind="pop"><Box x={620} y={420}><Chip fill s={36}><Ic n="euro" s={38} c="#fff"/>Vous payez</Chip></Box></A>
    <A at={2.5} kind="pop"><Box x={600} y={560}><Chip fill c={RED} s={38}>Plus rien</Chip></Box></A></>; };

// C — le référencement est un puits
const C0: React.FC = () => { const t = useT(); const th = useTh(); const up = io(P(t, 0.3, 1.1));
  return <><svg width={940} height={760} style={{position: 'absolute', left: 0, top: 0}}>
      <path d="M250 300 L250 160 L690 160 L690 300" fill="none" stroke={th.ink} strokeWidth={14}/><path d="M220 160 L470 70 L720 160 Z" fill={OR}/>
      <line x1={470} y1={160} x2={470} y2={L(560, 330, up)} stroke={th.mut} strokeWidth={6}/>
      <rect x={300} y={300} width={340} height={420} rx={30} fill={th.soft} stroke={th.ink} strokeWidth={14}/>
      {[...Array(5)].map((_, i) => <rect key={i} x={300} y={340 + i * 76} width={340} height={8} fill={th.line}/>)}
    </svg>
    <div style={{position: 'absolute', left: 400, top: L(560, 330, up), width: 140, height: 90, borderRadius: '0 0 30px 30px', background: OR}}/>
    {['Demande de devis', 'Appel entrant', 'Demande de devis'].map((s, i) => <A key={i} at={0.9 + i * 0.12} kind="pop"><Box x={i % 2 ? 560 : 40} y={230 + i * 100}><Chip fill={i !== 1} c={i === 1 ? GR : OR} s={30}><Ic n={i === 1 ? 'phone' : 'doc'} s={32} c={i === 1 ? GR : '#fff'}/>{s}</Chip></Box></A>)}
    <Cubes at={1.0} x={470} y={330} seed={140} n={14} spread={300}/></>; };

// D — dimanche, août, 3 h du matin
const D0: React.FC = () => { const t = useT(); const th = useTh();
  const it: [string, string, string, number][] = [['cal', 'Dimanche', '14:20', 0.95], ['cal', 'Août', '10:05', 1.75], ['star', '3 h du matin', '03:12', 2.35]];
  return <>{it.map(([ic, k, h, a], i) => { const on = t >= a;
    return <A key={i} at={0.1 + i * 0.12} kind="left"><Card x={0} y={20 + i * 250} w={940} h={220} hl={on}>
      <Dot s={110} c={on ? OR : th.mut} n={ic} style={{position: 'absolute', left: 36, top: 55}}/>
      <Tx s={56} w={800} style={{position: 'absolute', left: 180, top: 40}}>{k}</Tx>
      <Tx s={30} w={600} c={th.mut} style={{position: 'absolute', left: 180, top: 120}}>{h}</Tx>
      {on ? <Box x={480} y={110}><Chip fill c={GR} s={30}><Ic n="doc" s={32} c="#fff"/>Nouvelle demande</Chip></Box> : null}</Card></A>; })}
    {it.map(([, , , a], i) => <Cubes key={i} at={a} x={700} y={150 + i * 250} seed={150 + i} n={8} spread={150}/>)}</>; };

// E — le coût par client baisse
const E0: React.FC = () => { const t = useT(); const th = useTh(); const p = io(P(t, 0.2, 1.4));
  const vals = [1, 0.82, 0.68, 0.56, 0.47, 0.4, 0.34, 0.3, 0.27, 0.24, 0.22, 0.2];
  return <Card x={0} y={0} w={940} h={700}><Label style={{position: 'absolute', left: 36, top: 36}}>Coût par client · avec le référencement</Label>
    {vals.map((v, i) => { const h = 460 * v * P(p * 12, i, i + 1); return <div key={i} style={{position: 'absolute', left: 50 + i * 72, top: 600 - h, width: 52, height: h, borderRadius: 12, background: i > 7 ? OR : th.ink, opacity: i > 7 ? 1 : 0.85}}/>; })}
    {['M1', 'M6', 'M12'].map((m, i) => <Tx key={i} s={26} w={700} c={th.mut} style={{position: 'absolute', left: [55, 415, 840][i], top: 620}}>{m}</Tx>)}
    <A at={1.3} kind="pop"><Box x={560} y={120}><Chip fill c={GR} s={36}><Ic n="up" s={38} c="#fff" style={{transform: 'scaleY(-1)'}}/>Ça baisse</Chip></Box></A></Card>; };

// F — Super Refer creuse le puits
const F0: React.FC = () => { const t = useT(); const th = useTh();
  return <><A at={0.08} kind="pop"><Box x={0} y={0} w={940} style={{display: 'flex', justifyContent: 'center'}}><Logo s={80}/></Box></A>
    <A at={0.4} kind="up"><Card x={0} y={160} w={940} h={520} hl={t > 4.0}>
      {[['Positionné sur Google', 0.8], ['Sur les recherches de vos clients', 2.0], ['Suivi chaque mois', 3.8]].map(([s, a], i) => <Box key={i} x={40} y={50 + i * 150} w={860} h={120} style={{borderRadius: 24, background: th.soft, display: 'flex', alignItems: 'center', gap: 24, padding: '0 28px'}}>
        <Dot s={70} c={t > (a as number) ? GR : th.mut} n="check"/><Tx s={40} w={800}>{s as string}</Tx></Box>)}</Card></A>
    <Cubes at={4.0} x={470} y={420} seed={160} n={16} spread={320}/></>; };

export const phrases: Phrase[] = T.phrases;
export const dur = T.dur;
export const scenes: Scene[] = [
  {a: 0, theme: 'light', Panel: A0}, {a: 3.85, theme: 'dark', Panel: B0}, {a: 6.85, theme: 'light', Panel: C0}, {a: 8.5, theme: 'dark', Panel: D0},
  {a: 11.7, theme: 'light', Panel: E0}, {a: 13.9, theme: 'dark', Panel: F0},
  {a: 18.8, theme: 'light', Panel: () => <CtaPanel k="SEO" tType={19.61} tCard={20.94} t30={22.03} line="Votre premier échange" label="Premier échange" chip="Réservé" ok/>},
];
