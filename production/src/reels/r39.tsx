import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Cubes, CtaPanel, LogoPanel, useT, useTh, OR, GR, RED, P, io, oc, L, Scene, Phrase} from '../lib';
import {BrowserBar} from './r29';
import T from '../../spec/r39_t.json';
// temps en secondes de la voix d'origine (la vidéo tourne à 1,05)

// A — un joli site… et zéro demande
const A0: React.FC = () => { const t = useT(); const th = useTh();
  return <><Card x={0} y={0} w={940} h={560}>
      <BrowserBar url="votre-site.fr"/>
      <div style={{position: 'absolute', left: 28, top: 104, width: 884, height: 250, borderRadius: 24, background: `linear-gradient(135deg, ${OR} 0%, #FF9A6B 55%, #FFD2B8 100%)`, overflow: 'hidden'}}>
        <div style={{position: 'absolute', right: -60, top: -60, width: 260, height: 260, borderRadius: 130, background: 'rgba(255,255,255,.22)', transform: `translateY(${Math.sin(t * 1.2) * 10}px)`}}/>
        <Tx s={52} w={800} c="#fff" style={{position: 'absolute', left: 40, top: 60}}>L'excellence industrielle</Tx>
        <Tx s={30} w={500} c="rgba(255,255,255,.9)" style={{position: 'absolute', left: 40, top: 136}}>Depuis 1987</Tx></div>
      {[0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', left: 28 + i * 300, top: 380, width: 284, height: 150, borderRadius: 20, background: th.soft}}/>)}
    </Card>
    <A at={0.5} kind="up"><Card x={160} y={600} w={620} h={130}>
      <Label style={{position: 'absolute', left: 32, top: 26}}>Demandes ce mois</Label>
      <Tx s={64} w={800} c={RED} style={{position: 'absolute', right: 40, top: 28}}>0</Tx></Card></A>
    <A at={2.3} kind="pop"><Box x={0} y={-70} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill c={RED} s={34}>Beau… mais rien ne rentre</Chip></Box></A>
  </>; };

// B — les deux piliers : trouvé + fait agir
const B0: React.FC = () => { const t = useT(); const th = useTh();
  const Pil: React.FC<{x: number; ic: string; k: string; v: string; at: number}> = ({x, ic, k, v, at}) => <A at={at} kind="up"><Card x={x} y={40} w={440} h={520} hl>
      <Dot s={150} c={OR} n={ic} style={{position: 'absolute', left: 145, top: 70}}/>
      <Tx s={52} w={800} style={{position: 'absolute', top: 270, width: 440, textAlign: 'center'}}>{k}</Tx>
      <Tx s={28} w={500} c={th.mut} style={{position: 'absolute', top: 350, width: 440, textAlign: 'center'}}>{v}</Tx></Card></A>;
  return <><Pil x={0} ic="search" k="Trouvé" v="sur Google" at={1.5}/><Pil x={500} ic="hand" k="Fait agir" v="appel · devis · RDV" at={2.4}/>
    <Cubes at={2.6} x={720} y={200} seed={6}/></>; };

// C — être trouvé : les recherches mènent à vos pages
const C0: React.FC = () => { const t = useT(); const th = useTh();
  const q: [string, string, number][] = [['maintenance ligne de production', '/maintenance', 0.3], ['dépannage automate urgent', '/depannage', 0.8], ['contrat maintenance Lyon', '/contrat-lyon', 1.3]];
  return <>{q.map(([s, p, a], i) => { const k = io(P(t, a + 0.25, a + 0.7)); return <React.Fragment key={s}>
      <A at={a} kind="left"><Box x={0} y={i * 230} w={520} h={110} style={{borderRadius: 55, background: th.card, boxShadow: th.sh, display: 'flex', alignItems: 'center', gap: 16, padding: '0 26px'}}><Ic n="search" s={36} c={OR}/><Tx s={28} w={600} style={{width: 420, whiteSpace: 'normal'}}>{s}</Tx></Box></A>
      <div style={{position: 'absolute', left: 540, top: i * 230 + 52, width: 120 * k, height: 6, borderRadius: 3, background: OR}}/>
      <A at={a + 0.6} kind="pop"><Box x={680} y={i * 230 - 5} w={260} h={120} style={{borderRadius: 24, background: 'rgba(255,79,31,.10)', border: `3px solid ${OR}`, display: 'flex', alignItems: 'center', gap: 12, padding: '0 18px'}}><Ic n="doc" s={40} c={OR}/><Tx s={26} w={800}>{p}</Tx></Box></A>
    </React.Fragment>; })}</>; };

// D — faire agir : un appel, un devis, un rendez-vous, en un clic
const D0: React.FC = () => { const t = useT(); const th = useTh();
  const b: [string, string, number][] = [['phone', 'Appeler', 1.55], ['doc', 'Demander un devis', 2.2], ['cal', 'Prendre rendez-vous', 2.9]];
  return <Box x={190} y={0} w={560} h={760} style={{borderRadius: 64, background: th.ink, padding: 16}}>
    <div style={{position: 'absolute', inset: 16, borderRadius: 50, background: th.card, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 190, top: 18, width: 148, height: 30, borderRadius: 15, background: th.ink}}/>
      <Tx s={34} w={800} style={{position: 'absolute', left: 40, top: 90}}>Maintenance à Lyon</Tx>
      {[0, 1].map((i) => <div key={i} style={{position: 'absolute', left: 40, top: 150 + i * 30, width: 400 - i * 120, height: 14, borderRadius: 7, background: th.line}}/>)}
      {b.map(([ic, k, a], i) => { const hit = t > a + 0.35 && t < a + 0.6; return <A key={k} at={a} kind="up"><Box x={40} y={250 + i * 140} w={448} h={110} style={{borderRadius: 55, background: hit ? '#D8400F' : OR, display: 'flex', alignItems: 'center', gap: 16, padding: '0 30px', transform: `scale(${hit ? 0.95 : 1})`}}><Ic n={ic} s={42} c="#fff"/><Tx s={32} w={800} c="#fff">{k}</Tx></Box>
        <div style={{position: 'absolute', left: 400, top: 300 + i * 140 - 30 * (1 - P(t, a, a + 0.35)), opacity: P(t, a, a + 0.15) * (1 - P(t, a + 0.7, a + 0.9))}}><Ic n="hand" s={60} c={th.ink}/></div></A>; })}
    </div></Box>; };

// E — mesurer : les demandes reçues par le site, mois par mois
const E0: React.FC = () => { const t = useT(); const th = useTh(); const mo = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'];
  const v = [0.18, 0.26, 0.34, 0.48, 0.62, 0.82];
  return <Card x={0} y={0} w={940} h={700}>
    <Label style={{position: 'absolute', left: 36, top: 34}}>Demandes reçues via le site</Label>
    {mo.map((m, i) => { const h = 440 * v[i] * oc(P(t, 1.4 + i * 0.18, 2.1 + i * 0.18)); return <React.Fragment key={m}>
      <div style={{position: 'absolute', left: 70 + i * 140, top: 600 - h, width: 90, height: h, borderRadius: 16, background: i === 5 ? OR : 'rgba(255,79,31,.35)'}}/>
      <Tx s={26} w={700} c={th.mut} style={{position: 'absolute', left: 70 + i * 140, top: 620, width: 90, textAlign: 'center'}}>{m}</Tx></React.Fragment>; })}
    <A at={3.3} kind="pop"><Box x={560} y={100}><Chip fill s={30}><Ic n="eye" s={30} c="#fff"/>Suivi chaque mois</Chip></Box></A>
  </Card>; };

// F — chiffre à zéro : le site coûte
const F0: React.FC = () => { const t = useT(); const th = useTh();
  return <>
    <A at={0.1} kind="pop"><Card x={170} y={0} w={600} h={300} hl>
      <Label style={{position: 'absolute', left: 36, top: 30}}>Demandes ce mois</Label>
      <Tx s={170} w={800} c={RED} style={{position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center'}}>0</Tx></Card></A>
    {[['Hébergement', 1.2], ['Maintenance', 1.5], ['Temps passé', 1.8]].map(([k, a], i) => <A key={k as string} at={a as number} kind="up"><Box x={i * 320} y={360} w={300} h={110} style={{borderRadius: 24, background: th.card, boxShadow: th.sh, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12}}><Ic n="euro" s={36} c={RED}/><Tx s={30} w={700}>{k as string}</Tx></Box></A>)}
    <A at={1.95} kind="pop"><Box x={0} y={530} w={940} style={{display: 'flex', justifyContent: 'center', gap: 24}}>
      <Chip fill c={RED} s={40}>Il coûte</Chip><Chip s={40} c={th.mut} style={{textDecoration: 'line-through'}}>Il rapporte</Chip></Box></A>
  </>; };

const G0: React.FC = () => <LogoPanel sub="Construire · Piloter" at={0.1} subAt={1.2}/>;

export const phrases: Phrase[] = T.phrases;
export const dur = T.dur;
export const scenes: Scene[] = [
  {a: 0, theme: 'light', Panel: A0}, {a: 3.55, theme: 'dark', Panel: B0}, {a: 6.75, theme: 'light', Panel: C0},
  {a: 9.9, theme: 'light', Panel: D0}, {a: 13.8, theme: 'light', Panel: E0}, {a: 17.75, theme: 'dark', Panel: F0},
  {a: 21.2, theme: 'light', Panel: G0},
  {a: 24.8, theme: 'light', Panel: () => <CtaPanel k="SEO" tType={25.0} tCard={26.96} t30={27.7} line="Votre premier échange" label="Premier échange" chip="Réservé" ok/>},
];
