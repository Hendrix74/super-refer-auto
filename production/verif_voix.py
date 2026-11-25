#!/usr/bin/env python3
"""Contrôle obligatoire de la voix avant montage : la marque doit être dite « Super Réfère ».
Usage : python3 verif_voix.py audio/rNN.wav   (ou un .mp4 final)
Code retour 0 = OK ; 1 = marque mal prononcée ou douteuse -> régénérer la voix ; 2 = erreur technique.
Modèle : Whisper small (sherpa-onnx), téléchargé depuis les releases GitHub au premier lancement.
"""
import os, re, subprocess, sys, tempfile, unicodedata
M = os.path.expanduser("~/.cache/asr/sherpa-onnx-whisper-small")
URL = "https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-whisper-small.tar.bz2"

def norm(t):
    t = unicodedata.normalize("NFD", t.lower())
    return "".join(c for c in t if unicodedata.category(c) != "Mn")

def main(src):
    try:
        import sherpa_onnx, soundfile as sf
    except ImportError:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "--break-system-packages", "-q", "sherpa-onnx", "soundfile"])
        import sherpa_onnx, soundfile as sf
    if not os.path.isdir(M):
        os.makedirs(os.path.dirname(M), exist_ok=True)
        subprocess.check_call(f"curl -sSL {URL} | tar xj -C {os.path.dirname(M)}", shell=True)
    wav = tempfile.mktemp(suffix=".wav")
    subprocess.check_call(["ffmpeg", "-v", "error", "-y", "-i", src, "-ac", "1", "-ar", "16000", wav])
    a, sr = sf.read(wav, dtype="float32")
    r = sherpa_onnx.OfflineRecognizer.from_whisper(encoder=M + "/small-encoder.onnx", decoder=M + "/small-decoder.onnx",
                                                   tokens=M + "/small-tokens.txt", language="fr", task="transcribe", num_threads=2)
    ok = bad = 0
    for back in (4, 5, 6, 7, 8, 9, 10, 12):
        s = r.create_stream(); s.accept_waveform(sr, a[-int(back * sr):]); r.decode_stream(s)
        t = norm(s.result.text); print(f"  -{back:>2}s | {s.result.text.strip()}")
        m = re.search(r"super\s*-?\s*([a-z.]+(?:\s[a-z]\b\.?)*)", t.split("comment")[0]) if "comment" in t else None
        if not m: continue                         # fenêtre sans la phrase de marque complète
        mot = m.group(1).replace(".", "").replace(" ", "")
        if mot.startswith(("seo", "ceo", "eseo")): bad += 1
        elif mot.startswith(("ref", "fr", "fer")): ok += 1
    if bad:
        print("ÉCHEC : la marque n'est pas dite « Super Réfère » (ex. « Super SEO »). Régénérer la voix."); return 1
    if not ok:
        print("DOUTEUX : « Super Réfère » non reconnu. Régénérer la voix."); return 1
    print("OK : « Super Réfère » reconnu."); return 0

if __name__ == "__main__":
    try: sys.exit(main(sys.argv[1]))
    except Exception as e: print("ERREUR", e); sys.exit(2)
