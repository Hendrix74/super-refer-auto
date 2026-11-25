import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Cubes, CtaPanel, LogoPanel, useT, useTh, OR, GR, RED, P, io, oc, L, Scene, Phrase} from '../lib';
import {BrowserBar} from './r29';
import T from '../../spec/r44_t.json';
// temps en secondes de la voix d'origine (la vidéo tourne à 1,05)

// A — la courbe des visites qui descend
const A0: React.FC = () => { const t = useT(); const th = useTh();
  const pts = [0.82, 0.8, 0.84, 0.76, 0.7, 0.66, 0.55, 0.47, 0.38, 0.3];
  const k = io(P(t, 0.1, 1.9)); const n = pts.length; const W = 840, H = 420;
  const xy = pts.map((v, i) => [50 + (i / (n - 1)) * W, 120 + (1 - v) * H]);
  const vis = Math.max(1, k * (n - 1)); const i0 = Math.floor(vis); const f = vis - i0;
  const draw = xy.slice(0, i0 + 1).concat(i0 + 1 < n ? [[L(xy[i0][0], xy[i0 + 1][0], f), L(xy[i0][1], xy[i0 + 1][1], f)]] : []);
  const last = draw[draw.length - 1];
  return <Card x={0} y={0} w={940} h={640}>
    <Label style={{position: 'absolute', left: 40, top: 36}}>Visites du site · 12 mois</Label>
    {[0, 1, 2, 3].map((i) => <div key={i} style={{position: 'absolute', left: 50, top: 140 + i * 130, width: 840, height: 2, background: th.line}}/>)}
    <svg width={940} height={640} style={{position: 'absolute', left: 0, top: 0}}><polyline points={draw.map((p) => p.join(',')).join(' ')} fill="none" stroke={OR} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round"/></svg>
    <div style={{position: 'absolute', left: last[0] - 16, top: last[1] - 16, width: 32, height: 32, borderRadius: 16, background: OR, boxShadow: '0 0 0 10px rgba(255,79,31,.2)'}}/>
    <A at={1.5} kind="pop"><Box x={600} y={440}><Chip fill c={RED} s={34}><Ic n="up" s={34} c="#fff" style={{transform: 'scaleY(-1)'}}/>En baisse</Chip></Box></A>
  </Card>; };

// B — le site, lui, va bien
const B0: React.FC = () => { const th = useTh();
  const ok: [string, number][] = [['Site rapide', 0.3], ['Pages indexées', 0.6], ['Aucune erreur', 0.9]];
  return <><Card x={0} y={0} w={940} h={520}>
      <BrowserBar url="votre-entreprise.fr"/>
      {ok.map(([k, a], i) => <A key={k} at={a} kind="left"><Box x={40} y={120 + i * 125} w={860} h={100} style={{borderRadius: 22, background: th.soft, display: 'flex', alignItems: 'center', gap: 22, padding: '0 26px'}}>
        <Dot s={62} c={GR} n="check"/><Tx s={40} w={700}>{k}</Tx></Box></A>)}
    </Card>
    <A at={1.3} kind="pop"><Box x={0} y={580} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill c={GR} s={40}>Le site n'y est pour rien</Chip></Box></A>
  </>; };

