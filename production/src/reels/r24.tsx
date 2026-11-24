import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Row, Type, Cubes, LogoPanel, CtaPanel, useT, useTh, OR, GR, RED, P, io, oc, L, Scene, Phrase} from '../lib';

const A4: React.FC = () => { const t = useT(); const th = useTh(); const blink = Math.floor(t * 3) % 2 === 0;
  return <Card x={0} y={0} w={940} h={770}>
    <Dot s={64} c={th.ink} ic={th.card} n="bot" style={{position: 'absolute', left: 32, top: 26}}/><Tx s={36} w={800} style={{position: 'absolute', left: 114, top: 40}}>Assistant IA</Tx>
    <Box x={0} y={112} w={940} h={3} style={{background: th.line}}/>
    <A at={1.6} kind="right"><Box x={260} y={140} w={648} h={150} style={{borderRadius: '30px 30px 8px 30px', background: OR, padding: '22px 30px'}}>
      <div style={{fontSize: 38, fontWeight: 700, color: '#fff', lineHeight: 1.25, letterSpacing: '-0.02em'}}><Type text="Un fournisseur dans mon métier, dans ma région ?" a={1.9} b={4.5}/></div></Box></A>
    {['Fournisseur A', 'Fournisseur B', 'Fournisseur C', 'Fournisseur D'].map((n, i) => <A key={i} at={4.75 + i * 0.13} kind="left"><Row y={308 + i * 84} h={74} icon={<Tx s={32} w={800} c={th.mut}>{i + 1}.</Tx>} title={<span style={{fontSize: 34}}>{n}</span>} right={<Ic n="check" s={36} c={GR}/>}/></A>)}
    <A at={5.45} kind="pop"><Row y={656} h={86} dashed icon={<Tx s={32} w={800} c={OR}>?</Tx>} title={<span style={{fontSize: 34, color: OR, opacity: blink ? 1 : 0.45}}>Votre entreprise</span>} right={<Chip fill c={RED} s={22}>Absente</Chip>}/></A>
  </Card>; };
const B4: React.FC = () => { const t = useT(); const th = useTh(); const n = (t > 0.5 ? 1 : 0) + (t > 1.2 ? 1 : 0) + (t > 1.9 ? 1 : 0);
  return <><Card x={0} y={0} w={940} h={640}>
      <Label style={{position: 'absolute', left: 36, top: 36}}>Consultation · première liste</Label>
      <Box x={690} y={22}><Chip fill s={28}><Ic n="folder" s={30} c="#fff"/>{n} retenus</Chip></Box>
      {['Fournisseur A', 'Fournisseur B', 'Fournisseur C'].map((x, i) => { const on = t > 0.5 + i * 0.7;
        return <Row key={i} y={96 + i * 120} icon={<Dot s={60} c={on ? GR : th.line} n="check"/>} title={x} sub="Cité par l'assistant" hl={on}/>; })}
      <A at={2.4} kind="up"><Row y={470} dashed dim={0.75} icon={<Dot s={60} c={th.line} ic={th.mut} n="x"/>} title="Votre entreprise" sub="Jamais apparue" right={<Chip s={24} c={th.mut}>Non consultée</Chip>}/></A></Card>
    {[0, 1, 2].map((i) => <Cubes key={i} at={0.5 + i * 0.7} x={70} y={150 + i * 120} seed={50 + i} n={7} spread={130}/>)}</>; };
const Field: React.FC<{x: number; y: number; w: number; h?: number; k: string; v?: string; at: number; bad?: boolean}> = ({x, y, w, h = 170, k, v, at, bad}) => { const t = useT(); const th = useTh(); const on = t > at && !!v;
  return <Card x={x} y={y} w={w} h={h} hl={on} style={bad ? {border: `3px solid ${RED}`} : {}}><Label style={{position: 'absolute', left: 28, top: 26}}>{k}</Label>
    <Tx s={w > 400 ? 37 : 50} w={800} c={on ? th.ink : th.mut} style={{position: 'absolute', left: 28, top: 76}}>{on ? v : '—'}</Tx>
    {on ? <Dot s={50} c={GR} n="check" style={{position: 'absolute', right: 22, top: 22}}/> : null}</Card>; };
const PageMock: React.FC<{scanA: number; scanB: number}> = ({scanA, scanB}) => { const t = useT(); const th = useTh(); const p = P(t, scanA, scanB);
  return <Card x={0} y={0} w={400} h={570}><Box x={0} y={0} w={400} h={56} style={{background: th.soft}}/>
    {[0, 1, 2].map((i) => <Box key={i} x={22 + i * 26} y={20} w={16} h={16} style={{borderRadius: 8, background: th.line}}/>)}
    <Box x={30} y={90} w={250} h={34} style={{borderRadius: 10, background: th.ink}}/><Box x={30} y={138} w={180} h={34} style={{borderRadius: 10, background: th.ink}}/>
    {[0, 1, 2, 3, 4, 5].map((i) => <Box key={i} x={30} y={210 + i * 40} w={[330, 300, 320, 260, 310, 200][i]} h={18} style={{borderRadius: 9, background: th.line}}/>)}
    <Box x={30} y={470} w={170} h={56} style={{borderRadius: 28, background: OR}}/>
    {p > 0 && p < 1 ? <Box x={0} y={60 + ((p * 3) % 1) * 490} w={400} h={10} style={{background: OR, boxShadow: '0 0 30px 8px rgba(255,79,31,.6)'}}/> : null}</Card>; };
