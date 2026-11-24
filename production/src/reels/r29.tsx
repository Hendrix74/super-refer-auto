import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Type, Count, Cubes, CtaPanel, Logo, Bar, useT, useTh, useDark, OR, GR, RED, P, io, oc, L, Scene, Phrase} from '../lib';
import T from '../../spec/r29_t.json';

// chronomètre circulaire
export const Ring: React.FC<{x: number; y: number; r: number; p: number; c?: string; children?: React.ReactNode; w?: number}> = ({x, y, r, p, c = OR, children, w = 22}) => {
  const th = useTh(); const C = 2 * Math.PI * r;
  return <div style={{position: 'absolute', left: x - r - w, top: y - r - w, width: 2 * (r + w), height: 2 * (r + w)}}>
    <svg width={2 * (r + w)} height={2 * (r + w)}><circle cx={r + w} cy={r + w} r={r} fill="none" stroke={th.line} strokeWidth={w}/>
      <circle cx={r + w} cy={r + w} r={r} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeDasharray={`${C * p} ${C}`} transform={`rotate(-90 ${r + w} ${r + w})`}/></svg>
    <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{children}</div></div>;
};
export const BrowserBar: React.FC<{url: string; w?: number}> = ({url, w = 940}) => { const th = useTh();
  return <div style={{position: 'absolute', left: 0, top: 0, width: w, height: 78, borderBottom: `2px solid ${th.line}`, display: 'flex', alignItems: 'center', gap: 12, padding: '0 28px'}}>
    {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <div key={c} style={{width: 18, height: 18, borderRadius: 9, background: c}}/>)}
    <div style={{marginLeft: 18, flex: 1, height: 44, borderRadius: 22, background: th.soft, display: 'flex', alignItems: 'center', padding: '0 22px'}}><Tx s={24} w={500} c={th.mut}>{url}</Tx></div></div>;
};
const Lines: React.FC<{n: number; y: number; seed?: number; h?: number; gap?: number; c?: string}> = ({n, y, seed = 1, h = 18, gap = 34, c}) => { const th = useTh();
  return <>{[...Array(n)].map((_, i) => <div key={i} style={{position: 'absolute', left: 40, top: y + i * gap, height: h, width: 860 * (0.55 + 0.45 * Math.abs(Math.sin(i * 1.7 + seed))), borderRadius: h / 2, background: c ?? th.line}}/>)}</>;
};

// A — la page qui parle trop
const A0: React.FC = () => { const t = useT(); const th = useTh(); const sc = t * 120;
  return <><A at={0.05} kind="up"><Card x={0} y={20} w={940} h={660} style={{overflow: 'hidden'}}>
      <BrowserBar url="votre-entreprise.fr/services"/>
      <div style={{position: 'absolute', left: 0, top: 78, width: 940, height: 582, overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 0, top: 30 - sc, width: 940}}>
          <Tx s={46} w={800} style={{position: 'absolute', left: 40, top: 0}}>Nos services</Tx>
          {[...Array(6)].map((_, k) => <React.Fragment key={k}><div style={{position: 'absolute', left: 40, top: 90 + k * 290, width: 300, height: 26, borderRadius: 13, background: th.mut, opacity: 0.5}}/><Lines n={6} y={140 + k * 290} seed={k * 3 + 1}/></React.Fragment>)}
        </div></div></Card></A>
    <A at={1.43} kind="pop"><Box x={700} y={-30}><div style={{width: 210, height: 210, borderRadius: 105, background: th.card, boxShadow: th.sh}}><Ring x={105} y={105} r={80} p={io(P(t, 1.5, 2.4))} w={18}><Tx s={64} w={800}>10<span style={{fontSize: 34, color: th.mut}}> s</span></Tx></Ring></div></Box></A>
    <Cubes at={1.45} x={805} y={75} seed={3} n={10} spread={180}/></>; };

