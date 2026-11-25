import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Cubes, CtaPanel, LogoPanel, useT, useTh, OR, GR, RED, P, io, oc, L, Scene, Phrase} from '../lib';
import T from '../../spec/r46_t.json';
// temps en secondes de la voix d'origine (la vidéo tourne à 1,05)
const Stars: React.FC<{n?: number; s?: number; at?: number}> = ({n = 5, s = 30, at = 0}) => { const t = useT();
  return <div style={{display: 'flex', gap: 4}}>{[...Array(n)].map((_, i) => <Ic key={i} n="star" s={s} c="#F5B301" style={{opacity: P(t, at + i * 0.06, at + i * 0.06 + 0.15)}}/>)}</div>; };
const MapBg: React.FC<{w: number; h: number}> = ({w, h}) => { const th = useTh();
  return <div style={{position: 'absolute', inset: 0, background: th.soft, overflow: 'hidden', borderRadius: 32}}>
    {[0, 1, 2, 3, 4, 5].map((i) => <div key={'h' + i} style={{position: 'absolute', left: 0, top: 60 + i * 130, width: w, height: i % 2 ? 14 : 26, background: th.card, transform: `rotate(${i % 2 ? -4 : 3}deg)`}}/>)}
    {[0, 1, 2, 3].map((i) => <div key={'v' + i} style={{position: 'absolute', top: 0, left: 120 + i * 230, height: h, width: i % 2 ? 14 : 24, background: th.card, transform: `rotate(${i % 2 ? 6 : -3}deg)`}}/>)}
    <div style={{position: 'absolute', left: 560, top: 380, width: 300, height: 200, borderRadius: 60, background: 'rgba(23,163,74,.14)'}}/>
  </div>; };
const Pin: React.FC<{x: number; y: number; c: string; s?: number; at: number}> = ({x, y, c, s = 90, at}) => { const t = useT(); const p = P(t, at, at + 0.35);
  if (p <= 0) return null;
  return <div style={{position: 'absolute', left: x - s / 2, top: y - s + L(-140, 0, oc(p)), opacity: Math.min(1, p * 3)}}><Ic n="pin" s={s} c={c}/></div>; };

// A — sur la carte : le concurrent en haut, vous en gris
const A0: React.FC = () => { const th = useTh();
  return <Card x={0} y={0} w={940} h={720}><MapBg w={940} h={720}/>
    <Pin x={300} y={300} c={OR} s={120} at={0.1}/>
    <Pin x={680} y={560} c={th.mut} s={80} at={0.5}/>
    <A at={0.5} kind="up"><Box x={360} y={150} w={440} h={140} style={{borderRadius: 24, background: th.card, boxShadow: th.sh, padding: '20px 26px'}}><Tx s={32} w={800}>Concurrent</Tx><div style={{marginTop: 10}}><Stars at={0.7}/></div></Box></A>
    <A at={1.4} kind="pop"><Box x={430} y={600}><Chip fill c={th.mut} s={30}>Vous · introuvable</Chip></Box></A>
  </Card>; };

// B — la fiche Google qui s'ouvre
const B0: React.FC = () => { const t = useT(); const th = useTh();
  return <Card x={60} y={0} w={820} h={720}>
    <div style={{position: 'absolute', left: 0, top: 0, width: 820, height: 220, background: `linear-gradient(135deg, #FFD2B8, ${OR})`}}/>
    <Tx s={48} w={800} style={{position: 'absolute', left: 40, top: 250}}>Votre entreprise</Tx>
    <Box x={40} y={320}><div style={{display: 'flex', alignItems: 'center', gap: 14}}><Stars at={0.6}/></div></Box>
    <Tx s={28} w={500} c={th.mut} style={{position: 'absolute', left: 40, top: 380}}>Catégorie · Horaires · Site web</Tx>
    {[['pin', 'Itinéraire'], ['phone', 'Appeler'], ['doc', 'Site']].map(([ic, k], i) => <A key={k} at={0.8 + i * 0.15} kind="up"><Box x={40 + i * 255} y={460} w={230} h={190} style={{borderRadius: 26, background: th.soft, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14}}><Dot s={80} c={OR} n={ic}/><Tx s={28} w={700}>{k}</Tx></Box></A>)}
  </Card>; };

// C — trois réglages
const C0: React.FC = () => <>{[['flag', 'Catégorie'], ['star', 'Avis'], ['pin', 'Une fiche par site']].map(([ic, k], i) => <A key={k} at={0.1 + i * 0.15} kind="up"><Box x={0} y={60 + i * 200} w={940} h={160} style={{display: 'flex', alignItems: 'center', gap: 34}}>
  <Dot s={140} c={OR} n={ic}/><Tx s={62} w={800}>{k}</Tx></Box></A>)}</>;

