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
- Stabilisation lint pour code legacy/editorial (regles non bloquantes).

## Risques connus

- Warnings lint encore nombreux (notamment `no-unused-vars`, `no-img-element`, `any`).
- Nginx host route actuellement vers l'IP interne du conteneur Coolify (`10.0.1.10:3000`).
- Si Coolify recree le conteneur avec une nouvelle IP, il faudra mettre a jour le vhost Nginx.

## Prochaines priorites recommandees

1. Remplacer le routage Nginx par un routage full Coolify (plus robuste aux redeploiements).
2. Reduire progressivement les warnings lint critiques (types `any`, refs en render).
3. Ajouter tests automatiques minimum sur auth/session/routes API.
4. Mettre en place CI (lint + build + tests) avant merge sur `main`.