// C — Google répond avant le clic
const C0: React.FC = () => { const t = useT(); const th = useTh(); const cy = L(560, 330, io(P(t, 1.2, 2.0)));
  return <Card x={0} y={0} w={940} h={720}>
    <Box x={30} y={30} w={880} h={90} style={{borderRadius: 45, border: `3px solid ${th.line}`, display: 'flex', alignItems: 'center', gap: 18, padding: '0 28px'}}><Ic n="search" s={38} c={th.mut}/><Tx s={32} w={600}>délai installation pompe à chaleur</Tx></Box>
    <A at={0.25} kind="up"><Box x={30} y={150} w={880} h={290} style={{borderRadius: 26, background: 'rgba(91,91,240,.10)', border: '3px solid rgba(91,91,240,.45)', padding: 30}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14}}><Ic n="star" s={34} c="#5B5BF0"/><Tx s={30} w={800} c="#5B5BF0">Réponse générée</Tx></div>
      {[0, 1, 2, 3].map((i) => <div key={i} style={{marginTop: 22, height: 18, borderRadius: 9, width: `${[96, 88, 92, 60][i] * oc(P(t, 0.5 + i * 0.15, 1.0 + i * 0.15))}%`, background: 'rgba(91,91,240,.35)'}}/>)}
    </Box></A>
    {[0, 1].map((i) => <A key={i} at={0.8 + i * 0.15} kind="fade"><Box x={30} y={470 + i * 115} w={880} h={95} style={{borderRadius: 20, background: th.soft, opacity: 0.55, padding: '22px 26px'}}><div style={{height: 16, width: 360, borderRadius: 8, background: OR, opacity: 0.6}}/><div style={{marginTop: 16, height: 14, width: 620, borderRadius: 7, background: th.line}}/></Box></A>)}
    <div style={{position: 'absolute', left: 640, top: cy, opacity: P(t, 1.1, 1.3)}}><svg width={60} height={70} viewBox="0 0 24 28"><path d="M3 2 L3 22 L8 17 L12 26 L15 25 L11 16 L18 16Z" fill={th.ink} stroke="#fff" strokeWidth={1.5}/></svg></div>
    <A at={2.0} kind="pop"><Box x={560} y={610}><Chip fill c={RED} s={34}>0 clic</Chip></Box></A>
  </Card>; };

// D — trois réflexes
const D0: React.FC = () => <>{['Répondre', 'Faire cliquer', 'Compter'].map((k, i) => <A key={k} at={0.15 + i * 0.18} kind="up"><Box x={0} y={60 + i * 200} w={940} h={160} style={{display: 'flex', alignItems: 'center', gap: 34}}>
  <Dot s={140} c={OR}>{i + 1}</Dot><Tx s={64} w={800}>{k}</Tx></Box></A>)}</>;

// E — la question client et le paragraphe qui y répond, cité comme source
const E0: React.FC = () => { const t = useT(); const th = useTh(); const hl = P(t, 2.0, 3.2);
  return <>
    <A at={0.1} kind="left"><Box x={0} y={0} w={700} h={130} style={{borderRadius: 40, background: th.card, boxShadow: th.sh, display: 'flex', alignItems: 'center', gap: 20, padding: '0 30px'}}><Dot s={78} c="#5B5BF0" n="user"/><Tx s={34} w={700}>« Quel délai d'installation ? »</Tx></Box></A>
    <A at={0.9} kind="up"><Card x={0} y={190} w={940} h={380}>
      <Label style={{position: 'absolute', left: 36, top: 30}}>Votre page · FAQ</Label>
      <Tx s={40} w={800} style={{position: 'absolute', left: 36, top: 80}}>Délai d'installation</Tx>
      <div style={{position: 'absolute', left: 30, top: 150, width: 880 * hl, height: 130, borderRadius: 16, background: 'rgba(255,79,31,.14)'}}/>
      <Tx s={30} w={500} style={{position: 'absolute', left: 36, top: 160, width: 860}}>Comptez quelques semaines entre la visite technique et la mise en service.</Tx>
      {[0, 1].map((i) => <div key={i} style={{position: 'absolute', left: 36, top: 300 + i * 32, height: 16, width: 700 - i * 220, borderRadius: 8, background: th.line}}/>)}
    </Card></A>
    <A at={3.95} kind="pop"><Box x={0} y={620} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill s={40}><Ic n="check" s={40} c="#fff"/>Source citée</Chip></Box></A>
    <Cubes at={4.0} x={470} y={650} seed={3}/>
  </>; };

