import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Row, Cubes, LogoPanel, CtaPanel, useT, useTh, OR, GR, RED, P, io, oc, L, rnd, Scene, Phrase} from '../lib';

const A5: React.FC = () => { const t = useT(); const th = useTh(); const hl = t > 2.0;
  return <><Card x={0} y={0} w={940} h={640}>
      <Dot sq s={64} c={th.ink} ic={th.card} n="folder" style={{position: 'absolute', left: 32, top: 26}}/><Tx s={38} w={800} style={{position: 'absolute', left: 114, top: 38}}>Dossier de cession</Tx>
      {['Chiffre d\'affaires', 'Équipe', 'Portefeuille clients'].map((x, i) => <A key={i} at={0.25 + i * 0.25} kind="left"><Row y={120 + i * 118} icon={<Dot s={58} c={th.line} ic={th.mut} n="check"/>} title={x} dim={hl ? 0.55 : 1}/></A>)}
      <A at={1.2} kind="left"><Row y={474} h={130} icon={<Dot sq s={76} c={hl ? OR : th.line} ic={hl ? '#fff' : th.mut} n="search"/>} title="Site internet" sub="Ce qu'il apporte chaque mois" hl={hl} right={hl ? <Chip fill s={28}>Compte aussi</Chip> : null}/></A></Card>
    <Cubes at={2.0} x={470} y={540} seed={81} n={16} spread={360}/></>; };
