import React, {createContext, useContext} from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, staticFile, Img, delayRender, continueRender} from 'remotion';

// ---------- polices locales ----------
if (typeof document !== 'undefined') {
  const h = delayRender('polices');
  const defs: [string, string][] = [['400', 'Regular'], ['500', 'Medium'], ['600', 'SemiBold'], ['700', 'Bold'], ['800', 'ExtraBold']];
  Promise.all(defs.map(([w, n]) => { const f = new FontFace('ID', `url(${staticFile('InterDisplay-' + n + '.otf')})`, {weight: w}); return f.load().then((x) => { (document as any).fonts.add(x); }); }))
    .then(() => continueRender(h)).catch(() => continueRender(h));
}

// ---------- couleurs et thèmes ----------
export const OR = '#FF4F1F', GR = '#17A34A', RED = '#E5342B';
export const TH = {
  light: {bg: '#F7F5F0', card: '#FFFFFF', line: '#E7E2D8', ink: '#141412', mut: '#8C887F', soft: '#F1EDE5', sh: '0 26px 60px rgba(40,25,10,.13)'},
  dark: {bg: '#1A1A18', card: '#262623', line: '#3B3B36', ink: '#F7F5F0', mut: '#9D998F', soft: '#31312D', sh: '0 26px 60px rgba(0,0,0,.45)'},
};
export type Theme = keyof typeof TH;
const ThemeCtx = createContext<Theme>('light');
const TimeCtx = createContext(0);
const AbsCtx = createContext(0);
export const useTh = () => TH[useContext(ThemeCtx)];
export const useDark = () => useContext(ThemeCtx) === 'dark';
export const CalmCtx = createContext(false);
export const useCalm = () => useContext(CalmCtx);
export const useT = () => useContext(TimeCtx);   // secondes depuis le début de la scène
export const useAbs = () => useContext(AbsCtx);  // secondes depuis le début de la vidéo

