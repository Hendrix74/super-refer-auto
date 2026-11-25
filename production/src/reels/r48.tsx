import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Cubes, CtaPanel, LogoPanel, Type, useT, useTh, OR, GR, RED, P, io, oc, L, Scene, Phrase} from '../lib';
import T from '../../spec/r48_t.json';
// temps en secondes de la voix d'origine (la vidéo tourne à 1,05)

const Article: React.FC<{w?: number; title?: string}> = ({w = 600, title}) => { const th = useTh();
  return <div style={{width: w, height: 96, borderRadius: 20, background: th.card, border: `3px solid ${th.line}`, boxShadow: th.sh, display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px'}}>
    <Dot s={56} c={th.soft} ic={th.mut} n="doc" sq/><div><Tx s={26} w={700}>{title ?? 'Article de blog'}</Tx><div style={{marginTop: 8, height: 12, width: w - 200, borderRadius: 6, background: th.line}}/></div></div>; };

// A — la pile d'articles grandit, les demandes restent à 0
const A0: React.FC = () => { const t = useT(); const n = Math.min(6, Math.floor(P(t, 0.05, 2.0) * 6) + 1);
  return <>
    {[...Array(n)].map((_, i) => <Box key={i} x={40 + (i % 2) * 24} y={560 - i * 82} style={{transform: `rotate(${(i % 3 - 1) * 1.5}deg)`}}><Article title={`Article n°${i + 1}`}/></Box>)}
    <Card x={680} y={60} w={260} h={300} hl>
      <Label style={{position: 'absolute', left: 26, top: 28}}>Demandes</Label>
      <Tx s={150} w={800} c={RED} style={{position: 'absolute', left: 0, right: 0, top: 90, textAlign: 'center'}}>0</Tx>
    </Card>
  </>; };

// B — trois erreurs, trois remplacements
const B0: React.FC = () => <>{[0, 1, 2].map((i) => <React.Fragment key={i}>
  <A at={0.15 + i * 0.15} kind="left"><Box x={60} y={40 + i * 220}><Dot s={150} c={RED} n="x"/></Box></A>
  <A at={0.25 + i * 0.15} kind="fade"><Box x={250} y={100 + i * 220} w={360} h={10} style={{borderRadius: 5, background: 'rgba(255,255,255,.25)'}}/></A>
  <A at={0.9 + i * 0.15} kind="right"><Box x={730} y={40 + i * 220}><Dot s={150} c={GR} n="check"/></Box></A>
</React.Fragment>)}</>;

// C — erreur 1 : du neuf → mettre à jour la page déjà en page 2
const C0: React.FC = () => { const t = useT(); const th = useTh(); const up = io(P(t, 3.6, 4.4)); const upd = P(t, 2.8, 3.4);
  return <>
    <A at={0.1} kind="up" out={1.8}><Box x={0} y={60} w={940} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
      {[0, 1, 2].map((i) => <A key={i} at={0.2 + i * 0.2} kind="pop"><Box x={150 + i * 20} y={i * 120}><Article title="Nouvel article"/></Box></A>)}
      <A at={0.9} kind="pop"><Box x={760} y={120}><Dot s={120} c={RED} n="x"/></Box></A>
    </Box></A>
    <A at={1.95} kind="up"><Card x={0} y={0} w={940} h={700}>
      <Box x={30} y={26} w={880} h={76} style={{borderRadius: 38, border: `3px solid ${th.line}`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 24px'}}><Ic n="search" s={32} c={th.mut}/><Tx s={28} w={600}>votre métier + votre ville</Tx></Box>
      <Label style={{position: 'absolute', left: 36, top: 130}}>Page 1</Label>
      {[0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', left: 30, top: 175 + i * 95, width: 880, height: 78, borderRadius: 18, background: th.soft, transform: `translateY(${i >= 2 ? up * 95 : 0}px)`, opacity: i >= 2 ? 1 - up * 0.4 : 1}}/>)}
      <Label style={{position: 'absolute', left: 36, top: 480}}>Page 2</Label>
      <div style={{position: 'absolute', left: 30, top: L(525, 365, up), width: 880, height: 90, borderRadius: 18, background: th.card, border: `3px solid ${OR}`, boxShadow: up > 0.9 ? '0 0 0 8px rgba(255,79,31,.16)' : th.sh, display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px'}}>
        <Dot s={56} c={OR} n="doc" sq/><Tx s={32} w={800}>Votre page</Tx>
        <div style={{marginLeft: 'auto', opacity: upd, transform: `scale(${L(0.8, 1, oc(upd))})`}}><Chip fill c={GR} s={26}><Ic n="check" s={26} c="#fff"/>Mise à jour</Chip></div>
      </div>
      <A at={4.4} kind="pop"><Box x={600} y={620}><Chip fill s={32}><Ic n="up" s={32} c="#fff"/>Page 1</Chip></Box></A>
    </Card></A>
  </>; };

// D — erreur 2 : mot trop large → recherche précise
const D0: React.FC = () => { const t = useT(); const th = useTh(); const precise = t > 2.4;
  return <>
    <Card x={0} y={0} w={940} h={110} style={{borderRadius: 55, display: 'flex', alignItems: 'center', gap: 18, padding: '0 34px'}} hl={precise}>
      <Ic n="search" s={42} c={precise ? OR : th.mut}/><Tx s={precise ? 32 : 46} w={700}>{precise ? <Type text="logiciel de planning pour PME du BTP" a={2.45} b={3.6}/> : 'logiciel'}</Tx>
    </Card>
    {!precise ? <A at={0.4} kind="up"><Box x={0} y={160} w={940} h={520}>
      {[...Array(15)].map((_, i) => <div key={i} style={{position: 'absolute', left: (i % 5) * 190, top: Math.floor(i / 5) * 175, width: 170, height: 150, borderRadius: 24, background: th.card, border: `3px solid ${th.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: P(t, 0.4 + i * 0.05, 0.6 + i * 0.05)}}><Dot s={70} c={['#5B5BF0', '#8A8A86', '#F59E0B'][i % 3]} n="building"/></div>)}
      <A at={1.3} kind="pop"><Box x={0} y={210} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill c={RED} s={40}>Vous êtes noyé</Chip></Box></A>
    </Box></A> : <>
      <A at={3.0} kind="up"><Card x={0} y={160} w={940} h={200} hl>
        <Box x={30} y={30} style={{display: 'flex', alignItems: 'center', gap: 20}}><Dot s={80} c={OR}>1</Dot><div><Tx s={26} w={600} c={GR}>votre-entreprise.fr</Tx><Tx s={36} w={800} style={{marginTop: 6}}>Planning de chantier pour PME du BTP</Tx></div></Box>
      </Card></A>
      <A at={3.5} kind="up"><Box x={0} y={410} w={940} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24}}><Dot s={100} c="#5B5BF0" n="user"/><Tx s={40} w={700}>Un acheteur prêt à appeler</Tx></Box></A>
      <Cubes at={3.2} x={470} y={260} seed={6}/>
    </>}
  </>; };

// E — erreur 3 : parler de soi → répondre aux questions
const E0: React.FC = () => { const t = useT(); const th = useTh(); const st = oc(P(t, 0.6, 1.0));
  const q: [string, string, number][] = [['euro', 'Prix ?', 3.15], ['cal', 'Délais ?', 3.6], ['chat', 'Comparatif ?', 4.15]];
  return <Card x={0} y={0} w={940} h={720}>
    <Label style={{position: 'absolute', left: 36, top: 30}}>Votre page</Label>
    <div style={{position: 'absolute', left: 36, top: 80, opacity: L(1, 0.35, st)}}>
      <Tx s={44} w={800}>Notre histoire, nos valeurs</Tx>
      <div style={{position: 'absolute', left: -6, top: 26, width: 640 * st, height: 8, borderRadius: 4, background: RED}}/>
    </div>
    <div style={{position: 'absolute', left: 36, top: 180, width: 868, opacity: 1 - P(t, 2.9, 3.3)}}>
      <div style={{display: 'flex', gap: 24}}>{[0, 1, 2].map((i) => <div key={i} style={{flex: 1, height: 200, borderRadius: 24, background: th.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Dot s={100} c={['#5B5BF0', '#F59E0B', '#8A8A86'][i]} n="user"/></div>)}</div>
      {[0, 1, 2].map((i) => <div key={i} style={{marginTop: 26, height: 18, width: [820, 700, 560][i], borderRadius: 9, background: th.line}}/>)}
    </div>
    {q.map(([ic, k, a], i) => { const p = io(P(t, a, a + 0.5)); return <div key={k} style={{position: 'absolute', left: L(i % 2 ? 640 : 300, 36, p), top: L(-60 + i * 30, 180 + i * 165, p), width: 868, opacity: P(t, a, a + 0.15)}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 20, height: 140, borderRadius: 28, background: p > 0.95 ? 'rgba(255,79,31,.10)' : th.card, border: `3px solid ${OR}`, padding: '0 26px', width: L(330, 868, p)}}>
        <Dot s={80} c={OR} n={ic}/><Tx s={44} w={800}>{k}</Tx>
        {p > 0.95 ? <div style={{marginLeft: 20}}>{[0, 1].map((j) => <div key={j} style={{height: 14, width: 380 - j * 120, borderRadius: 7, background: th.line, marginTop: j ? 12 : 0}}/>)}</div> : null}
      </div></div>; })}
  </Card>; };

// F — pas la quantité : la cible
const F0: React.FC = () => { const t = useT(); const st = oc(P(t, 1.0, 1.35)); const hit = P(t, 1.7, 2.0);
  return <>
    <A at={0.1} kind="left"><Box x={0} y={120} w={400} h={420} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: L(1, 0.4, st)}}>
      {[0, 1, 2, 3].map((i) => <div key={i} style={{width: 260, height: 56, borderRadius: 14, background: 'rgba(255,255,255,.14)', marginTop: i ? -14 : 0, transform: `rotate(${(i % 2 ? 1 : -1) * 4}deg)`}}/>)}
      <Tx s={46} w={800} c="#fff" style={{marginTop: 30}}>Quantité</Tx>
      <div style={{position: 'absolute', left: 40, top: 215, width: 320 * st, height: 10, borderRadius: 5, background: RED, transform: 'rotate(-20deg)'}}/>
    </Box></A>
    <A at={1.5} kind="pop"><Box x={480} y={120} w={460} h={420} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <svg width={280} height={280} viewBox="0 0 100 100">{[46, 32, 18].map((r, i) => <circle key={r} cx={50} cy={50} r={r} fill="none" stroke={i === 2 ? OR : 'rgba(255,255,255,.5)'} strokeWidth={6}/>)}<circle cx={50} cy={50} r={7 * hit} fill={OR}/></svg>
      <Tx s={52} w={800} c={OR} style={{marginTop: 20}}>La cible</Tx>
    </Box></A>
    <Cubes at={1.9} x={710} y={270} seed={7}/>
  </>; };

const H0: React.FC = () => <LogoPanel sub="Référencement piloté" at={0.1} subAt={1.2}/>;

export const phrases: Phrase[] = T.phrases;
export const dur = T.dur;
export const scenes: Scene[] = [
  {a: 0, theme: 'light', Panel: A0}, {a: 2.45, theme: 'dark', Panel: B0}, {a: 4.45, theme: 'light', Panel: C0},
  {a: 9.5, theme: 'light', Panel: D0}, {a: 14.6, theme: 'light', Panel: E0}, {a: 20.0, theme: 'dark', Panel: F0},
  {a: 22.7, theme: 'dark', Panel: H0},
  {a: 25.5, theme: 'light', Panel: () => <CtaPanel k="SEO" tType={25.7} tCard={27.1} t30={27.8} line="Votre premier échange" label="Premier échange" chip="Réservé" ok/>},
];