const B5: React.FC = () => { const t = useT(); const th = useTh(); const sel = t > 2.7 ? (Math.floor((t - 2.7) * 3.2) % 2) : -1;
  return <><A at={0.15} kind="up"><Card x={0} y={0} w={940} h={330}><Label style={{position: 'absolute', left: 36, top: 36}}>Question du repreneur</Label>
      <Tx s={54} w={800} style={{position: 'absolute', left: 36, top: 84}}>D'où viennent vos clients ?</Tx>
      <Box x={36} y={186} w={868} h={104} style={{borderRadius: 22, border: `4px solid ${OR}`, background: 'rgba(255,79,31,.08)', display: 'flex', alignItems: 'center', padding: '0 28px'}}><Tx s={50} w={700} c={OR}>{Math.floor(t * 2.6) % 2 ? '|' : ''}</Tx><Tx s={34} w={500} c={th.mut}>Votre réponse…</Tx></Box></Card></A>
    <A at={2.5} kind="up"><Card x={0} y={370} w={940} h={330}><Label style={{position: 'absolute', left: 36, top: 36}}>Et sans vous ?</Label>
      {['Ça continue', 'Ça s\'arrête'].map((x, i) => <Box key={i} x={36 + i * 444} y={110} w={424} h={170} style={{borderRadius: 26, border: `4px solid ${sel === i ? (i ? RED : GR) : th.line}`, background: sel === i ? (i ? 'rgba(229,52,43,.10)' : 'rgba(23,163,74,.10)') : th.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Tx s={46} w={800} c={sel === i ? (i ? RED : GR) : th.mut}>{x}</Tx></Box>)}</Card></A></>; };
const C5: React.FC = () => { const t = useT(); const th = useTh(); const out = io(P(t, 2.5, 3.2)); const cx = 470, cy = 380;
  const nodes = [...Array(8)].map((_, i) => { const a = (i / 8) * Math.PI * 2 + 0.3; const r = 290 + rnd(i) * 30; return {x: cx + Math.cos(a) * r * (1 + out * 0.25), y: cy + Math.sin(a) * r * 0.86 * (1 + out * 0.25)}; });
  return <><Label style={{position: 'absolute', left: 0, right: 0, top: 0, textAlign: 'center'}}>Votre réseau personnel</Label>
    <svg width={940} height={800} style={{position: 'absolute', left: 0, top: 0}}>{nodes.map((n, i) => { const p = oc(P(t, 0.4 + i * 0.07, 0.9 + i * 0.07));
      return <line key={i} x1={cx} y1={cy + out * 500} x2={L(cx, n.x, p)} y2={L(cy, n.y, p)} stroke={OR} strokeWidth={5} strokeDasharray={out > 0 ? '6 16' : undefined} opacity={(1 - out) * 0.9}/>; })}</svg>
    {nodes.map((n, i) => <A key={i} at={0.5 + i * 0.07} kind="pop"><Box x={n.x - 46} y={n.y - 46} style={{opacity: 1 - out * 0.7}}><Dot s={92} c={th.soft} ic={out > 0.5 ? th.mut : th.ink} n="user"/></Box></A>)}
    <A at={0.15} kind="pop"><Box x={cx - 85} y={cy - 85 + out * 520} style={{opacity: 1 - out}}><Dot s={170} c={OR}><span style={{fontSize: 46}}>Vous</span></Dot></Box></A>
    <A at={3.1} kind="pop"><Box x={0} y={cy - 40} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill c={RED} s={40}>Liens rompus</Chip></Box></A></>; };
const D5: React.FC = () => { const t = useT(); const th = useTh(); const hs = [250, 270, 262, 290, 280, 300, 292, 310, 300, 320, 312, 330]; const m = 'JFMAMJJASOND';
  return <><Card x={0} y={0} w={940} h={540} hl={t > 3.4}><Label style={{position: 'absolute', left: 36, top: 36}}>Demandes · par mois</Label>
      {hs.map((h, i) => { const g = oc(P(t, 0.4 + i * 0.16, 0.9 + i * 0.16)); return <React.Fragment key={i}><Box x={46 + i * 72} y={460 - h * g} w={52} h={h * g} style={{borderRadius: '10px 10px 0 0', background: OR}}/><Tx s={24} w={700} c={th.mut} style={{position: 'absolute', left: 46 + i * 72, width: 52, top: 474, textAlign: 'center'}}>{m[i]}</Tx></React.Fragment>; })}
      <Box x={36} y={460} w={868} h={4} style={{background: th.line}}/>
      <A at={2.7} kind="pop"><Box x={500} y={24}><Chip fill c={GR} s={28}>Mesurées</Chip></Box></A><A at={3.3} kind="pop"><Box x={706} y={24}><Chip fill c={GR} s={28}>Régulières</Chip></Box></A></Card>
    <A at={3.9} kind="up"><Row y={580} x={0} w={940} h={130} hl icon={<Dot sq s={80} c={OR} n="lock"/>} title="Reste dans l'entreprise" sub="Avec ou sans le dirigeant" right={<Dot s={58} c={GR} n="check"/>}/></A>
    <Cubes at={3.9} x={470} y={640} seed={91} n={14} spread={340}/></>; };
const E5: React.FC = () => { const t = useT(); const th = useTh(); const on = t > 3.9;
  return <><Card x={0} y={0} w={940} h={620}><Label style={{position: 'absolute', left: 36, top: 36}}>Ce qui a de la valeur</Label>
      <A at={0.35} kind="left"><Row y={100} h={130} icon={<Dot sq s={76} c={th.line} ic={th.mut} n="doc"/>} title="Plaquette en ligne" sub="Personne ne la trouve" strike={t > 1.0} dim={t > 1.0 ? 0.6 : 1} right={<Tx s={50} w={800} c={t > 1.0 ? RED : th.mut}>0 €</Tx>}/></A>
      <A at={2.45} kind="left"><Row y={270} h={170} icon={<Dot sq s={96} c={OR} n="up"/>} title={<span style={{fontSize: 42}}>Site qui génère des demandes</span>} sub="Mesurées, chaque mois" hl/></A>
      <A at={3.9} kind="pop"><Box x={0} y={470} w={940} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: OR, color: '#fff', fontSize: 86, fontWeight: 800, padding: '10px 54px', borderRadius: 30, letterSpacing: '.02em', transform: 'rotate(-3deg)', boxShadow: '0 20px 50px rgba(255,79,31,.5)'}}>ACTIF</div></Box></A></Card>
    <Cubes at={3.9} x={470} y={530} seed={95} n={20} spread={420}/></>; };
