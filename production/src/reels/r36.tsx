import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Type, Cubes, CtaPanel, Logo, useT, useTh, OR, GR, RED, P, io, oc, L, Scene, Phrase} from '../lib';
import {BrowserBar} from './r29';
import T from '../../spec/r36_t.json';

// A — le devis d'une agence : « fichier spécial IA »
const A0: React.FC = () => { const t = useT(); const th = useTh();
  return <><Card x={0} y={0} w={940} h={700}><Label style={{position: 'absolute', left: 36, top: 36}}>Proposition commerciale</Label>
      <Tx s={46} w={800} style={{position: 'absolute', left: 36, top: 90}}>Option « Visibilité IA »</Tx>
      <A at={0.6} kind="left"><Box x={36} y={190} w={868} h={110} style={{borderRadius: 22, background: 'rgba(255,79,31,.10)', border: `3px solid ${OR}`, display: 'flex', alignItems: 'center', gap: 22, padding: '0 26px'}}>
        <Dot s={66} c={OR} n="doc"/><Tx s={38} w={800}>Fichier spécial IA</Tx></Box></A>
      <A at={1.1} kind="up"><Box x={36} y={340} w={868} h={300} style={{borderRadius: 22, background: th.soft, padding: '26px 30px'}}>
        <Label>Promesse</Label>
        <Tx s={40} w={700} style={{marginTop: 18, lineHeight: 1.25}}>« ChatGPT et Google vont enfin <span style={{color: OR}}>vous citer</span>. »</Tx>
        <Box x={30} y={200} style={{display: 'flex', gap: 16}}><Chip s={30}><Ic n="chat" s={32} c={OR}/>ChatGPT</Chip><Chip s={30}><Ic n="search" s={32} c={OR}/>Google</Chip></Box></Box></A></Card></>; };

// B — fichier invisible, balisage magique, page pour robots… et le prix
const B0: React.FC = () => { const t = useT(); const th = useTh();
  const it: [string, string, string, number][] = [['doc', 'Un fichier invisible', 'llms.txt', 0.2], ['star', 'Un balisage « magique »', '<ai-schema>', 1.62], ['bot', 'Une page pour robots', '/ia/a-propos', 3.18]];
  return <>{it.map(([ic, s, c, a], i) => <A key={i} at={a} kind="left"><Card x={0} y={i * 190} w={940} h={160}>
      <Dot s={90} c={OR} n={ic} style={{position: 'absolute', left: 36, top: 35}}/>
      <Tx s={38} w={800} style={{position: 'absolute', left: 160, top: 36}}>{s}</Tx>
      <Tx s={26} w={500} c={th.mut} style={{position: 'absolute', left: 160, top: 92, fontFamily: 'monospace'}}>{c}</Tx></Card></A>)}
    <A at={4.47} kind="pop"><Box x={0} y={610} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill s={46}><Ic n="euro" s={46} c="#fff"/>Facturé en supplément</Chip></Box></A></>; };

