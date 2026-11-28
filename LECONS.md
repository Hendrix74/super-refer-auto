# Leçons apprises (à appliquer à chaque nouveau réel)

## Retours de Théo (novembre 2026)
- Format qui lui plaît : hook = question directe du patron, réponse directe et concrète tout du long (R37-R39).
- Un réel trop long et posé (≈ 47 s) ennuie : viser 25-30 s, débit soutenu (voix ×1,05) mais animations sobres.
- Une métaphore filée sur toute la vidéo (puits, commerciaux) ne marche pas : l'expliquer puis revenir au concret.
- Format Neil Patel : injonction ou question visible en entier dès la première image.

## Statistiques
### 25/11/2026 (stats.json du 24/11 22 h + YouTube Studio)
- Échantillon encore minuscule (3 à 106 vues par réel Instagram, 0 à 392 sur YouTube) : aucune conclusion ferme sur le fond, à revoir dès que R37-R43 auront 48 h.
- Instagram : durée moyenne de visionnage 1,4 à 7,8 s pour des réels de 23 à 37 s → la grande majorité décroche avant la 8e seconde. Règle : la question + une promesse claire (« trois réflexes / trois preuves / trois réglages ») doivent être dites avant 5 s.
- R37 (question directe, 27 s) : meilleure durée moyenne Instagram à ce jour (7,8 s), mais sur 3 vues seulement — format à garder, à confirmer.
- YouTube Shorts tire nettement plus de vues qu'Instagram sur les mêmes sujets (jusqu'à 392 contre 106) : soigner le titre YouTube = la question exacte du patron.
- Veille du 25/11 : chez @qs_seo, les réels « fiche Google » à action immédiate font 5 à 6× ses vues habituelles et 34-55 commentaires ; chez @neilpatel, les sujets « trafic en baisse / Google répond sans clic » et « preuve sociale » passent au-dessus de sa moyenne.
- (2e session du 25/11) YouTube Studio : R37 = 89 % « ont balayé » (15 vues), short du 23/11 = 62 % (375 vues, 346 via le flux Shorts, ~6,7 s regardées sur 37 s). Règle : la première image doit montrer un problème visuel concret (courbe qui chute, fiche en 4e position, visiteurs qui repartent), pas seulement la question sur une maquette neutre. Noter le % « ont balayé » de chaque réel à chaque session.
- (3e session du 25/11, 12 h 45) YouTube Studio, « ont balayé » : R40 (bille/œuf, 8 s, sans voix) 70 % sur 44 vues ; R45 (preuve sociale) 67 % sur 3 vues ; R44 (première image = courbe de visites qui chute) 43 % sur 8 vues, le meilleur taux à ce jour → la règle « problème visuel concret dès la première image » est à garder (à confirmer sur plus de vues).
- Instagram (compteur de lectures du profil à 12 h 45) : R37 4 lectures en 17 h, R40 0 en 6 h, R44 0 en 3 h, contre 10 à 106 pour les réels publiés à la main du 19 au 24/11. Les réels publiés par l'API ne sont presque pas distribués pour l'instant : à surveiller avant de conclure sur le contenu ; ne pas juger un sujet sur ses vues Instagram tant que ce point n'est pas éclairci.
- Publication Instagram : les exécutions planifiées GitHub Actions ne passent que toutes les quelques heures (2 en 14 h le 24-25/11) ; R45 (10 h 30) et R38 (12 h 15) étaient en retard. Chaque push sur config.json déclenche une exécution immédiate : en session, déclencher l'exécution à l'heure prévue (workflow_dispatch ou push).