// F — une raison de cliquer
const F0: React.FC = () => { const t = useT(); const th = useTh();
  const b: [string, string, string, number][] = [['doc', 'Devis en ligne', 'en quelques clics', 2.3], ['euro', 'Prix indicatifs', 'grille claire', 3.05], ['up', 'Simulateur', 'votre estimation', 3.65]];
  return <>
    <A at={0.2} kind="pop"><Box x={0} y={0} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip s={38}><Ic n="hand" s={38} c={OR}/>Ce que Google ne donne pas</Chip></Box></A>
    {b.map(([ic, k, s, a], i) => { const press = t > a + 0.35 && t < a + 0.55; return <A key={k} at={a} kind="up"><Box x={60} y={130 + i * 200} w={820} h={160} style={{borderRadius: 34, background: th.card, boxShadow: th.sh, border: `3px solid ${OR}`, display: 'flex', alignItems: 'center', gap: 30, padding: '0 36px', transform: `scale(${press ? 0.96 : 1})`}}>
      <Dot s={100} c={OR} n={ic}/><div><Tx s={46} w={800}>{k}</Tx><Tx s={28} w={500} c={th.mut} style={{marginTop: 6}}>{s}</Tx></div></Box></A>; })}
  </>; };

// G — compter les demandes, pas les visites
const G0: React.FC = () => { const t = useT(); const th = useTh(); const v = [0.2, 0.3, 0.42, 0.55, 0.7];
  return <>
    <A at={0.15} kind="left"><Card x={0} y={0} w={420} h={260}>
      <Label style={{position: 'absolute', left: 32, top: 30}}>Visites</Label>
      <Tx s={90} w={800} c={th.mut} style={{position: 'absolute', left: 32, top: 90}}>?</Tx>
      <div style={{position: 'absolute', left: 20, top: 128, width: 380 * oc(P(t, 1.9, 2.3)), height: 8, borderRadius: 4, background: RED}}/>
    </Card></A>
    <A at={0.35} kind="right"><Card x={460} y={0} w={480} h={620} hl>
      <Label style={{position: 'absolute', left: 32, top: 30}}>Demandes reçues</Label>
      {v.map((x, i) => { const h = 380 * x * oc(P(t, 0.6 + i * 0.14, 1.2 + i * 0.14)); return <div key={i} style={{position: 'absolute', left: 40 + i * 84, top: 560 - h, width: 60, height: h, borderRadius: 12, background: i === 4 ? OR : 'rgba(255,79,31,.35)'}}/>; })}
    </Card></A>
    <A at={1.0} kind="up"><Box x={0} y={320} w={420} h={300} style={{borderRadius: 32, background: th.soft, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20, padding: '0 30px'}}>
      {[['phone', 'Appels'], ['doc', 'Devis'], ['cal', 'Rendez-vous']].map(([ic, k]) => <div key={k} style={{display: 'flex', alignItems: 'center', gap: 16}}><Ic n={ic} s={40} c={OR}/><Tx s={36} w={700}>{k}</Tx></div>)}
    </Box></A>
  </>; };

const H0: React.FC = () => <LogoPanel sub="Google · IA" at={0.1} subAt={1.3}/>;

export const phrases: Phrase[] = T.phrases;
export const dur = T.dur;
export const scenes: Scene[] = [
  {a: 0, theme: 'light', Panel: A0}, {a: 2.05, theme: 'light', Panel: B0}, {a: 4.25, theme: 'light', Panel: C0},
  {a: 7.1, theme: 'dark', Panel: D0}, {a: 8.45, theme: 'light', Panel: E0}, {a: 13.95, theme: 'light', Panel: F0},
  {a: 18.9, theme: 'light', Panel: G0}, {a: 21.95, theme: 'dark', Panel: H0},
  {a: 25.6, theme: 'light', Panel: () => <CtaPanel k="SEO" tType={25.8} tCard={27.79} t30={28.5} line="Votre premier échange" label="Premier échange" chip="Réservé" ok/>},
];
