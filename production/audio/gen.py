import numpy as np, subprocess
from scipy.io import wavfile
from scipy.signal import butter, sosfilt, resample_poly
import sys, json
CFG=json.load(open(sys.argv[1]))
SR=48000; DUR=CFG['dur']; N=int(SR*DUR)
rng=np.random.default_rng(7)
def tt(d): return np.arange(int(SR*d))/SR
def env(d,a=0.005,r=None,curve=4.0):
    t=tt(d); r=r or d
    e=np.exp(-curve*t/r); e*=np.minimum(1,t/a); return e
def filt(x,kind,f,order=2):
    return sosfilt(butter(order,f,btype=kind,fs=SR,output='sos'),x)
def place(buf,x,t0,g=1.0,pan=0.0):
    i=int(t0*SR)
    if i>=N or i<0: return
    x=x[:N-i]; l=g*np.sqrt((1-pan)/2); r=g*np.sqrt((1+pan)/2)
    buf[i:i+len(x),0]+=x*l*1.414; buf[i:i+len(x),1]+=x*r*1.414
def note(m): return 440*2**((m-69)/12)

# ---------- instruments ----------
def kick():
    t=tt(0.32); f=45+110*np.exp(-t*38); ph=2*np.pi*np.cumsum(f)/SR
    return np.sin(ph)*np.exp(-t*11)*0.9+filt(rng.standard_normal(len(t)),'high',3000)*np.exp(-t*300)*0.15
def hat(open_=False):
    d=0.16 if open_ else 0.05; t=tt(d)
    return filt(rng.standard_normal(len(t)),'high',7500)*np.exp(-t*(22 if open_ else 80))*0.25
def clap():
    t=tt(0.2); n=filt(rng.standard_normal(len(t)),'band',[900,3800])
    e=sum(np.exp(-np.maximum(t-o,0)*55)*(t>=o) for o in (0,0.011,0.023)); return n*e*0.22
def bass(m,d=0.24):
    t=tt(d); f=note(m); x=np.sin(2*np.pi*f*t)+0.45*np.sign(np.sin(2*np.pi*f*t))
    return filt(x,'low',420)*env(d,0.004,d,3.2)*0.42
def pluck(m,d=0.3):
    t=tt(d); f=note(m); x=sum(np.sin(2*np.pi*f*k*t)/k for k in (1,2,3,4))
    return x*env(d,0.003,d,6)*0.13
def pad(ms,d):
    t=tt(d); x=np.zeros(len(t))
    for m in ms:
        f=note(m)
        for det in (-0.35,0,0.35): x+=np.sin(2*np.pi*(f+det)*t+rng.uniform(0,6))
    e=np.minimum(1,t/0.35)*np.minimum(1,(d-t)/0.4)
    return filt(x,'low',1500)*e*0.022

# ---------- bruitages ----------
def pop(f=520):
    t=tt(0.12); fr=f*(1+1.3*np.exp(-t*60)); return np.sin(2*np.pi*np.cumsum(fr)/SR)*np.exp(-t*34)*0.5
def click():
    t=tt(0.03); return (filt(rng.standard_normal(len(t)),'band',[1800,6000])*np.exp(-t*240)*0.5+np.sin(2*np.pi*rng.uniform(900,1300)*t)*np.exp(-t*200)*0.2)
def whoosh(d=0.42,up=True):
    t=tt(d); n=rng.standard_normal(len(t)); out=np.zeros(len(t)); K=24
    for k in range(K):
        a=int(k*len(t)/K); b=int((k+1)*len(t)/K); p=(k+.5)/K; fc=400+ (5200*(p if up else 1-p))
        out[a:b]=filt(n,'band',[fc*0.7,fc*1.4])[a:b]
    return out*np.sin(np.pi*t/d)**2*0.42
def ding(f=1320,d=0.7,g=0.3):
    t=tt(d); return (np.sin(2*np.pi*f*t)+0.4*np.sin(2*np.pi*f*2.01*t)+0.2*np.sin(2*np.pi*f*3.02*t))*np.exp(-t*7)*np.minimum(1,t/0.002)*g
def chime(fs,gap=0.09,g=0.26):
    L=int(SR*(gap*len(fs)+0.8)); x=np.zeros(L)
    for i,f in enumerate(fs):
        d=ding(f,0.7,g); a=int(i*gap*SR); x[a:a+len(d)]+=d
    return x
