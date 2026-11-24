import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Row, Type, Count, Cubes, CtaPanel, Logo, useT, useTh, useDark, OR, GR, RED, P, io, oc, L, rnd, Scene, Phrase} from '../lib';

const useBlue = () => (useDark() ? '#8AB4F8' : '#1A0DAB');
const SearchBar: React.FC<{y?: number; children?: React.ReactNode}> = ({y = 0, children}) => { const th = useTh();
  return <Card x={0} y={y} w={940} h={130} style={{borderRadius: 65, border: `4px solid ${th.ink}`}}><Ic n="search" s={62} c={th.ink} style={{position: 'absolute', left: 34, top: 32}}/><Tx s={50} w={700} style={{position: 'absolute', left: 118, top: 34}}>{children}</Tx></Card>; };
const A0: React.FC = () => { const t = useT(); const th = useTh(); const press = Math.sin(P(t, 3.56, 3.86) * Math.PI);
  return <><A at={0.1} kind="pop"><SearchBar y={90}><span style={{color: OR}}><Type text="site:" a={0.25} b={0.7} cursor={false}/></span><Type text="votre-entreprise.fr" a={1.45} b={3.3}/></SearchBar></A>
    <A at={2.9} kind="up"><Box x={300} y={330} w={340} h={150} style={{borderRadius: 30, background: t > 3.56 ? OR : th.card, border: `4px solid ${t > 3.56 ? OR : th.ink}`, boxShadow: th.sh, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, transform: `scale(${1 - press * 0.12})`}}>
      <Tx s={54} w={800} c={t > 3.56 ? '#fff' : th.ink}>Entrée ↵</Tx></Box></A>
    <Cubes at={3.6} x={470} y={400} seed={101} n={18} spread={360}/></>; };
const Result: React.FC<{y: number; title: string; dim?: number; hl?: boolean}> = ({y, title, dim = 1, hl}) => { const th = useTh(); const blue = useBlue();
  return <Box x={28} y={y} w={884} h={132} style={{borderRadius: 22, background: hl ? 'rgba(255,79,31,.10)' : th.soft, border: `3px solid ${hl ? OR : 'transparent'}`, padding: '16px 24px', opacity: dim}}>
    <Tx s={24} w={500} c={GR}>votre-entreprise.fr</Tx><Tx s={40} w={700} c={blue} style={{marginTop: 2}}>{title}</Tx><div style={{height: 12, width: 520, borderRadius: 6, background: th.line, marginTop: 10}}/></Box>; };
const B0: React.FC = () => { const t = useT();
  return <Card x={0} y={0} w={940} h={740}><Label style={{position: 'absolute', left: 36, top: 36}}>Pages connues de Google</Label>
    <Box x={700} y={22}><Chip fill s={30}><Count to={4} a={0.25} b={0.8}/> pages</Chip></Box>
    {['Accueil', 'Accueil', 'Qui sommes-nous', 'Contact'].map((x, i) => <A key={i} at={0.25 + i * 0.14} kind="left"><Result y={96 + i * 156} title={x}/></A>)}</Card>; };
