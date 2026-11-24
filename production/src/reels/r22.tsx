import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Row, Type, Cubes, CtaPanel, Logo, useT, useTh, OR, GR, RED, P, io, oc, L, Scene, Phrase} from '../lib';

const A2: React.FC = () => { const t = useT(); const th = useTh(); const scan = (i: number) => t > 5.4 + i * 0.18;
  return <><Card x={0} y={0} w={940} h={130} style={{borderRadius: 65, border: `4px solid ${th.ink}`}}>
      <Ic n="search" s={62} c={th.ink} style={{position: 'absolute', left: 34, top: 32}}/>
      <Tx s={52} w={700} style={{position: 'absolute', left: 118, top: 32}}><Type text="Nom de votre société" a={0.3} b={1.5}/></Tx></Card>
    <A at={1.9} kind="up"><Card x={0} y={170} w={940} h={520}>
      <Row y={28} icon={<Dot sq s={64} c={OR} n="building"/>} title="Votre site officiel" sub="votre-societe.fr" hl={t > 3.6 && t < 5.3} right={t > 3.6 ? <Dot s={56} c={GR} n="check"/> : <Tx s={40} w={800} c={th.mut}>1</Tx>}/>
      <Row y={148} icon={<Dot sq s={64} c={th.ink} ic={th.card} n="doc"/>} title="Annuaire professionnel" sub="Fiche entreprise" hl={scan(0)} dim={t < 5.4 ? 0.55 : 1} right={<Tx s={40} w={800} c={th.mut}>2</Tx>}/>
      <Row y={268} icon={<Dot sq s={64} c={th.ink} ic={th.card} n="folder"/>} title="Distributeur" sub="Page revendeur" hl={scan(1)} dim={t < 5.4 ? 0.55 : 1} right={<Tx s={40} w={800} c={th.mut}>3</Tx>}/>
      <Row y={388} icon={<Dot sq s={64} c={th.ink} ic={th.card} n="star"/>} title="Avis clients" sub="Plateforme d'avis" hl={scan(2)} dim={t < 5.4 ? 0.55 : 1} right={<Tx s={40} w={800} c={th.mut}>4</Tx>}/>
    </Card></A><Cubes at={3.6} x={840} y={250} seed={21}/></>; };
const B2: React.FC = () => { const t = useT(); const th = useTh();
  return <>
    <A at={0.35} kind="left"><Card x={0} y={0} w={940} h={220} hl={t > 0.4 && t < 2.5}>
      <Dot sq s={96} c={th.soft} ic={th.ink} n="doc" style={{position: 'absolute', left: 32, top: 62}}/><Label style={{position: 'absolute', left: 160, top: 40}}>Annuaire</Label>
      <Tx s={56} w={800} style={{position: 'absolute', left: 160, top: 80, textDecoration: t > 1.1 ? 'line-through' : 'none', textDecorationColor: RED, textDecorationThickness: 6}}>04 •• •• •• ••</Tx>
      <A at={1.15} kind="pop"><Box x={610} y={132}><Chip fill c={RED} s={30}>Numéro obsolète</Chip></Box></A></Card></A>
    <A at={2.55} kind="left"><Card x={0} y={250} w={940} h={220} hl={t > 2.6 && t < 5.6}>
      <Dot sq s={96} c={th.soft} ic={th.ink} n="folder" style={{position: 'absolute', left: 32, top: 62}}/><Label style={{position: 'absolute', left: 160, top: 40}}>Distributeur · vend aussi</Label>
      {['#5B5BF0', '#F0A020', '#12A8A0'].map((c, i) => <A key={i} at={3.6 + i * 0.28} kind="pop"><Dot s={84} c={c} style={{position: 'absolute', left: 160 + i * 104, top: 96}}>{'ABC'[i]}</Dot></A>)}
      <A at={4.3} kind="pop"><Box x={560} y={112}><Chip fill c={RED} s={30}>Vos concurrents</Chip></Box></A></Card></A>
    <A at={5.65} kind="left"><Card x={0} y={500} w={940} h={220} hl={t > 5.7}>
      <Dot sq s={96} c={th.soft} ic={th.ink} n="chat" style={{position: 'absolute', left: 32, top: 62}}/><Label style={{position: 'absolute', left: 160, top: 40}}>Avis en ligne</Label>
      <Box x={160} y={88} style={{display: 'flex', gap: 8}}>{[0, 1, 2, 3, 4].map((i) => <Ic key={i} n="star" s={60} c={i < 2 ? OR : th.line}/>)}</Box>
      <A at={6.5} kind="pop"><Box x={560} y={112}><Chip fill c={RED} s={30}>3 avis sans réponse</Chip></Box></A></Card></A></>; };
