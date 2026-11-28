#!/usr/bin/env python3
"""Mixage du réel 53 : guitare pincée synthétique (Karplus-Strong) en la mineur, 100 bpm, claps légers et kick doux (différent du
piano électrique du R52, du marimba du R51 et de la nappe du R50). Bruitages : clic de tri, cartes qui glissent, feutre des bâtons,
coches, tampon « ne rappelle jamais », tintement quand le prospect choisit. Sons 100 % synthétiques."""
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt, resample_poly
SR = 48000; DUR = 50.3; N = int(SR * DUR); rng = np.random.default_rng(53)
buf = np.zeros((N, 2)); tt = lambda d: np.arange(int(SR * d)) / SR
filt = lambda x, kind, f, o=2: sosfilt(butter(o, f, btype=kind, fs=SR, output='sos'), x)
note = lambda m: 440 * 2 ** ((m - 69) / 12)
def place(x, t0, g=1.0, pan=0.0):
    i = int(t0 * SR)
    if i < 0 or i >= N: return
    x = x[:N - i]; buf[i:i + len(x), 0] += x * g * np.sqrt((1 - pan) / 2) * 1.414; buf[i:i + len(x), 1] += x * g * np.sqrt((1 + pan) / 2) * 1.414
def ep(m, d, g=0.05):   # piano électrique (FM simple, trémolo léger)
    t = tt(d); f = note(m); mod = np.sin(2 * np.pi * f * t) * 1.2 * np.exp(-t * 3)
    x = np.sin(2 * np.pi * f * t + mod) * np.exp(-t * 1.6) * np.minimum(1, t / 0.005) * (1 + 0.12 * np.sin(2 * np.pi * 5 * t))
    rel = np.minimum(1, np.maximum(0, (d - t) / 0.15)); return x * rel * g
def bass(m, d):
    t = tt(d); x = np.sin(2 * np.pi * note(m) * t) + 0.25 * np.sin(4 * np.pi * note(m) * t)
    return x * np.exp(-t * 3) * np.minimum(1, t / 0.008) * 0.11
def kick():
    t = tt(0.25); f = 50 + 90 * np.exp(-t * 35); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 14) * 0.32
def hat(g=0.05):
    t = tt(0.05); return filt(rng.standard_normal(len(t)), 'high', 7000) * np.exp(-t * 110) * g
def key():
    t = tt(0.04); return filt(rng.standard_normal(len(t)), 'band', [2000, 6000]) * np.exp(-t * 160) * 0.25
def click():
    t = tt(0.08); return filt(rng.standard_normal(len(t)), 'band', [1500, 5000]) * np.exp(-t * 90) * 0.35 + np.sin(2 * np.pi * 900 * t) * np.exp(-t * 60) * 0.2
def pop(f=600):
    t = tt(0.12); fr = f * (1 + 1.2 * np.exp(-t * 60)); return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 34) * 0.4
def ding(f=1320, d=1.0, g=0.28):
    t = tt(d); return (np.sin(2 * np.pi * f * t) + 0.4 * np.sin(2 * np.pi * f * 2.01 * t)) * np.exp(-t * 5) * np.minimum(1, t / 0.002) * g
def low_bip():
    t = tt(0.35); return np.sin(2 * np.pi * 180 * t) * np.exp(-t * 7) * np.minimum(1, t / 0.005) * 0.3
def whoosh(d=0.5):
    t = tt(d); n = rng.standard_normal(len(t)); out = np.zeros(len(t)); K = 20
    for k in range(K):
        a = int(k * len(t) / K); b = int((k + 1) * len(t) / K); fc = 500 + 4000 * (k + .5) / K; out[a:b] = filt(n, 'band', [fc * .7, fc * 1.4])[a:b]
    return out * np.sin(np.pi * t / d) ** 2 * 0.3
def thump():
    t = tt(0.2); return filt(rng.standard_normal(len(t)), 'low', 400) * np.exp(-t * 25) * 0.6 + np.sin(2 * np.pi * 90 * t) * np.exp(-t * 20) * 0.3

def pluck(m, d, g=0.05):   # Karplus-Strong
    f = note(m); n = int(SR * d); p = max(2, int(SR / f)); buf0 = rng.uniform(-1, 1, p); out = np.zeros(n)
    for i in range(n):
        out[i] = buf0[i % p]; buf0[i % p] = 0.5 * (buf0[i % p] + buf0[(i + 1) % p]) * 0.996
    return filt(out, 'low', 4500) * g * np.minimum(1, np.arange(n) / 30)
def clap(g=0.12):
    t = tt(0.15); n = filt(rng.standard_normal(len(t)), 'band', [900, 3500])
    e = np.exp(-t * 40) + 0.6 * np.exp(-np.maximum(0, t - 0.012) * 60) * (t > 0.012); return n * e * g
def scribble(d=0.25):
    t = tt(d); return filt(rng.standard_normal(len(t)), 'band', [2500, 7000]) * (0.6 + 0.4 * np.sin(2 * np.pi * 22 * t)) * np.sin(np.pi * t / d) * 0.18