// ---------- maths ----------
export const cl = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const P = (t: number, a: number, b: number) => cl((t - a) / (b - a));
export const oc = (x: number) => 1 - Math.pow(1 - x, 3);
export const io = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const ob = (x: number) => { const c = 1.70158 * 1.15; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
export const L = (a: number, b: number, x: number) => a + (b - a) * x;
export const rnd = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
export const fmt = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

// ---------- briques ----------
type Kind = 'pop' | 'up' | 'left' | 'right' | 'fade' | 'down';
export const A: React.FC<{at: number; kind?: Kind; out?: number; d?: number; style?: React.CSSProperties; children?: React.ReactNode}> = ({at, kind = 'up', out, d = 0.34, style, children}) => {
  const t = useT(); const p = P(t, at, at + d); const o = out === undefined ? 0 : P(t, out, out + 0.2);
  if (p <= 0 || o >= 1) return null;
  const calm = useCalm(); const e = oc(p), b = calm ? L(0.9, 1, oc(p)) : ob(p); const m = calm ? 0.45 : 1;
  const tr = kind === 'pop' ? `scale(${b})` : kind === 'up' ? `translateY(${(1 - e) * 60 * m}px)` : kind === 'down' ? `translateY(${-(1 - e) * 60 * m}px)` : kind === 'left' ? `translateX(${-(1 - e) * 120 * m}px)` : kind === 'right' ? `translateX(${(1 - e) * 120 * m}px)` : '';
  return <div style={{position: 'absolute', inset: 0, opacity: Math.min(1, p * 3) * (1 - o), transform: tr + (o > 0 ? ` translateY(${-o * 30}px)` : ''), ...style}}>{children}</div>;
};
export const Box: React.FC<{x: number; y: number; w?: number; h?: number; style?: React.CSSProperties; children?: React.ReactNode}> = ({x, y, w, h, style, children}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, ...style}}>{children}</div>
);
export const Card: React.FC<{x: number; y: number; w: number; h: number; style?: React.CSSProperties; hl?: boolean; children?: React.ReactNode}> = ({x, y, w, h, style, hl, children}) => {
  const th = useTh();
  return <div style={{position: 'absolute', left: x, top: y, width: w, height: h, background: th.card, borderRadius: 32, border: `3px solid ${hl ? OR : th.line}`, boxShadow: hl ? `0 0 0 8px rgba(255,79,31,.14), ${th.sh}` : th.sh, overflow: 'hidden', ...style}}>{children}</div>;
};
export const Tx: React.FC<{s?: number; w?: number; c?: string; style?: React.CSSProperties; children?: React.ReactNode}> = ({s = 40, w = 600, c, style, children}) => {
  const th = useTh();
  return <div style={{fontSize: s, fontWeight: w, color: c ?? th.ink, letterSpacing: s > 60 ? '-0.04em' : '-0.02em', lineHeight: 1.12, whiteSpace: style?.width ? 'normal' : 'nowrap', ...style}}>{children}</div>;
};
export const Label: React.FC<{children?: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => {
  const th = useTh();
  return <div style={{fontSize: 26, fontWeight: 700, color: th.mut, letterSpacing: '.09em', textTransform: 'uppercase', whiteSpace: 'nowrap', ...style}}>{children}</div>;
};
export const Chip: React.FC<{c?: string; fill?: boolean; s?: number; style?: React.CSSProperties; children?: React.ReactNode}> = ({c = OR, fill, s = 30, style, children}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 10, padding: `${s * 0.3}px ${s * 0.7}px`, borderRadius: 999, fontSize: s, fontWeight: 700, whiteSpace: 'nowrap', letterSpacing: '-0.01em', color: fill ? '#fff' : c, background: fill ? c : 'transparent', border: `3px solid ${c}`, ...style}}>{children}</div>
);
const PATHS: Record<string, React.ReactNode> = {
  search: <><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.6"/><path d="M15.5 15.5 L21 21" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/></>,
  check: <path d="M4.5 12.5 l5 5 L19.5 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>,
  x: <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>,
  phone: <path d="M6 3 h4 l1.5 5 -2.5 1.5 a11 11 0 0 0 5.5 5.5 L16 12.5 l5 1.5 v4 a2 2 0 0 1 -2 2 A17 17 0 0 1 4 5 a2 2 0 0 1 2 -2Z" fill="currentColor"/>,
  user: <><circle cx="12" cy="8" r="4.2" fill="currentColor"/><path d="M4 21 a8 8 0 0 1 16 0Z" fill="currentColor"/></>,
  building: <><rect x="5" y="3" width="14" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2.4"/><path d="M9 7.5h2M13 7.5h2M9 11.5h2M13 11.5h2M9 15.5h2M13 15.5h2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></>,
  doc: <><path d="M6 2.5 h8 l4.5 4.5 V21.5 H6Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round"/><path d="M9 12h6M9 16h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></>,
  star: <path d="M12 2.5 l2.9 6.2 6.6.8 -4.9 4.6 1.3 6.6 L12 17.4 6.1 20.7 7.4 14.1 2.5 9.5 l6.6-.8Z" fill="currentColor"/>,
  up: <path d="M5 16 L10 11 L13.5 14.5 L20 7 M14.5 7 H20 V12.5" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>,
  lock: <><rect x="5" y="10.5" width="14" height="10.5" rx="2.5" fill="currentColor"/><path d="M8 10.5 V7.5 a4 4 0 0 1 8 0 V10.5" fill="none" stroke="currentColor" strokeWidth="2.6"/></>,
  hand: <path d="M8 21 V11 l-2.5 2 a1.6 1.6 0 0 1 -2.2 -2.3 L8 6 V4 a1.6 1.6 0 0 1 3.2 0 V10 h1 V3 a1.6 1.6 0 0 1 3.2 0 V10 h1 V5 a1.6 1.6 0 0 1 3.2 0 V15 a6 6 0 0 1 -6 6Z" fill="currentColor"/>,
  chat: <path d="M4 5 h16 a2 2 0 0 1 2 2 v8 a2 2 0 0 1 -2 2 H11 l-5 4 v-4 H4 a2 2 0 0 1 -2 -2 V7 a2 2 0 0 1 2 -2Z" fill="currentColor"/>,
  pin: <><path d="M12 2.5 C7.5 2.5 4.5 5.8 4.5 9.8 C4.5 15 12 21.5 12 21.5 C12 21.5 19.5 15 19.5 9.8 C19.5 5.8 16.5 2.5 12 2.5Z" fill="currentColor"/><circle cx="12" cy="9.6" r="2.8" fill="#fff"/></>,
  cal: <><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2.4"/><path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/></>,
  euro: <path d="M17.5 6.5 a7 7 0 1 0 0 11 M4 10.5 h9 M4 13.8 h8" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>,
  eye: <><path d="M2 12 C5.5 5.5 18.5 5.5 22 12 C18.5 18.5 5.5 18.5 2 12Z" fill="none" stroke="currentColor" strokeWidth="2.4"/><circle cx="12" cy="12" r="3.2" fill="currentColor"/></>,
  bot: <><rect x="4" y="8" width="16" height="12" rx="3.5" fill="currentColor"/><path d="M12 8 V4.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/><circle cx="12" cy="3.5" r="1.8" fill="currentColor"/><circle cx="9" cy="14" r="1.8" fill="#fff"/><circle cx="15" cy="14" r="1.8" fill="#fff"/></>,
  folder: <path d="M3 6 a2 2 0 0 1 2 -2 h4.5 l2 2.5 H19 a2 2 0 0 1 2 2 V18 a2 2 0 0 1 -2 2 H5 a2 2 0 0 1 -2 -2Z" fill="currentColor"/>,
  flag: <path d="M5 21 V3.5 M5 4.5 h12 l-2.8 4 2.8 4 H5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>,
  send: <path d="M12 19 V6 M6 11.5 L12 5.5 L18 11.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>,
};
export const Ic: React.FC<{n: string; s?: number; c?: string; style?: React.CSSProperties}> = ({n, s = 40, c, style}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" style={{color: c, flexShrink: 0, display: 'block', ...style}}>{PATHS[n]}</svg>
);
export const Dot: React.FC<{s?: number; c?: string; n?: string; ic?: string; sq?: boolean; style?: React.CSSProperties; children?: React.ReactNode}> = ({s = 72, c = OR, n, ic = '#fff', sq, style, children}) => (
  <div style={{width: s, height: s, borderRadius: sq ? s * 0.28 : '50%', background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: ic, fontSize: s * 0.42, fontWeight: 800, ...style}}>{n ? <Ic n={n} s={s * 0.56} c={ic}/> : children}</div>
);
// ligne de liste dans une carte
export const Row: React.FC<{y: number; x?: number; w?: number; h?: number; icon?: React.ReactNode; title: React.ReactNode; sub?: React.ReactNode; right?: React.ReactNode; hl?: boolean; dim?: number; dashed?: boolean; strike?: boolean}> = ({y, x = 28, w = 884, h = 104, icon, title, sub, right, hl, dim = 1, dashed, strike}) => {
  const th = useTh();
  return <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 22, background: hl ? 'rgba(255,79,31,.10)' : dashed ? 'transparent' : th.soft, border: `3px ${dashed ? 'dashed' : 'solid'} ${hl ? OR : dashed ? th.mut : 'transparent'}`, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 22, opacity: dim}}>
    {icon}
    <div style={{flex: 1, minWidth: 0}}>
      <Tx s={38} w={700} style={{textDecoration: strike ? 'line-through' : 'none', textDecorationColor: RED, textDecorationThickness: 5}}>{title}</Tx>
      {sub ? <Tx s={26} w={500} c={th.mut} style={{marginTop: 4}}>{sub}</Tx> : null}
    </div>
    {right}
  </div>;
};
export const Count: React.FC<{from?: number; to: number; a: number; b: number; suffix?: string; prefix?: string}> = ({from = 0, to, a, b, suffix = '', prefix = ''}) => {
  const t = useT(); return <>{prefix}{fmt(L(from, to, io(P(t, a, b))))}{suffix}</>;
};
export const Type: React.FC<{text: string; a: number; b: number; cursor?: boolean}> = ({text, a, b, cursor = true}) => {
  const t = useT(); const n = Math.floor(P(t, a, b) * text.length + 0.001);
  return <>{text.slice(0, n)}{cursor && (t < b + 0.1 || Math.floor(t * 2.5) % 2 === 0) ? <span style={{color: OR, fontWeight: 400}}>|</span> : null}</>;
};
// petits cubes qui s'envolent à une validation
export const Cubes: React.FC<{at: number; x: number; y: number; n?: number; seed?: number; spread?: number}> = ({at, x, y, n: n0 = 12, seed = 1, spread: sp0 = 260}) => { let n = n0, spread = sp0;
  const t = useT(); const th = useTh(); const p = P(t, at, at + 1.0); const calm = useCalm();
  if (p <= 0 || p >= 1) return null;
  if (calm) { n = Math.max(3, Math.round(n * 0.35)); spread = spread * 0.6; }
  return <>{[...Array(n)].map((_, i) => {
    const a = rnd(seed * 31 + i) * Math.PI * 2, r = (0.35 + rnd(seed * 17 + i * 3) * 0.65) * spread, s = 14 + rnd(seed + i * 7) * 22;
    const e = oc(p); const px = x + Math.cos(a) * r * e, py = y + Math.sin(a) * r * e * 0.8 - e * 120 + p * p * 60;
    const col = i % 3 === 0 ? th.ink : OR;
    return <div key={i} style={{position: 'absolute', left: px - s / 2, top: py - s / 2, width: s, height: s, borderRadius: 4, background: col, opacity: (1 - p) * (i % 3 === 0 ? 0.35 : 1), transform: `rotate(${p * 200 * (i % 2 ? 1 : -1)}deg)`}}/>;
  })}</>;
};
export const Bar: React.FC<{x: number; y: number; w: number; h: number; v: number; c?: string; r?: number}> = ({x, y, w, h, v, c = OR, r}) => {
  const th = useTh();
  return <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: r ?? h / 2, background: th.soft, overflow: 'hidden'}}><div style={{width: `${cl(v) * 100}%`, height: '100%', background: c, borderRadius: r ?? h / 2}}/></div>;
};
export const Logo: React.FC<{s?: number}> = ({s = 44}) => {
  const th = useTh();
  return <div style={{display: 'flex', alignItems: 'center', gap: s * 0.32, fontSize: s, color: th.ink, letterSpacing: '-0.03em', whiteSpace: 'nowrap'}}>
    <Img src={staticFile('icon.png')} style={{width: s * 1.4, height: s * 1.4, borderRadius: s * 0.34}}/>
    <span><span style={{fontWeight: 400}}>Super</span>{' '}<span style={{fontWeight: 800}}>Refer</span></span>
  </div>;
};

