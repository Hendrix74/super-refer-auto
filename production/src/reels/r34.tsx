import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Count, Type, Cubes, CtaPanel, Logo, useT, useTh, OR, GR, RED, P, io, oc, L, Scene, Phrase} from '../lib';
import T from '../../spec/r34_t.json';

// A — calculatrice + ticket « panier moyen »
const A0: React.FC = () => { const t = useT(); const th = useTh(); const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '00', '='];
  const pressed = Math.floor(t * 5) % 12;
  return <><Card x={0} y={0} w={480} h={720} style={{background: th.ink}}>
      <Box x={30} y={30} w={420} h={130} style={{borderRadius: 20, background: '#2A2A26', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 26px'}}>
        <Tx s={64} w={800} c={OR}>{t > 1.3 ? <Count to={10000} a={1.3} b={2.4}/> : 0}</Tx></Box>
      {keys.map((k, i) => <Box key={i} x={30 + (i % 3) * 142} y={190 + Math.floor(i / 3) * 128} w={126} h={110} style={{borderRadius: 20, background: i === pressed ? OR : '#3A3A35', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: i === pressed ? 'scale(.94)' : undefined}}><Tx s={44} w={700} c="#fff">{k}</Tx></Box>)}</Card>
    <A at={1.3} kind="right"><Card x={520} y={120} w={420} h={460} style={{borderRadius: 14}}>
      <Label style={{position: 'absolute', left: 30, top: 30}}>Ticket · exemple</Label>
      {[0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', left: 30, top: 100 + i * 50, width: 360 - i * 60, height: 16, borderRadius: 8, background: th.line}}/>)}
      <div style={{position: 'absolute', left: 30, right: 30, top: 270, borderTop: `3px dashed ${th.line}`}}/>
      <Tx s={28} w={600} c={th.mut} style={{position: 'absolute', left: 30, top: 300}}>Panier moyen</Tx>
      <Tx s={64} w={800} c={OR} style={{position: 'absolute', left: 30, top: 344}}>10 000 €</Tx></Card></A></>; };

// B — 1 devis sur 5 signé
const B0: React.FC = () => { const t = useT(); const th = useTh();
  return <>{[...Array(5)].map((_, i) => { const signed = i === 2 && t > 1.4;
      return <A key={i} at={0.1 + i * 0.12} kind="up"><Card x={i * 190} y={120} w={170} h={300} hl={signed} style={{opacity: t > 1.4 && !signed ? 0.45 : 1}}>
        <Dot s={60} c={signed ? GR : th.mut} n="doc" style={{position: 'absolute', left: 55, top: 30}}/>
        <Tx s={26} w={700} style={{position: 'absolute', left: 0, right: 0, top: 110, textAlign: 'center'}}>Devis {i + 1}</Tx>
        {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 24, top: 170 + k * 30, width: 122 - k * 20, height: 12, borderRadius: 6, background: th.line}}/>)}</Card></A>; })}
    <A at={1.4} kind="pop" d={0.25}><Box x={330} y={170}><div style={{transform: `rotate(-12deg) scale(${L(1.8, 1, oc(P(t, 1.4, 1.65)))})`, border: `7px solid ${GR}`, color: GR, fontSize: 58, fontWeight: 800, padding: '4px 22px', borderRadius: 16, background: th.card}}>SIGNÉ</div></Box></A>
    <A at={1.6} kind="pop"><Box x={0} y={500} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill s={48}>1 sur 5</Chip></Box></A></>; };