def thud():
    t=tt(0.4); f=40+90*np.exp(-t*30); x=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*9)
    return x*0.95+filt(rng.standard_normal(len(t)),'low',900)*np.exp(-t*45)*0.5
def womp():
    t=tt(0.55); f=330*np.exp(-t*3.4); x=np.sign(np.sin(2*np.pi*np.cumsum(f)/SR))*0.5+np.sin(2*np.pi*np.cumsum(f)/SR)
    return filt(x,'low',1400)*np.exp(-t*4.5)*np.minimum(1,t/0.01)*0.3
def buzz():
    t=tt(0.26); x=np.sign(np.sin(2*np.pi*150*t))+np.sign(np.sin(2*np.pi*113*t)); return filt(x,'low',1300)*np.minimum(1,(0.26-t)/0.04)*np.minimum(1,t/0.01)*0.13
def scan():
    t=tt(0.5); f=500+1900*t/0.5; return np.sin(2*np.pi*np.cumsum(f)/SR)*np.sin(np.pi*t/0.5)**2*0.16
def sparkle():
    L=int(SR*0.9); x=np.zeros(L)
    for i,f in enumerate((2093,2637,3136,3951,4186)):
        d=ding(f,0.5,0.1); a=int(i*0.07*SR); x[a:a+len(d)]+=d
    return x
def paper():
    t=tt(0.28); return filt(rng.standard_normal(len(t)),'band',[1500,7000])*np.sin(np.pi*t/0.28)**1.5*0.22
def riser(d=0.55):
    t=tt(d); n=filt(rng.standard_normal(len(t)),'high',2500); return n*(t/d)**2.5*0.3


music=np.zeros((N,2)); sfx=np.zeros((N,2))
B=60/104
def sub(m,d=0.5):
    t=tt(d); f=note(m); return np.sin(2*np.pi*f*t)*np.exp(-t*4)*np.minimum(1,t/0.004)*0.5
def crackle(d=0.42):
    t=tt(d); x=np.zeros(len(t))
    for k in range(26):
        a=int(rng.uniform(0,d-0.03)*SR); c=click()*rng.uniform(.3,1); x[a:a+len(c)]+=c[:len(x)-a]
    return x*np.sin(np.pi*t/d)*0.5
def roll(d):
    t=tt(d+0.05); x=np.zeros(len(t)); n=int(d*26)
    for k in range(n):
        a=int((k/n)**0.85*d*SR); c=click()*0.6; x[a:a+len(c)]+=c[:len(x)-a]
    return x
def ring():
    t=tt(0.42); return (np.sin(2*np.pi*1400*t)+np.sin(2*np.pi*1750*t))*(np.sin(2*np.pi*22*t)>0)*np.minimum(1,t/0.01)*np.minimum(1,(0.42-t)/0.03)*0.11
SOL=CFG['sol']
# partie tension : la mineur, feutrée
prog=[(45,(57,60,64)),(41,(53,57,60)),(43,(55,59,62)),(40,(52,56,59))]
tb=0.25; beat=0
while tb<SOL-0.2:
    bi=beat//4; root,ch=prog[bi%4]
    if beat%4==0: place(music,pad(ch,min(B*4+0.3,SOL-tb+0.2))*1.15,tb)
    if tb>2.0:
        place(music,kick()*0.5,tb)
        if beat%4==2: place(music,clap()*0.55,tb,1,-0.15)
        place(music,hat(),tb+B/2,0.7,0.25); place(music,hat()*0.5,tb+B*0.75,0.6,-0.3)
        place(music,pluck(ch[beat%3]+12,0.22)*0.7,tb+B/4,1,0.4)
    if beat%4 in (0,3): place(music,sub(root if root<44 else root-12),tb)
    tb+=B; beat+=1
# partie solution : do majeur
prog2=[(48,(60,64,67)),(43,(59,62,67)),(45,(60,64,69)),(41,(60,65,69))]
tb=SOL+0.1; beat=0; END=DUR-1.3
while tb<END:
    bi=beat//4; root,ch=prog2[bi%4]
    if beat%4==0: place(music,pad(ch,B*4+0.3)*1.2,tb)
    place(music,kick()*0.6,tb); place(music,hat(),tb+B/2,0.9,0.25); place(music,hat()*0.6,tb+B/4,0.6,-0.3)
    if beat%4 in (1,3): place(music,clap()*0.8,tb,1,-0.15)
    place(music,bass(root),tb); place(music,bass(root+12,0.15),tb+B/2,0.5)
    for k in range(4): place(music,pluck(ch[(beat+k)%3]+12+(12 if k==3 else 0),0.2)*0.95,tb+k*B/4,1,0.5*(-1)**k)
    tb+=B; beat+=1
