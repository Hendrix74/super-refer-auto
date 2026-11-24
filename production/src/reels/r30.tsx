import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Type, Cubes, CtaPanel, Logo, useT, useTh, OR, GR, RED, P, io, oc, L, Scene, Phrase} from '../lib';
import {BrowserBar} from './r29';
import T from '../../spec/r30_t.json';

const Para: React.FC<{x: number; y: number; w: number; h: number; n: number; hl?: boolean; dim?: number; style?: React.CSSProperties}> = ({x, y, w, h, n, hl, dim = 1, style}) => { const th = useTh();
  return <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 18, background: hl ? 'rgba(255,79,31,.14)' : th.soft, border: `3px solid ${hl ? OR : 'transparent'}`, opacity: dim, padding: '14px 18px', ...style}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 14}}><Dot s={40} c={hl ? OR : th.mut}>{n}</Dot>
      <div style={{flex: 1}}>{[0.95, 0.8, 0.6].slice(0, h > 90 ? 3 : 2).map((k, i) => <div key={i} style={{height: 12, width: `${k * 100}%`, borderRadius: 6, background: hl ? OR : th.line, opacity: hl ? 0.55 : 1, marginTop: i ? 10 : 0}}/>)}</div></div></div>;
};

// A — le 6e paragraphe de la page, copié
const A0: React.FC = () => { const t = useT(); const th = useTh(); const sel = t > 0.75;
  return <><Card x={0} y={0} w={940} h={760} style={{overflow: 'hidden'}}><BrowserBar url="votre-entreprise.fr/services"/>
      {[...Array(8)].map((_, i) => <A key={i} at={0.05 + i * 0.05} kind="fade"><Para x={28} y={96 + i * 82} w={884} h={70} n={i + 1} hl={i === 5 && sel} dim={sel && i !== 5 ? 0.45 : 1}/></A>)}</Card>
    <A at={1.0} kind="pop"><Box x={650} y={500}><Chip fill s={36}><Ic n="doc" s={38} c="#fff"/>Ctrl + C</Chip></Box></A></>; };

// B — collé seul dans une page vide
const B0: React.FC = () => { const t = useT(); const th = useTh(); const fly = oc(P(t, 0.3, 0.8)); const spot = t > 1.28;
  return <><Card x={60} y={0} w={820} h={760}><div style={{position: 'absolute', left: 0, top: 0, width: 820, height: 78, borderBottom: `2px solid ${th.line}`, display: 'flex', alignItems: 'center', padding: '0 28px', gap: 14}}><Ic n="doc" s={40} c={th.mut}/><Tx s={28} w={600} c={th.mut}>Sans titre</Tx></div>
      <Para x={40} y={L(-260, 300, fly)} w={740} h={110} n={6} hl/>
      {spot ? <div style={{position: 'absolute', left: 20, top: 280, width: 780, height: 150, borderRadius: 26, border: `4px dashed ${OR}`}}/> : null}</Card>
    <A at={0.85} kind="pop"><Box x={590} y={620}><Chip fill s={36}><Ic n="doc" s={38} c="#fff"/>Ctrl + V</Chip></Box></A>
    <A at={1.3} kind="pop"><Box x={110} y={620}><Chip s={36} c={OR}><Ic n="eye" s={38} c={OR}/>Lu tout seul</Chip></Box></A></>; };

// C — on comprend qui vous êtes ? ce que vous vendez ?
const C0: React.FC = () => { const t = useT(); const th = useTh();
  const q: [string, string, number][] = [['user', 'Qui vous êtes ?', 0.14], ['euro', 'Ce que vous vendez ?', 0.97]];
  return <><Card x={0} y={0} w={940} h={260}><Label style={{position: 'absolute', left: 36, top: 34}}>Paragraphe 6, lu seul</Label>
      <Tx s={34} w={600} c={th.mut} style={{position: 'absolute', left: 36, top: 90, width: 860, lineHeight: 1.35}}>« Nous mettons tout en œuvre pour répondre au mieux à vos attentes, avec réactivité. »</Tx></Card>
    {q.map(([ic, s, a], i) => <A key={i} at={a} kind="left"><Card x={0} y={310 + i * 200} w={940} h={170}><Dot s={100} c={th.ink} ic={th.card} n={ic} style={{position: 'absolute', left: 34, top: 35}}/>
      <Tx s={48} w={800} style={{position: 'absolute', left: 170, top: 54}}>{s}</Tx>
      <A at={a + 0.25} kind="pop"><Box x={780} y={25}><Dot s={120} c={RED}><span style={{fontSize: 80}}>?</span></Dot></Box></A></Card></A>)}</>; };