// ---------- texte cinétique, mot par mot ----------
export type Phrase = {a: number; b: number; text: string; instant?: boolean};
const parse = (text: string) => text.split('|').map((line) => { const out: {w: string; hi: boolean}[] = []; let hi = false;
  line.trim().split(/\s+/).forEach((raw) => { let w = raw; if (w.startsWith('*')) { hi = true; w = w.slice(1); } const end = w.endsWith('*'); if (end) w = w.slice(0, -1); out.push({w, hi}); if (end) hi = false; });
  return out; });
const Kinetic: React.FC<{ph: Phrase; exit: number; t: number}> = ({ph, exit, t}) => {
  const th = useTh(); const calm = useCalm(); const lines = parse(ph.text);
  const words = lines.flat(); const tot = words.reduce((s, w) => s + w.w.length + 2, 0);
  const maxc = Math.max(...lines.map((l) => l.reduce((s, w) => s + w.w.length + 1, 0)));
  const fs = cl(1750 / maxc, 54, lines.length > 2 ? 92 : 108);
  const span = Math.max(0.2, ph.b - ph.a - 0.18); let acc = 0; let k = 0;
  const po = P(t, exit - 0.16, exit);
  return <div style={{position: 'absolute', left: 60, right: 60, top: 318, height: 330, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: 1 - po, transform: `translateY(${-po * 34}px)`}}>
    {lines.map((line, li) => <div key={li} style={{display: 'flex', gap: fs * 0.24, justifyContent: 'center', lineHeight: 1.04}}>
      {line.map((w) => { const tw = ph.a + (acc / tot) * span; acc += w.w.length + 2; const p = ph.instant ? 1 : P(t, tw, tw + 0.16); const key = k++;
        return <span key={key} style={{fontSize: fs, fontWeight: 800, letterSpacing: '-0.045em', color: w.hi ? OR : th.ink, opacity: p, display: 'inline-block', whiteSpace: 'nowrap', transform: `translateY(${(1 - oc(p)) * (calm ? 14 : 30)}px) scale(${w.hi ? (calm ? L(1.08, 1, oc(p)) : L(1.3, 1, ob(p))) : L(0.94, 1, oc(p))})`, filter: p < 1 ? `blur(${(1 - p) * (calm ? 3 : 7)}px)` : undefined}}>{w.w}</span>; })}
    </div>)}
  </div>;
};