// C — l'équation : +5 demandes = +10 000 €
const C0: React.FC = () => { const t = useT(); const th = useTh(); const pulse = 1 + 0.18 * Math.sin(P(t, 3.65, 4.0) * Math.PI);
  return <><A at={0.2} kind="left"><Card x={0} y={40} w={420} h={300}><Label style={{position: 'absolute', left: 30, top: 30}}>Demandes en plus</Label>
      <Tx s={160} w={800} c={OR} style={{position: 'absolute', left: 0, right: 0, top: 80, textAlign: 'center', transform: `scale(${pulse})`}}>+5</Tx></Card></A>
    <A at={1.9} kind="pop"><Tx s={130} w={800} style={{position: 'absolute', left: 430, top: 110, width: 80, textAlign: 'center'}}>=</Tx></A>
    <A at={2.16} kind="right"><Card x={520} y={40} w={420} h={300} hl><Label style={{position: 'absolute', left: 30, top: 30}}>Chiffre d'affaires</Label>
      <Tx s={88} w={800} c={GR} style={{position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center'}}>+<Count to={10000} a={2.2} b={3.0}/> €</Tx></Card></A>
    <A at={0.6} kind="up"><Card x={0} y={400} w={940} h={300}><Label style={{position: 'absolute', left: 30, top: 30}}>Le détail</Label>
      <Tx s={40} w={700} style={{position: 'absolute', left: 30, top: 90}}>5 demandes × 1 sur 5 = <span style={{color: OR}}>1 contrat</span></Tx>
      <Tx s={40} w={700} style={{position: 'absolute', left: 30, top: 170}}>1 contrat × 10 000 € = <span style={{color: GR}}>10 000 €</span></Tx></Card></A>
    <Cubes at={2.2} x={730} y={190} seed={200} n={14} spread={260}/></>; };

// D — chaque mois
const D0: React.FC = () => { const t = useT(); const th = useTh(); const m = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  return <Card x={0} y={0} w={940} h={740}><Label style={{position: 'absolute', left: 36, top: 36}}>Demandes venues de Google</Label>
    {m.map((x, i) => { const on = t > 0.4 + i * 0.13; return <Box key={i} x={36 + (i % 4) * 222} y={100 + Math.floor(i / 4) * 210} w={200} h={186} style={{borderRadius: 22, background: on ? 'rgba(255,79,31,.12)' : th.soft, border: `3px solid ${on ? OR : 'transparent'}`, textAlign: 'center', paddingTop: 22}}>
      <Tx s={30} w={700} c={on ? th.ink : th.mut}>{x}</Tx>{on ? <Tx s={56} w={800} c={OR} style={{marginTop: 18}}>+5</Tx> : null}</Box>; })}</Card>; };

// E — l'année suivante, sans repayer
const E0: React.FC = () => { const t = useT(); const th = useTh();
  const bars: [string, number, number, string][] = [['Année 1', 0.75, 0.9, 'Création des pages'], ['Année 2', 0.25, 1.0, 'Les pages continuent']];
  return <Card x={0} y={0} w={940} h={720}>
    {bars.map(([y, cost, gain, sub], i) => <React.Fragment key={i}><Tx s={44} w={800} style={{position: 'absolute', left: 40, top: 50 + i * 320}}>{y}</Tx>
      <Tx s={26} w={600} c={th.mut} style={{position: 'absolute', left: 40, top: 106 + i * 320}}>{sub}</Tx>
      <Tx s={24} w={700} c={th.mut} style={{position: 'absolute', left: 40, top: 160 + i * 320}}>Investissement</Tx>
      <div style={{position: 'absolute', left: 280, top: 160 + i * 320, height: 34, width: 600 * cost * io(P(t, 0.3 + i * 1.2, 1.0 + i * 1.2)), borderRadius: 17, background: th.ink}}/>
      <Tx s={24} w={700} c={th.mut} style={{position: 'absolute', left: 40, top: 220 + i * 320}}>Demandes</Tx>
      <div style={{position: 'absolute', left: 280, top: 220 + i * 320, height: 34, width: 600 * gain * io(P(t, 0.5 + i * 1.2, 1.2 + i * 1.2)), borderRadius: 17, background: OR}}/></React.Fragment>)}
    <A at={2.0} kind="pop"><Box x={560} y={380}><Chip fill c={GR} s={34}>Sans repayer</Chip></Box></A></Card>; };

// F — vos chiffres
const F0: React.FC = () => { const t = useT(); const th = useTh();
  return <><A at={0.08} kind="pop"><Box x={0} y={0} w={940} style={{display: 'flex', justifyContent: 'center'}}><Logo s={80}/></Box></A>
    {[['Votre panier moyen', '… €', 0.4], ['Votre taux de signature', '1 sur …', 0.8], ['Vos demandes actuelles', '… / mois', 1.2]].map(([k, v, a], i) => <A key={i} at={a as number} kind="left"><Card x={0} y={160 + i * 190} w={940} h={160} hl={i === 0 && t > 1.6}>
      <Label style={{position: 'absolute', left: 36, top: 30}}>{k as string}</Label>
      <Tx s={52} w={800} c={OR} style={{position: 'absolute', left: 36, top: 70}}><Type text={v as string} a={(a as number) + 0.2} b={(a as number) + 0.6} cursor={i === 2}/></Tx></Card></A>)}</>; };

export const phrases: Phrase[] = T.phrases;
export const dur = T.dur;
export const scenes: Scene[] = [
  {a: 0, theme: 'light', Panel: A0}, {a: 3.35, theme: 'dark', Panel: B0}, {a: 5.6, theme: 'light', Panel: C0}, {a: 9.75, theme: 'dark', Panel: D0},
  {a: 12.3, theme: 'light', Panel: E0}, {a: 15.35, theme: 'dark', Panel: F0},
  {a: 17.9, theme: 'light', Panel: () => <CtaPanel k="SEO" tType={18.74} tCard={20.07} t30={21.16} line="Votre premier échange" label="Premier échange" chip="Réservé" ok/>},
];
