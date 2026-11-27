#!/usr/bin/env python3
"""Mixage du réel 52 : groove léger de piano électrique en ré mineur, 92 bpm, kick doux + charleston (différent du marimba du R51 et de la
nappe du R50). Bruitages : frappe clavier, glissé de l'encadré, clic d'interrupteur, bip grave « pas une offre », cases cochées,
tampon de l'étiquette, tintement quand l'offre entre dans l'encadré, pas du candidat. Sons 100 % synthétiques."""
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt, resample_poly
SR = 48000; DUR = 51.2; N = int(SR * DUR); rng = np.random.default_rng(52)
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

# --- musique : Dm9 – Bbmaj7 – Gm9 – A7sus, 92 bpm ; s'intensifie pendant la méthode ---
CH = [(38, [62, 65, 69, 72, 76]), (34, [62, 65, 69, 70, 74]), (43, [62, 65, 69, 70, 74]), (45, [62, 64, 67, 69, 74])]
BEAT = 60 / 92; BAR = BEAT * 4
for k in range(int(42.4 / BAR) + 1):
    t0 = k * BAR; b, ms = CH[k % 4]; dense = 1.0 if 16 <= t0 < 40 else 0.65
    place(bass(b, BEAT * 1.5), t0, 0.9); place(bass(b, BEAT), t0 + BEAT * 2.5, 0.6)
    for j, off in enumerate((0, 1.5, 2.5)):              # accords syncopés
        if t0 + off * BEAT < 42.3:
            for i, m in enumerate(ms): place(ep(m, BEAT * 1.1, 0.022 * dense + 0.006), t0 + off * BEAT + i * 0.004, 1, -0.3 + 0.15 * i)
    for j in range(4):
        if t0 + j * BEAT < 42.3:
            if j in (0, 2): place(kick(), t0 + j * BEAT, 0.7 * dense)
            place(hat(0.04 * dense), t0 + j * BEAT + BEAT / 2, 1, 0.3)
            if dense == 1: place(hat(0.025), t0 + j * BEAT, 1, -0.3)
for i, m in enumerate([62, 65, 69, 72, 76]): place(ep(m, 2.2, 0.06), 42.45 + i * 0.05, 1, -0.3 + 0.15 * i)   # accord de fin
# --- bruitages calés sur l'image ---
place(pop(420), 0.05, 0.6)
place(click(), 1.85, 0.8)                                    # interrupteur
place(whoosh(0.5), 5.1, 0.45)
for i in range(12): place(key(), 6.6 + i * 0.11, 0.7, 0.2)  # « soudeur Lyon »
place(whoosh(0.6), 8.2, 0.55); place(ding(1568, 0.6, 0.14), 8.95)   # l'encadré glisse
place(pop(700), 10.3, 0.5)
place(whoosh(0.5), 11.75, 0.45)
place(whoosh(0.9), 14.15, 0.35)                              # loupe
place(low_bip(), 15.75, 1.0); place(thump(), 15.75, 0.8)     # PAS UNE OFFRE
for x in (17.58, 19.84, 24.36, 27.47): place(pop(520), x, 0.55)
place(click(), 19.95, 0.5)
for i in range(7): place(key(), 22.0 + i * 0.05, 0.6)
place(whoosh(0.35), 22.65, 0.4)                              # « Ninja » barré
for i, x in enumerate((24.81, 25.6, 26.42)): place(click(), x + 0.2, 0.9); place(ding(1760 + 200 * i, 0.4, 0.08), x + 0.25)
place(thump(), 27.55, 0.7)                                   # l'étiquette se colle
place(ding(1318, 0.8, 0.14), 29.9)
place(whoosh(0.5), 31.6, 0.45)
place(whoosh(0.8), 35.15, 0.55); place(ding(1760, 1.2, 0.3), 36.0); place(ding(2217, 1.0, 0.18), 36.12)   # dans l'encadré
for i in range(4): place(thump(), 37.75 + i * 0.22, 0.25)    # pas du candidat
place(pop(650), 38.45, 0.6)
place(whoosh(0.6), 39.8, 0.5)
place(whoosh(0.6), 42.2, 0.5); place(ding(1175, 1.4, 0.24), 47.5)
# --- voix + mixage ---
sr, v = wavfile.read('audio/r52.wav'); v = v.astype(np.float64) / 32768
if v.ndim > 1: v = v.mean(1)
v = resample_poly(v, SR, sr); v = v / (np.abs(v).max() + 1e-9) * 0.9
env = np.sqrt(np.convolve(np.pad(v, (0, max(0, N - len(v))))[:N] ** 2, np.ones(int(SR * 0.25)) / int(SR * 0.25), 'same'))
duck = 1 - 0.55 * np.minimum(1, env / 0.06)
buf *= 0.9; buf *= duck[:, None]
buf[:len(v), 0] += v[:N]; buf[:len(v), 1] += v[:N]
fade = int(SR * 0.6); buf[-fade:] *= np.linspace(1, 0, fade)[:, None]
buf = buf / max(1.0, np.abs(buf).max() / 0.97)
wavfile.write('audio/r52_mix.wav', SR, (buf * 32767).astype(np.int16)); print('ok', round(len(buf) / SR, 2))
