# Process de production des réels Super Refer

Process validé par Théo le 24/11/2026 : **apprendre → trouver une idée qui marche → l'adapter à notre cible → injecter l'apprentissage → publier**. Objectif : **6 réels par jour**, publiés sur Instagram (@super_refer) et YouTube (chaîne Super Refer), sans lui redemander son accord.

## Règles de contenu (non négociables)

- Cible : patrons d'entreprises de 5 à 200 salariés (pas « le plombier du coin »). On se met à leur place, on part d'une de leurs problématiques et on y répond **directement** sous l'angle site + référencement.
- Hook = la question directe du patron, ex. « Comment obtenir plus de rendez-vous qualifiés ? ». Tout le réel sur ce même ton direct : réponse concrète en 2-3 actions, pas de mise en scène.
- Métaphore : seulement pour expliquer une idée, jamais toute la vidéo ; fin et appel à l'action jamais dans la métaphore.
- Aucun chiffre, client ou résultat inventé. Exemples à l'écran = illustrations génériques (pas de vrais clients).
- Fin obligatoire, dite et affichée : « Chez Super Réfère, … Commentez S… E… O… pour réserver votre premier échange. »
- Nom à l'oral : écrire « Super Réfère » dans le texte de la voix ; à l'écran : « Super Refer » (logo : S et R majuscules, espace).
- Durée 25-30 s. Voix Google AI Studio **Umbriel**, accélérée ×1,05 au montage. Animations sobres (mode `calm`).
- Motion design : illustrer concrètement chaque phrase, illustrations variées (jamais les mêmes d'un réel à l'autre), pas d'effets de fond décoratifs.
- Musique + bruitages sur chaque réel. Livraison **4K** (2160×3840).
- Légende (identique partout) : `config.json` → `caption`. Titre YouTube = hook + « #shorts ».

## Étapes d'une session (3 réels)

### 0. Préparer l'atelier
```
git clone https://github.com/Hendrix74/super-refer-auto && cd super-refer-auto/production && npm install
pip install --break-system-packages numpy scipy soundfile
```
Si `/usr/bin/google-chrome` manque : créer un lanceur qui exécute `/opt/pw-browsers/chromium*/…/chrome --no-sandbox "$@"`.

### 1. Apprendre
- Instagram : `stats.json` (mis à jour chaque heure par GitHub Actions) : portée, vues, durée moyenne de visionnage, temps total, enregistrements, partages, commentaires de chaque réel.
- YouTube : API YouTube Analytics (autorisation déjà donnée au script Apps Script « Réponses YouTube Super Refer ») : vues, durée moyenne, courbe de rétention (`audienceWatchRatio` par `elapsedVideoTimeRatio`).
- Croiser avec le script et les scènes du réel (`production/spec/rNN_t.json`, `production/src/reels/rNN.tsx`) : où les gens décrochent, quels hooks / formats retiennent. Écrire les conclusions dans `LECONS.md` (daté, règles courtes et actionnables).

### 2. Trouver l'idée
- Regarder les réels récents qui ont fonctionné (vues/likes nettement au-dessus de la moyenne du compte) : agences SEO américaines qui parlent aux grosses entreprises, Neil Patel (@neilpatel), puis comptes FR (qs_seo, Amandine Bart, forgeone_…).
- Vérifier dans `SUJETS.md` que le sujet n'a pas déjà été traité.

### 3-4. Écrire en appliquant `LECONS.md`
Script de voix complet, texte à l'écran (phrases courtes, mots clés en orange `*…*`), motion scène par scène, son, prompt de miniature. Envoyer les scripts à Théo dans la conversation (sans attendre de validation).

### 5. Produire
1. Voix : onglet AI Studio du navigateur intégré (generate-speech, voix Umbriel). Remplir « Speech block text », lancer (Run), capturer les morceaux audio (crochet sur `AudioBufferSourceNode.start` → `window.__bufs`), les réassembler et encoder en Opus via MediaRecorder (`window.__grabBufs`), récupérer le base64 par morceaux de 120 000 caractères (résultats d'outil sauvegardés) puis `python3 b64join.py audio/tails/rNN.webm …`.
2. `ffmpeg -i audio/tails/rNN.webm -ar 24000 -ac 1 audio/rNN_raw.wav` puis `-af atempo=1.05` → `audio/rNN.wav`.
3. Pauses : `silencedetect=n=-38dB:d=0.12` → caler `spec/rNN_t.json` (temps de la voix d'origine ; première phrase `instant: true`).
4. `src/reels/rNN.tsx` (scènes en temps d'origine), déclarer dans `src/index.tsx` avec `SLOW = 1.05`.
5. `audio/rNN.json` (temps divisés par 1,05) → `python3 audio/gen.py audio/rNN.json`.
6. Contrôle visuel : `./prev.sh RNN "t1 t2 …"` puis lire les planches.
7. Rendu 4K : `npx remotion render src/index.tsx RNN out/RNN_4k.tmp.mp4 --browser-executable=/usr/bin/google-chrome --scale=2 --concurrency=2 --crf=17 --jpeg-quality=92 --log=error`, renommer, puis `./mux.sh RNN rNN SuperRefer_ReelNN_Sujet_4K.mp4`.

### 6. Publier
- `videos/reelNN.mp4` : version Instagram 1080×1920 (Instagram refuse la 4K par l'API).
- `videos/yt/reelNN.mp4` : la version 4K.
- Ajouter l'entrée dans `config.json` → `schedule` (`file`, `at` heure de Paris, `titre`), commit + push.
- Créneaux du jour : 08:30, 10:30, 12:30, 15:00, 18:00, 20:30.
- Instagram : GitHub Actions toutes les 10 min (`auto.py`). YouTube : Apps Script toutes les 15 min (lit ce même `config.json`). Les Shorts peuvent sortir en privé (application non auditée) : Théo les passe en public.
- Ajouter le sujet à `SUJETS.md`, envoyer les fichiers 4K à Théo et les copier dans ses Téléchargements.
- Ménage : supprimer de `videos/` les fichiers publiés depuis plus de 3 jours (taille du dépôt).
