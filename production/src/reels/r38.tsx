import React from 'react';
import {A, Box, Card, Tx, Label, Chip, Ic, Dot, Cubes, CtaPanel, useT, useTh, OR, GR, RED, P, io, oc, L, Scene, Phrase} from '../lib';
import {BrowserBar} from './r29';
import T from '../../spec/r38_t.json';
// temps en secondes de la voix d'origine (la vidéo tourne à 1,05)

// une ligne de résultat Google
const Res: React.FC<{y: number; n: number; name: string; url: string; you?: boolean; hl?: boolean; dim?: number}> = ({y, n, name, url, you, hl, dim = 1}) => { const th = useTh();
  return <div style={{position: 'absolute', left: 28, top: y, width: 884, height: 96, borderRadius: 20, background: hl ? 'rgba(255,79,31,.12)' : th.soft, border: `3px solid ${hl ? OR : 'transparent'}`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 22px', opacity: dim}}>
    <Tx s={34} w={800} c={hl ? OR : th.mut} style={{width: 56}}>{n}</Tx>
    <div style={{flex: 1}}><Tx s={32} w={800} c={you ? OR : th.ink}>{name}</Tx><Tx s={22} w={500} c={th.mut} style={{marginTop: 4}}>{url}</Tx></div>
    {you ? <Chip fill s={26}>Vous</Chip> : null}</div>; };

// A — la page de résultats : le concurrent devant, vous loin derrière
const A0: React.FC = () => { const th = useTh();
  return <Card x={0} y={0} w={940} h={700}>
    <BrowserBar url="google.fr/search?q=maintenance+industrielle+lyon"/>
    <A at={0.1} kind="up"><Res y={110} n={1} name="Concurrent Industrie" url="concurrent.fr/maintenance-lyon" hl/></A>
    <A at={0.25} kind="up"><Res y={220} n={2} name="Annuaire pro" url="annuaire.fr/lyon"/></A>
    <A at={0.4} kind="up"><Res y={330} n={3} name="Autre prestataire" url="prestataire.fr"/></A>
    <A at={0.55} kind="fade"><Tx s={40} w={800} c={th.mut} style={{position: 'absolute', left: 60, top: 440}}>…</Tx></A>
    <A at={0.7} kind="up"><Res y={540} n={7} name="Votre entreprise" url="votre-site.fr" you dim={0.75}/></A>
  </Card>; };

// B — la taille de l'entreprise ne décide pas du classement
const B0: React.FC = () => { const t = useT(); const th = useTh();
  const Bld: React.FC<{x: number; h: number; label: string}> = ({x, h, label}) => <Box x={x} y={560 - h} w={300} h={h}>
    <div style={{position: 'absolute', inset: 0, borderRadius: 24, background: th.card, boxShadow: th.sh, border: `3px solid ${th.line}`}}>
      {[...Array(Math.floor(h / 70))].map((_, r) => [0, 1, 2].map((c) => <div key={r + '-' + c} style={{position: 'absolute', left: 40 + c * 80, top: 30 + r * 70, width: 50, height: 38, borderRadius: 8, background: th.soft}}/>))}</div>
    <Tx s={34} w={800} style={{position: 'absolute', top: h + 20, width: 300, textAlign: 'center'}}>{label}</Tx></Box>;
  return <>
    <A at={0.05} kind="up"><Bld x={60} h={460} label="Grand groupe"/></A>
    <A at={0.3} kind="up"><Bld x={580} h={220} label="PME"/></A>
    <A at={0.9} kind="pop"><Box x={380} y={260} w={180} h={180} style={{borderRadius: 90, background: OR, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 44px rgba(255,79,31,.4)'}}><Tx s={110} w={800} c="#fff">≠</Tx></Box></A>
    <A at={1.2} kind="fade"><Box x={0} y={680} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip s={34}><Ic n="search" s={34} c={OR}/>La taille ne compte pas</Chip></Box></A>
  </>; };

// C — Google classe des pages : la plus pertinente gagne
const C0: React.FC = () => { const t = useT(); const th = useTh();
  const pg: [string, number][] = [['Page « Nos services »', 0.35], ['Page « Maintenance à Lyon »', 0.95], ['Page « Qui sommes-nous »', 0.2]];
  const win = t > 3.0;
  return <>
    <A at={0.05} kind="fade"><Label style={{position: 'absolute', left: 0, top: 0}}>Recherche : maintenance industrielle Lyon</Label></A>
    {pg.map(([name, v], i) => <A key={name} at={0.3 + i * 0.25} kind="left"><Card x={0} y={70 + i * 200} w={940} h={170} hl={win && i === 1} style={{opacity: win && i !== 1 ? 0.5 : 1}}>
      <Dot s={74} c={i === 1 ? OR : th.soft} ic={i === 1 ? '#fff' : OR} n="doc" style={{position: 'absolute', left: 28, top: 26}}/>
      <Tx s={36} w={800} style={{position: 'absolute', left: 124, top: 30}}>{name}</Tx>
      <div style={{position: 'absolute', left: 124, top: 100, width: 600, height: 22, borderRadius: 11, background: th.soft, overflow: 'hidden'}}><div style={{width: `${v * 100 * io(P(t, 2.4, 3.2))}%`, height: '100%', background: i === 1 ? OR : th.mut, borderRadius: 11}}/></div>
      <Tx s={24} w={700} c={th.mut} style={{position: 'absolute', left: 740, top: 96}}>Pertinence</Tx>
      {win && i === 1 ? <Box x={760} y={22}><Chip fill s={30}>N° 1</Chip></Box> : null}</Card></A>)}
    <Cubes at={3.0} x={800} y={350} seed={3}/>
  </>; };

// D — six pages précises contre une seule page fourre-tout
const D0: React.FC = () => { const t = useT(); const th = useTh();
  const pages = ['Maintenance', 'Dépannage', 'Automatisme', 'Lyon', 'Grenoble', 'Saint-Étienne'];
  return <>
    <A at={0.05} kind="fade"><Label style={{position: 'absolute', left: 0, top: 0}}>Concurrent</Label></A>
    {pages.map((p, i) => <A key={p} at={0.25 + i * 0.12} kind="pop"><Box x={(i % 3) * 316} y={50 + Math.floor(i / 3) * 120} w={296} h={100} style={{borderRadius: 20, background: th.card, border: `3px solid ${OR}`, boxShadow: th.sh, display: 'flex', alignItems: 'center', gap: 12, padding: '0 18px'}}>
      <Ic n="doc" s={36} c={OR}/><Tx s={28} w={800}>{p}</Tx></Box></A>)}
    <A at={2.6} kind="fade"><Label style={{position: 'absolute', left: 0, top: 330}}>Vous</Label></A>
    <A at={2.7} kind="up"><Card x={0} y={380} w={940} h={300}>
      <Tx s={40} w={800} style={{position: 'absolute', left: 32, top: 28}}>Nos services</Tx>
      <Tx s={26} w={500} c={th.mut} style={{position: 'absolute', left: 32, top: 90, width: 870, lineHeight: 1.35}}>Maintenance, dépannage, automatisme, Lyon, Grenoble, Saint-Étienne, conseil, formation, pièces détachées…</Tx>
      <A at={3.6} kind="pop"><Box x={640} y={210}><Chip fill c={RED} s={30}>Parle de tout</Chip></Box></A></Card></A>
  </>; };

// E — une page précise par recherche : titre, réponse, preuves
const E0: React.FC = () => { const t = useT(); const th = useTh();
  const items: [string, string, string, number][] = [['doc', 'Un titre clair', 'Maintenance industrielle à Lyon', 3.55], ['chat', 'Une réponse concrète', 'Délais, méthode, zone couverte', 4.55], ['star', 'Des preuves', 'Références, photos, avis clients', 5.5]];
  return <Card x={0} y={0} w={940} h={700}>
    <BrowserBar url="votre-site.fr/maintenance-industrielle-lyon"/>
    <A at={0.2} kind="up"><Box x={28} y={104} w={884} h={90} style={{borderRadius: 20, background: th.soft, display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px'}}><Ic n="search" s={38} c={OR}/><Tx s={30} w={700}>1 recherche importante = 1 page</Tx></Box></A>
    {items.map(([ic, k, v, a], i) => { const on = t >= a; return <A key={k} at={a} kind="left"><Box x={28} y={220 + i * 150} w={884} h={130} style={{borderRadius: 22, border: `3px solid ${on ? OR : th.line}`, background: 'rgba(255,79,31,.06)', display: 'flex', alignItems: 'center', gap: 22, padding: '0 24px'}}>
      <Dot s={76} c={OR} n={ic}/><div style={{flex: 1}}><Tx s={36} w={800}>{k}</Tx><Tx s={26} w={500} c={th.mut} style={{marginTop: 6}}>{v}</Tx></div><Dot s={56} c={GR} n="check"/></Box></A>; })}
  </Card>; };

// F — des liens depuis d'autres sites sérieux
const F0: React.FC = () => { const t = useT(); const th = useTh();
  const src: [string, string, number, number, number][] = [['Presse locale', 'doc', 0, 0, 0.15], ['Fédération pro', 'building', 330, 0, 1.15], ['Partenaire', 'hand', 660, 0, 1.75]];
  return <>
    {src.map(([n, ic, x, y, a]) => { const p = io(P(t, a + 0.2, a + 0.7)); return <React.Fragment key={n}><A at={a} kind="pop"><Box x={x} y={y} w={280} h={150} style={{borderRadius: 24, background: th.card, boxShadow: th.sh, border: `3px solid ${th.line}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}>
        <Ic n={ic} s={50} c={OR}/><Tx s={30} w={800}>{n}</Tx></Box></A>
      <svg width={940} height={700} style={{position: 'absolute', left: 0, top: 0, pointerEvents: 'none'}}><path d={`M ${x + 140} 160 L 470 ${160 + 260 * p}`} stroke={OR} strokeWidth={7} strokeLinecap="round" strokeDasharray="10 14" opacity={p > 0 ? 1 : 0}/></svg></React.Fragment>; })}
    <A at={0.5} kind="up"><Card x={220} y={430} w={500} h={190} hl={t > 2.3}>
      <Dot s={90} c={OR} n="doc" style={{position: 'absolute', left: 30, top: 50}}/>
      <Tx s={36} w={800} style={{position: 'absolute', left: 140, top: 48}}>Votre page</Tx>
      <Tx s={26} w={600} c={th.mut} style={{position: 'absolute', left: 140, top: 100}}>Citée par des sites sérieux</Tx></Card></A>
  </>; };

// G — vous remontez en tête
const G0: React.FC = () => { const t = useT(); const th = useTh(); const k = io(P(t, 0.5, 1.6));
  return <Card x={0} y={0} w={940} h={700}>
    <BrowserBar url="google.fr/search?q=maintenance+industrielle+lyon"/>
    <div style={{position: 'absolute', left: 0, top: L(540, 110, k) - 110, width: 940}}><Res y={110} n={k > 0.5 ? 1 : 7} name="Votre entreprise" url="votre-site.fr/maintenance-lyon" you hl={k > 0.5}/></div>
    <div style={{position: 'absolute', left: 0, top: L(0, 110, k), width: 940}}><Res y={110} n={k > 0.5 ? 2 : 1} name="Concurrent Industrie" url="concurrent.fr/maintenance-lyon" dim={L(1, 0.6, k)}/></div>
    <Res y={330} n={3} name="Annuaire pro" url="annuaire.fr/lyon" dim={0.6}/>
    <A at={1.6} kind="pop"><Box x={0} y={480} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill c={GR} s={40}><Ic n="up" s={40} c="#fff"/>Devant</Chip></Box></A>
    <Cubes at={1.6} x={470} y={170} seed={7}/>
  </Card>; };

export const phrases: Phrase[] = T.phrases;
export const dur = T.dur;
export const scenes: Scene[] = [
  {a: 0, theme: 'light', Panel: A0}, {a: 2.3, theme: 'dark', Panel: B0}, {a: 4.6, theme: 'light', Panel: C0},
  {a: 9.4, theme: 'dark', Panel: D0}, {a: 13.7, theme: 'light', Panel: E0}, {a: 19.9, theme: 'dark', Panel: F0},
  {a: 23.4, theme: 'light', Panel: G0},
  {a: 26.2, theme: 'light', Panel: () => <CtaPanel k="SEO" tType={26.35} tCard={26.95} t30={28.0} line="Votre premier échange" label="Premier échange" chip="Réservé" ok/>},
];
