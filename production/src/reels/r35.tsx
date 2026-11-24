import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Type, Cubes, CtaPanel, Logo, useT, useTh, OR, GR, RED, P, io, oc, L, Scene, Phrase} from '../lib';
import {BrowserBar} from './r29';
import T from '../../spec/r35_t.json';

// A — la fiche d'un salarié mystère
const A0: React.FC = () => { const t = useT(); const th = useTh();
  const rows: [string, string, string, number][] = [['cal', 'Présence', '365 jours par an', 1.2], ['x', 'Congés', 'Aucun', 3.35], ['x', 'Heures sup', 'Aucune', 4.27], ['phone', 'Disponible', 'à 3 h du matin', 6.4]];
  return <Card x={0} y={0} w={940} h={740}><Label style={{position: 'absolute', left: 36, top: 36}}>Fiche salarié</Label>
    <Box x={36} y={90} w={220} h={220} style={{borderRadius: 30, background: th.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Tx s={170} w={800} c={OR} style={{transform: `scale(${1 + 0.04 * Math.sin(t * 2)})`}}>?</Tx></Box>
    <Tx s={50} w={800} style={{position: 'absolute', left: 290, top: 130}}>Nom : ???</Tx>
    <Tx s={32} w={600} c={th.mut} style={{position: 'absolute', left: 290, top: 200}}>Poste : mystère</Tx>
    {rows.map(([ic, k, v, a], i) => <A key={i} at={a} kind="left"><Box x={36} y={350 + i * 94} w={868} h={78} style={{borderRadius: 20, background: th.soft, display: 'flex', alignItems: 'center', gap: 20, padding: '0 22px'}}>
      <Dot s={50} c={OR} n={ic}/><Tx s={30} w={600} c={th.mut} style={{width: 210}}>{k}</Tx><Tx s={36} w={800}>{v}</Tx></Box></A>)}</Card>; };

// B — ce n'est pas un commercial, ni un standard, ni une IA
const B0: React.FC = () => { const t = useT(); const th = useTh();
  const c: [string, string, number, number][] = [['user', 'Votre meilleur commercial', 0.4, 1.4], ['phone', 'Un standard téléphonique', 2.2, 3.0], ['chat', 'Une IA', 3.75, 4.4]];
  return <>{c.map(([ic, s, a, x], i) => { const off = t >= x;
    return <A key={i} at={a} kind="up"><Card x={0} y={20 + i * 250} w={940} h={210} style={{opacity: off ? 0.5 : 1}}>
      <Dot s={110} c={off ? th.mut : OR} n={ic} style={{position: 'absolute', left: 40, top: 50}}/>
      <Tx s={46} w={800} style={{position: 'absolute', left: 190, top: 74, textDecoration: off ? 'line-through' : 'none', textDecorationColor: RED, textDecorationThickness: 6}}>{s}</Tx>
      {off ? <Box x={810} y={55}><Dot s={100} c={RED} n="x"/></Box> : null}</Card></A>; })}</>; };

// C — la réponse : une page de votre site, bien placée sur Google
const C0: React.FC = () => { const t = useT(); const th = useTh(); const rev = io(P(t, 0.2, 0.9));
  return <><Card x={0} y={40} w={940} h={560} style={{overflow: 'hidden'}}><BrowserBar url="google.fr"/>
      <Box x={28} y={110} w={884} h={66} style={{borderRadius: 33, border: `2px solid ${th.line}`, display: 'flex', alignItems: 'center', gap: 14, padding: '0 22px'}}><Ic n="search" s={32} c={th.mut}/><Tx s={30} w={500} c={th.mut}>maintenance industrielle Lyon</Tx></Box>
      <Box x={28} y={210} w={884} h={170} style={{borderRadius: 22, background: 'rgba(255,79,31,.10)', border: `3px solid ${OR}`, padding: '18px 26px', opacity: rev, transform: `translateY(${(1 - rev) * 30}px)`}}>
        <Tx s={26} w={500} c={GR}>votre-entreprise.fr</Tx><Tx s={44} w={700} c="#1A0DAB" style={{marginTop: 6}}>Maintenance industrielle à Lyon</Tx>
        <Tx s={26} w={500} c={th.mut} style={{marginTop: 6}}>Intervention sur vos lignes de production…</Tx></Box>
      {[0, 1].map((i) => <Box key={i} x={28} y={410 + i * 70} w={884} h={52} style={{borderRadius: 14, background: th.soft, opacity: 0.6}}/>)}</Card>
    <A at={1.9} kind="pop"><Box x={0} y={650} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill s={44}><Ic n="star" s={44} c="#fff"/>1er résultat sur Google</Chip></Box></A></>; };

// D — concrètement : une page par service, une page par zone
const D0: React.FC = () => { const t = useT(); const th = useTh();
  const svc = ['Maintenance', 'Installation', 'Dépannage'], zone = ['Lyon', 'Grenoble', 'Saint-Étienne'];
  return <><Box x={0} y={0} w={940} style={{display: 'flex', justifyContent: 'center'}}><Box x={0} y={0} w={330} h={96} style={{position: 'relative', borderRadius: 24, background: th.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14}}><Ic n="building" s={40} c={th.card}/><Tx s={34} w={800} c={th.card}>votre-site.fr</Tx></Box></Box>
    <A at={0.85} kind="fade"><Label style={{position: 'absolute', left: 0, top: 150}}>Une page par service</Label></A>
    {svc.map((s, i) => <A key={i} at={0.85 + i * 0.25} kind="up"><Box x={i * 320} y={200} w={300} h={200} style={{borderRadius: 22, background: th.card, boxShadow: th.sh, border: `3px solid ${OR}`, padding: 20}}>
      <Dot s={56} c={OR} n="doc"/><Tx s={34} w={800} style={{marginTop: 14}}>{s}</Tx><Tx s={22} w={600} c={th.mut}>/{s.toLowerCase()}</Tx></Box></A>)}
    <A at={2.75} kind="fade"><Label style={{position: 'absolute', left: 0, top: 440}}>Une page par zone</Label></A>
    {zone.map((s, i) => <A key={i} at={2.75 + i * 0.25} kind="up"><Box x={i * 320} y={490} w={300} h={200} style={{borderRadius: 22, background: th.card, boxShadow: th.sh, border: `3px solid ${GR}`, padding: 20}}>
      <Dot s={56} c={GR} n="pin"/><Tx s={34} w={800} style={{marginTop: 14}}>{s}</Tx><Tx s={22} w={600} c={th.mut}>/maintenance-{s.toLowerCase().replace('é', 'e').replace(/ /g, '-')}</Tx></Box></A>)}</>; };

// E — l'acheteur cherche, trouve la page, envoie sa demande de devis
const E0: React.FC = () => { const t = useT(); const th = useTh();
  return <><Card x={0} y={0} w={940} h={340}><Label style={{position: 'absolute', left: 36, top: 32}}>Un acheteur cherche</Label>
      <Box x={36} y={90} w={868} h={80} style={{borderRadius: 40, border: `2px solid ${th.line}`, display: 'flex', alignItems: 'center', gap: 14, padding: '0 26px'}}><Ic n="search" s={34} c={th.mut}/><Tx s={32} w={600}><Type text="maintenance ligne de production Grenoble" a={0.3} b={1.6}/></Tx></Box>
      <A at={1.9} kind="up"><Box x={36} y={200} w={868} h={110} style={{borderRadius: 20, background: 'rgba(255,79,31,.10)', border: `3px solid ${OR}`, padding: '14px 24px'}}>
        <Tx s={24} w={500} c={GR}>votre-site.fr/maintenance-grenoble</Tx><Tx s={36} w={700} c="#1A0DAB">Maintenance industrielle à Grenoble</Tx></Box></A></Card>
    <A at={3.3} kind="up"><Card x={0} y={390} w={940} h={330} hl={t > 3.6}><Dot s={100} c={GR} n="doc" style={{position: 'absolute', left: 36, top: 40}}/>
      <Label style={{position: 'absolute', left: 170, top: 46}}>Nouvelle demande de devis</Label>
      <Tx s={34} w={700} style={{position: 'absolute', left: 170, top: 96, width: 720}}>« Arrêt de ligne prévu en mars, pouvez-vous nous chiffrer l'intervention ? »</Tx>
      <Tx s={26} w={600} c={th.mut} style={{position: 'absolute', left: 170, top: 250}}>Responsable maintenance · site de Grenoble</Tx></Card></A></>; };

// F — Super Refer crée les pages et les place sur Google
const F0: React.FC = () => { const t = useT(); const th = useTh();
  return <><A at={0.08} kind="fade"><Box x={0} y={0} w={940} style={{display: 'flex', justifyContent: 'center'}}><Logo s={76}/></Box></A>
    {[['Vos pages par service et par zone', 0.6], ['Placées sur Google', 2.3]].map(([s, a], i) => <A key={i} at={a as number} kind="left"><Card x={0} y={160 + i * 190} w={940} h={160} hl={t > (a as number) + 0.3}>
      <Dot s={86} c={GR} n="check" style={{position: 'absolute', left: 36, top: 37}}/><Tx s={40} w={800} style={{position: 'absolute', left: 150, top: 54}}>{s as string}</Tx></Card></A>)}</>; };

export const phrases: Phrase[] = T.phrases;
export const dur = T.dur;
export const scenes: Scene[] = [
  {a: 0, theme: 'light', Panel: A0}, {a: 7.85, theme: 'dark', Panel: B0}, {a: 12.85, theme: 'light', Panel: C0}, {a: 16.4, theme: 'dark', Panel: D0},
  {a: 21.7, theme: 'light', Panel: E0}, {a: 26.95, theme: 'dark', Panel: F0},
  {a: 30.8, theme: 'light', Panel: () => <CtaPanel k="SEO" tType={31.7} tCard={33.32} t30={34.3} line="Votre premier échange" label="Premier échange" chip="Réservé" ok/>},
];
