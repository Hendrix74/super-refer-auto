import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Cubes, CtaPanel, LogoPanel, useT, useTh, OR, GR, RED, P, io, oc, L, Scene, Phrase} from '../lib';
import {BrowserBar} from './r29';
import T from '../../spec/r47_t.json';
// temps en secondes de la voix d'origine (la vidéo tourne à 1,05)

const TIERS: [string, string][] = [['S', '#FF4F1F'], ['A', '#F59E0B'], ['B', '#5B5BF0'], ['C', '#8A8A86']];
const CARDS: Record<string, [string, string]> = {pub: ['euro', 'Budget pub'], site: ['eye', 'Beau site'], avis: ['star', 'Avis clients'], pages: ['doc', 'Pages réponses']};
const Tag: React.FC<{k: string; s?: number; glow?: boolean}> = ({k, s = 1, glow}) => { const th = useTh(); const [ic, lb] = CARDS[k];
  return <div style={{display: 'inline-flex', alignItems: 'center', gap: 12 * s, padding: `${12 * s}px ${22 * s}px`, borderRadius: 22 * s, background: th.card, border: `3px solid ${glow ? OR : th.line}`, boxShadow: glow ? '0 0 0 8px rgba(255,79,31,.18)' : th.sh, whiteSpace: 'nowrap'}}>
    <Ic n={ic} s={34 * s} c={OR}/><Tx s={32 * s} w={700}>{lb}</Tx></div>; };

