# Runbook Operations (Prod)

Etat courant (2026-02-28):
- Frontal internet: `coolify-proxy` (Traefik) sur ports `80/443`
- Services legacy arretes/desactives: `seve-web`, `pm2-azoth`, `nginx`
- Routage dynamique: `/data/coolify/proxy/dynamic/azoth-public.yaml`
- Compose proxy: `/data/coolify/proxy/docker-compose.yml`

## 1) Deploiement standard

1. Travailler sur branche feature.
2. Ouvrir PR, valider.
3. Merge sur `main`.
4. Push sur `origin/main`.
5. Coolify build/deploy automatiquement.

## 2) Verification post-deploiement

- Verifier URL:
  - `https://azoth.cloud`
  - `https://www.azoth.cloud`
- Verifier routes:
  - `/garden`
  - `/auth/sign-in`
  - `/dashboard`
  - `/api/auth/me`
  - navigation fin de cours -> `/garden`
- Verifier logs Coolify:
  - build termine sans erreur
  - conteneur "Up"
- Verifier proxy:
  - `sudo docker ps | grep coolify-proxy` -> `healthy`
  - domaines HTTPS:
    - `azoth.cloud`
    - `www.azoth.cloud`
    - `n8n.azoth.cloud`
    - `pedago.azoth.cloud`
    - `s3.azoth.cloud`
    - `db.azoth.cloud`

## 3) Variables d'environnement minimales

- `DATABASE_URL`
- `AUTH_SESSION_SECRET` (>= 32 caracteres)
- `RESEND_API_KEY` (sinon email bienvenue desactive proprement)
- `CLERK_WEBHOOK_SECRET` (si webhook Clerk actif)

## 3.1) Verification fonctionnelle navigation (critique UX)

Objectif: garantir que le Jardin reste le hub principal.

1. Connexion avec utilisateur existant -> attendu: redirection `/garden`.
2. Reconnexion (session expiree puis login) -> attendu: redirection `/garden`.
3. Si utilisateur sans graine:
   - choix d'une graine -> attendu: rester/revenir sur `/garden`.
4. Ouvrir un cours puis cliquer "Retour au Jardin" -> attendu: `/garden`.
5. Dans sidebar dashboard:
   - bouton `Retour au Jardin` -> navigation `/garden` sans logout
   - bouton `Deconnexion` -> suppression session puis retour portail `/`

## 4) Rollback rapide

Option Coolify:
1. Ouvrir Deployments.
2. Selectionner le dernier deployment stable.
3. Redeployer cette version.

Option Git:
```bash
git revert <commit_sha_problematique>
git push origin main
```

Option urgence proxy (si routing KO):
```bash
sudo docker stop coolify-proxy
sudo systemctl start nginx
```

## 5) Incident: build Docker echoue

Checklist rapide:

1. Lire l'erreur exacte dans logs Coolify.
2. Verifier `npm run build -- --webpack` en local.
3. Si erreur Prisma: verifier `npx prisma generate` dans Dockerfile.
4. Si erreur env au build: eviter l'instanciation globale de clients dependants de secrets.
5. Commit fix + push pour relancer le pipeline.

## 6) Incident: site down apres redeploy

1. Verifier conteneur app (`Up`).
2. Verifier routage domaine (Coolify Proxy).
3. Verifier certificats SSL.
4. Effectuer rollback si indisponibilite > 5 min.

## 7) Notes de robustesse proxy

- Le proxy doit rester connecte aux reseaux Docker:
  - `coolify`
  - `k8ksosogoc8s04cs4okgw08o`
  - `sskgoc8kw4wgcoo48wcw480s`
  - `u8owwg444s004wo8okwgsgkg`
- Le backend `db.azoth.cloud` repose sur `adminer-seve:8080` (adminer raccorde au reseau `coolify`).
- Si `coolify-proxy` est recree manuellement, appliquer:
```bash
sudo bash -lc 'cd /data/coolify/proxy && docker compose up -d'
```