place(music,pad((60,64,67,72),1.2)*2.2,END+0.05); place(music,kick()*0.6,END+0.05); place(music,chime((1047,1319,1568),0.07,0.12),END+0.05)

# bruitages : changements de scène puis accents
for c in CFG['cuts'][1:]:
    place(sfx,crackle(),c-0.2); place(sfx,whoosh(0.36)*0.45,c-0.2)
for ev in CFG['ev']:
    t0,k=ev[0],ev[1]; a=ev[2] if len(ev)>2 else None
    if k=='pop': place(sfx,pop(a or 520)*0.7,t0,1,rng.uniform(-.3,.3))
    elif k=='ding': place(sfx,ding(a or 1568,0.45,0.18),t0,1,rng.uniform(-.3,.3))
    elif k=='thud': place(sfx,thud()*0.85,t0)
    elif k=='buzz': place(sfx,buzz()*0.9,t0)
    elif k=='womp': place(sfx,womp()*0.7,t0)
    elif k=='chime': place(sfx,chime((1047,1319,1568),0.07,0.2),t0)
    elif k=='roll': place(sfx,roll(a)*0.8,t0)
    elif k=='clicks':
        n,d=a,ev[3]
        for i in range(n): place(sfx,click()*rng.uniform(.7,1),t0+i*d/n+rng.uniform(-.008,.008),1,rng.uniform(-.3,.3))
    elif k=='tick': place(sfx,click()*1.2,t0)
    elif k=='riser': place(sfx,riser(a)*0.7,t0)
    elif k=='whoosh': place(sfx,whoosh(0.4)*0.7,t0)
ct=CFG['cta']
for i in range(ct['n']): place(sfx,click(),ct['type']+i*0.5/ct['n']+0.02)
place(sfx,pop(880)*0.8,ct['type']+0.72); place(sfx,whoosh(0.3)*0.6,ct['card']-0.05); place(sfx,pop(520)*0.7,ct['card']+0.25)
place(sfx,ring(),ct['t30']); place(sfx,ring(),ct['t30']+0.62); place(sfx,chime((1568,2093),0.1,0.2),ct['t30']+0.05)
place(sfx,thud()*0.7,SOL+0.3); place(sfx,chime((1047,1568),0.06,0.16),SOL+0.32); place(sfx,riser(0.45)*0.8,SOL-0.4)

sr,v=wavfile.read(CFG['voice']); v=v.astype(np.float64)/32768.0
v=resample_poly(v,SR,sr); v=filt(v,'high',70); v=v/np.max(np.abs(v))*0.89
voice=np.zeros(N); voice[:len(v)]=v[:N]
e=np.abs(voice); win=int(0.05*SR); e=np.convolve(e,np.ones(win)/win,'same')
a_att=np.exp(-1/(0.02*SR)); a_rel=np.exp(-1/(0.28*SR)); sm=np.zeros(N); p=0.0
for i in range(N):
    x=e[i]; p=(a_att*p+(1-a_att)*x) if x>p else (a_rel*p+(1-a_rel)*x); sm[i]=p
music*=(1-0.55*np.clip(sm/0.06,0,1))[:,None]
music[int((DUR-0.6)*SR):]*=np.linspace(1,0,N-int((DUR-0.6)*SR))[:,None]
mix=np.stack([voice,voice],1)+music*0.50+sfx*0.40
pk=np.max(np.abs(mix)); mix=mix/max(pk,1)*0.97
def rms(x): return 20*np.log10(np.sqrt(np.mean(x**2))+1e-9)
print(CFG['out'],'crête',round(pk,2),'voix',round(rms(voice[np.abs(voice)>1e-4]),1),'musique',round(rms(music*0.5),1),'bruitages',round(rms(sfx*0.4),1))
wavfile.write(CFG['out'],SR,(mix*32767).astype(np.int16))
