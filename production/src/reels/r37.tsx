import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Type, Cubes, CtaPanel, LogoPanel, useT, useTh, OR, GR, RED, P, io, oc, L, Scene, Phrase} from '../lib';
import {BrowserBar} from './r29';
import T from '../../spec/r37_t.json';
// temps en secondes de la voix d'origine (la vidéo tourne à 1,05)

// A — l'agenda commercial de la semaine, presque vide
const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'];
const A0: React.FC = () => { const t = useT(); const th = useTh();
  return <Card x={0} y={0} w={940} h={640}>
    <Label style={{position: 'absolute', left: 36, top: 34}}>Agenda commercial · cette semaine</Label>
    {days.map((d, i) => <A key={d} at={0.15 + i * 0.08} kind="up"><Box x={36 + i * 176} y={100} w={160} h={500}>
      <Tx s={30} w={700} c={th.mut} style={{textAlign: 'center', width: 160}}>{d}</Tx>
      {[0, 1, 2].map((k) => { const full = (i === 1 && k === 0); return <div key={k} style={{position: 'absolute', left: 0, top: 60 + k * 140, width: 160, height: 120, borderRadius: 20, border: `3px dashed ${full ? 'transparent' : th.line}`, background: full ? OR : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Tx s={24} w={700} c={full ? '#fff' : th.mut}>{full ? 'RDV' : 'Libre'}</Tx></div>; })}
    </Box></A>)}
  </Card>; };

// B — la recherche Google : métier + ville
const B0: React.FC = () => { const t = useT(); const th = useTh();
  return <><Card x={0} y={0} w={940} h={150} style={{borderRadius: 75}}>
      <Dot s={86} c={th.soft} ic={OR} n="search" style={{position: 'absolute', left: 30, top: 29}}/>
      <Tx s={48} w={600} style={{position: 'absolute', left: 140, top: 46}}><Type text="maintenance industrielle Lyon" a={2.9} b={4.4}/></Tx></Card>
    <A at={0.5} kind="up"><Box x={0} y={200} w={940}><Chip s={34}><Ic n="user" s={34} c={OR}/>Un acheteur, aujourd'hui</Chip></Box></A>
    <A at={3.0} kind="pop"><Box x={60} y={320} w={400} h={180} style={{borderRadius: 28, background: 'rgba(255,79,31,.10)', border: `3px solid ${OR}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}>
      <Ic n="building" s={64} c={OR}/><Tx s={40} w={800}>Votre métier</Tx></Box></A>
    <A at={3.7} kind="pop"><Box x={480} y={320} w={400} h={180} style={{borderRadius: 28, background: 'rgba(255,79,31,.10)', border: `3px solid ${OR}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}>
      <Ic n="pin" s={64} c={OR}/><Tx s={40} w={800}>Sa ville</Tx></Box></A>
  </>; };

// C — une seule page « Nos services » : le clic part chez le concurrent
const C0: React.FC = () => { const t = useT(); const th = useTh(); const lose = io(P(t, 1.9, 2.5));
  return <>
    <A at={0.1} kind="left"><Card x={0} y={0} w={440} h={420} style={{opacity: L(1, 0.45, lose)}}>
      <BrowserBar url="votre-site.fr" w={440}/>
      <Label style={{position: 'absolute', left: 28, top: 104}}>Votre site</Label>
      <Box x={28} y={160} w={384} h={210} style={{borderRadius: 20, background: th.soft, padding: 22}}>
        <Tx s={36} w={800}>Nos services</Tx>
        {[0.95, 0.8, 0.9, 0.6].map((k, i) => <div key={i} style={{height: 14, width: 330 * k, borderRadius: 7, background: th.line, marginTop: 16}}/>)}</Box>
    </Card></A>
    <A at={0.6} kind="right"><Card x={500} y={0} w={440} h={420} hl={lose > 0.5}>
      <BrowserBar url="concurrent.fr" w={440}/>
      <Label style={{position: 'absolute', left: 28, top: 104}}>Concurrent</Label>
      {['Maintenance · Lyon', 'Dépannage 24 h', 'Devis en ligne'].map((s, i) => <Box key={s} x={28} y={160 + i * 74} w={384} h={60} style={{borderRadius: 16, background: th.soft, display: 'flex', alignItems: 'center', padding: '0 18px'}}><Tx s={28} w={700}>{s}</Tx></Box>)}
    </Card></A>
    <A at={1.9} kind="fade"><Box x={0} y={0} w={940} h={420}><svg width={940} height={600} style={{position: 'absolute', left: 0, top: 0}}>
      <path d="M 220 520 C 420 640, 620 640, 720 440" fill="none" stroke={OR} strokeWidth={8} strokeLinecap="round" strokeDasharray="900" strokeDashoffset={900 * (1 - lose)}/></svg></Box></A>
    <A at={2.4} kind="pop"><Box x={0} y={540} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill c={RED} s={40}><Ic n="x" s={40} c="#fff"/>Demande perdue</Chip></Box></A>
  </>; };

// D — une page par service, et par ville
const svc = ['Maintenance', 'Automatisme', 'Dépannage'], vil = ['Lyon', 'Grenoble'];
const D0: React.FC = () => { const t = useT(); const th = useTh();
  return <>
    <A at={0.05} kind="pop"><Box x={330} y={0} w={280} h={90} style={{borderRadius: 24, background: th.ink, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Tx s={36} w={800} c={th.bg}>Accueil</Tx></Box></A>
    {svc.map((s, i) => vil.map((v, j) => { const k = i * 2 + j; return <A key={k} at={1.15 + k * 0.14} kind="up"><Card x={j * 480} y={140 + i * 170} w={460} h={140} hl={k === 0}>
      <Dot s={70} c={k === 0 ? OR : th.soft} ic={k === 0 ? '#fff' : OR} n="doc" style={{position: 'absolute', left: 24, top: 35}}/>
      <Tx s={34} w={800} style={{position: 'absolute', left: 112, top: 30}}>{s}</Tx>
      <Tx s={28} w={600} c={OR} style={{position: 'absolute', left: 112, top: 76}}>{v}</Tx></Card></A>; }))}
  </>; };

// E — l'anatomie d'une page + le bouton devis
const E0: React.FC = () => { const t = useT(); const th = useTh(); const pulse = t > 3.0 ? 1 + 0.03 * Math.sin((t - 3.0) * 6) : 1;
  const blocks: [string, string, string, number][] = [['building', 'Ce que vous faites', 'Maintenance de lignes de production', 0.1], ['user', 'Pour qui', 'Sites industriels de 50 à 500 salariés', 1.5], ['star', 'Vos références', 'Clients, chantiers, photos réelles', 2.0]];
  return <Card x={0} y={0} w={940} h={720}>
    <BrowserBar url="votre-site.fr/maintenance-lyon"/>
    {blocks.map(([ic, k, v, a], i) => <A key={k} at={a} kind="left"><Box x={28} y={110 + i * 150} w={884} h={130} style={{borderRadius: 22, background: th.soft, display: 'flex', alignItems: 'center', gap: 22, padding: '0 24px'}}>
      <Dot s={76} c={OR} n={ic}/><div><Tx s={36} w={800}>{k}</Tx><Tx s={26} w={500} c={th.mut} style={{marginTop: 6}}>{v}</Tx></div></Box></A>)}
    <A at={2.95} kind="pop"><Box x={0} y={590} w={940} style={{display: 'flex', justifyContent: 'center'}}><div style={{transform: `scale(${pulse})`, background: OR, color: '#fff', fontSize: 44, fontWeight: 800, padding: '22px 56px', borderRadius: 999, boxShadow: '0 20px 44px rgba(255,79,31,.4)', display: 'flex', alignItems: 'center', gap: 16}}><Ic n="doc" s={44} c="#fff"/>Demander un devis</div></Box></A>
    <A at={4.3} kind="fade"><Box x={720} y={96} w={200}><Chip s={26}>Visible partout</Chip></Box></A>
  </Card>; };

// F — la demande arrive, l'agenda se remplit
const F0: React.FC = () => { const t = useT(); const th = useTh(); const fill = t > 2.35;
  return <>
    <A at={0.05} kind="up"><Card x={0} y={0} w={940} h={330}>
      <Label style={{position: 'absolute', left: 36, top: 32}}>Nouvelle demande de devis</Label>
      {[['Besoin', 'Maintenance préventive, 2 lignes', 0.3], ['Site', 'Vénissieux (69)', 0.7], ['Délai', 'Avant fin du trimestre', 1.1]].map(([k, v, a], i) =>
        <Box key={k as string} x={36} y={90 + i * 74} w={868} h={60} style={{display: 'flex', alignItems: 'center', gap: 20}}>
          <Tx s={28} w={700} c={th.mut} style={{width: 120}}>{k}</Tx><Tx s={34} w={700}><Type text={v as string} a={a as number} b={(a as number) + 0.5} cursor={false}/></Tx></Box>)}
    </Card></A>
    <A at={1.6} kind="up"><Card x={0} y={370} w={940} h={190} hl={fill}>
      <Dot s={110} c={fill ? GR : th.soft} ic={fill ? '#fff' : OR} n="cal" style={{position: 'absolute', left: 36, top: 40}}/>
      <Label style={{position: 'absolute', left: 176, top: 44}}>Jeudi · 10 h</Label>
      <Tx s={46} w={800} style={{position: 'absolute', left: 176, top: 90}}>{fill ? 'Rendez-vous qualifié' : 'Libre'}</Tx>
    </Card></A>
    <Cubes at={2.35} x={470} y={460} seed={4}/>
  </>; };

const G0: React.FC = () => <LogoPanel sub="Pages service × ville" at={0.1} subAt={0.8}/>;

export const phrases: Phrase[] = T.phrases;
export const dur = T.dur;
export const scenes: Scene[] = [
  {a: 0, theme: 'light', Panel: A0}, {a: 2.05, theme: 'light', Panel: B0}, {a: 6.75, theme: 'dark', Panel: C0},
  {a: 10.05, theme: 'light', Panel: D0}, {a: 12.9, theme: 'light', Panel: E0}, {a: 18.35, theme: 'dark', Panel: F0},
  {a: 21.9, theme: 'light', Panel: G0},
  {a: 24.05, theme: 'light', Panel: () => <CtaPanel k="SEO" tType={24.25} tCard={24.9} t30={25.9} line="Votre premier échange" label="Premier échange" chip="Réservé" ok/>},
];
