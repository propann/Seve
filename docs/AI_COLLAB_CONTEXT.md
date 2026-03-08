# AI Collaboration Context - SEVE/Azoth

Derniere mise a jour: 2026-03-08

But: permettre a toute IA qui rejoint le projet de comprendre rapidement ou on en est, ce qui est en production, et les prochaines actions prioritaires.

## 1) Etat actuel du projet

- Stack: Next.js 16 + Tailwind + Prisma + PostgreSQL + n8n.
- Environnement cible: production sur `azoth.cloud` (deploiement via Coolify, branche `main`).
- Hub principal UX: `/garden`.
- Auth active: login/signup via routes API, session cookie `arbre_session`, logout via `/api/auth/logout`.

## 2) Ce qui est termine

- Navigation jardin recentree (graines, votes, chat, cours valides).
- Pages de presentation des graines:
  - `/dashboard/courses/photographie`
  - `/dashboard/courses/cinema`
  - `/dashboard/courses/dessin`
  - `/dashboard/courses/linux`
- Retour au Jardin disponible depuis les presentations.
- Fiche personnage enrichie:
  - profil apprentissage (`age`, `cognitiveProfile`, `experienceLevel`, `weeklyHours`, etc.)
  - inventaire materiel par graine (`profileData.seedEquipment`)
- Fiche personnage stabilisee UX:
  - sauvegarde identite sans redirection forcee (reste sur `/rituel`)
  - upload avatar reellement persiste en base (`User.avatar`) avec compression client
  - message de confirmation discret (plus d alertes bloquantes)
- Presentation photographie ajustee:
  - suppression du bandeau global et de la sidebar sur la page de presentation
  - navigation locale avec `Compte` + `Retour au Jardin` en haut, et retour conserve en bas
- Jardin aligne sur logique produit:
  - `Cours valides`: CTA `Planter la graine` (selection + redirection directe vers le cours correspondant)
  - `Vote des graines`: mode propositions pre-creation uniquement (pas de lien presentation)
- n8n templates ajoutes:
  - `SEVE - SYSTEM - Progress State Guard`
  - `SEVE - PEDAGO - Aid Recommender`
  - `SEVE - PEDAGO - Exercise Review`

## 2.1) Verification pedagogique recente

- Le workflow exercice `0.1` (stenope) est coherent bout en bout:
  - enonce: 2 preuves attendues
  - UI: `UploadExercise` appele avec `maxFiles={2}`
  - API: envoi `assetUrls`, `assets`, `expectedAssetCount`
  - prompts: `minAssets: 2`
  - n8n: precheck `missingEvidence` avant appel Vision
- Le test distant du webhook pedago reste a rejouer sur l instance `pedago.azoth.cloud`.

## 3) Dette technique critique connue

### 3.1 Prisma migrations

- Le lock historique migrations est legacy (`sqlite`) alors que la DB actuelle est `postgresql`.
- Consequence: `prisma migrate deploy` ne fonctionne pas tel quel.
- Incident corrige aujourd hui: login cassait avec `P2022` car la colonne `User.profile_data` etait absente.
- Remediation appliquee: ajout SQL manuel de `profile_data`.

Action a faire ensuite:
- reconciler proprement l historique migrations Prisma pour revenir a un workflow normal de migration.

### 3.2 Qualite code

- Lint passe sans erreurs bloquantes, mais warnings nombreux (`any`, `img`, refs render, etc.).

## 4) Regles produit a respecter

1. Le Jardin reste le hub principal.
2. Chaque graine doit avoir une page de presentation.
3. Le bouton retour doit toujours ramener vers `/garden`.
4. L editeur de cours devra produire le meme format de presentation (template v1):
   - Hero
   - Philosophie
   - Curriculum
   - Gallery
   - CTA retour

## 5) Fichiers de reference prioritaires

- Statut global: [PROJECT_STATUS.md](/home/azoth/web/docs/PROJECT_STATUS.md)
- Backlog final: [PROJECT_FINAL_TASKS.md](/home/azoth/web/docs/PROJECT_FINAL_TASKS.md)
- Roadmap n8n: [N8N_SESSIONS_ROADMAP.md](/home/azoth/web/docs/N8N_SESSIONS_ROADMAP.md)
- Source de verite progression eleve: [STUDENT_PROGRESS_STATE.md](/home/azoth/web/docs/STUDENT_PROGRESS_STATE.md)
- Import n8n index/checklist:
  - [IMPORT_INDEX.md](/home/azoth/web/n8n/workflows/IMPORT_INDEX.md)
  - [IMPORT_CHECKLIST.md](/home/azoth/web/n8n/workflows/IMPORT_CHECKLIST.md)

## 6) Prochaine session (ordre recommande)

1. Rejouer le test webhook pedago et la correction reelle du module `0.1`.
2. Reconciler Prisma migrations pour Postgres.
3. Connecter n8n aid recommender a la source DB/API reelle.
4. Integrer les suggestions d entraide dans l UI chat.
5. Demarrer l implementation de l editeur de cours avec sortie template v1.
6. Renforcer tests auth/navigation + CI.

## 7) Commits recents utiles (historique rapide)

- `e2534e4` fix(build): accept readonly bullets in module cards
- `0fd7fc4` feat(ui): adjust photo presentation nav and persist profile avatar
- `1f4fdab` fix(auth): stabilize logout/login flow via API routes
- `26e2be5` docs(project): unified backlog + template presentation
- `bada659` feat(garden): route all seed buttons to presentation pages
- `03a0b6d` feat(courses): redesign photographie presentation page
- `7c8ccc2` feat(n8n): progress guard + peer aid recommender
- `bdfe78c` feat(profile): seed-specific equipment tabs
