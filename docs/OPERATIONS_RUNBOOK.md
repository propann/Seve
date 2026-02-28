# Runbook Operations (Prod)

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
  - `/auth/sign-in`
  - `/dashboard`
  - `/api/auth/me`
- Verifier logs Coolify:
  - build termine sans erreur
  - conteneur "Up"

## 3) Variables d'environnement minimales

- `DATABASE_URL`
- `AUTH_SESSION_SECRET` (>= 32 caracteres)
- `RESEND_API_KEY` (sinon email bienvenue desactive proprement)
- `CLERK_WEBHOOK_SECRET` (si webhook Clerk actif)

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

## 5) Incident: build Docker echoue

Checklist rapide:

1. Lire l'erreur exacte dans logs Coolify.
2. Verifier `npm run build -- --webpack` en local.
3. Si erreur Prisma: verifier `npx prisma generate` dans Dockerfile.
4. Si erreur env au build: eviter l'instanciation globale de clients dependants de secrets.
5. Commit fix + push pour relancer le pipeline.

## 6) Incident: site down apres redeploy

1. Verifier conteneur app (`Up`).
2. Verifier routage domaine (Coolify/Nginx).
3. Verifier certificats SSL.
4. Effectuer rollback si indisponibilite > 5 min.
