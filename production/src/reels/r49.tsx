import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Cubes, CtaPanel, LogoPanel, Type, useT, useTh, OR, GR, RED, P, io, oc, L, Scene, Phrase} from '../lib';
import T from '../../spec/r49_t.json';
// temps en secondes de la voix d'origine (la vidéo tourne à 1,05)

const Q: string[] = ['maintenance compresseur industriel', 'prix contrat de maintenance', 'délai intervention panne usine', 'entreprise maintenance avis'];
const Cursor: React.FC<{x: number; y: number; press?: boolean}> = ({x, y, press}) => { const th = useTh();
  return <div style={{position: 'absolute', left: x, top: y, transform: `scale(${press ? 0.85 : 1})`}}><svg width={56} height={66} viewBox="0 0 24 28"><path d="M3 2 L3 22 L8 17 L12 26 L15 25 L11 16 L18 16Z" fill={th.ink} stroke="#fff" strokeWidth={1.5}/></svg></div>; };

// A — des recherches de clients… illisibles
const A0: React.FC = () => { const t = useT(); const th = useTh();
  return <>{Q.slice(0, 3).map((q, i) => <A key={i} at={i * 0.35} kind="left"><Box x={i * 40} y={i * 200} w={860} h={150} style={{borderRadius: 75, background: th.card, boxShadow: th.sh, border: `3px solid ${th.line}`, display: 'flex', alignItems: 'center', gap: 22, padding: '0 34px'}}>
    <Dot s={86} c={['#5B5BF0', GR, '#F59E0B'][i]} n="user"/>
    <Ic n="search" s={40} c={th.mut}/>
    <Tx s={36} w={700} style={{filter: 'blur(9px)', opacity: 0.8}}>{q}</Tx>
    <Box x={740} y={30}><Dot s={86} c={RED}><span style={{fontSize: 54}}>?</span></Dot></Box>
  </Box></A>)}
  <A at={1.6} kind="pop"><Box x={0} y={640} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill c={th.ink} s={34}><Ic n="eye" s={34} c={th.bg}/>Vous ne le voyez pas</Chip></Box></A></>; };

