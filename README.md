# SEVE Web (Next.js)

Frontend principal servi sur `azoth.cloud`.

## Documentation projet

- Statut/avancement: `docs/PROJECT_STATUS.md`
- Runbook production: `docs/OPERATIONS_RUNBOOK.md`
- Reseau et architecture: `docs/RESEAU.md`
- Plan n8n (sessions systeme/pedago): `docs/N8N_SESSIONS_ROADMAP.md`
- Contribution Git: `CONTRIBUTING.md`

## Fonctionnalités clés

- Portail d'entrée immersif (landing plein écran)
- Authentification unifiée (connexion / création de compte)
- Sessions via cookie `HttpOnly` signé
- Sélection de graine (`/garden`) persistée en PostgreSQL
- `/garden` est la page principale après connexion/reconnexion
- Le Jardin sert de hub: choix de graine (1re fois), votes modules et chat Mycélium
- Protection de routes via middleware (`/dashboard`, `/rituel`, `/garden`, `/admin`)
- Hub admin (`/admin`) réservé aux rôles `ADMIN` et `TEACHER`

## Monétisation et progression (règles 2026)

- Niveau 0 (Racines): 100% gratuit, progression automatique après sélection de graine.
- Niveau 1 (Tronc): entrée partiellement gratuite, paywall au milieu/fin du Tronc.
- Niveaux 2 a 5 (Branches -> Canopée): accès strictement payant.
- Aucune ouverture anticipée des niveaux supérieurs sans paiement confirmé.
- La croissance visuelle de l'arbre reflète strictement les segments débloqués/payés.
- Un upgrade déclenche une animation majeure de croissance (branches, feuilles, pulsation verte).
- Les messages de paywall doivent rester motivants et poétiques, liés a la vitalité de l'arbre.

## Démarrage local

```bash
npm install
npm run dev
```

Application locale: `http://localhost:3000`

## Qualité et checks

```bash
npm run lint
npm run build -- --webpack
```

Notes:
- Le lint est configuré pour ne pas bloquer sur certains warnings legacy (contenu éditorial/UI).
- Le build de référence pour CI/prod est `next build --webpack`.

## Build production

```bash
npm run build -- --webpack
npm run start -- --hostname 127.0.0.1 --port 3000
```

## Variables importantes

- `DATABASE_URL` (PostgreSQL)
- `AUTH_SESSION_SECRET` (signature des cookies de session, min 32 caractères)
- `RESEND_API_KEY` (emails transactionnels)
- `CLERK_WEBHOOK_SECRET` (webhook Clerk, si activé)

## API Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/seed`

Comportement de redirection (2026-02-28):
- `signup` -> `/garden`
- `login` -> `/garden` (même si la graine est déjà définie)
- `seed` -> `/garden`
- Depuis les cours: bouton "Retour au Jardin" en footer de leçon
- Sidebar dashboard: `Retour au Jardin` (navigation) et `Déconnexion` (logout réel)

## Déploiement pro avec Git + Coolify

Ce projet est prêt pour un déploiement conteneurisé via Coolify:

- `Dockerfile` multi-stage (prod)
- `next.config.ts` avec `output: "standalone"`
- `.dockerignore` pour accélérer les builds

### Workflow recommandé

1. Commit + push sur le dépôt Git.
2. Dans Coolify: **New Resource -> Application -> Public Repository** (ou privé via token).
3. Définir `Base Directory` sur `/` si ce repo contient uniquement `web`, sinon sur `web`.
4. Build Pack: `Dockerfile`.
5. Exposer le port `3000`.
6. Renseigner les variables d'environnement (`DATABASE_URL`, `AUTH_SESSION_SECRET`, etc.).
7. Activer l'auto-deploy sur `push` (webhook Git).

Chaque `git push` sur la branche configurée déclenche un nouveau build et déploiement automatique.

## Structure du dépôt

- `app/`: routes Next.js App Router
- `components/`: UI et composants interactifs
- `lib/`: logique métier (auth, DB, services externes)
- `prisma/`: schéma et migrations
- `n8n/`: templates importables et checklist workflows
- `docs/`: runbooks et suivi projet