// C — la question
const C0: React.FC = () => { const t = useT(); const th = useTh();
  return <Box x={0} y={60} w={940} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30}}>
    <div style={{width: 340, height: 340, borderRadius: 170, background: th.card, boxShadow: th.sh, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${L(0.92, 1, oc(P(t, 0, 0.4)))})`}}>
      <Tx s={240} w={800} c={OR}>?</Tx></div>
    <Tx s={56} w={800}>Ça marche ?</Tx></Box>; };

// D — le guide officiel de Google répond
const D0: React.FC = () => { const t = useT(); const th = useTh(); const hl = t > 3.45; const cross = io(P(t, 4.0, 4.5));
  return <><Card x={0} y={0} w={940} h={470}><BrowserBar url="developers.google.com/search"/>
      <Label style={{position: 'absolute', left: 36, top: 110}}>Guide officiel Google · Recherche IA</Label>
      {[0.9, 0.75].map((k, i) => <div key={i} style={{position: 'absolute', left: 36, top: 170 + i * 36, height: 16, width: 868 * k, borderRadius: 8, background: th.line}}/>)}
      <Box x={28} y={260} w={884} h={120} style={{borderRadius: 20, background: hl ? 'rgba(255,79,31,.14)' : th.soft, border: `3px solid ${hl ? OR : 'transparent'}`, padding: '18px 24px'}}>
        <Tx s={32} w={700} style={{lineHeight: 1.3, width: 830}}>Pas besoin de fichiers ou de balisage spéciaux pour apparaître dans les résultats IA.</Tx></Box>
      <div style={{position: 'absolute', left: 36, top: 410, height: 16, width: 600, borderRadius: 8, background: th.line}}/></Card>
    <A at={3.5} kind="up"><Box x={0} y={520} w={440} h={210} style={{borderRadius: 26, background: th.card, boxShadow: th.sh, padding: 24, opacity: L(1, 0.5, cross)}}>
      <Dot s={64} c={th.mut} n="doc"/><Tx s={32} w={700} style={{marginTop: 14, fontFamily: 'monospace'}}>llms.txt</Tx>
      {cross > 0 ? <Tx s={34} w={800} c={RED} style={{position: 'absolute', right: 24, top: 30}}>Ignoré</Tx> : null}</Box></A>
    <A at={8.2} kind="up"><Box x={500} y={520} w={440} h={210} style={{borderRadius: 26, background: th.card, boxShadow: th.sh, border: `3px solid ${GR}`, padding: 24}}>
      <Dot s={64} c={GR} n="eye"/><Tx s={32} w={800} style={{marginTop: 14}}>Votre vrai site</Tx>
      <Tx s={26} w={700} c={GR} style={{position: 'absolute', right: 24, top: 30}}>Lu</Tx></Box></A></>; };

// E — ce qui fait citer : pages claires, métier, ville, preuves
const E0: React.FC = () => { const t = useT(); const th = useTh();
  const b: [string, string, string, number][] = [['building', 'Métier', 'Maintenance de lignes de production', 0.95], ['pin', 'Ville', 'À Lyon et en Rhône-Alpes', 1.45], ['star', 'Preuves', 'Références clients, chiffres réels', 2.0]];
  return <><Card x={0} y={0} w={940} h={150}><Label style={{position: 'absolute', left: 36, top: 30}}>Une page claire</Label>
      <Tx s={34} w={700} style={{position: 'absolute', left: 36, top: 72}}>Elle répond aux questions de vos acheteurs</Tx></Card>
    {b.map(([ic, k, v, a], i) => { const on = t >= a; return <A key={i} at={0.4 + i * 0.15} kind="fade"><Card x={0} y={190 + i * 180} w={940} h={160} hl={on}>
      <Dot s={84} c={on ? OR : th.mut} n={ic} style={{position: 'absolute', left: 36, top: 38}}/>
      <Box x={150} y={30}>{on ? <Chip fill s={26}>{k}</Chip> : <Chip s={26} c={th.mut}>{k}</Chip>}</Box>
      <Tx s={34} w={700} style={{position: 'absolute', left: 150, top: 88}}>{v}</Tx>
      {on ? <Box x={830} y={46}><Dot s={66} c={GR} n="check"/></Box> : null}</Card></A>; })}</>; };

// F — Super Refer : ça, et rien d'autre
const F0: React.FC = () => { const t = useT(); const th = useTh();
  return <><A at={0.05} kind="fade"><Box x={0} y={0} w={940} style={{display: 'flex', justifyContent: 'center'}}><Logo s={80}/></Box></A>
    <A at={0.3} kind="up"><Card x={0} y={170} w={940} h={230} hl><Dot s={100} c={GR} n="check" style={{position: 'absolute', left: 36, top: 65}}/>
      <Tx s={44} w={800} style={{position: 'absolute', left: 170, top: 60}}>Des pages claires</Tx>
      <Tx s={30} w={600} c={th.mut} style={{position: 'absolute', left: 170, top: 125}}>que Google et l'IA comprennent</Tx></Card></A>
    <A at={1.4} kind="up"><Card x={0} y={440} w={940} h={180} style={{opacity: 0.6}}><Dot s={80} c={RED} n="x" style={{position: 'absolute', left: 36, top: 50}}/>
      <Tx s={38} w={700} style={{position: 'absolute', left: 150, top: 64, textDecoration: 'line-through', textDecorationColor: RED, textDecorationThickness: 5}}>Les fichiers magiques</Tx></Card></A></>; };

export const phrases: Phrase[] = T.phrases;
export const dur = T.dur;
export const scenes: Scene[] = [
  {a: 0, theme: 'light', Panel: A0}, {a: 2.4, theme: 'light', Panel: C0}, {a: 3.5, theme: 'dark', Panel: D0},
  {a: 13.0, theme: 'light', Panel: E0}, {a: 15.6, theme: 'dark', Panel: F0},
  {a: 17.6, theme: 'light', Panel: () => <CtaPanel k="SEO" tType={17.75} tCard={18.81} t30={19.6} line="Votre premier échange" label="Premier échange" chip="Réservé" ok/>},
];