// B — gratuit, 3 étapes
const B0: React.FC = () => <>
  <A at={0.1} kind="pop"><Box x={0} y={30} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill c={GR} s={60}><Ic n="check" s={60} c="#fff"/>Gratuit</Chip></Box></A>
  {[['search', 'Ouvrir'], ['folder', 'Requêtes'], ['doc', 'Réécrire']].map(([ic, k], i) => <A key={k} at={1.0 + i * 0.25} kind="up"><Box x={i * 320} y={260} w={300} h={330} style={{borderRadius: 34, background: 'rgba(255,255,255,.06)', border: '3px solid rgba(255,255,255,.14)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24}}>
    <Dot s={110} c={OR}>{i + 1}</Dot><Ic n={ic} s={54} c="#fff"/><Tx s={38} w={700} c="#fff">{k}</Tx></Box></A>)}
</>;

// C — ouvrir la Search Console de son site
const C0: React.FC = () => { const t = useT(); const th = useTh(); const cx = L(700, 380, io(P(t, 0.9, 1.6))), cy = L(600, 250, io(P(t, 0.9, 1.6))); const press = t > 1.6 && t < 1.8; const on = t > 1.75;
  return <Card x={0} y={0} w={940} h={720}>
    <Box x={0} y={0} w={940} h={110} style={{background: th.soft, display: 'flex', alignItems: 'center', gap: 18, padding: '0 34px'}}><Dot s={64} c="#5B5BF0" n="search"/><Tx s={40} w={800}>Search Console</Tx><Box x={720} y={34}><Chip c={GR} s={24}>Gratuit</Chip></Box></Box>
    <Label style={{position: 'absolute', left: 40, top: 150}}>Propriété</Label>
    <Box x={40} y={200} w={860} h={110} style={{borderRadius: 24, border: `3px solid ${on ? OR : th.line}`, background: on ? 'rgba(255,79,31,.08)' : th.card, display: 'flex', alignItems: 'center', gap: 20, padding: '0 28px'}}><Ic n="pin" s={40} c={OR}/><Tx s={38} w={700}>votre-entreprise.fr</Tx><Box x={720} y={30}>{on ? <Dot s={50} c={GR} n="check"/> : null}</Box></Box>
    {[0, 1].map((i) => <div key={i} style={{position: 'absolute', left: 40, top: 360 + i * 130, width: 860, height: 100, borderRadius: 20, background: th.soft, opacity: on ? 1 : 0.5}}/>)}
    <Cursor x={cx} y={cy} press={press}/>
  </Card>; };

// D — Performances › Requêtes
const D0: React.FC = () => { const t = useT(); const th = useTh(); const p1 = t > 1.1, p2 = t > 2.15;
  const cx = t < 1.1 ? L(700, 200, io(P(t, 0.3, 1.0))) : L(200, 330, io(P(t, 1.4, 2.0))); const cy = t < 1.1 ? L(500, 170, io(P(t, 0.3, 1.0))) : L(170, 330, io(P(t, 1.4, 2.0)));
  return <Card x={0} y={0} w={940} h={720}>
    <Box x={0} y={0} w={300} h={720} style={{background: th.soft, padding: '40px 0'}}>
      {[['up', 'Performances'], ['doc', 'Pages'], ['eye', 'Expérience']].map(([ic, k], i) => <div key={k} style={{display: 'flex', alignItems: 'center', gap: 14, margin: '0 16px 18px', padding: '22px 18px', borderRadius: 20, background: i === 0 && p1 ? OR : 'transparent'}}><Ic n={ic} s={32} c={i === 0 && p1 ? '#fff' : th.mut}/><Tx s={28} w={700} c={i === 0 && p1 ? '#fff' : th.ink}>{k}</Tx></div>)}
    </Box>
    {p1 ? <A at={1.15} kind="fade"><Box x={330} y={290} w={580} h={70} style={{display: 'flex', gap: 16}}>{['Requêtes', 'Pages', 'Pays'].map((k, i) => <div key={k} style={{padding: '14px 24px', borderRadius: 18, fontSize: 30, fontWeight: 700, color: i === 0 && p2 ? '#fff' : th.ink, background: i === 0 && p2 ? OR : th.soft}}>{k}</div>)}</Box>
      <Box x={330} y={60} w={580} h={190} style={{borderRadius: 24, background: th.soft}}><svg width={580} height={190}><polyline points="20,150 120,130 220,140 320,100 420,110 560,60" fill="none" stroke="#5B5BF0" strokeWidth={8} strokeLinecap="round"/></svg></Box>
      {p2 ? [0, 1, 2].map((i) => <A key={i} at={2.3 + i * 0.1} kind="up"><Box x={330} y={400 + i * 95} w={580} h={78} style={{borderRadius: 16, background: th.soft, display: 'flex', alignItems: 'center', padding: '0 20px'}}><Tx s={26} w={600}>{Q[i]}</Tx></Box></A>) : null}
    </A> : null}
    <Cursor x={cx} y={cy} press={(t > 1.0 && t < 1.15) || (t > 2.05 && t < 2.2)}/>
  </Card>; };

// E/F — le tableau des requêtes : affichages et clics (barres illustratives)
const Table: React.FC<{hl?: number; reveal?: number}> = ({hl, reveal = 0}) => { const t = useT(); const th = useTh();
  const imp = [0.55, 0.9, 0.4, 0.3], clk = [0.5, 0.08, 0.35, 0.25];
  return <Card x={0} y={0} w={940} h={680}>
    <Box x={30} y={30} w={880} h={50} style={{display: 'flex', alignItems: 'center'}}><Label style={{width: 470}}>Requête</Label><Label style={{width: 210}}>Affichages</Label><Label>Clics</Label></Box>
    {Q.map((q, i) => { const sel = hl !== undefined && i === hl && t > 0.3; return <A key={i} at={reveal + i * 0.15} kind="up"><Box x={20} y={100 + i * 140} w={900} h={124} style={{borderRadius: 22, background: sel ? 'rgba(255,79,31,.10)' : th.soft, border: `3px solid ${sel ? OR : 'transparent'}`, display: 'flex', alignItems: 'center', padding: '0 20px'}}>
      <Tx s={28} w={700} style={{width: 450, whiteSpace: 'normal'}}>{q}</Tx>
      <div style={{width: 190, height: 26, borderRadius: 13, background: th.line, marginRight: 20}}><div style={{width: `${imp[i] * 100 * oc(P(t, reveal + 0.3 + i * 0.15, reveal + 0.9 + i * 0.15))}%`, height: 26, borderRadius: 13, background: '#5B5BF0'}}/></div>
      <div style={{width: 190, height: 26, borderRadius: 13, background: th.line}}><div style={{width: `${clk[i] * 100 * oc(P(t, reveal + 0.4 + i * 0.15, reveal + 1.0 + i * 0.15))}%`, height: 26, borderRadius: 13, background: sel ? RED : GR}}/></div>
    </Box></A>; })}
  </Card>; };
const E0: React.FC = () => <Table reveal={0.1}/>;
const F0: React.FC = () => <>
  <Table hl={1} reveal={-5}/>
  <A at={1.0} kind="pop"><Box x={420} y={190}><Chip fill c="#5B5BF0" s={30}><Ic n="eye" s={30} c="#fff"/>Souvent vu</Chip></Box></A>
  <A at={2.6} kind="pop"><Box x={690} y={190}><Chip fill c={RED} s={30}>Peu cliqué</Chip></Box></A>
</>;

// G — réécrire le titre : Google vous dit quoi écrire
const G0: React.FC = () => { const t = useT(); const th = useTh(); const st = oc(P(t, 0.4, 0.8));
  return <>
    <Card x={0} y={0} w={940} h={470} hl={t > 2.2}>
      <Label style={{position: 'absolute', left: 36, top: 30}}>Titre de votre page</Label>
      <div style={{position: 'absolute', left: 36, top: 90, opacity: L(1, 0.4, st)}}><Tx s={44} w={700} c={th.mut}>Accueil – Nos services</Tx>
        <div style={{position: 'absolute', left: -6, top: 24, width: 480 * st, height: 8, borderRadius: 4, background: RED}}/></div>
      <A at={0.9} kind="up"><Box x={36} y={190} w={868} h={150} style={{borderRadius: 24, background: 'rgba(255,79,31,.08)', padding: '22px 26px'}}>
        <Tx s={26} w={600} c={GR}>votre-entreprise.fr</Tx>
        <Tx s={38} w={800} c="#1A44C8" style={{marginTop: 10, whiteSpace: 'normal', width: 820}}><Type text="Contrat de maintenance industrielle : prix et délais" a={1.0} b={2.1}/></Tx>
      </Box></A>
      <A at={2.2} kind="pop"><Box x={36} y={370}><Chip fill c={GR} s={32}><Ic n="check" s={32} c="#fff"/>Les mots de vos clients</Chip></Box></A>
    </Card>
    <A at={2.85} kind="up"><Box x={0} y={520} w={940} h={160} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30}}>
      <Dot s={130} c="#5B5BF0" n="search"/><Ic n="send" s={60} c={OR} style={{transform: 'rotate(90deg)'}}/><Dot s={130} c={OR} n="doc"/>
    </Box></A>
    <Cubes at={2.3} x={470} y={380} seed={8}/>
  </>; };

const H0: React.FC = () => <LogoPanel sub="Référencement piloté" at={0.1} subAt={1.2}/>;

export const phrases: Phrase[] = T.phrases;
export const dur = T.dur;
export const scenes: Scene[] = [
  {a: 0, theme: 'light', Panel: A0}, {a: 3.6, theme: 'dark', Panel: B0}, {a: 6.55, theme: 'light', Panel: C0},
  {a: 9.9, theme: 'light', Panel: D0}, {a: 13.2, theme: 'light', Panel: E0}, {a: 15.5, theme: 'light', Panel: F0},
  {a: 19.7, theme: 'light', Panel: G0}, {a: 25.65, theme: 'dark', Panel: H0},
  {a: 28.5, theme: 'light', Panel: () => <CtaPanel k="SEO" tType={28.7} tCard={29.7} t30={30.4} line="Votre premier échange" label="Premier échange" chip="Réservé" ok/>},
];
