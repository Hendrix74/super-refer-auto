import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Row, Cubes, LogoPanel, CtaPanel, useT, useTh, OR, GR, RED, P, io, oc, L, rnd, Scene, Phrase} from '../lib';

const A3: React.FC = () => { const t = useT(); const th = useTh(); const go = io(P(t, 1.0, 1.7));
  return <><Card x={0} y={0} w={940} h={446}>
      <Label style={{position: 'absolute', left: 36, top: 36}}>Équipe commerciale</Label>
      <div style={{position: 'absolute', inset: 0, transform: `translateX(${go * 1000}px) rotate(${go * 6}deg)`, opacity: 1 - go * 0.7}}>
        <Row y={90} icon={<Dot s={68} c={OR}>A</Dot>} title="Votre meilleur commercial" sub="Portefeuille n° 1" hl right={t > 0.75 ? <Chip fill c={RED} s={26}>Départ</Chip> : <Ic n="star" s={44} c={OR}/>}/></div>
      <Row y={204} icon={<Dot s={68} c={th.mut}>B</Dot>} title="Commercial 2" sub="Portefeuille n° 2"/>
      <Row y={318} icon={<Dot s={68} c={th.mut}>C</Dot>} title="Commercial 3" sub="Portefeuille n° 3"/></Card>
    <A at={2.1} kind="up"><Card x={0} y={480} w={940} h={250} hl>
      <Label style={{position: 'absolute', left: 36, top: 36}}>Demandes entrantes · demain</Label>
      <Tx s={150} w={800} c={OR} style={{position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center', transform: `scale(${1 + 0.1 * Math.sin(t * 7)})`}}>?</Tx></Card></A></>; };
const B3: React.FC = () => { const t = useT(); const th = useTh();
  return <Card x={0} y={0} w={940} h={720}>
    <Label style={{position: 'absolute', left: 36, top: 36}}>Carnet d'adresses</Label>
    {[...Array(15)].map((_, i) => { const p = io(P(t, 0.35 + i * 0.05, 1.0 + i * 0.05)); const c = i % 3, r = Math.floor(i / 3);
      return <Box key={i} x={32 + c * 296 + p * 1100} y={92 + r * 86} w={284} h={72} style={{borderRadius: 18, background: th.soft, display: 'flex', alignItems: 'center', gap: 14, padding: '0 16px', opacity: 1 - p * 0.6, transform: `rotate(${p * (i % 2 ? 8 : -8)}deg)`}}>
        <Dot s={46} c={['#5B5BF0', '#F0A020', '#12A8A0', OR][i % 4]} n="user"/><div style={{height: 14, width: 120 + rnd(i) * 60, borderRadius: 7, background: th.line}}/></Box>; })}
    <Label style={{position: 'absolute', left: 36, top: 548}}>Relations de confiance</Label>
    {[0, 1, 2].map((i) => { const p = io(P(t, 1.95 + i * 0.1, 2.55 + i * 0.1));
      return <Box key={i} x={32 + i * 296 + p * 1100} y={598} w={284} h={88} style={{borderRadius: 22, border: `3px solid ${OR}`, background: 'rgba(255,79,31,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, opacity: 1 - p * 0.6}}>
        <Ic n="hand" s={44} c={OR}/><Tx s={32} w={700} c={OR}>Client fidèle</Tx></Box>; })}
    <A at={1.5} kind="fade"><Tx s={40} w={700} c={th.mut} style={{position: 'absolute', left: 0, right: 0, top: 270, textAlign: 'center'}}>0 contact</Tx></A>
  </Card>; };
const Bars: React.FC<{site?: number; shake?: number; grow: number}> = ({site, shake = 0, grow}) => { const th = useTh(); const hs = [400, 300, 230]; const base = 600;
  return <>{hs.map((h, i) => { const hh = h * grow; const x = (site === undefined ? 110 : 60) + i * (site === undefined ? 250 : 190);
    return <React.Fragment key={i}><Box x={x + shake * (i % 2 ? 1 : -1)} y={base - hh} w={site === undefined ? 180 : 140} h={hh} style={{borderRadius: '18px 18px 0 0', background: th.ink, opacity: site === undefined ? 0.85 : 0.35}}/>
      <Tx s={28} w={700} c={th.mut} style={{position: 'absolute', left: x - 30, width: (site === undefined ? 180 : 140) + 60, top: base + 16, textAlign: 'center'}}>Commercial {i + 1}</Tx></React.Fragment>; })}
    {site !== undefined ? <><Box x={650} y={base - 430 * site} w={200} h={430 * site} style={{borderRadius: '18px 18px 0 0', background: OR, boxShadow: '0 0 40px rgba(255,79,31,.45)'}}/>
      <Tx s={30} w={800} c={OR} style={{position: 'absolute', left: 600, width: 300, top: base + 14, textAlign: 'center'}}>Votre site</Tx></> : null}
    <Box x={30} y={base} w={880} h={5} style={{background: th.line}}/></>; };
const C3: React.FC = () => { const t = useT();
  return <><Card x={0} y={0} w={940} h={720}><Label style={{position: 'absolute', left: 36, top: 36}}>Chiffre d'affaires · par personne</Label>
      <Bars grow={oc(P(t, 0.4, 1.8))} shake={t > 5.25 ? Math.sin(t * 46) * Math.max(0, 1 - (t - 5.25) / 0.7) * 12 : 0}/>
      <A at={3.95} kind="pop"><Box x={560} y={96}><Chip fill c={GR} s={40}>Une force</Chip></Box></A>
      <A at={5.25} kind="pop"><Box x={590} y={196}><Chip fill c={RED} s={40}>Un risque</Chip></Box></A></Card></>; };
const D3: React.FC = () => { const t = useT(); const th = useTh(); const g = io(P(t, 0.4, 3.8));
  return <><Card x={0} y={0} w={940} h={660} hl={g >= 1}><Label style={{position: 'absolute', left: 36, top: 36}}>Demandes · par source</Label>
      <Bars grow={1} site={g}/></Card>
    <Cubes at={3.8} x={750} y={160} seed={41} n={16}/>
    <A at={4.45} kind="pop"><Box x={0} y={690}><Chip s={30} c={th.mut}><Ic n="cal" s={34}/>Pas de congés</Chip></Box></A>
    <A at={5.7} kind="pop"><Box x={330} y={690}><Chip fill s={30}><Ic n="lock" s={34} c="#fff"/>Appartient à l'entreprise</Chip></Box></A>
    {[0, 1, 2].map((i) => <A key={i} at={4.6 + i * 0.3} kind="pop" out={6.6 + i * 0.1}><Box x={400 + (i % 2) * 40} y={70 + i * 58}><Chip fill c={GR} s={24}>+1 demande</Chip></Box></A>)}</>; };
const E3: React.FC = () => { const t = useT(); const th = useTh();
  return <><Label style={{position: 'absolute', left: 0, right: 0, top: 10, textAlign: 'center'}}>Le site alimente vos commerciaux</Label>
    <A at={0.15} kind="left"><Card x={0} y={230} w={300} h={300} hl><Dot sq s={130} c={OR} n="search" style={{position: 'absolute', left: 85, top: 50}}/><Tx s={40} w={800} style={{position: 'absolute', left: 0, right: 0, top: 208, textAlign: 'center'}}>Votre site</Tx></Card></A>
    {[0, 1, 2].map((i) => <A key={i} at={0.35 + i * 0.12} kind="right"><Box x={770} y={110 + i * 220}><Dot s={150} c={th.soft} ic={th.ink} n="user"/></Box><Box x={880} y={100 + i * 220}><Dot s={56} c={GR} n="check"/></Box></A>)}
    {[...Array(6)].map((_, k) => { const i = k % 3; const t0 = 1.95 + k * 0.42; const p = P(t, t0, t0 + 0.95); if (p <= 0 || p >= 1) return null; const e = io(p);
      return <Box key={k} x={L(310, 600, e)} y={L(330, 130 + i * 220, e)} w={170} h={92} style={{borderRadius: 20, background: th.card, border: `3px solid ${OR}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: Math.min(1, p * 5) * Math.min(1, (1 - p) * 5), boxShadow: th.sh}}><Ic n="hand" s={40} c={OR}/><Tx s={26} w={700}>Prospect</Tx></Box>; })}</>; };

export const scenes: Scene[] = [
  {a: 0, theme: 'dark', Panel: A3}, {a: 3.55, theme: 'light', Panel: B3}, {a: 6.45, theme: 'dark', Panel: C3}, {a: 12.7, theme: 'light', Panel: D3}, {a: 20.15, theme: 'dark', Panel: E3},
  {a: 24.7, theme: 'light', Panel: () => <LogoPanel sub="On pilote votre référencement" at={0.35} subAt={1.1}/>},
  {a: 27.9, theme: 'dark', Panel: () => <CtaPanel k="DEMANDES" tType={28.3} tCard={29.5} t30={31.2} line="D'où viennent les vôtres ?"/>},
];
export const phrases: Phrase[] = [
  {a: 0.3, b: 1.9, text: 'Si votre meilleur|commercial|*part demain,*'},
  {a: 2.3, b: 3.2, text: "d'où viennent|*vos demandes ?*"},
  {a: 3.9, b: 5.1, text: "Son carnet d'adresses|*part avec lui.*"},
  {a: 5.5, b: 6.1, text: 'Ses relations|*aussi.*'},
  {a: 6.8, b: 9.9, text: 'Dans beaucoup de PME,|le chiffre repose sur|*deux ou trois personnes.*'},
  {a: 10.4, b: 10.9, text: "C'est|*une force.*"},
  {a: 11.7, b: 12.2, text: 'Et|*un risque.*'},
  {a: 13.1, b: 16.7, text: 'Un site bien référencé :|une source de demandes|*qui ne démissionne pas.*'},
  {a: 17.2, b: 18.0, text: 'Qui ne prend|*pas de congés.*'},
  {a: 18.4, b: 19.8, text: "Et qui appartient|*à l'entreprise.*"},
  {a: 20.5, b: 21.5, text: 'Il ne remplace pas|vos commerciaux.'},
  {a: 22.1, b: 24.3, text: 'Il leur apporte|des prospects qui ont déjà|*levé la main.*'},
  {a: 25.1, b: 27.5, text: 'On pilote|*votre référencement.*'},
  {a: 28.3, b: 29.2, text: 'Commentez|*« DEMANDES »*'},
  {a: 29.5, b: 30.4, text: "On regarde d'où|viennent *les vôtres.*"},
  {a: 31.2, b: 32.2, text: '*30 minutes,*|au téléphone.'},
];
export const dur = 33.4;