const Bubble: React.FC<{x: number; y: number; r: number; icon: string; text: string}> = ({x, y, r, icon, text}) => { const th = useTh();
  return <Box x={x} y={y} style={{transform: `rotate(${r}deg)`, background: th.ink, color: th.card, borderRadius: 34, padding: '22px 32px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: th.sh}}><Ic n={icon} s={48} c={th.card}/><Tx s={42} w={800} c={th.card}>{text}</Tx></Box>; };
const C2: React.FC = () => { const t = useT(); const th = useTh();
  return <><A at={0.1} kind="pop"><Card x={120} y={250} w={700} h={150}><Dot sq s={86} c={OR} n="building" style={{position: 'absolute', left: 30, top: 29}}/><Tx s={50} w={800} style={{position: 'absolute', left: 146, top: 42}}>Votre société</Tx></Card></A>
    <A at={0.4} kind="down"><Bubble x={30} y={120} r={-5} icon="doc" text="L'annuaire"/></A>
    <A at={0.65} kind="right"><Bubble x={470} y={196} r={4} icon="folder" text="Le distributeur"/></A>
    <A at={0.9} kind="up"><Bubble x={200} y={356} r={-2} icon="chat" text="Les avis"/></A>
    {[0, 1, 2].map((i) => <A key={i} at={2.1 + i * 0.2} kind="up"><Box x={150 + i * 280} y={560}><Dot s={110} c={th.soft} ic={th.ink} n="user"/></Box>
      <Box x={150 + i * 280 + 49} y={470} w={12} h={Math.round(80 * oc(P(t, 2.3 + i * 0.2, 2.8 + i * 0.2)))} style={{background: OR, borderRadius: 6}}/></A>)}
    <A at={2.9} kind="pop"><Box x={0} y={700} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip s={34}>Ils vous cherchaient, vous</Chip></Box></A></>; };
const D2: React.FC = () => { const t = useT(); const th = useTh(); const p = io(P(t, 0.5, 2.3)); const s = io(P(t, 3.0, 4.0));
  return <><A at={0.1} kind="up"><Card x={0} y={0} w={940} h={300}>
      <Label style={{position: 'absolute', left: 36, top: 36}}>Recherche sur votre nom · difficulté</Label>
      <Box x={36} y={110} w={868} h={46} style={{borderRadius: 23, background: `linear-gradient(90deg, ${GR} 0%, #F0C020 50%, ${RED} 100%)`}}/>
      <Box x={36 + L(800, 60, p) - 23} y={92} w={46} h={82} style={{borderRadius: 14, background: th.ink, border: `5px solid ${th.card}`}}/>
      <Tx s={30} w={700} c={GR} style={{position: 'absolute', left: 36, top: 196}}>Facile</Tx><Tx s={30} w={700} c={RED} style={{position: 'absolute', right: 36, top: 196}}>Difficile</Tx>
      <A at={2.3} kind="pop"><Box x={250} y={214}><Chip fill c={GR} s={32}>La plus facile à gagner</Chip></Box></A></Card></A>
    <A at={2.8} kind="up"><Card x={0} y={340} w={940} h={400}>
      <Row y={L(28, 268, s)} icon={<Dot sq s={64} c={OR} n="building"/>} title="Votre site officiel" hl right={s > 0.5 ? <Chip fill c={RED} s={26}>Laissée filer</Chip> : <Tx s={40} w={800} c={OR}>1</Tx>}/>
      <Row y={L(148, 28, s)} icon={<Dot sq s={64} c={th.ink} ic={th.card} n="doc"/>} title="Annuaire professionnel"/>
      <Row y={L(268, 148, s)} icon={<Dot sq s={64} c={th.ink} ic={th.card} n="folder"/>} title="Distributeur"/></Card></A></>; };
const E2: React.FC = () => { const t = useT(); const th = useTh();
  const rows: [string, string, string][] = [['Annuaire professionnel', 'Votre site officiel', 'building'], ['Distributeur', 'Votre page Produits', 'doc'], ['Avis clients', 'Votre fiche d\'établissement', 'pin'], ['Autre résultat', 'Votre page Contact', 'phone']];
  return <><A at={0.3} kind="pop"><Box x={0} y={0} w={940} style={{display: 'flex', justifyContent: 'center'}}><Logo s={76}/></Box></A>
    <A at={0.9} kind="up"><Card x={0} y={170} w={940} h={520}><>{rows.map((r, i) => { const on = t > 1.5 + i * 0.5;
      return <Row key={i} y={28 + i * 120} icon={<Dot sq s={64} c={on ? OR : th.soft} ic={on ? '#fff' : th.mut} n={on ? r[2] : 'doc'}/>} title={on ? r[1] : r[0]} hl={on} dim={on ? 1 : 0.6} right={on ? <Dot s={52} c={GR} n="check"/> : <Tx s={40} w={800} c={th.mut}>{i + 1}</Tx>}/>; })}</></Card></A>
    {[0, 1, 2, 3].map((i) => <Cubes key={i} at={1.5 + i * 0.5} x={850} y={250 + i * 120} seed={30 + i} n={8} spread={150}/>)}</>; };

export const scenes: Scene[] = [
  {a: 0, theme: 'light', Panel: A2}, {a: 6.4, theme: 'dark', Panel: B2}, {a: 14.1, theme: 'light', Panel: C2}, {a: 18.0, theme: 'dark', Panel: D2}, {a: 22.7, theme: 'light', Panel: E2},
  {a: 26.3, theme: 'dark', Panel: () => <CtaPanel k="MARQUE" tType={26.6} tCard={28.0} t30={29.9} line="Qui sort sur votre nom ?"/>},
];
export const phrases: Phrase[] = [
  {a: 0.3, b: 1.7, text: 'Tapez le nom|de votre société|dans *Google.*'},
  {a: 2.3, b: 2.9, text: 'Qui sort|*en premier ?*'},
  {a: 3.6, b: 4.6, text: "Si c'est vous,|*parfait.*"},
  {a: 5.4, b: 6.1, text: 'Mais regardez|*la suite.*'},
  {a: 6.8, b: 8.3, text: 'Un annuaire,|avec un *vieux numéro.*'},
  {a: 9.0, b: 11.3, text: 'Un distributeur,|qui vend aussi|*vos concurrents.*'},
  {a: 12.1, b: 13.8, text: "Une page d'avis que|*personne ne surveille.*"},
  {a: 14.5, b: 15.7, text: 'Ces gens-là parlent|*à votre place.*'},
  {a: 16.2, b: 17.4, text: 'À des clients qui|*vous cherchaient, vous.*'},
  {a: 18.4, b: 20.5, text: 'Votre nom : la recherche|*la plus facile à gagner.*'},
  {a: 20.9, b: 22.2, text: "Beaucoup d'entreprises|*la laissent filer.*"},
  {a: 23.1, b: 26.0, text: 'On travaille votre|première page,|*ligne par ligne.*'},
  {a: 26.6, b: 27.5, text: 'Commentez|*« MARQUE »*'},
  {a: 28.0, b: 29.3, text: 'On regarde qui sort|*sur votre nom.*'},
  {a: 29.9, b: 31.0, text: '*30 minutes,*|au téléphone.'},
];
export const dur = 32.4;