const C4: React.FC = () => <>
    <A at={0.1} kind="left"><PageMock scanA={0.3} scanB={5.3}/></A>
    <A at={0.5} kind="right"><Field x={430} y={0} w={510} k="Ce qu'on fait" v="Maintenance industrielle" at={3.5}/></A>
    <A at={0.65} kind="right"><Field x={430} y={200} w={510} k="Où" v="Lyon et sa région" at={4.7}/></A>
    <A at={0.8} kind="right"><Field x={430} y={400} w={510} k="Pour qui" v="Sites de production" at={5.1}/></A>
    <Cubes at={3.5} x={880} y={60} seed={61} n={8} spread={140}/><Cubes at={4.7} x={880} y={260} seed={62} n={8} spread={140}/><Cubes at={5.1} x={880} y={460} seed={63} n={8} spread={140}/></>;
const D4: React.FC = () => { const t = useT(); const th = useTh(); const bad = t > 5.2;
  const Q: React.FC<{y: number; at: number; s: string}> = ({y, at, s}) => <A at={at} kind="left"><Box x={36} y={y}><Tx s={54} w={800} style={{background: 'linear-gradient(transparent 62%, rgba(255,79,31,.35) 62%)', padding: '0 8px'}}>{s}</Tx></Box></A>;
  return <><Card x={0} y={0} w={940} h={360}><Label style={{position: 'absolute', left: 36, top: 36}}>Votre page d'accueil dit…</Label>
      <Q y={92} at={0.9} s="« Des solutions sur mesure »"/><Q y={182} at={3.8} s="« Un savoir-faire reconnu »"/>
      <Box x={36} y={280} w={520} h={18} style={{borderRadius: 9, background: th.line}}/><Box x={36} y={314} w={380} h={18} style={{borderRadius: 9, background: th.line}}/></Card>
    <A at={1.6} kind="up"><Field x={0} y={400} w={293} h={170} k="Quoi" at={99} bad={bad}/><Field x={323} y={400} w={293} h={170} k="Où" at={99} bad={bad}/><Field x={647} y={400} w={293} h={170} k="Pour qui" at={99} bad={bad}/></A>
    <A at={5.2} kind="pop"><Box x={0} y={620} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill c={RED} s={46}><Ic n="x" s={46} c="#fff"/>Rien à citer</Chip></Box></A></>; };
const E4: React.FC = () => { const t = useT(); const th = useTh(); const items = ['Des pages qui répondent aux questions', 'Un contenu lisible par les robots', 'Métier, ville, tarifs écrits en clair'];
  return <><A at={0.2} kind="up"><Card x={0} y={0} w={940} h={200}><Tx s={46} w={800} style={{position: 'absolute', left: 36, top: 44}}>Citation garantie</Tx><Tx s={28} w={500} c={th.mut} style={{position: 'absolute', left: 36, top: 108}}>Personne ne peut la promettre</Tx>
      <Box x={730} y={56} w={170} h={88} style={{borderRadius: 44, background: th.soft, border: `3px solid ${th.line}`}}><Box x={10} y={10} w={62} h={62} style={{borderRadius: 31, background: th.mut}}/></Box></Card></A>
    <A at={1.4} kind="up"><Card x={0} y={240} w={940} h={500} hl={t > 3.0}><Label style={{position: 'absolute', left: 36, top: 36}}>Ce qu'on met en place</Label>
      {items.map((x, i) => <A key={i} at={1.8 + i * 0.4} kind="left"><Row y={96 + i * 124} icon={<Dot s={60} c={t > 2.0 + i * 0.4 ? GR : th.line} n="check"/>} title={<span style={{fontSize: 34}}>{x}</span>}/></A>)}</Card></A>
    <Cubes at={3.0} x={470} y={480} seed={71} n={18} spread={400}/></>; };

export const scenes: Scene[] = [
  {a: 0, theme: 'dark', Panel: A4}, {a: 6.15, theme: 'light', Panel: B4}, {a: 9.7, theme: 'dark', Panel: C4}, {a: 15.5, theme: 'light', Panel: D4}, {a: 22.3, theme: 'dark', Panel: E4},
  {a: 25.6, theme: 'light', Panel: () => <LogoPanel sub="Lisible par Google et par les IA" at={0.3} subAt={1.4}/>},
  {a: 29.5, theme: 'dark', Panel: () => <CtaPanel k="IA" tType={29.9} tCard={31.1} t30={32.8} line="On fait le test ensemble"/>},
];
export const phrases: Phrase[] = [
  {a: 0.0, b: 1.1, text: 'Ouvrez|*ChatGPT.*'},
  {a: 1.9, b: 4.8, text: 'Demandez-lui un fournisseur|dans votre métier,|dans votre région.'},
  {a: 5.5, b: 5.9, text: 'Vous|*y êtes ?*'},
  {a: 6.5, b: 9.5, text: "De plus en plus d'acheteurs|commencent par là, pour|*une première liste.*"},
  {a: 9.9, b: 13.0, text: 'Une IA cite plus volontiers|un site qui dit clairement|*trois choses :*'},
  {a: 13.2, b: 15.1, text: "*ce qu'on fait,*|*où,* et *pour qui.*"},
  {a: 15.9, b: 20.4, text: 'Si le vôtre parle de|*« solutions sur mesure »*|et de *« savoir-faire reconnu »…*'},
  {a: 20.7, b: 21.8, text: "elle n'a|*rien à citer.*"},
  {a: 22.7, b: 25.4, text: "Personne ne peut garantir|d'y figurer. Mais on peut|*tout faire pour.*"},
  {a: 25.9, b: 29.2, text: 'On rend votre site|lisible par *Google*|et par *les IA.*'},
  {a: 29.9, b: 30.8, text: 'Commentez|*« IA »*'},
  {a: 31.1, b: 32.4, text: 'On fait le test|*ChatGPT ensemble.*'},
  {a: 32.8, b: 34.0, text: '*30 minutes,*|au téléphone.'},
];
export const dur = 35.2;
