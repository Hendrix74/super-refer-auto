#!/bin/bash
# mux.sh R21 r21 Nom
cd "$(dirname "$0")"
ffmpeg -y -loglevel error -i out/$1_4k.mp4 -i audio/$2_mix.wav -map 0:v -map 1:a -c:v copy -af "loudnorm=I=-14:TP=-1.2:LRA=9" -ar 48000 -c:a aac -b:a 256k -shortest -movflags +faststart out/tmp_$1.mp4 && mv out/tmp_$1.mp4 out/$3 && ffprobe -v error -show_entries format=duration,size:stream=width,height -of csv=p=0 out/$3 | tr '\n' ' '; echo