// Tableau S/A/B/C compact, en haut des scènes ; placed = cartes déjà rangées, drop = carte qui tombe maintenant
const Board: React.FC<{placed: Record<string, string>; drop?: [string, string, number]; hi?: string; h?: number}> = ({placed, drop, hi, h = 76}) => { const t = useT(); const th = useTh();
  return <Card x={0} y={0} w={940} h={h * 4 + 24}>
    {TIERS.map(([k, c], i) => { const cards = Object.entries(placed).filter(([, r]) => r === k).map(([n]) => n);
      const dropping = drop && drop[1] === k; const p = dropping ? io(P(t, drop![2], drop![2] + 0.45)) : 0;
      return <div key={k} style={{position: 'absolute', left: 12, top: 12 + i * h, width: 916, height: h - 6, borderRadius: 18, background: hi === k ? 'rgba(255,79,31,.10)' : th.soft, display: 'flex', alignItems: 'center', gap: 14}}>
        <div style={{width: h - 6, height: h - 6, borderRadius: 18, background: c, color: '#fff', fontSize: h * 0.5, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{k}</div>
        {cards.map((n) => <Tag key={n} k={n} s={0.95}/>)}
        {dropping && p > 0 ? <div style={{transform: `translateY(${(1 - p) * -260}px) rotate(${(1 - p) * -8}deg)`, opacity: Math.min(1, p * 4)}}><Tag k={drop![0]} s={0.95} glow={k === 'S'}/></div> : null}
      </div>; })}
  </Card>; };

// A — le budget pub monte, les clients ?
const A0: React.FC = () => { const t = useT(); const th = useTh(); const k = oc(P(t, 0.05, 2.4));
  return <>
    <Card x={0} y={0} w={940} h={330}>
      <Label style={{position: 'absolute', left: 36, top: 30}}>Budget pub · ce mois</Label>
      <Box x={36} y={80} style={{display: 'flex', alignItems: 'center', gap: 16}}><Ic n="up" s={90} c={OR}/><Tx s={110} w={800} c={OR}>{'€'.repeat(1 + Math.floor(k * 4.99))}</Tx></Box>
      <div style={{position: 'absolute', left: 36, top: 240, width: 868, height: 30, borderRadius: 15, background: th.soft}}><div style={{width: `${L(10, 92, k)}%`, height: 30, borderRadius: 15, background: OR}}/></div>
    </Card>
    <A at={0.35} kind="up"><Card x={0} y={370} w={940} h={300}>
      <Label style={{position: 'absolute', left: 36, top: 30}}>Nouveaux clients</Label>
      <svg width={940} height={300} style={{position: 'absolute', left: 0, top: 0}}><polyline points="40,230 200,226 360,232 520,224 680,229 860,226" fill="none" stroke={th.mut} strokeWidth={8} strokeLinecap="round" strokeDasharray="1400" strokeDashoffset={1400 * (1 - io(P(t, 0.5, 1.8)))}/></svg>
      <A at={1.7} kind="pop"><Box x={700} y={80}><Dot s={110} c={RED}><span style={{fontSize: 70}}>?</span></Dot></Box></A>
    </Card></A>
  </>; };

// B — les 4 leviers à classer
const B0: React.FC = () => <>
  <A at={0.1} kind="up"><Board placed={{}} h={100}/></A>
  {['pub', 'site', 'avis', 'pages'].map((k, i) => <A key={k} at={0.6 + i * 0.25} kind="pop"><Box x={i % 2 ? 480 : 0} y={470 + Math.floor(i / 2) * 110} w={460} style={{display: 'flex', justifyContent: 'center'}}><Tag k={k}/></Box></A>)}
</>;

// C — budget pub en C : on coupe, les demandes tombent
const C0: React.FC = () => { const t = useT(); const th = useTh(); const off = t > 3.1; const sw = io(P(t, 3.0, 3.25));
  const pts = [0.7, 0.72, 0.68, 0.74, 0.71, 0.7, 0.2, 0.08, 0.06, 0.05]; const n = pts.length;
  const vis = L(5, n - 1, io(P(t, 3.2, 4.0)));
  const xy = pts.map((v, i) => [40 + (i / (n - 1)) * 520, 60 + (1 - v) * 220]).slice(0, Math.floor(vis) + 1);
  return <>
    <Board placed={{}} drop={['pub', 'C', 0.15]} hi="C" h={80}/>
    <A at={0.9} kind="up"><Card x={0} y={370} w={300} h={350}>
      <Label style={{position: 'absolute', left: 30, top: 30}}>Pub</Label>
      <div style={{position: 'absolute', left: 60, top: 120, width: 180, height: 96, borderRadius: 48, background: off ? th.line : GR}}>
        <div style={{position: 'absolute', top: 8, left: L(92, 8, sw), width: 80, height: 80, borderRadius: 40, background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,.2)'}}/></div>
      <Tx s={56} w={800} c={off ? RED : GR} style={{position: 'absolute', left: 0, right: 0, top: 240, textAlign: 'center'}}>{off ? 'OFF' : 'ON'}</Tx>
    </Card></A>
    <A at={1.1} kind="up"><Card x={330} y={370} w={610} h={350}>
      <Label style={{position: 'absolute', left: 30, top: 30}}>Demandes reçues</Label>
      <svg width={610} height={380} style={{position: 'absolute', left: 0, top: 50}}><polyline points={xy.map((p) => p.join(',')).join(' ')} fill="none" stroke={off ? RED : OR} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round"/></svg>
      <A at={3.9} kind="pop"><Box x={330} y={40}><Chip fill c={RED} s={32}>0 demande</Chip></Box></A>
    </Card></A>
  </>; };

// D — beau site en B : personne ne le trouve
const D0: React.FC = () => { const t = useT(); const th = useTh();
  return <>
    <Board placed={{pub: 'C'}} drop={['site', 'B', 0.15]} hi="B" h={80}/>
    <A at={0.8} kind="up"><Card x={0} y={370} w={940} h={380}>
      <BrowserBar url="votre-entreprise.fr"/>
      <div style={{position: 'absolute', left: 40, top: 120, width: 520, height: 230, borderRadius: 24, background: 'linear-gradient(135deg, #FFB199 0%, #FF4F1F 100%)'}}/>
      <div style={{position: 'absolute', left: 590, top: 130, width: 300, height: 26, borderRadius: 13, background: th.ink, opacity: 0.85}}/>
      {[0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', left: 590, top: 185 + i * 36, width: 300 - i * 50, height: 16, borderRadius: 8, background: th.line}}/>)}
      <div style={{position: 'absolute', left: 590, top: 300, width: 180, height: 50, borderRadius: 25, background: OR}}/>
      <A at={2.0} kind="fade"><div style={{position: 'absolute', inset: 0, background: 'rgba(20,20,18,.55)'}}/></A>
      <A at={2.1} kind="pop"><Box x={0} y={140} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill c={RED} s={44}><Ic n="eye" s={44} c="#fff"/>{Math.round(L(0, 0, P(t, 2, 3)))} visiteur</Chip></Box></A>
    </Card></A>
  </>; };

// E — avis clients détaillés en A
const E0: React.FC = () => { const th = useTh();
  return <>
    <Board placed={{pub: 'C', site: 'B'}} drop={['avis', 'A', 0.15]} hi="A" h={80}/>
    {[0, 1, 2].map((i) => <A key={i} at={0.8 + i * 0.3} kind="left"><Card x={i * 30} y={370 + i * 124} w={850} h={112} style={{display: 'flex', alignItems: 'center', gap: 22, padding: '0 26px'}}>
      <Dot s={66} c={['#5B5BF0', GR, '#F59E0B'][i]} n="user"/>
      <div><div style={{display: 'flex', gap: 4}}>{[0, 1, 2, 3, 4].map((s) => <Ic key={s} n="star" s={30} c="#F59E0B"/>)}</div>
        <div style={{marginTop: 10, height: 14, width: 520 - i * 60, borderRadius: 7, background: th.line}}/><div style={{marginTop: 8, height: 14, width: 380 - i * 40, borderRadius: 7, background: th.line}}/></div>
    </Card></A>)}
  </>; };

// F — rang S : des pages qui répondent aux questions des acheteurs, montrées toute l'année
const F0: React.FC = () => { const t = useT(); const th = useTh(); const m = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  return <>
    <Board placed={{pub: 'C', site: 'B', avis: 'A'}} drop={['pages', 'S', 0.1]} hi="S" h={80}/>
    <A at={0.9} kind="up"><Card x={0} y={370} w={940} h={250}>
      <Box x={30} y={26} w={880} h={80} style={{borderRadius: 40, border: `3px solid ${th.line}`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 26px'}}><Ic n="search" s={34} c={th.mut}/><Tx s={30} w={600}>délai de fabrication pour 500 pièces ?</Tx></Box>
      <A at={1.6} kind="up"><Box x={30} y={128} w={880} h={100} style={{borderRadius: 22, background: 'rgba(255,79,31,.10)', border: `3px solid ${OR}`, padding: '16px 24px'}}>
        <Tx s={26} w={600} c={GR}>votre-entreprise.fr › questions</Tx><Tx s={32} w={800} style={{marginTop: 6}}>Délais de fabrication : ce qu'il faut prévoir</Tx></Box></A>
    </Card></A>
    <A at={3.7} kind="up"><Box x={0} y={650} w={940} h={90} style={{display: 'flex', gap: 8}}>{m.map((x, i) => { const on = P(t, 3.8 + i * 0.07, 3.95 + i * 0.07);
      return <div key={i} style={{flex: 1, height: 90, borderRadius: 16, background: on > 0.5 ? OR : th.soft, color: on > 0.5 ? '#fff' : th.mut, fontSize: 34, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x}</div>; })}</Box></A>
  </>; };

// G — donc non : soyez trouvé
const G0: React.FC = () => { const t = useT(); const th = useTh(); const st = oc(P(t, 0.35, 0.7));
  return <>
    <A at={0.05} kind="pop"><Card x={120} y={0} w={700} h={170} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}>
      <Ic n="euro" s={70} c={th.mut}/><Tx s={62} w={800} c={th.mut}>+ de budget pub</Tx>
      <div style={{position: 'absolute', left: 40, top: 82, width: 620 * st, height: 10, borderRadius: 5, background: RED}}/></Card></A>
    <A at={1.3} kind="up"><Card x={0} y={230} w={940} h={420} hl>
      <Box x={30} y={30} w={880} h={84} style={{borderRadius: 42, border: `3px solid ${th.line}`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 26px'}}><Ic n="search" s={36} c={th.mut}/><Tx s={32} w={600}>ce que cherchent vos clients</Tx></Box>
      <Box x={30} y={150} w={880} h={110} style={{borderRadius: 22, background: 'rgba(255,79,31,.10)', display: 'flex', alignItems: 'center', gap: 20, padding: '0 24px'}}><Dot s={70} c={OR}>1</Dot><Tx s={40} w={800}>Votre entreprise</Tx></Box>
      {[0, 1].map((i) => <div key={i} style={{position: 'absolute', left: 54, top: 300 + i * 50, height: 18, width: 640 - i * 160, borderRadius: 9, background: th.line}}/>)}
    </Card></A>
    <Cubes at={1.6} x={470} y={430} seed={4}/>
  </>; };

const H0: React.FC = () => <LogoPanel sub="Référencement piloté" at={0.1} subAt={1.2}/>;

export const phrases: Phrase[] = T.phrases;
export const dur = T.dur;
export const scenes: Scene[] = [
  {a: 0, theme: 'light', Panel: A0}, {a: 2.95, theme: 'dark', Panel: B0}, {a: 5.85, theme: 'light', Panel: C0},
  {a: 10.7, theme: 'light', Panel: D0}, {a: 15.25, theme: 'light', Panel: E0}, {a: 18.05, theme: 'light', Panel: F0},
  {a: 23.7, theme: 'light', Panel: G0}, {a: 27.15, theme: 'dark', Panel: H0},
  {a: 29.7, theme: 'light', Panel: () => <CtaPanel k="SEO" tType={29.9} tCard={30.95} t30={31.7} line="Votre premier échange" label="Premier échange" chip="Réservé" ok/>},
];