// D — la bonne catégorie principale
const D0: React.FC = () => { const t = useT(); const th = useTh(); const ok = t > 1.5;
  const opts: [string, boolean][] = [['Entreprise', false], ['Société de services', false], ['Maintenance industrielle', true], ['Bureau', false]];
  return <>
    <Card x={0} y={0} w={940} h={560}>
      <Label style={{position: 'absolute', left: 36, top: 30}}>Catégorie principale</Label>
      {opts.map(([k, good], i) => <A key={k} at={0.2 + i * 0.12} kind="left"><Box x={30} y={90 + i * 112} w={880} h={96} style={{borderRadius: 20, background: good && ok ? 'rgba(255,79,31,.12)' : th.soft, border: `3px solid ${good && ok ? OR : 'transparent'}`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 26px'}}>
        <Tx s={36} w={good ? 800 : 600} c={good ? th.ink : th.mut} style={{flex: 1}}>{k}</Tx>{good && ok ? <Dot s={58} c={OR} n="check"/> : null}</Box></A>)}
    </Card>
    <A at={2.1} kind="up"><Box x={120} y={610} w={700} h={110} style={{borderRadius: 55, background: th.card, boxShadow: th.sh, display: 'flex', alignItems: 'center', gap: 18, padding: '0 30px'}}><Ic n="search" s={38} c={OR}/><Tx s={32} w={600}>maintenance industrielle Lyon</Tx></Box></A>
    <Cubes at={1.5} x={820} y={370} seed={7}/>
  </>; };

// E — des avis récents, et une réponse à chacun
const E0: React.FC = () => { const th = useTh();
  const r: [string, string, number][] = [['Il y a 2 jours', 'user', 0.2], ['La semaine dernière', 'user', 0.7]];
  return <>{r.map(([d, ic, a], i) => <A key={d} at={a} kind="right"><Card x={0} y={i * 360} w={940} h={180}>
      <Dot s={84} c={i ? '#5B5BF0' : GR} n={ic} style={{position: 'absolute', left: 30, top: 30}}/>
      <Box x={140} y={36}><Stars at={a + 0.2}/></Box>
      <Tx s={26} w={600} c={th.mut} style={{position: 'absolute', left: 140, top: 86}}>{d}</Tx>
      <div style={{position: 'absolute', left: 140, top: 132, width: 600, height: 14, borderRadius: 7, background: th.line}}/>
    </Card>
    <A at={1.5 + i * 0.5} kind="up"><Box x={140} y={i * 360 + 196} w={800} h={120} style={{borderRadius: 24, background: 'rgba(255,79,31,.10)', border: `3px solid ${OR}`, display: 'flex', alignItems: 'center', gap: 18, padding: '0 26px'}}><Ic n="chat" s={40} c={OR}/><div><Tx s={28} w={800}>Réponse du propriétaire</Tx><Tx s={24} w={500} c={th.mut} style={{marginTop: 4}}>Merci pour votre retour…</Tx></div></Box></A>
    </A>)}</>; };

// F — une fiche par site, reliée à sa page ville
const F0: React.FC = () => { const t = useT(); const th = useTh();
  const s: [string, string, number][] = [['Lyon', '/lyon', 0.7], ['Grenoble', '/grenoble', 1.3], ['Saint-Étienne', '/saint-etienne', 1.9]];
  return <>{s.map(([v, u, a], i) => { const k = io(P(t, a + 0.4, a + 0.9)); return <React.Fragment key={v}>
      <A at={a} kind="pop"><Box x={0} y={i * 240} w={380} h={170} style={{borderRadius: 30, background: th.card, boxShadow: th.sh, display: 'flex', alignItems: 'center', gap: 16, padding: '0 24px'}}><Ic n="pin" s={70} c={OR}/><div><Label>Fiche</Label><Tx s={34} w={800}>{v}</Tx></div></Box></A>
      <div style={{position: 'absolute', left: 390, top: i * 240 + 82, width: 160 * k, height: 6, borderRadius: 3, background: OR}}/>
      <A at={a + 0.8} kind="pop"><Box x={560} y={i * 240 + 20} w={380} h={130} style={{borderRadius: 24, background: 'rgba(255,79,31,.10)', border: `3px solid ${OR}`, display: 'flex', alignItems: 'center', gap: 14, padding: '0 22px'}}><Ic n="doc" s={44} c={OR}/><Tx s={30} w={800}>{u}</Tx></Box></A>
    </React.Fragment>; })}</>; };

const G0: React.FC = () => <LogoPanel sub="Fiche + site" at={0.1} subAt={1.3}/>;

export const phrases: Phrase[] = T.phrases;
export const dur = T.dur;
export const scenes: Scene[] = [
  {a: 0, theme: 'light', Panel: A0}, {a: 3.5, theme: 'light', Panel: B0}, {a: 5.8, theme: 'dark', Panel: C0},
  {a: 7.0, theme: 'light', Panel: D0}, {a: 10.75, theme: 'light', Panel: E0}, {a: 13.9, theme: 'light', Panel: F0},
  {a: 18.5, theme: 'dark', Panel: G0},
  {a: 22.1, theme: 'light', Panel: () => <CtaPanel k="SEO" tType={22.3} tCard={24.67} t30={25.3} line="Votre premier échange" label="Premier échange" chip="Réservé" ok/>},
];