// D — ChatGPT lit votre site par morceaux
const D0: React.FC = () => { const t = useT(); const th = useTh(); const cut = io(P(t, 2.25, 2.7));
  return <><A at={0.1} kind="up"><Box x={0} y={0} w={940} style={{display: 'flex', alignItems: 'center', gap: 22, justifyContent: 'center'}}><Dot s={96} c={OR} n="chat"/><Tx s={46} w={800}>L'assistant IA lit…</Tx></Box></A>
    <A at={0.3} kind="up"><Card x={140} y={140} w={660} h={640} style={{background: 'transparent', boxShadow: 'none'}}>
      {[...Array(5)].map((_, i) => <div key={i} style={{position: 'absolute', left: (i % 2 ? 1 : -1) * cut * 60, top: i * 124 + cut * i * 10, width: 660, height: 112, transform: `rotate(${(i % 2 ? 1 : -1) * cut * 3}deg)`}}>
        <div style={{width: '100%', height: '100%', borderRadius: cut > 0.1 ? 18 : i === 0 ? '18px 18px 0 0' : i === 4 ? '0 0 18px 18px' : 0, background: th.card, boxShadow: th.sh, padding: '20px 26px'}}>
          {[0.9, 0.7].map((k, j) => <div key={j} style={{height: 14, width: `${k * 100}%`, borderRadius: 7, background: th.line, marginTop: j ? 14 : 8}}/>)}</div></div>)}
      {cut > 0 && cut < 1 ? [...Array(4)].map((_, i) => <div key={i} style={{position: 'absolute', left: -40, top: 118 + i * 124, width: 740 * cut, height: 4, background: OR}}/>) : null}</Card></A>
    <Cubes at={2.3} x={470} y={450} seed={70} n={14} spread={320}/></>; };

// E — il garde un passage et répond avec
const E0: React.FC = () => { const t = useT(); const th = useTh(); const pick = io(P(t, 0.9, 1.6));
  return <><Label style={{position: 'absolute', left: 0, right: 0, top: 0, textAlign: 'center'}}>Les morceaux de votre site</Label>
    {[...Array(4)].map((_, i) => { const me = i === 2;
      return <div key={i} style={{position: 'absolute', left: 20 + i * 230, top: me ? L(60, 340, pick) : 60, width: 210, height: 130, borderRadius: 18, background: me && t > 0.6 ? 'rgba(255,79,31,.16)' : th.card, border: `3px solid ${me && t > 0.6 ? OR : 'transparent'}`, boxShadow: th.sh, padding: 18, opacity: !me && t > 0.9 ? 0.35 : 1, transform: me ? `translateX(${L(0, -250, pick)}px) scale(${L(1, 1.25, pick)})` : undefined}}>
        {[0.9, 0.6, 0.75].map((k, j) => <div key={j} style={{height: 12, width: `${k * 100}%`, borderRadius: 6, background: me && t > 0.6 ? OR : th.line, opacity: 0.7, marginTop: j ? 12 : 4}}/>)}</div>; })}
    <A at={2.34} kind="up"><Card x={0} y={530} w={940} h={230}><Dot s={80} c={OR} n="chat" style={{position: 'absolute', left: 30, top: 30}}/>
      <Label style={{position: 'absolute', left: 130, top: 40}}>Réponse de l'IA</Label>
      <Tx s={36} w={600} style={{position: 'absolute', left: 130, top: 96, width: 760}}><Type text="D'après votre-entreprise.fr, …" a={2.4} b={2.9}/></Tx></Card></A></>; };

