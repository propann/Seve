# Student Progress State (Source of Truth IA)

Derniere mise a jour: 2026-02-28

## Objectif

Donner a n8n et a l IA un etat d avancement fiable pour eviter les recommandations d aide incoherentes.

## Emplacement des donnees

La source de verite est le profil utilisateur en base (`User`) et ses champs:

- `selected_seed`
- `level`
- `xp`
- `completedNodes`
- `unlockedNodes`
- `profile_data` (`profileData.seedEquipment`)

## Contrat minimal pour recommandations d aide

Avant de proposer un pair, n8n doit verifier:

1. meme graine (`selectedSeed`)
2. materiel disponible (`profileData.seedEquipment[seed][resourceId] > 0`)
3. progression compatible:
   - `candidate.level >= requester.level`
   - `candidate.completedCount >= requester.completedCount`
   - ecart max de progression (`completedGap <= 8`)

## Workflow n8n relies

- systeme: `SEVE - SYSTEM - Progress State Guard`
  - webhook: `seve/system/progress-state`
  - role: normaliser et verifier la coherence de l etat d avancement
- pedago: `SEVE - PEDAGO - Aid Recommender`
  - webhook: `seve/pedago/aid-recommendation`
  - role: proposer des pairs d aide avec garde-fous

## Payloads de test

- [student_progress_snapshot.json](/home/azoth/web/n8n/workflows/payloads/system/student_progress_snapshot.json)
- [aid_request.json](/home/azoth/web/n8n/workflows/payloads/pedago/aid_request.json)

## Notes d evolution

- Etape suivante: brancher le workflow pedago a une lecture directe DB/API au lieu d un `candidates[]` fourni par payload.
- Etape suivante: journaliser les suggestions d aide (acceptation/refus/resultat) pour ajuster le scoring.