// ---------- trame de pixels et dissolution ----------
const CELL = 108, COLS = 10, ROWS = 18;
const Texture: React.FC<{t: number}> = ({t}) => {
  const dark = useDark();
  return <>{[...Array(46)].map((_, i) => { const c = Math.floor(rnd(i * 3 + 1) * COLS), r = Math.floor(rnd(i * 5 + 2) * ROWS); const accent = i % 9 === 0;
    const o = (accent ? 0.10 : dark ? 0.035 : 0.04) * (0.6 + 0.4 * Math.sin(t * 0.8 + i));
    return <div key={i} style={{position: 'absolute', left: c * CELL, top: r * CELL + 12, width: CELL, height: CELL, background: accent ? OR : dark ? '#fff' : '#141412', opacity: o}}/>; })}</>;
};
const Dissolve: React.FC<{p: number; color: string; seed: number}> = ({p, color, seed}) => (
  <>{[...Array(COLS * ROWS)].map((_, i) => { const r = rnd(i * 7 + seed * 13); const on = p < 0.5 ? r < p * 2 : r > (p - 0.5) * 2; if (!on) return null;
    const accent = rnd(i * 11 + seed) < 0.06;
    return <div key={i} style={{position: 'absolute', left: (i % COLS) * CELL, top: Math.floor(i / COLS) * CELL - 12, width: CELL + 1, height: CELL + 1, background: accent ? OR : color}}/>; })}</>
);