const F5: React.FC = () => { const t = useT(); const th = useTh(); const g = io(P(t, 0.35, 2.0)); const ticks: [number, string][] = [[60, '− 5 ans'], [320, '− 3 ans'], [580, '− 1 an'], [840, 'Vente']];
  return <Card x={0} y={40} w={940} h={600}><Label style={{position: 'absolute', left: 36, top: 36}}>Avant la vente</Label>
    <Tx s={32} w={700} c={OR} style={{position: 'absolute', left: 60, top: 120}}>Référencement construit</Tx>
    <Box x={60} y={170} w={780 * g} h={70} style={{borderRadius: 18, background: OR, boxShadow: '0 0 30px rgba(255,79,31,.4)'}}/>
    <A at={2.5} kind="pop"><Box x={756} y={290} w={84} h={70} style={{borderRadius: 18, background: RED}}/><Tx s={32} w={700} c={RED} style={{position: 'absolute', left: 520, top: 304}}>3 mois avant</Tx><Ic n="x" s={50} c={RED} style={{position: 'absolute', left: 858, top: 300}}/></A>
    <Box x={60} y={430} w={820} h={6} style={{background: th.line, borderRadius: 3}}/>
    {ticks.map(([x, l], i) => <React.Fragment key={i}><Box x={x - 3 + (i === 3 ? -3 : 0)} y={412} w={i === 3 ? 12 : 6} h={42} style={{background: i === 3 ? th.ink : th.mut, borderRadius: 3}}/><Tx s={30} w={i === 3 ? 800 : 600} c={i === 3 ? th.ink : th.mut} style={{position: 'absolute', left: x - 90, width: 180, top: 470, textAlign: 'center'}}>{l}</Tx></React.Fragment>)}
  </Card>; };

export const scenes: Scene[] = [
  {a: 0, theme: 'dark', Panel: A5}, {a: 3.1, theme: 'light', Panel: B5}, {a: 7.1, theme: 'dark', Panel: C5}, {a: 10.6, theme: 'light', Panel: D5}, {a: 16.0, theme: 'dark', Panel: E5}, {a: 20.8, theme: 'light', Panel: F5},
  {a: 24.6, theme: 'dark', Panel: () => <LogoPanel sub="On pilote votre référencement" at={0.35} subAt={1.3}/>},
  {a: 27.4, theme: 'light', Panel: () => <CtaPanel k="ACTIF" tType={27.9} tCard={29.2} t30={31.4} line="Ce que votre site apporte"/>},
];
export const phrases: Phrase[] = [
  {a: 0.2, b: 1.6, text: 'Le jour où vous vendrez|*votre entreprise,*'},
  {a: 2.0, b: 2.8, text: 'votre site|*comptera.*'},
  {a: 3.4, b: 5.5, text: "Un repreneur voudra savoir|*d'où viennent vos clients.*"},
  {a: 5.8, b: 6.6, text: 'Et si ça continue|*sans vous.*'},
  {a: 7.5, b: 9.1, text: 'Si tout repose sur|*votre réseau personnel…*'},
  {a: 9.6, b: 10.1, text: 'ça part|*avec vous.*'},
  {a: 11.0, b: 15.6, text: "Si votre site amène|des demandes chaque mois,|mesurées, régulières…|*ça reste dans l'entreprise.*"},
  {a: 16.4, b: 17.8, text: 'Une plaquette en ligne|*ne vaut rien.*'},
  {a: 18.5, b: 20.4, text: "Un site qui génère|des demandes,|*c'est un actif.*"},
  {a: 21.1, b: 22.8, text: 'Ça se construit|*des années avant*|la vente.'},
  {a: 23.3, b: 24.1, text: 'Pas|*trois mois avant.*'},
  {a: 25.0, b: 27.0, text: 'On pilote|*votre référencement.*'},
  {a: 27.9, b: 28.8, text: 'Commentez|*« ACTIF »*'},
  {a: 29.2, b: 30.9, text: "On regarde ce que votre site|*apporte aujourd'hui.*"},
  {a: 31.4, b: 32.5, text: '*30 minutes,*|au téléphone.'},
];
export const dur = 33.7;
