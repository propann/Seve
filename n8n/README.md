# n8n Workflows (SEVE)

Ce dossier est dedie aux assets n8n versionnes dans Git:

- templates JSON importables
- checklist d'import
- conventions de nommage

## Structure

- `workflows/system/`: workflows pour la session `n8n.azoth.cloud`
- `workflows/pedago/`: workflows pour la session `pedago.azoth.cloud`
- `workflows/IMPORT_CHECKLIST.md`: procedure d'import et validation
- `workflows/IMPORT_INDEX.md`: index source-of-truth des fichiers a importer
- `workflows/payloads/`: payloads JSON de validation post-import
- `workflows/scripts/test-webhooks.sh`: script de test webhook systeme + pedago

## Convention de nommage

`seve-<session>-<usage>.workflow.json`

Exemples:

- `seve-system-session-router.workflow.json`
- `seve-pedago-session-router.workflow.json`

## Important

- Les workflows fournis ici sont des bases "safe" pour bootstrap.
- Adapter credentials, chemins webhook et destinations avant activation.
- Ne pas committer de secrets/API keys dans ces JSON.

## Workflows additionnels (surveillance + conseil)

- `system/seve-system-progress-state-guard.workflow.json`
  - normalise l etat d avancement eleve
  - detecte incoherences minimales de progression
- `pedago/seve-pedago-aid-recommender.workflow.json`
  - recommande des pairs d aide selon materiel + progression
  - bascule en `coach_fallback` si aucun pair compatible