## 25/11 — Marque mal prononcée (signalé par Théo)
- Réel 45 : la voix dit « Chez Super SEO » au lieu de « Chez Super Réfère » (le script était juste, c'est la synthèse qui a glissé). Il est parti sans contrôle.
- Désormais : `production/verif_voix.py` (transcription automatique) sur la voix puis sur le fichier final, obligatoire avant toute programmation. Réel 47 : résultat « douteux », à faire écouter.

## 25/11 — Changement de cap : 1 réel par jour, plus long et travaillé
- Constat : réels du 19 au 24/11 (publiés à la main, peu nombreux) = 10 à 106 vues ; réels du 24 au 25/11 (6 par jour, même gabarit, même légende) = 0 à 5 vues.
- Décision de Théo : refaire des réels travaillés différemment, durée utile pour répondre à la question. Les réels 39, 42, 43, 47, 48, 49 sont retirés du planning (gardés dans `config.json` → `en_reserve`, ne pas les reprogrammer sans son accord).

## 26/11/2026 (session de 7 h 13)
- YouTube Studio, « ont balayé » à J+1 : R45 (preuve sociale) 82 % sur 14 vues ; R40 (œuf, 8 s) 77 % sur 88 vues ; R44 (1re image = courbe qui chute) 56 % sur 17 vues — remonté depuis 43 % mais toujours le meilleur des réels du 25/11 → garder « problème visuel concret dès la 1re image ». R46 : 86,9 % de la vidéo regardée en moyenne, mais sur 3 vues seulement.
- Les shorts les plus vus restent ceux publiés à la main du 19 au 23/11 (377 à 392 vues) ; les shorts du 25/11 font 0 à 16 vues, sauf R40 (88) → le format ultra-court sans voix tire encore les vues sur YouTube, mais 77 % de balayage.
- Instagram : statistiques figées depuis le 25/11 15 h. Cause 1 : `auto.py` ne les relevait que si l'exécution tombait dans les 10 premières minutes de l'heure, ce que GitHub ne respecte pas → corrigé (relevé dès que `stats.json` a plus d'une heure, sans jamais l'écraser en cas d'erreur). Cause 2 : depuis le 26/11 vers 3 h, Meta refuse la clé (« Cannot call API for app … on behalf of user … », code 200) → Théo prévenu ; tant que ce n'est pas réglé, aucune publication ni réponse sur Instagram.
- Voix : 1 300 caractères donnent 75 s brutes avec Umbriel. Pour viser 45-50 s au final (×1,05, marque et appel à l'action compris), le corps du texte doit faire environ 800 caractères (~17 caractères par seconde).
- Contrôle de la marque : un « douteux » est sorti sur la phrase générée à part (transcrite « Supo Refer » / « Superefr », pas « Super SEO ») ; régénérée une fois → OK. Toujours la générer seule.
- Appliqué au R51 : question entière + problème visible dès la 1re image (votre nom en gris sur la page du fournisseur, étiquette « aucun lien ») ; promesse « une action gratuite » dite avant 5 s ; réponse concrète en 3 étapes à 22-27 s ; exemple générique sans chiffre.

## 27/11/2026 (session de 7 h 13, lancée à 9 h 42)
- YouTube Studio : R50 (nouveau format, 53 s, décor unique qui évolue) = 20 vues en 16 h, **45,4 % « ont balayé »** → le plus bas taux de balayage des réels longs avec R44 (43 %), alors qu'il dure deux fois plus longtemps. Le format « réponse complète, 50 s, problème visible dès la 1re image » ne fait pas fuir : le garder. R45 15 vues, R44 17, R46 4 (inchangé ou presque depuis le 26/11).
- Instagram : toujours bloqué. Meta refuse la clé depuis le 26/11 vers 3 h (« Cannot call API for app … on behalf of user … », code 200) : R50 n'est **jamais parti** sur Instagram (relancé à chaque exécution, refusé), et `stats.json` est figé au 25/11 14 h. Tant que Théo n'a pas régénéré la clé, aucune conclusion Instagram possible, et R51/R52 ne partiront que sur YouTube.
- Veille : chez @qs_seo, le réel du 25/11 « C'est FOU que personne ne sache qu'on peut faire ça sur nos FICHES Google » fait 12,6 k vues (≈ 15× ses réels habituels, 600-900), 117 commentaires (mot-clé « Local ») et 96 enregistrements → 2e pépite de suite sur la même mécanique « levier gratuit et méconnu ». Règle : un hook qui promet un levier **gratuit que personne n'utilise** est notre meilleure piste ; le dire avant 5 s.
- @neilpatel : ses réels au-dessus de sa moyenne (≈ 5,5 k) cette semaine sont des actualités IA (pub dans ChatGPT, 12,6 k) ou des pubs ; rien de transposable sans chiffre à vérifier.
- Voix : 817 caractères de corps → 44,3 s bruts → 50,6 s au final avec marque et appel à l'action : la règle « ~800 caractères pour 45-50 s » est confirmée.
- Capture de la voix : l'encodage Opus par MediaRecorder se fait en temps réel (≈ durée de l'audio) ; le lancer sans `await` puis récupérer `window.__b64` dans un 2e appel (sinon l'outil coupe à 45 s). 96 kb/s → ~720 k caractères pour 44 s, soit 6 morceaux de 120 000.
- Appliqué au R52 : question entière + problème visible dès la 1re image (encadré « Offres d'emploi » rempli par d'autres, votre PDF « invisible pour Google ») ; promesse « levier gratuit, que presque personne n'utilise » dite à 1,8-4,8 s ; méthode en 4 points avec repère visuel 1-2-3-4 ; exemple générique (chaudronnerie) sans chiffre ; fin sur fond bleu nuit (différent du R51).

## 28/11/2026 (session de 7 h 13, lancée à 13 h 50)
- La tâche planifiée parlait encore de « 3 réels » et de créneaux 8 h 30 à 12 h 30 : PROCESS.md prime (1 réel par jour à 18 h). Verrou du 28/11 posé ; R53 programmé le 29/11 à 18 h (R52 sort le 28/11 à 18 h).
- YouTube Studio : R50 (53 s) = 37 vues en 44 h, **48,6 % « ont balayé »**, 36 vues sur 37 via le flux Shorts → le format long « réponse complète » reste à garder (balayage le plus bas avec R44). R51 = 6 vues en 20 h, 83 % « ont balayé », 25,8 % de la vidéo regardée : échantillon trop petit pour conclure, mais sa 1re image (carte de relations, nom en gris) est plus abstraite que la courbe (R44) ou la page de résultats (R50). Règle : la 1re image montre une chose que le patron reconnaît tout de suite (une fiche Google, une page de résultats, un avis), pas un schéma.
- Instagram : toujours bloqué (diagnostic vide dans `state.json` le 28/11 à 10 h 54, `stats.json` figé au 25/11 14 h, aucune publication depuis le 25/11) → R50 et R51 ne sont pas partis sur Instagram. Rien à apprendre côté Instagram tant que Théo n'a pas régénéré la clé.
- Veille : @qs_seo, réel du 27/11 « Voler les clients de tes concurrents sur Google Maps » (avec @izy.local) = 17 k vues contre 500 à 900 d'habitude (≈ 25×), 105 commentaires (« Local »), 21 partages → 3e pépite de suite sur « levier gratuit et méconnu », ici avec un angle **concurrents** (prendre leurs clients). Règle : « concurrent » + « gratuit / légal » dans le hook est la combinaison la plus forte vue à ce jour. @neilpatel : au-dessus de sa moyenne cette semaine = réel sur l'IA « horse carts to cars » (11,7 k) et une pub ; rien de transposable.
- Voix : 825 caractères de corps → 41,7 s brutes (Umbriel) → 49,1 s au final avec marque et appel à l'action : règle « ~800 caractères pour 45-50 s » confirmée.
- Capture : le crochet sur `AudioBufferSourceNode.start` capte aussi la source qu'on crée soi-même pour l'encodage → vider `window.__bufs` avant chaque génération et ne compter que les tampons de la synthèse.
- Mise en page : une question sur 2 lignes en 84 px se casse mal (« les » seul) → l'écrire volontairement sur 3 lignes courtes ; dans des cartes étroites (3 côte à côte), raccourcir le contenu (nom sur une ligne, pas de libellé secondaire).
- Appliqué au R53 : question entière + problème visible dès la 1re image (fiche « Concurrent A » avec un avis 1 étoile « Jamais rappelé… ») ; promesse « légalement, et gratuitement » dite à 1,9-3,3 s ; méthode concrète (3 fiches → tri « note la plus basse » → tableau des reproches qui reviennent → réponses près du bouton devis, « seulement ce que vous tenez ») ; exemple générique (menuiseries) sans chiffre ; fin sur fond vert sapin ; musique guitare pincée (différente du R52).