// F — « comme évoqué plus haut » : inutilisable
const F0: React.FC = () => { const t = useT(); const th = useTh();
  return <><Card x={0} y={40} w={940} h={360}><Label style={{position: 'absolute', left: 36, top: 34}}>Le passage gardé</Label>
      <Tx s={50} w={700} style={{position: 'absolute', left: 36, top: 100, width: 860, lineHeight: 1.25}}>« <Type text="Comme évoqué plus haut, notre solution s'adapte à vos enjeux." a={0.1} b={1.6} cursor={t < 1.8}/> »</Tx></Card>
    <A at={1.81} kind="pop" d={0.25}><Box x={230} y={300}><div style={{transform: `rotate(-8deg) scale(${L(1.6, 1, oc(P(t, 1.81, 2.05)))})`, border: `8px solid ${RED}`, color: RED, fontSize: 76, fontWeight: 800, padding: '8px 34px', borderRadius: 20, letterSpacing: '0.02em', background: th.card}}>INUTILISABLE</div></Box></A>
    <A at={2.1} kind="up"><Card x={0} y={500} w={940} h={200}><Dot s={80} c={th.mut} n="chat" style={{position: 'absolute', left: 30, top: 60}}/>
      <Tx s={40} w={700} c={th.mut} style={{position: 'absolute', left: 140, top: 50, width: 760}}>« Je ne trouve pas d'information précise sur cette entreprise. »</Tx></Card></A></>; };

// G — chaque bloc tient seul : métier, ville, preuve
const G0: React.FC = () => { const t = useT(); const th = useTh();
  const b: [string, string, string, number][] = [['building', 'Métier', 'Maintenance de lignes de production', 1.49], ['pin', 'Ville', 'Basés à Lyon, en Rhône-Alpes', 1.95], ['star', 'Preuve', 'Référence : 3 usines agroalimentaires', 2.45]];
  return <>{b.map(([ic, k, v, a], i) => { const on = t >= a;
      return <A key={i} at={0.2 + i * 0.2} kind="left"><Card x={0} y={20 + i * 250} w={940} h={220} hl={on}>
        <Dot s={110} c={on ? OR : th.mut} n={ic} style={{position: 'absolute', left: 36, top: 55}}/>
        <Box x={176} y={42}>{on ? <Chip fill s={30}>{k}</Chip> : <Chip s={30} c={th.mut}>{k}</Chip>}</Box>
        <Tx s={36} w={700} style={{position: 'absolute', left: 176, top: 116, width: 630}}>{v}</Tx>
        {on ? <Box x={830} y={70}><Dot s={80} c={GR} n="check"/></Box> : null}</Card></A>; })}
    {b.map(([, , , a], i) => <Cubes key={i} at={a} x={870} y={130 + i * 250} seed={80 + i} n={8} spread={140}/>)}</>; };

// H — Super Refer : chaque morceau vous vend
const H0: React.FC = () => { const t = useT(); const th = useTh();
  return <><A at={0.08} kind="pop"><Box x={0} y={0} w={940} style={{display: 'flex', justifyContent: 'center'}}><Logo s={76}/></Box></A>
    {[0, 1, 2, 3].map((i) => <A key={i} at={0.35 + i * 0.12} kind="pop"><Box x={20 + i * 230} y={150} w={210} h={130} style={{borderRadius: 18, background: th.card, boxShadow: th.sh, border: `3px solid ${GR}`, padding: 18}}>
      <Dot s={46} c={GR} n="check"/><div style={{height: 12, width: '85%', borderRadius: 6, background: th.line, marginTop: 14}}/></Box></A>)}
    <A at={1.1} kind="up"><Card x={0} y={340} w={940} h={300} hl={t > 1.8}><Dot s={80} c={OR} n="chat" style={{position: 'absolute', left: 30, top: 30}}/>
      <Label style={{position: 'absolute', left: 130, top: 40}}>Réponse de l'IA</Label>
      <Tx s={38} w={700} style={{position: 'absolute', left: 130, top: 96, width: 770, lineHeight: 1.3}}><Type text="Pour la maintenance de lignes de production à Lyon, " a={1.2} b={1.9} cursor={false}/>{t > 1.9 ? <span style={{color: OR}}><Type text="votre-entreprise.fr" a={1.9} b={2.3}/></span> : null}</Tx></Card></A>
    <Cubes at={2.3} x={700} y={560} seed={90} n={14} spread={260}/></>; };

export const phrases: Phrase[] = T.phrases;
export const dur = T.dur;
export const scenes: Scene[] = [
  {a: 0, theme: 'light', Panel: A0}, {a: 1.82, theme: 'dark', Panel: B0}, {a: 3.8, theme: 'light', Panel: C0}, {a: 5.4, theme: 'dark', Panel: D0},
  {a: 8.1, theme: 'light', Panel: E0}, {a: 11.3, theme: 'dark', Panel: F0}, {a: 14.0, theme: 'light', Panel: G0}, {a: 17.25, theme: 'dark', Panel: H0},
  {a: 20.4, theme: 'light', Panel: () => <CtaPanel k="SEO" tType={21.2} tCard={22.53} t30={23.62} line="Votre premier échange" label="Premier échange" chip="Réservé" ok/>},
];
