import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Count, Cubes, CtaPanel, Logo, useT, useTh, OR, GR, RED, P, io, oc, L, Scene, Phrase} from '../lib';
import {BrowserBar} from './r29';
import T from '../../spec/r33_t.json';

// A — l'offre d'emploi impossible
const A0: React.FC = () => { const t = useT(); const th = useTh();
  const rows: [string, string, number, boolean][] = [['building', 'Poste : commercial', 0.3, false], ['cal', '365 jours par an', 2.2, false], ['x', 'Aucun congé', 3.9, true], ['euro', 'Aucune note de frais', 4.7, true]];
  return <Card x={0} y={0} w={940} h={720}><Label style={{position: 'absolute', left: 36, top: 36}}>Offre d'emploi · CDI</Label>
    <Tx s={56} w={800} style={{position: 'absolute', left: 36, top: 90}}>On recrute !</Tx>
    {rows.map(([ic, s, a, ok], i) => <A key={i} at={a} kind="left"><Box x={28} y={200 + i * 120} w={884} h={100} style={{borderRadius: 22, background: th.soft, display: 'flex', alignItems: 'center', gap: 22, padding: '0 24px'}}>
      <Dot s={64} c={ok ? GR : OR} n={ok ? 'check' : ic}/><Tx s={40} w={700}>{s}</Tx></Box></A>)}</Card>; };

