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