// B — ouvrir la page de services, lire à voix haute
const B0: React.FC = () => { const t = useT(); const th = useTh(); const items = ['Accueil', 'Entreprise', 'Services', 'Contact'];
  const cx = L(120, 610, io(P(t, 0.15, 0.6))), cy = L(300, 150, io(P(t, 0.15, 0.6))); const on = t > 0.62; const press = Math.sin(P(t, 0.6, 0.8) * Math.PI);
  return <><Card x={0} y={40} w={940} h={220}><BrowserBar url="votre-entreprise.fr"/>
      {items.map((x, i) => <Box key={i} x={40 + i * 222} y={110} w={200} h={80} style={{borderRadius: 40, background: on && i === 2 ? OR : th.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: i === 2 ? `scale(${1 - press * 0.1})` : undefined}}><Tx s={30} w={700} c={on && i === 2 ? '#fff' : th.ink}>{x}</Tx></Box>)}</Card>
    <div style={{position: 'absolute', left: cx, top: cy, opacity: t < 1.1 ? 1 : 0}}><Ic n="hand" s={84} c={th.ink}/></div>
    <A at={1.2} kind="up"><Card x={0} y={320} w={940} h={420}>
      <Dot s={150} n="chat" c={OR} style={{position: 'absolute', left: 50, top: 135}}/>
      <Label style={{position: 'absolute', left: 240, top: 50}}>Lecture à voix haute</Label>
      {[...Array(26)].map((_, i) => { const hgt = 30 + 200 * Math.abs(Math.sin(t * 9 + i * 0.9) * Math.sin(t * 3.1 + i * 0.37)) * P(t, 1.3, 1.6);
        return <div key={i} style={{position: 'absolute', left: 250 + i * 25, top: 230 - hgt / 2, width: 14, height: hgt, borderRadius: 7, background: i % 5 === 0 ? th.ink : OR}}/>; })}
    </Card></A></>; };

// C — le texte lu : historique, passion, valeurs
const C0: React.FC = () => { const t = useT(); const th = useTh();
  const qs: [string, number, number][] = [['Fondée en 1998, notre société…', 0.16, 1.4], ['Une équipe passionnée à votre écoute…', 1.94, 2.5], ['Des valeurs fortes : proximité, exigence…', 2.55, 3.1]];
  const reading = qs.findIndex((q, i) => t >= q[1] && (i === qs.length - 1 || t < qs[i + 1][1]));
  return <><Card x={0} y={150} w={940} h={600}><BrowserBar url="votre-entreprise.fr/services"/>
      <Tx s={42} w={800} style={{position: 'absolute', left: 40, top: 110}}>Nos services</Tx>
      {qs.map(([q, a, b], i) => <Box key={i} x={28} y={190 + i * 128} w={884} h={110} style={{borderRadius: 22, background: reading === i ? 'rgba(255,79,31,.10)' : th.soft, border: `3px solid ${reading === i ? OR : 'transparent'}`, padding: '0 26px', display: 'flex', alignItems: 'center'}}>
        <Tx s={36} w={600} c={t >= a ? th.ink : th.mut}>{t >= a ? <Type text={q} a={a} b={b} cursor={reading === i}/> : ''}</Tx></Box>)}
      <Lines n={2} y={570} seed={7}/></Card>
    <Box x={640} y={-20}><div style={{width: 270, height: 150, borderRadius: 75, background: th.card, boxShadow: th.sh, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14}}>
      <Ic n="cal" s={56} c={OR}/><Tx s={66} w={800}><Count to={9} a={0} b={3.2}/> s</Tx></div></Box></>; };

// D — 10 secondes, toujours rien sur ce que vous vendez
const D0: React.FC = () => { const t = useT(); const th = useTh();
  return <><Box x={0} y={60}><div style={{width: 380, height: 380}}><Ring x={190} y={190} r={150} p={L(0.9, 1, P(t, 0, 0.3))} c={RED} w={28}><Tx s={110} w={800} c={RED}>10<span style={{fontSize: 50}}> s</span></Tx></Ring></div></Box>
    <A at={0.15} kind="right"><Card x={420} y={60} w={520} h={380} style={{border: `3px dashed ${RED}`}}><Label style={{position: 'absolute', left: 34, top: 36}}>Ce que vous vendez</Label>
      <Tx s={180} w={800} c={RED} style={{position: 'absolute', left: 0, right: 0, top: 110, textAlign: 'center', transform: `scale(${L(1.5, 1, oc(P(t, 0.3, 0.6)))})`}}>?</Tx></Card></A>
    <A at={0.5} kind="pop"><Box x={0} y={520} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill c={RED} s={44}><Ic n="x" s={44} c="#fff"/>Toujours rien</Chip></Box></A></>; };

