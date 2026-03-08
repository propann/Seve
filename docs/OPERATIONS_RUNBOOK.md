# Runbook Operations (Prod)

Etat courant (2026-03-08):
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
  - `/dashboard/courses/m0-1`
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

## 3.2) Verification fonctionnelle correction exercice 0.1 (critique pedago)

Objectif: garantir que le workflow de correction du stenope applique bien la consigne reelle du module `0.1`.

1. Ouvrir `https://azoth.cloud/dashboard/courses/m0-1`.
2. Verifier l enonce:
   - image 1 = dispositif physique du stenope
   - image 2 = trace/projection lumineuse
3. Selectionner 2 images maximum dans le composant d upload.
4. Soumettre et verifier:
   - l API `POST /api/profile/exercise` repond `success: true`
   - la review contient `approved`, `status`, `coachReply`, `provider`
   - si 1 seule image est fournie, le statut attendu est `needs_revision`
   - si 2 preuves suffisantes sont fournies et la correction approuve, le module suivant est debloque
5. En cas d erreur reseau n8n:
   - verifier `N8N_PEDAGO_EXERCISE_WEBHOOK_URL`
   - verifier `N8N_PEDAGO_WEBHOOK_SECRET`
   - relancer le test payload: [test-webhooks.sh](/home/azoth/web/n8n/workflows/scripts/test-webhooks.sh)

### Incident connu au 2026-03-08

Constat reel:

- l URL `https://pedago.azoth.cloud/webhook/seve/pedago/exercise-review` repond `404`
- message retourne par n8n: `The requested webhook "POST seve/pedago/exercise-review" is not registered.`

Diagnostic:

- l application web est correctement configuree pour appeler le webhook
- la base Postgres est reachable
- le blocage est cote instance n8n pedago: workflow absent, inactif, ou path different

Procedure de correction:

1. Ouvrir `pedago.azoth.cloud`.
2. Importer/reouvrir `SEVE - PEDAGO - Exercise Review`.
3. Verifier `Webhook path = seve/pedago/exercise-review`.
4. Verifier `GROQ_API_KEY`.
5. Activer le workflow.
6. Rejouer le test webhook.
7. Refaire une soumission reelle depuis `/dashboard/courses/m0-1`.

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

Cas concret deja observe le 2026-03-08:
- un ancien process `next build` orphelin gardait `.next/lock`
- symptome: `Unable to acquire lock at /home/azoth/web/.next/lock`
- correction: terminer le process orphelin puis relancer `npm run build`

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

## 8) Incident: services Docker en `unhealthy` a cause de seccomp (`SetSSB`)

Symptome observe:
- Plusieurs conteneurs apparaissent `unhealthy` alors que les services repondent.
- `docker exec` echoue avec:
  - `SetSSB requires libseccomp >= 2.5.0 and API level >= 4 (... API level: 1)`

Cause:
- Les healthchecks Docker bases sur `exec` echouent sur l'hote (seccomp/SSB), ce qui fausse l'etat de sante.

Correction appliquee:
- Ajouter dans les services Compose concernes:
```yaml
security_opt:
  - seccomp=unconfined
```
- Puis recreer les stacks:
```bash
cd /data/coolify/source && docker compose -f docker-compose.prod.yml -f docker-compose.yml up -d
cd /data/coolify/proxy && docker compose up -d
cd /data/coolify/services/<service_id> && docker compose up -d
cd /data/coolify/databases/<db_id> && docker compose up -d
cd /data/coolify/applications/<app_id> && docker compose up -d
```

Validation:
```bash
sudo docker ps --format '{{.Names}}|{{.Status}}'
```
- Attendu: retour des statuts `healthy` pour les services avec healthcheck.
