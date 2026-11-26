#!/usr/bin/env python3
"""Mixage du réel 51 : marimba en majeur, posé et léger (différent de la nappe grave du R50) ; pop à chaque partenaire,
grésillement sur les flèches « sans lien », clic de case, frappe, envoi d'e-mail, ding quand le nom devient un lien,
buzzer sourd sur les liens achetés. Sons 100 % synthétiques."""
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt, resample_poly
SR = 48000; DUR = 50.6; N = int(SR * DUR); rng = np.random.default_rng(51)
buf = np.zeros((N, 2)); tt = lambda d: np.arange(int(SR * d)) / SR
filt = lambda x, kind, f, o=2: sosfilt(butter(o, f, btype=kind, fs=SR, output='sos'), x)
note = lambda m: 440 * 2 ** ((m - 69) / 12)
def place(x, t0, g=1.0, pan=0.0):
    i = int(t0 * SR)
    if i < 0 or i >= N: return
    x = x[:N - i]; buf[i:i + len(x), 0] += x * g * np.sqrt((1 - pan) / 2) * 1.414; buf[i:i + len(x), 1] += x * g * np.sqrt((1 + pan) / 2) * 1.414
def marimba(m, d=0.7, g=0.1):
    t = tt(d); f = note(m); x = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * f * 3.93 * t) * np.exp(-t * 18)
    return x * np.exp(-t * 7) * np.minimum(1, t / 0.003) * g
def bass(m, d):
    t = tt(d); return np.sin(2 * np.pi * note(m) * t) * np.exp(-t * 2.5) * np.minimum(1, t / 0.01) * 0.12
def pad(ms, d):
    t = tt(d); x = sum(np.sin(2 * np.pi * note(m) * t + rng.uniform(0, 6)) for m in ms)
    return filt(x, 'low', 1500) * np.minimum(1, t / 0.8) * np.minimum(1, (d - t) / 0.8) * 0.012
def pop(f=600):
    t = tt(0.12); fr = f * (1 + 1.2 * np.exp(-t * 60)); return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 34) * 0.4
def tick(f=2000):
    t = tt(0.05); return np.sin(2 * np.pi * f * t) * np.exp(-t * 120) * 0.2 + filt(rng.standard_normal(len(t)), 'high', 4000) * np.exp(-t * 300) * 0.08
def click():
    t = tt(0.08); return filt(rng.standard_normal(len(t)), 'band', [1500, 5000]) * np.exp(-t * 90) * 0.35 + np.sin(2 * np.pi * 900 * t) * np.exp(-t * 60) * 0.2
def crackle(d=0.6):
    t = tt(d); n = (rng.random(len(t)) > 0.995) * rng.standard_normal(len(t)); return filt(n, 'high', 2000) * np.exp(-t * 3) * 0.6
def ding(f=1320, d=1.0, g=0.28):
    t = tt(d); return (np.sin(2 * np.pi * f * t) + 0.4 * np.sin(2 * np.pi * f * 2.01 * t)) * np.exp(-t * 5) * np.minimum(1, t / 0.002) * g
def whoosh(d=0.5):
    t = tt(d); n = rng.standard_normal(len(t)); out = np.zeros(len(t)); K = 20
    for k in range(K):
        a = int(k * len(t) / K); b = int((k + 1) * len(t) / K); fc = 500 + 4000 * (k + .5) / K; out[a:b] = filt(n, 'band', [fc * .7, fc * 1.4])[a:b]
    return out * np.sin(np.pi * t / d) ** 2 * 0.3
def buzz():
    t = tt(0.45); x = np.sign(np.sin(2 * np.pi * 110 * t)) * 0.5 + np.sin(2 * np.pi * 116 * t) * 0.5
    return filt(x, 'low', 900) * np.minimum(1, t / 0.01) * np.exp(-t * 4) * 0.22