_pc = {}
def pl(m, d, g):
    k = (m, round(d, 2))
    if k not in _pc: _pc[k] = pluck(m, d, 1.0)
    return _pc[k] * g
# --- musique : Am – F – C – G, 100 bpm, arpèges pincés ; s'intensifie pendant la méthode ---
CH = [(45, [57, 60, 64, 69]), (41, [57, 60, 65, 69]), (48, [55, 60, 64, 67]), (43, [55, 59, 62, 67])]
BEAT = 60 / 100; BAR = BEAT * 4
for k in range(int(40.0 / BAR) + 1):
    t0 = k * BAR; b, ms = CH[k % 4]; dense = 1.0 if 15 <= t0 < 38 else 0.65
    place(bass(b, BEAT * 1.8), t0, 0.9); place(bass(b, BEAT * 0.9), t0 + BEAT * 2.5, 0.55)
    for j in range(8):                                   # arpège en croches
        tj = t0 + j * BEAT / 2
        if tj < 39.9: place(pl(ms[[0, 2, 1, 3, 2, 1, 3, 2][j]] + 12, 0.6, 0.028 + 0.012 * dense), tj, 1, -0.35 + 0.1 * (j % 4))
    for j in range(4):
        tj = t0 + j * BEAT
        if tj < 39.9:
            if j in (0, 2): place(kick(), tj, 0.6 * dense)
            if j in (1, 3) and dense == 1: place(clap(0.09), tj, 1, 0.15)
            place(hat(0.03 * dense), tj + BEAT / 2, 1, 0.3)
for i, m in enumerate([57, 60, 64, 69, 72]): place(pl(m, 2.5, 0.06), 40.05 + i * 0.06, 1, -0.3 + 0.15 * i)   # accord de fin
# --- bruitages calés sur l'image ---
place(pop(420), 0.05, 0.6)
place(click(), 1.95, 0.5); place(click(), 2.78, 0.5)            # pastilles « légalement / gratuitement »
place(pop(700), 3.78, 0.6)                                       # « client déçu = votre futur client »
place(whoosh(0.5), 5.4, 0.45)
for i in range(3): place(pop(500 + 80 * i), 5.72 + i * 0.35, 0.5)   # les 3 fiches
place(whoosh(0.5), 8.25, 0.45)
place(click(), 9.32, 0.9)                                        # tri
place(whoosh(0.8), 9.4, 0.35)                                    # les avis se réordonnent
place(low_bip(), 11.12, 0.6)                                     # clients déçus
place(ding(1568, 0.6, 0.16), 13.52)                              # vos futurs clients
place(whoosh(0.5), 15.2, 0.45)
for nt in (16.76, 17.75, 18.7):
    place(thump(), nt, 0.4)                                      # post-it collé
    for k in range(5): place(scribble(0.1), nt + 0.25 + k * 0.12, 0.8, 0.2)   # bâtons au feutre
place(whoosh(0.6), 19.85, 0.5)
for i in range(3): place(click(), 21.4 + i * 0.75, 0.8); place(ding(1760 + 220 * i, 0.4, 0.08), 21.45 + i * 0.75)
place(pop(650), 22.9, 0.5)                                       # bouton devis
place(thump(), 24.6, 0.6)                                        # « seulement ce que vous tenez »
place(whoosh(0.5), 26.4, 0.45)
place(thump(), 28.5, 0.8); place(thump(), 28.8, 0.7)             # tampons « ne rappelle jamais »
place(whoosh(0.6), 29.9, 0.5)
place(pop(600), 31.0, 0.55); place(ding(1318, 0.6, 0.12), 32.2); place(click(), 32.95, 0.6)
place(whoosh(0.5), 34.2, 0.45)
place(whoosh(0.7), 35.6, 0.4); place(ding(1760, 1.2, 0.28), 36.55); place(ding(2217, 1.0, 0.16), 36.67)   # choisi
place(whoosh(0.6), 37.55, 0.5)
place(whoosh(0.6), 39.9, 0.5); place(ding(1175, 1.4, 0.24), 45.85)
# --- voix + mixage ---
sr, v = wavfile.read('audio/r53.wav'); v = v.astype(np.float64) / 32768
if v.ndim > 1: v = v.mean(1)
v = resample_poly(v, SR, sr); v = v / (np.abs(v).max() + 1e-9) * 0.9
env = np.sqrt(np.convolve(np.pad(v, (0, max(0, N - len(v))))[:N] ** 2, np.ones(int(SR * 0.25)) / int(SR * 0.25), 'same'))
duck = 1 - 0.55 * np.minimum(1, env / 0.06)
buf *= 0.9; buf *= duck[:, None]
buf[:len(v), 0] += v[:N]; buf[:len(v), 1] += v[:N]
fade = int(SR * 0.6); buf[-fade:] *= np.linspace(1, 0, fade)[:, None]
buf = buf / max(1.0, np.abs(buf).max() / 0.97)
wavfile.write('audio/r53_mix.wav', SR, (buf * 32767).astype(np.int16)); print('ok', round(len(buf) / SR, 2))