// ---------- le réel ----------
export type Scene = {a: number; theme: Theme; Panel: React.FC};
export const Reel: React.FC<{dur: number; scenes: Scene[]; phrases: Phrase[]; speed?: number; calm?: boolean}> = ({dur, scenes, phrases, speed = 1, calm = false}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const t = (f / fps) * speed;
  let si = 0; scenes.forEach((s, i) => { if (t >= s.a) si = i; });
  const sc = scenes[si]; const th = TH[sc.theme];
  // dissolution autour de chaque changement de scène
  let dz: React.ReactNode = null;
  scenes.forEach((s, i) => { if (i === 0) return; const p = P(t, s.a - 0.2, s.a + 0.24); if (p > 0 && p < 1) dz = <Dissolve p={p} color={TH[s.theme].bg} seed={i}/>; });
  let pi = -1; phrases.forEach((p, i) => { if (t >= p.a - 0.02) pi = i; });
  const ph = pi >= 0 ? phrases[pi] : null; const exit = ph ? (pi + 1 < phrases.length ? Math.min(phrases[pi + 1].a - 0.04, ph.b + 1.3) : dur + 1) : 0;
  const pin = P(t, sc.a, sc.a + 0.3);
  return <CalmCtx.Provider value={calm}><ThemeCtx.Provider value={sc.theme}><AbsCtx.Provider value={t}><TimeCtx.Provider value={t - sc.a}>
    <AbsoluteFill style={{background: th.bg, fontFamily: 'ID, sans-serif', overflow: 'hidden'}}>
      <Texture t={t}/>
      <div style={{position: 'absolute', left: 240, top: 620, width: 600, height: 760, borderRadius: '50%', background: `radial-gradient(circle, rgba(255,79,31,${sc.theme === 'dark' ? 0.16 : 0.13}) 0%, rgba(255,79,31,0) 68%)`, transform: `translate(${Math.sin(t * 0.5) * 30}px, ${Math.cos(t * 0.4) * 30}px)`}}/>
      <div style={{position: 'absolute', left: 0, right: 0, top: 226, display: 'flex', justifyContent: 'center'}}><Logo s={40}/></div>
      {ph && t < exit ? <Kinetic ph={ph} exit={exit} t={t}/> : null}
      <div style={{position: 'absolute', left: 70, top: 700, width: 940, height: 800, opacity: Math.min(1, pin * 2.5), transform: `translateY(${(1 - oc(pin)) * 40}px)`}}><sc.Panel/></div>
      {dz}
    </AbsoluteFill>
  </TimeCtx.Provider></AbsCtx.Provider></ThemeCtx.Provider></CalmCtx.Provider>;
};

