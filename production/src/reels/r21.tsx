import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Row, Count, Cubes, Bar, LogoPanel, CtaPanel, useT, useTh, OR, GR, RED, P, io, oc, L, Scene, Phrase} from '../lib';

const Amount: React.FC<{v: string}> = ({v}) => <Tx s={40} w={800}>{v}</Tx>;
const A1: React.FC = () => { const t = useT(); const th = useTh(); const done = t > 5.0;
  return <><Card x={0} y={0} w={940} h={740} hl={t > 5.85}>
    <Label style={{position: 'absolute', left: 36, top: 36}}>Note de frais · salon professionnel</Label>
    <Box x={770} y={24}><Chip s={24} c={th.mut}>Exemple</Chip></Box>
    <A at={1.15} kind="left"><Row y={96} icon={<Dot sq s={64} c={th.ink} ic={th.card} n="flag"/>} title="Stand" sub="Emplacement et montage" right={<Amount v="18 000 €"/>}/></A>
    <A at={1.75} kind="left"><Row y={212} icon={<Dot sq s={64} c={th.ink} ic={th.card} n="user"/>} title="Équipe" sub="5 personnes · 3 jours" right={<Amount v="12 000 €"/>}/></A>
    <A at={2.9} kind="left"><Row y={328} icon={<Dot sq s={64} c={th.ink} ic={th.card} n="building"/>} title="Hôtels et trajets" sub="Hébergement, déplacements" right={<Amount v="6 000 €"/>}/></A>
    <A at={3.7} kind="left"><Row y={444} icon={<Dot sq s={64} c={th.ink} ic={th.card} n="star"/>} title="Goodies" sub="Plaquettes, cadeaux" right={<Amount v="4 000 €"/>}/></A>
    <A at={4.6} kind="up"><Box x={36} y={590} w={868} style={{borderTop: `4px solid ${th.line}`, paddingTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <Tx s={48} w={800}>Total</Tx><Tx s={86} w={800} c={done ? OR : th.ink}><Count to={40000} a={5.0} b={5.85} suffix=" €"/></Tx></Box></A>
  </Card><Cubes at={5.85} x={720} y={650} seed={2} n={16}/></>; };

const Grid: React.FC<{fill: (i: number) => boolean}> = ({fill}) => { const th = useTh();
  return <Box x={22} y={100} w={896} h={416}>{[...Array(364)].map((_, i) => <div key={i} style={{position: 'absolute', left: (i % 28) * 32, top: Math.floor(i / 28) * 32, width: 26, height: 26, borderRadius: 6, background: fill(i) ? OR : th.soft, boxShadow: fill(i) ? '0 0 14px rgba(255,79,31,.7)' : 'none'}}/>)}</Box>; };
const B1: React.FC = () => { const t = useT(); const th = useTh(); const on = t > 1.25;
  return <><Card x={0} y={0} w={940} h={545}>
    <Label style={{position: 'absolute', left: 36, top: 36}}>Votre année · 365 jours</Label>
    <A at={1.25} kind="pop"><Box x={700} y={22}><Chip fill s={30}>3 jours</Chip></Box></A>
    <Grid fill={(i) => on && i >= 150 && i <= 152}/>
  </Card>
  <Cubes at={1.25} x={220} y={280} seed={3}/>
  <A at={2.3} kind="fade"><Box x={0} y={590} w={940} h={150} style={{overflow: 'hidden'}}>
    {[0, 1, 2, 3, 4, 5, 6].map((i) => { const x = -140 + ((t - 2.3) * 330 + i * 190) % 1300; return <Dot key={i} s={84} c={th.soft} ic={th.mut} n="user" style={{position: 'absolute', left: x, top: 20 + (i % 2) * 14}}/>; })}
  </Box></A>
  <A at={2.5} kind="up"><Box x={0} y={720} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip s={30} c={th.mut}>Des visiteurs de passage</Chip></Box></A></>; };
const C1: React.FC = () => { const t = useT(); const th = useTh(); const p = io(P(t, 1.25, 2.9));
  return <><Card x={0} y={0} w={940} h={545} hl={p >= 1}>
    <Label style={{position: 'absolute', left: 36, top: 36}}>Votre site · ouvert toute l'année</Label>
    <Box x={676} y={22}><Chip fill s={30}><Count to={365} a={1.25} b={2.9} suffix=" jours"/></Chip></Box>
    <Grid fill={(i) => i / 364 < p}/>
  </Card>
  <Cubes at={2.9} x={470} y={300} seed={4} n={18} spread={380}/>
  <A at={3.4} kind="right"><Row y={572} x={0} w={940} icon={<Dot s={64} c={OR} n="search"/>} title="« votre métier » + « votre région »" right={<Chip s={26} c={GR}>vous cherche</Chip>}/></A>
  <A at={4.0} kind="right"><Row y={688} x={0} w={940} icon={<Dot s={64} c={OR} n="search"/>} title="« le nom de votre société »" right={<Chip s={26} c={GR}>vous cherche</Chip>}/></A></>; };
const D1: React.FC = () => { const t = useT(); const th = useTh(); const blink = Math.floor(t * 2.6) % 2 === 0;
  return <><A at={0.15} kind="up"><Card x={0} y={20} w={940} h={300}>
    <Label style={{position: 'absolute', left: 36, top: 36}}>Budget site internet · cette année</Label>
    <Box x={36} y={96} w={868} h={160} style={{borderRadius: 26, border: `4px solid ${OR}`, background: 'rgba(255,79,31,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14}}>
      <Tx s={110} w={800} c={OR}>?{blink ? <span style={{fontWeight: 300}}>|</span> : <span style={{opacity: 0, fontWeight: 300}}>|</span>}</Tx><Tx s={70} w={700} c={th.mut}>€</Tx></Box>
  </Card></A>
  <A at={0.7} kind="up"><Card x={0} y={370} w={940} h={350}>
    <Tx s={36} w={700} style={{position: 'absolute', left: 36, top: 40}}>Salon · 3 jours</Tx><Tx s={36} w={800} c={OR} style={{position: 'absolute', right: 36, top: 40}}>40 000 €</Tx>
    <Bar x={36} y={100} w={868} h={36} v={oc(P(t, 0.8, 1.5))}/>
    <Tx s={36} w={700} style={{position: 'absolute', left: 36, top: 190}}>Site · 365 jours</Tx><Tx s={36} w={800} c={th.mut} style={{position: 'absolute', right: 36, top: 190, transform: `scale(${1 + 0.25 * Math.abs(Math.sin(t * 5))})`}}>?</Tx>
    <Bar x={36} y={250} w={868} h={36} v={0}/>
  </Card></A></>; };
const Step: React.FC<{y: number; n: string; icon: string; title: string; sub: string; on: boolean; hl?: boolean}> = ({y, n, icon, title, sub, on, hl}) => { const th = useTh();
  return <Card x={120} y={y} w={820} h={170} hl={hl}><Dot s={96} c={on ? OR : th.soft} ic={on ? '#fff' : th.mut} n={icon} style={{position: 'absolute', left: 30, top: 34}}/>
    <Label style={{position: 'absolute', left: 156, top: 32}}>{n}</Label><Tx s={44} w={800} style={{position: 'absolute', left: 156, top: 66}}>{title}</Tx><Tx s={28} w={500} c={th.mut} style={{position: 'absolute', left: 156, top: 120}}>{sub}</Tx></Card>; };
const E1: React.FC = () => { const t = useT(); const th = useTh(); const prog = io(P(t, 0.5, 5.4));
  return <><Box x={46} y={90} w={12} h={560} style={{borderRadius: 6, background: th.line}}><div style={{width: 12, height: `${prog * 100}%`, borderRadius: 6, background: OR}}/></Box>
    {[90, 330, 570].map((y, i) => <Box key={i} x={30} y={y + 40} w={44} h={44} style={{borderRadius: 22, background: prog > i * 0.45 ? OR : th.line}}/>)}
    <A at={0.35} kind="right"><Step y={0} n="Étape 1" icon="flag" title="Rencontre sur le stand" sub="Bonne discussion, carte de visite" on/></A>
    <A at={2.2} kind="right"><Step y={240} n="Étape 2" icon="eye" title="Il regarde votre site" sub="Avant de vous rappeler" on hl={t > 2.6}/></A>
    <A at={4.3} kind="right"><Step y={480} n="Étape 3" icon="phone" title="Il rappelle… ou pas" sub="Selon ce qu'il a vu" on={t > 4.6}/></A>
    <Cubes at={2.6} x={520} y={320} seed={6}/></>; };

export const scenes: Scene[] = [
  {a: 0, theme: 'light', Panel: A1}, {a: 6.55, theme: 'dark', Panel: B1}, {a: 10.1, theme: 'light', Panel: C1}, {a: 15.6, theme: 'dark', Panel: D1},
  {a: 17.95, theme: 'light', Panel: E1}, {a: 24.0, theme: 'dark', Panel: () => <LogoPanel sub="On pilote votre référencement"/>},
  {a: 26.9, theme: 'light', Panel: () => <CtaPanel k="SALON" tType={27.2} tCard={28.3} t30={29.6} line="On compare les deux"/>},
];
export const phrases: Phrase[] = [
  {a: 0.0, b: 0.9, text: 'Trois jours|de *salon.*'},
  {a: 1.1, b: 4.4, text: 'Un stand, cinq|personnes, les hôtels,|les goodies.'},
  {a: 5.0, b: 6.1, text: 'Disons|*40 000 €.*'},
  {a: 6.9, b: 8.2, text: 'Pour être vu|*trois jours.*'},
  {a: 9.0, b: 9.7, text: 'Par des gens|qui passent.'},
  {a: 10.4, b: 13.0, text: 'Votre site, lui,|est ouvert|*365 jours par an.*'},
  {a: 13.5, b: 15.1, text: 'Il reçoit ceux qui|*vous cherchent déjà.*'},
  {a: 16.0, b: 17.4, text: 'Combien avez-vous|*investi dedans ?*'},
  {a: 18.3, b: 19.4, text: "Je ne dis pas|d'arrêter les salons."},
  {a: 19.8, b: 23.5, text: 'Un acheteur rencontré|sur votre stand ira voir|*votre site* avant de rappeler.'},
  {a: 24.4, b: 26.3, text: 'On pilote|*votre référencement.*'},
  {a: 27.2, b: 28.0, text: 'Commentez|*« SALON »*'},
  {a: 28.3, b: 29.2, text: 'On compare|les deux ensemble.'},
  {a: 29.6, b: 30.7, text: '*30 minutes,*|au téléphone.'},
];
export const dur = 32.0;
