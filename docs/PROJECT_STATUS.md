# Statut Projet SEVE Web

Derniere mise a jour: 2026-02-28

## Resume executif

- Application Next.js 16 deployee en production sur `azoth.cloud`.
- Pipeline Git -> Coolify operationnel (auto-deploy sur `main`).
- Build Docker production valide (`Dockerfile` multi-stage + `prisma generate`).
- Domaine principal bascule vers le nouveau conteneur effectuee.

## Etat actuel

- `npm run build -- --webpack`: OK
- `npm run lint`: OK avec warnings (0 erreur bloquante)
- Deploiement Coolify: OK (rolling update)
- HTTPS sur `azoth.cloud` et `www.azoth.cloud`: OK

## Correctifs recents majeurs

- Correction build TypeScript sur `lib/ai/mycelium-ai.ts`.
- Correction build Prisma en Docker (`npx prisma generate` avant `next build`).
- Correction build Resend (initialisation lazy si `RESEND_API_KEY` absent).
- Hardening auth/session: parsing JSON robuste sur les flux profil/session (`safe-json`) pour eviter les 500 en cas de donnees corrompues.
- Stabilisation lint pour code legacy/editorial (regles non bloquantes).
- Refonte flux navigation utilisateur:
  - post-connexion/reconnexion -> `/garden` (plus de saut direct vers un cours)
  - fin de cours -> bouton `Retour au Jardin`
  - sidebar dashboard -> `Retour au Jardin` + `Deconnexion` separes
- Jardin transforme en page d'actualite principale:
  - hub central avec acces arbre, chat Mycelium et votes modules
  - retour au Jardin possible meme apres choix de graine
- Fiche personnage etendue:
  - profil apprentissage enrichi (age, profil cognitif, niveau, rythme)
  - inventaire materiel par graine (`photographie`, `cinema`, `dessin`, `linux`)
- Workflows n8n ajoutes pour supervision/conseil:
  - `SEVE - SYSTEM - Progress State Guard`
  - `SEVE - PEDAGO - Aid Recommender`
  - payloads de test + doc source de verite avancement eleve
- Fiabilisation infrastructure Coolify:
  - routage `azoth.cloud` repointe vers le conteneur applicatif courant
  - ancien conteneur app supprime apres bascule
  - correctif seccomp applique sur les stacks Compose (`security_opt: seccomp=unconfined`)
  - services Coolify/n8n/minio/postgres/redis revenus en `healthy`

## Risques connus

- Warnings lint encore nombreux (notamment `no-unused-vars`, `no-img-element`, `any`).
- La correction seccomp est appliquee dans les compose locaux (`/data/coolify/...`) et doit etre preservee en cas de regeneration des stacks.

## Prochaines priorites recommandees

1. Remplacer le routage Nginx par un routage full Coolify (plus robuste aux redeploiements).
2. Reduire progressivement les warnings lint critiques (types `any`, refs en render).
3. Ajouter tests automatiques minimum sur auth/session/routes API.
4. Mettre en place CI (lint + build + tests) avant merge sur `main`.
5. Piloter la cloture projet via le backlog unique: [PROJECT_FINAL_TASKS.md](/home/azoth/web/docs/PROJECT_FINAL_TASKS.md).