// B — recruté : c'est une page de votre site
const B0: React.FC = () => { const t = useT(); const th = useTh(); const flip = io(P(t, 0.8, 1.3));
  return <><div style={{position: 'absolute', left: 0, top: 0, width: 940, height: 640, transform: `perspective(1600px) rotateY(${flip * 180}deg)`, transformStyle: 'preserve-3d'}}>
      <Card x={0} y={0} w={940} h={640} style={{backfaceVisibility: 'hidden'}}><Label style={{position: 'absolute', left: 36, top: 36}}>Offre d'emploi · CDI</Label>
        <Box x={180} y={220}><div style={{transform: `rotate(-8deg) scale(${L(1.6, 1, oc(P(t, 0.1, 0.35)))})`, opacity: t > 0.1 ? 1 : 0, border: `8px solid ${GR}`, color: GR, fontSize: 96, fontWeight: 800, padding: '10px 40px', borderRadius: 22}}>RECRUTÉ</div></Box></Card>
      <Card x={0} y={0} w={940} h={640} style={{backfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}><BrowserBar url="google.fr"/>
        <Box x={28} y={110} w={884} h={170} style={{borderRadius: 22, background: 'rgba(255,79,31,.10)', border: `3px solid ${OR}`, padding: '18px 26px'}}>
          <Tx s={26} w={500} c={GR}>votre-entreprise.fr</Tx><Tx s={44} w={700} c="#8AB4F8" style={{marginTop: 6}}>Maintenance industrielle à Lyon</Tx></Box>
        {[0, 1].map((i) => <Box key={i} x={28} y={310 + i * 150} w={884} h={130} style={{borderRadius: 22, background: th.soft, opacity: 0.6}}/>)}
        <Box x={700} y={90}><Chip fill s={30}>N° 1</Chip></Box></Card></div></>; };

// C — l'équipe dort, la page répond
const C0: React.FC = () => { const t = useT(); const th = useTh();
  return <><Card x={0} y={0} w={940} h={360} style={{background: '#1B1F3A'}}>
      <div style={{position: 'absolute', left: 60, top: 60, width: 120, height: 120, borderRadius: 60, background: '#F5E6B8', boxShadow: '0 0 60px rgba(245,230,184,.6)'}}/>
      <div style={{position: 'absolute', left: 95, top: 45, width: 120, height: 120, borderRadius: 60, background: '#1B1F3A'}}/>
      {[0, 1, 2].map((i) => <Box key={i} x={330 + i * 190} y={130}><Dot s={120} c="#3A3F63" n="user" ic="#8A8FB8"/><Tx s={44} w={800} c="#8A8FB8" style={{position: 'absolute', left: 90, top: -40, transform: `translateY(${-((t * 0.8 + i * 0.3) % 1) * 30}px)`, opacity: 1 - ((t * 0.8 + i * 0.3) % 1)}}>z</Tx></Box>)}
      <Tx s={34} w={700} c="#C9CCE5" style={{position: 'absolute', left: 60, top: 280}}>Votre équipe · 23 h 47</Tx></Card>
    <A at={1.41} kind="up"><Card x={0} y={420} w={940} h={280} hl>
      <Dot s={110} c={OR} n="doc" style={{position: 'absolute', left: 36, top: 85}}/>
      <Label style={{position: 'absolute', left: 180, top: 60}}>Nouvelle demande de devis</Label>
      <Tx s={40} w={700} style={{position: 'absolute', left: 180, top: 110, width: 700}}>« Besoin d'un prestataire pour nos lignes de production »</Tx></Card></A>
    <Cubes at={1.5} x={800} y={500} seed={170} n={12} spread={220}/></>; };

// D — une page par service, par zone : l'organigramme se remplit
const D0: React.FC = () => { const t = useT(); const th = useTh();
  const nodes: [string, number, number, number][] = [['Service A', 0.17, 0, 0], ['Service B', 0.4, 1, 0], ['Service C', 0.63, 2, 0], ['Lyon', 1.56, 0, 1], ['Grenoble', 1.75, 1, 1], ['Annecy', 1.94, 2, 1]];
  const n = nodes.filter((x) => t >= x[1]).length;
  return <><Box x={320} y={0} w={300} h={110} style={{borderRadius: 24, background: th.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14}}><Ic n="building" s={44} c={th.card}/><Tx s={36} w={800} c={th.card}>Votre site</Tx></Box>
    <div style={{position: 'absolute', left: 469, top: 110, width: 4, height: 50, background: th.mut}}/><div style={{position: 'absolute', left: 150, top: 160, width: 640, height: 4, background: th.mut}}/>
    {nodes.map(([s, a, c, r], i) => <A key={i} at={a} kind="pop"><Box x={40 + c * 310} y={200 + r * 200} w={280} h={160} style={{borderRadius: 22, background: th.card, boxShadow: th.sh, border: `3px solid ${r ? GR : OR}`, padding: 18}}>
      <Dot s={56} c={r ? GR : OR} n={r ? 'pin' : 'user'}/><Tx s={32} w={800} style={{marginTop: 10}}>{s}</Tx><Tx s={22} w={600} c={th.mut}>1 page = 1 commercial</Tx></Box></A>)}
    <A at={2.48} kind="pop"><Box x={0} y={640} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill s={46}><Ic n="user" s={46} c="#fff"/>{n} commerciaux</Chip></Box></A>
    {nodes.map(([, a, c, r], i) => <Cubes key={i} at={a} x={180 + c * 310} y={280 + r * 200} seed={180 + i} n={6} spread={110}/>)}</>; };

// E — concrètement : une page par service et par zone, placée sur Google, qui ramène des devis
const E0: React.FC = () => { const t = useT(); const th = useTh();
  const pages: [string, number][] = [['Maintenance industrielle · Lyon', 0.9], ['Maintenance industrielle · Grenoble', 1.6], ['Installation de lignes · Lyon', 2.3]];
  const devis = pages.filter(([, a]) => t > a + 2.4).length;
  return <><A at={0.08} kind="fade"><Box x={0} y={0} w={940} style={{display: 'flex', justifyContent: 'center'}}><Logo s={70}/></Box></A>
    <Card x={0} y={120} w={940} h={470}><BrowserBar url="google.fr"/>
      {pages.map(([s, a], i) => <A key={i} at={a} kind="fade"><Box x={28} y={100 + i * 120} w={884} h={104} style={{borderRadius: 20, background: th.soft, padding: '14px 24px'}}>
        <Tx s={22} w={500} c={GR}>votre-entreprise.fr</Tx><Tx s={34} w={700} c={th.ink} style={{marginTop: 4}}>{s}</Tx>
        {t > a + 2.4 ? <Box x={680} y={28}><Chip fill c={GR} s={26}>+ devis</Chip></Box> : null}</Box></A>)}</Card>
    <A at={3.3} kind="fade"><Box x={0} y={630} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill s={42}><Ic n="doc" s={42} c="#fff"/>{devis} demande{devis > 1 ? 's' : ''} de devis</Chip></Box></A></>; };

export const phrases: Phrase[] = T.phrases;
export const dur = T.dur;
export const scenes: Scene[] = [
  {a: 0, theme: 'light', Panel: A0}, {a: 5.65, theme: 'dark', Panel: B0}, {a: 8.9, theme: 'light', Panel: C0}, {a: 12.75, theme: 'dark', Panel: D0},
  {a: 16.85, theme: 'dark', Panel: E0},
  {a: 23.35, theme: 'light', Panel: () => <CtaPanel k="SEO" tType={24.19} tCard={25.52} t30={26.61} line="Votre premier échange" label="Premier échange" chip="Réservé" ok/>},
];