// ---------- scènes partagées ----------
export const LogoPanel: React.FC<{sub: string; at?: number; subAt?: number}> = ({sub, at = 0.15, subAt = 0.9}) => {
  const t = useT(); const th = useTh();
  return <>
    <A at={at} kind="pop"><Box x={0} y={150} w={940} style={{display: 'flex', justifyContent: 'center'}}><Logo s={104}/></Box></A>
    <A at={subAt} kind="up"><Box x={0} y={400} w={940} style={{display: 'flex', justifyContent: 'center'}}><Chip fill s={44}><Ic n="up" s={46} c="#fff"/>{sub}</Chip></Box></A>
    <A at={subAt + 0.35} kind="fade"><Box x={170} y={560} w={600}><Bar x={0} y={0} w={600} h={18} v={io(P(t, subAt + 0.4, subAt + 1.8))}/><Tx s={28} w={600} c={th.mut} style={{position: 'absolute', top: 34, left: 0, right: 0, textAlign: 'center'}}>Google · Bing · assistants IA</Tx></Box></A>
    <Cubes at={at + 0.15} x={470} y={230} seed={5}/>
  </>;
};
export const CtaPanel: React.FC<{k: string; tType: number; tCard: number; t30: number; line: string; label?: string; chip?: string; ok?: boolean}> = ({k, tType, tCard, t30, line, label = 'Premier rendez-vous', chip = '30 min · au téléphone', ok = false}) => {
  const abs = useAbs(); const t = useT(); const th = useTh(); const base = abs - t;
  const ty = tType - base, tc = tCard - base, t3 = t30 - base;
  const sent = t >= ty + 0.75; const ring = t > t3 ? Math.sin((t - t3) * 38) * Math.max(0, 1 - ((t - t3) % 0.9) / 0.5) * 9 : 0;
  return <>
    <A at={0.1} kind="pop"><Box x={0} y={0} w={940} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: OR, color: '#fff', fontSize: k.length > 6 ? 118 : 150, fontWeight: 800, letterSpacing: '0.01em', padding: '18px 60px', borderRadius: 44, boxShadow: '0 28px 60px rgba(255,79,31,.42)', transform: `rotate(-2.5deg) scale(${1 + (useCalm() ? 0.008 : 0.03) * Math.sin(t * (useCalm() ? 4 : 9))})`}}>{k}</div></Box></A>
    <A at={0.3} kind="up"><Card x={0} y={250} w={940} h={140} style={{borderRadius: 70}}>
      <Dot s={92} c="#5B5BF0" n="user" style={{position: 'absolute', left: 24, top: 21}}/>
      <Tx s={56} w={700} style={{position: 'absolute', left: 146, top: 36}}>{sent ? <span style={{color: th.mut, fontWeight: 500}}>Votre commentaire…</span> : <Type text={k} a={ty} b={ty + 0.5}/>}</Tx>
      <Dot s={92} c={!sent && t > ty ? OR : th.ink} ic={th.card} n="send" style={{position: 'absolute', right: 24, top: 21, transform: `scale(${1 - 0.22 * Math.sin(P(t, ty + 0.6, ty + 0.85) * Math.PI)})`}}/>
    </Card></A>
    <A at={tc} kind="up"><Card x={0} y={440} w={940} h={300} hl={t > t3}>
      <Dot s={150} c={OR} n={ok ? 'cal' : 'phone'} style={{position: 'absolute', left: 44, top: 75, transform: `rotate(${ring}deg)`}}/>
      <Label style={{position: 'absolute', left: 236, top: 52}}>{label}</Label>
      <Tx s={line.length > 21 ? 48 : 58} w={800} style={{position: 'absolute', left: 236, top: line.length > 21 ? 102 : 96}}>{line}</Tx>
      <A at={t3} kind="pop"><Box x={236} y={190}>{ok ? <Chip fill c={GR} s={40}><Ic n="check" s={40} c="#fff"/>{chip}</Chip> : <Chip fill s={40}>{chip}</Chip>}</Box></A>
    </Card></A>
    <Cubes at={ty + 0.75} x={850} y={320} seed={9}/>
    <Cubes at={t3} x={470} y={590} seed={12} n={16} spread={340}/>
  </>;
};
