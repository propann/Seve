# Index Import n8n (SEVE)

Ce fichier est la reference unique pour savoir quoi importer, ou, et dans quel ordre.

## Cibles d'import

1. Instance systeme: `https://n8n.azoth.cloud`
2. Instance pedagogie: `https://pedago.azoth.cloud`

## Workflows a importer

1. [system/seve-system-session-router.workflow.json](/home/azoth/web/n8n/workflows/system/seve-system-session-router.workflow.json)
   - Instance cible: `n8n.azoth.cloud`
   - Nom attendu: `SEVE - SYSTEM - Session Router`
   - Webhook path: `seve/system/session-events`
2. [pedago/seve-pedago-session-router.workflow.json](/home/azoth/web/n8n/workflows/pedago/seve-pedago-session-router.workflow.json)
   - Instance cible: `pedago.azoth.cloud`
   - Nom attendu: `SEVE - PEDAGO - Session Router`
   - Webhook path: `seve/pedago/session-events`

## Ordre conseille

1. Importer les 2 workflows (laisser `Active = OFF`).
2. Verifier les paths webhook (pas de collision).
3. Executer les tests payload via le script [scripts/test-webhooks.sh](/home/azoth/web/n8n/workflows/scripts/test-webhooks.sh).
4. Activer les workflows uniquement apres validation.
