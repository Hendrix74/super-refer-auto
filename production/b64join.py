#!/usr/bin/env python3
# b64join.py out.webm file1 file2 ... : recolle les morceaux B64START...B64END
import sys, json, re, base64
b = ''.join(re.search('B64START(.*?)B64END', json.load(open(f))[0]['text'], re.S).group(1) for f in sys.argv[2:])
open(sys.argv[1], 'wb').write(base64.b64decode(b)); print(len(b))