// E — l'acheteur ferme l'onglet
const E0: React.FC = () => { const t = useT(); const th = useTh(); const close = io(P(t, 0.65, 0.95));
  const hx = L(80, 410, io(P(t, 0.1, 0.6))), hy = L(420, 92, io(P(t, 0.1, 0.6)));
  return <><Card x={0} y={40} w={940} h={600} style={{overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 940, height: 110, background: th.soft}}/>
      <Box x={24} y={30} w={L(440, 0, close)} h={80} style={{borderRadius: '22px 22px 0 0', background: close < 0.5 ? th.card : th.soft, overflow: 'hidden', opacity: 1 - close, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16}}>
        <Ic n="building" s={36} c={th.mut}/><Tx s={30} w={700}>Votre entreprise</Tx><div style={{flex: 1}}/><Ic n="x" s={30} c={th.mut}/></Box>
      <Box x={L(480, 24, close)} y={30} w={440} h={80} style={{borderRadius: '22px 22px 0 0', background: close > 0.5 ? th.card : 'transparent', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16}}>
        <Ic n="building" s={36} c={OR}/><Tx s={30} w={700} c={close > 0.5 ? th.ink : th.mut}>Votre concurrent</Tx></Box>
      <div style={{position: 'absolute', left: 40, top: 160, opacity: 1 - close}}><Lines n={9} y={0} seed={2}/></div>
      <div style={{position: 'absolute', left: 0, top: 150, width: 940, opacity: close}}>
        <Tx s={50} w={800} style={{position: 'absolute', left: 40, top: 10, width: 860}}>Maintenance industrielle,<br/><span style={{color: OR}}>intervention sous 24 h</span></Tx>
        <Box x={40} y={190}><Chip fill s={34}>Demander un devis</Chip></Box></div></Card>
    <div style={{position: 'absolute', left: hx, top: hy, opacity: t < 1.05 ? 1 : 0}}><Ic n="hand" s={84} c={th.ink}/></div>
    <A at={0.95} kind="pop"><Box x={0} y={680} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill c={RED} s={40}>Parti en 10 secondes</Chip></Box></A></>; };

// F — ce que Google retient de la page
const F0: React.FC = () => { const t = useT(); const th = useTh();
  const words: [string, number][] = [['passion', 0.92], ['valeurs', 0.78], ['1998', 0.6], ['écoute', 0.5], ['votre métier', 0], ['votre ville', 0]];
  return <Card x={0} y={20} w={940} h={720}><Dot s={80} c={OR} n="search" style={{position: 'absolute', left: 36, top: 30}}/>
    <Label style={{position: 'absolute', left: 140, top: 56}}>Ce que Google retient</Label>
    {words.map(([w, v], i) => { const zero = v === 0; const on = t > 0.2 + i * 0.12;
      return <React.Fragment key={i}><Tx s={34} w={700} c={zero ? RED : th.ink} style={{position: 'absolute', left: 40, top: 150 + i * 92, opacity: on ? 1 : 0.2}}>{w}</Tx>
        <Bar x={330} y={158 + i * 92} w={480} h={34} v={v * io(P(t, 0.2 + i * 0.12, 0.7 + i * 0.12))} c={th.ink}/>
        {zero ? <A at={1.3 + (i - 4) * 0.2} kind="pop"><Box x={830} y={146 + i * 92}><Dot s={60} c={RED}>0</Dot></Box></A> : null}</React.Fragment>; })}
  </Card>; };