const C0: React.FC = () => { const t = useT(); const th = useTh();
  return <><Card x={0} y={0} w={940} h={520} hl={t > 0.95}><Label style={{position: 'absolute', left: 36, top: 36}}>Pages connues de Google</Label>
      <Tx s={300} w={800} c={OR} style={{position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center', transform: `scale(${L(1.6, 1, oc(P(t, 0.4, 0.8)))})`}}>0</Tx>
      <Tx s={34} w={600} c={th.mut} style={{position: 'absolute', left: 0, right: 0, top: 420, textAlign: 'center'}}>Aucun document ne correspond</Tx></Card>
    <A at={0.95} kind="pop"><Box x={0} y={570} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill c={RED} s={44}><Ic n="x" s={44} c="#fff"/>Vous n'existez pas</Chip></Box></A></>; };
const D0: React.FC = () => { const t = useT(); const th = useTh(); const lit = new Set([3, 17, 22, 41, 58, 66, 83, 97, 104, 131, 152, 178]);
  const zones: [number, number, string, number][] = [[0, 66, 'Produits', 1.2], [67, 133, 'Références', 1.45], [134, 199, 'Agences', 1.7]];
  return <><Card x={0} y={0} w={940} h={570}><Label style={{position: 'absolute', left: 36, top: 36}}>Votre site · 200 pages</Label>
      <Box x={650} y={22}><Chip fill s={30}>12 vues</Chip></Box>
      <Box x={30} y={100} w={880} h={440}>{[...Array(200)].map((_, i) => { const on = lit.has(i) && t > 0.15 + (i % 7) * 0.04; const z = zones.findIndex((q) => i >= q[0] && i <= q[1]); const dimmed = t > zones[z][3];
        return <div key={i} style={{position: 'absolute', left: (i % 20) * 44, top: Math.floor(i / 20) * 44, width: 36, height: 36, borderRadius: 8, background: on ? OR : th.soft, opacity: on ? 1 : dimmed ? 0.35 : 1, boxShadow: on ? '0 0 14px rgba(255,79,31,.7)' : 'none'}}/>; })}</Box></Card>
    {zones.map((q, i) => <A key={i} at={q[3]} kind="pop"><Box x={i * 318} y={600}><Chip s={34} c={th.mut}><Ic n="eye" s={36}/>{q[2]}</Chip></Box></A>)}
    <A at={2.1} kind="pop"><Box x={0} y={700} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill c={RED} s={40}>Presque tout est invisible</Chip></Box></A></>; };
const E0: React.FC = () => { const t = useT(); const th = useTh(); const blue = useBlue(); const ring = t > 0.15; const pulse = 1 + 0.08 * Math.sin(P(t, 3.0, 3.4) * Math.PI);
  return <><A at={0.15} kind="up"><Card x={0} y={40} w={940} h={330}>
      <Tx s={30} w={500} c={GR} style={{position: 'absolute', left: 40, top: 40}}>votre-entreprise.fr</Tx>
      <Box x={28} y={86} w={884} h={120} style={{borderRadius: 22, border: `5px solid ${ring ? OR : 'transparent'}`, background: ring ? 'rgba(255,79,31,.08)' : 'transparent'}}/>
      <Tx s={86} w={800} c={blue} style={{position: 'absolute', left: 44, top: 96, transform: `scale(${pulse})`, transformOrigin: 'left center'}}>Accueil</Tx>
      <div style={{position: 'absolute', left: 40, top: 240, height: 16, width: 620, borderRadius: 8, background: th.line}}/><div style={{position: 'absolute', left: 40, top: 276, height: 16, width: 460, borderRadius: 8, background: th.line}}/></Card></A>
    <A at={1.1} kind="pop"><Box x={470} y={90}><Chip fill s={34}>Le titre de votre page</Chip></Box></A>
    <A at={3.6} kind="up"><Card x={0} y={410} w={940} h={300} style={{border: `3px solid ${RED}`}}><Label style={{position: 'absolute', left: 36, top: 36}}>Ce que Google comprend</Label>
      {['Votre métier', 'Votre ville', 'Vos produits'].map((x, i) => <Box key={i} x={36 + i * 296} y={96} w={276} h={160} style={{borderRadius: 22, background: th.soft, textAlign: 'center', paddingTop: 22}}><Tx s={28} w={600} c={th.mut}>{x}</Tx><Tx s={80} w={800} c={RED}>?</Tx></Box>)}</Card></A></>; };
const F0: React.FC = () => { const t = useT(); const th = useTh(); const blue = useBlue();
  return <><Label style={{position: 'absolute', left: 0, right: 0, top: 10, textAlign: 'center'}}>Ce que tape l'acheteur</Label>
    <A at={0.15} kind="left"><SearchBar y={60}><Type text="maintenance industrielle Lyon" a={0.15} b={2.0}/></SearchBar></A>
    <A at={2.3} kind="pop"><Box x={370} y={240} w={200} h={200} style={{borderRadius: 100, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(229,52,43,.5)'}}><Tx s={130} w={800} c="#fff">≠</Tx></Box></A>
    <Label style={{position: 'absolute', left: 0, right: 0, top: 480, textAlign: 'center'}}>Ce que dit votre page</Label>
    <A at={0.4} kind="right"><Card x={0} y={530} w={940} h={200}><Tx s={30} w={500} c={GR} style={{position: 'absolute', left: 40, top: 34}}>votre-entreprise.fr</Tx><Tx s={80} w={800} c={blue} style={{position: 'absolute', left: 40, top: 76}}>Accueil</Tx></Card></A></>; };
const G0: React.FC = () => { const t = useT(); const th = useTh(); const p = io(P(t, 0.06, 0.5)); const R = 230, C = 2 * Math.PI * R;
  return <><svg width={940} height={640} style={{position: 'absolute', left: 0, top: 0}}><circle cx={470} cy={310} r={R} fill="none" stroke={th.line} strokeWidth={34}/>
      <circle cx={470} cy={310} r={R} fill="none" stroke={OR} strokeWidth={34} strokeLinecap="round" strokeDasharray={`${C * p} ${C}`} transform="rotate(-90 470 310)"/></svg>
    <Tx s={190} w={800} style={{position: 'absolute', left: 0, right: 0, top: 200, textAlign: 'center'}}>{Math.round(10 * p)}<span style={{fontSize: 90, color: th.mut}}> s</span></Tx>
    <A at={0.7} kind="pop"><Box x={0} y={640} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill s={40}><Ic n="up" s={42} c="#fff"/>Le test le plus rentable</Chip></Box></A>
    <Cubes at={0.5} x={470} y={310} seed={111} n={20} spread={420}/></>; };
const H0: React.FC = () => { const t = useT(); const titles = ['Maintenance industrielle à Lyon', 'Dépannage sur site', 'Nos références clients', 'Contact et devis'];
  return <><A at={0.08} kind="pop"><Box x={0} y={0} w={940} style={{display: 'flex', justifyContent: 'center'}}><Logo s={76}/></Box></A>
    <A at={0.3} kind="up"><Card x={0} y={150} w={940} h={650}>{titles.map((x, i) => { const on = t > 1.6 + i * 0.14; return <Result key={i} y={22 + i * 154} title={on ? x : 'Accueil'} hl={on} dim={on ? 1 : 0.6}/>; })}</Card></A>
    {[0, 1, 2, 3].map((i) => <Cubes key={i} at={1.6 + i * 0.14} x={820} y={240 + i * 154} seed={120 + i} n={8} spread={150}/>)}</>; };

export const scenes: Scene[] = [
  {a: 0, theme: 'light', Panel: A0}, {a: 4.15, theme: 'dark', Panel: B0}, {a: 6.92, theme: 'light', Panel: C0}, {a: 9.05, theme: 'dark', Panel: D0}, {a: 12.15, theme: 'light', Panel: E0},
  {a: 17.22, theme: 'dark', Panel: F0}, {a: 20.24, theme: 'light', Panel: G0}, {a: 22.64, theme: 'dark', Panel: H0},
  {a: 24.85, theme: 'light', Panel: () => <CtaPanel k="TEST" tType={24.94} tCard={25.88} t30={27.25} line="On regarde votre résultat"/>},
];
export const phrases: Phrase[] = [
  {a: 0.21, b: 3.41, text: "Tapez *« site: »*|puis l'adresse de votre|entreprise, dans Google."},
  {a: 3.56, b: 4.07, text: 'Faites-le|*maintenant.*'},
  {a: 4.26, b: 6.83, text: 'Tout ce que Google|connaît de|*votre société.*'},
  {a: 7.01, b: 7.68, text: '*Zéro*|résultat ?'},
  {a: 7.87, b: 8.95, text: "Pour Google,|*vous n'existez pas.*"},
  {a: 9.15, b: 10.98, text: '*12 pages,* alors que|votre site en compte|*200 ?*'},
  {a: 11.15, b: 12.11, text: 'Presque tout|*est invisible.*'},
  {a: 12.22, b: 13.11, text: 'Regardez|*la ligne en bleu :*'},
  {a: 13.27, b: 14.37, text: "c'est *le titre*|de votre page."},
  {a: 14.56, b: 15.56, text: "S'il dit|*« Accueil »,*"},
  {a: 15.76, b: 17.17, text: 'Google ne sait pas|*ce que vous vendez.*'},
  {a: 17.28, b: 19.34, text: 'Un acheteur tape|*« maintenance*|*industrielle Lyon ».*'},
  {a: 19.53, b: 20.16, text: 'Pas|*« Accueil ».*'},
  {a: 20.30, b: 20.73, text: '*Dix*|secondes.'},
  {a: 20.92, b: 22.56, text: 'Le test le plus rentable|*de votre semaine.*'},
  {a: 22.72, b: 24.75, text: 'On corrige ça,|*page par page.*'},
  {a: 24.94, b: 25.70, text: 'Commentez|*« TEST »*'},
  {a: 25.88, b: 27.15, text: 'On regarde votre|résultat *ensemble.*'},
  {a: 27.25, b: 28.48, text: '*30 minutes,*|au téléphone.'},
];
export const dur = 30.0;