# --- musique : fa majeur, marimba en croches, tempo posé (100 bpm) ; plus présente quand ça se résout ---
CH = [(53, [65, 69, 72, 77]), (50, [62, 65, 69, 74]), (46, [58, 62, 65, 70]), (48, [60, 64, 67, 72])]   # F, Dm, Bb, C
BEAT = 0.6; BAR = BEAT * 4
for k in range(int(DUR / BAR) + 1):
    t0 = k * BAR; b, ms = CH[k % 4]; dense = 1.0 if 22 <= t0 < 41 else 0.6
    place(bass(b, BAR), t0, 0.8); place(pad(ms, BAR + 0.6), t0, 1.0)
    pattern = [0, 2, 1, 3, 2, 1, 3, 2]
    for j, idx in enumerate(pattern):
        if t0 + j * BEAT / 2 > 41.2 and t0 < 41.2: break
        if dense < 1 and j % 2: continue
        place(marimba(ms[idx], 0.6, 0.075 * dense + 0.02), t0 + j * BEAT / 2, 1, (-0.35, 0.35)[j % 2])
# fin : accord résolu
for i, m in enumerate([65, 69, 72, 77]): place(marimba(m, 1.6, 0.12), 41.35 + i * 0.06, 1, -0.3 + 0.2 * i)
# --- bruitages calés sur l'image ---
place(pop(420), 0.05, 0.7)
place(click(), 2.95, 0.9)                                                     # tampon GRATUIT
place(whoosh(0.6), 5.3, 0.5)
place(pop(500), 5.55, 0.6)
place(whoosh(0.4), 9.0, 0.45); place(ding(1568, 0.6, 0.15), 11.15)            # recommandation
for i, x in enumerate((14.95, 15.75, 16.75, 17.55)): place(pop(560 + 60 * i), x, 0.75, (-0.5, 0.5, -0.5, 0.5)[i])
for i in range(4): place(tick(2300), 18.8 + i * 0.25, 0.6, (-0.4, 0.4, -0.4, 0.4)[i])
place(crackle(0.7), 21.05, 0.7)
for x in (22.5, 24.1, 25.7): place(click(), x, 0.9)
for i in range(16): place(tick(2600), 23.9 + i * 0.055, 0.3, 0.2)
place(whoosh(0.5), 27.1, 0.45)
place(whoosh(0.8), 32.25, 0.6)                                                # l'e-mail part
place(ding(1760, 1.2, 0.32), 33.1); place(ding(2217, 1.0, 0.18), 33.22)       # le nom devient un lien
place(pop(700), 33.9, 0.5)
place(pop(520), 35.5, 0.5); place(buzz(), 37.6, 1.0)                          # liens achetés
for i in range(4): place(ding(1320 * 2 ** (i * 2 / 12), 0.7, 0.16), 38.7 + i * 0.25, 1, (-0.4, 0.4, -0.4, 0.4)[i])
place(whoosh(0.6), 41.1, 0.5); place(ding(1175, 1.4, 0.24), 45.65)
# --- voix + mixage ---
sr, v = wavfile.read('audio/r51.wav'); v = v.astype(np.float64) / 32768; v = resample_poly(v, SR, sr); v = v / (np.abs(v).max() + 1e-9) * 0.9
env = np.sqrt(np.convolve(np.pad(v, (0, max(0, N - len(v))))[:N] ** 2, np.ones(int(SR * 0.25)) / int(SR * 0.25), 'same'))
duck = 1 - 0.55 * np.minimum(1, env / 0.06)
buf *= 0.9; buf *= duck[:, None]
buf[:len(v), 0] += v[:N]; buf[:len(v), 1] += v[:N]
fade = int(SR * 0.6); buf[-fade:] *= np.linspace(1, 0, fade)[:, None]
buf = buf / max(1.0, np.abs(buf).max() / 0.97)
wavfile.write('audio/r51_mix.wav', SR, (buf * 32767).astype(np.int16)); print('ok', round(len(buf) / SR, 2))
