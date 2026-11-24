#!/bin/bash
# aperçu basse résolution + planche d'images : prev.sh R21 "t1 t2 ..."
id=$1; cd "$(dirname "$0")"
npx remotion render src/index.tsx $id out/prev_$id.mp4 --browser-executable=/usr/bin/google-chrome --scale=0.5 --concurrency=2 --log=error 2>&1 | grep -v "^$" | tail -5
mkdir -p out/fr; rm -f out/fr/*.jpg; n=0
for t in $2; do n=$((n+1)); ffmpeg -y -loglevel error -ss $t -i out/prev_$id.mp4 -frames:v 1 -vf scale=324:576 out/fr/$(printf %02d $n).jpg; done
python3 - <<P
from PIL import Image
import glob
fs=sorted(glob.glob('out/fr/*.jpg')); ims=[Image.open(f) for f in fs]; w,h=ims[0].size
for k in range(0,len(ims),7):
    part=ims[k:k+7]; s=Image.new('RGB',(w*len(part),h)); [s.paste(im,(i*w,0)) for i,im in enumerate(part)]; s.save(f'out/sheet_${id}_{k//7}.jpg',quality=88)
print(len(ims),w,h)
P
