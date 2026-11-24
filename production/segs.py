#!/usr/bin/env python3
# segs.py audio/rNN.wav spec/rNN.json : segments de parole + nb de syllabes détectées, et syllabes du texte par phrase
import sys, json, re, subprocess, numpy as np, scipy.signal as ss, soundfile as sf
wav, specf = sys.argv[1], sys.argv[2]
out = subprocess.run(['ffmpeg','-hide_banner','-i',wav,'-af','silencedetect=noise=-28dB:d=0.12','-f','null','-'],capture_output=True,text=True).stderr
st=[float(v) for v in re.findall(r'silence_start: ([\d.]+)',out)]; en=[float(v) for v in re.findall(r'silence_end: ([\d.]+)',out)]
x,sr=sf.read(wav); dur=len(x)/sr
b,a=ss.butter(4,[300/(sr/2),2500/(sr/2)],'band'); y=ss.filtfilt(b,a,x)
hop=int(sr*0.01); e=np.sqrt(np.convolve(y**2,np.ones(hop*3)/(hop*3),'same'))[::hop]; e=ss.savgol_filter(e,7,2); e=e/e.max()
pk,_=ss.find_peaks(e,distance=8,prominence=0.04,height=0.04); pkt=pk*0.01
cur=0; segs=[]
for s0,s1 in zip(st,en+[dur]):
    if s0>cur+0.03: segs.append((cur,s0))
    cur=s1
if cur<dur-0.03: segs.append((cur,dur))
for s0,s1 in segs: print(f'{s0:6.2f}-{s1:6.2f}  {((pkt>=s0)&(pkt<=s1)).sum():3d}')
def syl(t):
    t=t.lower(); g=re.findall(r"[aeiouyàâäéèêëîïôöùûüœ]+",t); return len(g)
print('---')
for i,p in enumerate(json.load(open(specf))['phrases']): print(i, syl(p['v']), p['v'])
