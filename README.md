# Super Refer — automatisation Instagram

- `config.json` : légende, textes de réponse, planning des réels (heure de Paris).
- `videos/` : réels en 1080 × 1920 pour Instagram.
- `auto.py` : publie les réels à l'heure prévue et répond aux commentaires contenant « SEO » (réponse publique + message privé avec le lien Calendly).
- Tourne toutes les 10 minutes (GitHub Actions). La clé Instagram est dans le secret `IG_PAGE_TOKEN`.