// G — la bonne première phrase : quoi, pour qui, où
const G0: React.FC = () => { const t = useT(); const th = useTh();
  const rows: [string, string, number][] = [['Quoi', 'Maintenance de lignes de production', 1.95], ['Pour qui', 'Pour les sites industriels', 2.35], ['Où', 'En Auvergne-Rhône-Alpes', 2.85]];
  return <><A at={0.1} kind="up"><Card x={0} y={0} w={940} h={600}><BrowserBar url="votre-entreprise.fr/services"/>
      <Label style={{position: 'absolute', left: 40, top: 110}}>Première phrase de la page</Label>
      {rows.map(([k, v, a], i) => { const on = t >= a;
        return <Box key={i} x={28} y={170 + i * 136} w={884} h={118} style={{borderRadius: 24, background: on ? 'rgba(255,79,31,.10)' : th.soft, border: `3px solid ${on ? OR : 'transparent'}`, display: 'flex', alignItems: 'center', gap: 24, padding: '0 24px'}}>
          <div style={{width: 170, flexShrink: 0}}>{on ? <Chip fill s={30}>{k}</Chip> : <Chip s={30} c={th.mut}>{k}</Chip>}</div>
          <Tx s={38} w={700} c={on ? th.ink : th.mut}>{t > 0.3 + i * 0.35 ? <Type text={v} a={0.3 + i * 0.35} b={0.8 + i * 0.35} cursor={false}/> : ''}</Tx></Box>; })}
    </Card></A>
    <A at={3.1} kind="pop"><Box x={0} y={650} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill c={GR} s={42}><Ic n="check" s={44} c="#fff"/>Compris en 2 secondes</Chip></Box></A>
    {rows.map(([, , a], i) => <Cubes key={i} at={a} x={150} y={230 + i * 136} seed={40 + i} n={8} spread={140}/>)}</>; };

// H — Super Refer : avant / après
const H0: React.FC = () => { const t = useT(); const th = useTh();
  return <><A at={0.08} kind="pop"><Box x={0} y={0} w={940} style={{display: 'flex', justifyContent: 'center'}}><Logo s={76}/></Box></A>
    {[0, 1].map((k) => { const after = k === 1; const on = t > 0.45 + k * 0.5;
      return <A key={k} at={0.3 + k * 0.5} kind="up"><Card x={k * 490} y={150} w={450} h={560} hl={after && t > 1.3}>
        <Label style={{position: 'absolute', left: 30, top: 32}}>{after ? 'Après' : 'Avant'}</Label>
        {after ? <><Box x={30} y={100} w={390} h={150} style={{borderRadius: 20, background: 'rgba(255,79,31,.12)', padding: 18}}><Tx s={30} w={800} style={{whiteSpace: 'normal', lineHeight: 1.2}}>Maintenance de lignes de production, en Rhône-Alpes</Tx></Box><div style={{position: 'absolute', left: 30, top: 270}}><Lines n={3} y={0} seed={5} gap={30} h={14}/></div></>
          : <div style={{position: 'absolute', left: -10, top: 100, width: 460, overflow: 'hidden', height: 300}}><Lines n={9} y={0} seed={9} gap={32} h={14}/></div>}
        <Box x={30} y={440}>{on ? <Chip fill c={after ? GR : RED} s={36}><Ic n={after ? 'check' : 'x'} s={38} c="#fff"/>{after ? '2 s' : '+ de 10 s'}</Chip> : null}</Box>
      </Card></A>; })}
    <Cubes at={1.3} x={715} y={400} seed={60} n={14} spread={260}/></>; };

export const phrases: Phrase[] = T.phrases;
export const dur = T.dur;
export const scenes: Scene[] = [
  {a: 0, theme: 'light', Panel: A0}, {a: 2.52, theme: 'dark', Panel: B0}, {a: 5.05, theme: 'light', Panel: C0}, {a: 8.33, theme: 'dark', Panel: D0},
  {a: 9.6, theme: 'light', Panel: E0}, {a: 11.1, theme: 'dark', Panel: F0}, {a: 13.35, theme: 'light', Panel: G0}, {a: 16.55, theme: 'dark', Panel: H0},
  {a: 19.45, theme: 'light', Panel: () => <CtaPanel k="SEO" tType={20.28} tCard={21.61} t30={22.7} line="Votre premier échange" label="Premier échange" chip="Réservé" ok/>},
];
