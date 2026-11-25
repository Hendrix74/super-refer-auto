#!/usr/bin/env python3
"""Mixage du réel 50 : nappe calme et grave qui monte avec le classement, un tic par mois,
une note montante à chaque place gagnée, un « ding » à la première demande. Sons 100 % synthétiques."""
import numpy as np, subprocess
from scipy.io import wavfile
from scipy.signal import butter, sosfilt, resample_poly
SR = 48000; DUR = 52.4; N = int(SR * DUR); rng = np.random.default_rng(50)
buf = np.zeros((N, 2))
tt = lambda d: np.arange(int(SR * d)) / SR
filt = lambda x, kind, f, o=2: sosfilt(butter(o, f, btype=kind, fs=SR, output='sos'), x)
note = lambda m: 440 * 2 ** ((m - 69) / 12)
def place(x, t0, g=1.0, pan=0.0):
    i = int(t0 * SR)
    if i < 0 or i >= N: return
    x = x[:N - i]; buf[i:i + len(x), 0] += x * g * np.sqrt((1 - pan) / 2) * 1.414; buf[i:i + len(x), 1] += x * g * np.sqrt((1 + pan) / 2) * 1.414
def pad(ms, d, bright=1200):
    t = tt(d); x = np.zeros(len(t))
    for m in ms:
        for det in (-0.4, 0, 0.4): x += np.sin(2 * np.pi * (note(m) + det) * t + rng.uniform(0, 6))
    e = np.minimum(1, t / 1.2) * np.minimum(1, (d - t) / 1.2)
    return filt(x, 'low', bright) * e * 0.02
def pluck(m, d=0.6, g=0.12):
    t = tt(d); f = note(m); x = sum(np.sin(2 * np.pi * f * k * t) / k ** 1.5 for k in (1, 2, 3))
    return x * np.exp(-t * 6) * np.minimum(1, t / 0.004) * g
def tick(f=1500):
    t = tt(0.05); return (np.sin(2 * np.pi * f * t) * np.exp(-t * 110) * 0.22 + filt(rng.standard_normal(len(t)), 'high', 4000) * np.exp(-t * 300) * 0.1)
def pop(f=520):
    t = tt(0.12); fr = f * (1 + 1.3 * np.exp(-t * 60)); return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 34) * 0.4
def ding(f=1320, d=0.9, g=0.3):
    t = tt(d); return (np.sin(2 * np.pi * f * t) + 0.4 * np.sin(2 * np.pi * f * 2.01 * t)) * np.exp(-t * 6) * np.minimum(1, t / 0.002) * g
def whoosh(d=0.5):
    t = tt(d); n = rng.standard_normal(len(t)); out = np.zeros(len(t)); K = 20
    for k in range(K):
        a = int(k * len(t) / K); b = int((k + 1) * len(t) / K); fc = 400 + 4200 * (k + .5) / K; out[a:b] = filt(n, 'band', [fc * .7, fc * 1.4])[a:b]
    return out * np.sin(np.pi * t / d) ** 2 * 0.3
def sub(m, d):
    t = tt(d); return np.sin(2 * np.pi * note(m) * t) * np.minimum(1, t / 0.3) * np.minimum(1, (d - t) / 0.5) * 0.11

# --- musique : ré mineur lent, qui s'ouvre et s'éclaire à mesure que la page remonte ---
CH = [([50, 57, 62, 65], 38), ([46, 53, 58, 62], 34), ([53, 57, 60, 65], 41), ([48, 55, 60, 64], 36)]   # Dm, Bb, F, C
BAR = 4.0
for k in range(int(DUR / BAR) + 1):
    t0 = k * BAR; ms, b = CH[k % 4]; lift = min(1.0, max(0.0, (t0 - 19) / 20))      # s'ouvre à partir de l'exemple
    place(pad(ms, BAR + 1.0, 900 + 2200 * lift), t0, 0.9 + 0.5 * lift); place(sub(b, BAR), t0, 0.8)
    if t0 >= 19.3 and t0 < 45:                                                        # arpège discret dès que l'exemple commence
        for j in range(8): place(pluck(ms[j % 4] + 12, 0.5, 0.05 + 0.04 * lift), t0 + j * 0.5, 1, (-0.4, 0.4)[j % 2])
    if t0 >= 45:
        for j in range(4): place(pluck(ms[j % 4] + 12, 0.9, 0.09), t0 + j * 1.0, 1, 0)
# --- bruitages calés sur l'image ---
place(pop(420), 0.05, 0.8)
for i, x in enumerate((2.9, 3.35, 3.8)): place(tick(1300 + i * 120), x, 1.0, -0.3 + 0.3 * i)       # trois mois passent
t = tt(0.5); place(np.sin(2 * np.pi * (110 - 40 * t) * t) * np.exp(-t * 7) * 0.3, 5.45, 1.0)           # « toujours rien » : note qui retombe
for x in (10.4, 12.35, 16.16): place(pop(600), x, 0.6)                                                  # les trois vérifications
place(whoosh(1.6), 10.5, 0.5)
for i in range(22): place(tick(2200), 19.45 + i * 0.065, 0.35, 0.2)                                    # frappe de la recherche
for i in range(3): place(pop(520 + 70 * i), 22.2 + i * 0.3, 0.7, -0.4 + 0.4 * i)                       # mois 1 : les pages
place(tick(1500), 22.0); place(tick(1650), 24.4)
for i in range(3): place(ding(1568 + 200 * i, 0.4, 0.13), 24.9 + i * 0.3, 1, -0.4 + 0.4 * i)           # mois 2 : pages lues
for i, x in enumerate((26.9, 27.6, 28.5, 29.3)): place(pluck(74 + (0, 2, 5, 7)[i], 0.7, 0.22), x); place(whoosh(0.35), x - 0.05, 0.45)   # places gagnées
for i in range(24): place(tick(2200), 30.55 + i * 0.07, 0.3, 0.2)
place(ding(1760, 1.2, 0.34), 32.75); place(ding(2217, 1.2, 0.2), 32.87)                                # première demande
place(pluck(86, 0.7, 0.2), 33.4)
place(whoosh(1.2), 37.5, 0.6); place(ding(1175, 1.4, 0.3), 37.35); place(ding(1760, 1.4, 0.22), 37.5)   # la réponse
place(pluck(89, 0.8, 0.22), 40.1)
for x in (41.2, 42.6, 43.9): place(ding(1760, 0.8, 0.2), x)
place(whoosh(0.5), 44.85, 0.6); place(pop(360), 45.1, 0.7); place(ding(1320, 1.5, 0.26), 48.35)
# --- voix + mixage ---
sr, v = wavfile.read('audio/r50.wav'); v = v.astype(np.float64) / 32768; v = resample_poly(v, SR, sr); v = v / (np.abs(v).max() + 1e-9) * 0.9
env = np.sqrt(np.convolve(np.pad(v, (0, max(0, N - len(v))))[:N] ** 2, np.ones(int(SR * 0.25)) / int(SR * 0.25), 'same'))
duck = 1 - 0.55 * np.minimum(1, env / 0.06)                                                              # la musique s'efface sous la voix
buf *= 0.9; buf *= duck[:, None]
buf[:len(v), 0] += v[:N]; buf[:len(v), 1] += v[:N]
fade = int(SR * 0.6); buf[-fade:] *= np.linspace(1, 0, fade)[:, None]
buf = buf / max(1.0, np.abs(buf).max() / 0.97)
wavfile.write('audio/r50_mix.wav', SR, (buf * 32767).astype(np.int16)); print('ok', round(len(buf) / SR, 2))
