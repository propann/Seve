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
3. [system/seve-system-progress-state-guard.workflow.json](/home/azoth/web/n8n/workflows/system/seve-system-progress-state-guard.workflow.json)
   - Instance cible: `n8n.azoth.cloud`
   - Nom attendu: `SEVE - SYSTEM - Progress State Guard`
   - Webhook path: `seve/system/progress-state`
4. [pedago/seve-pedago-aid-recommender.workflow.json](/home/azoth/web/n8n/workflows/pedago/seve-pedago-aid-recommender.workflow.json)
   - Instance cible: `pedago.azoth.cloud`
   - Nom attendu: `SEVE - PEDAGO - Aid Recommender`
   - Webhook path: `seve/pedago/aid-recommendation`
5. [pedago/seve-pedago-exercise-review.workflow.json](/home/azoth/web/n8n/workflows/pedago/seve-pedago-exercise-review.workflow.json)
   - Instance cible: `pedago.azoth.cloud`
   - Nom attendu: `SEVE - PEDAGO - Exercise Review`
   - Webhook path: `seve/pedago/exercise-review`

## Ordre conseille

1. Importer les 5 workflows (laisser `Active = OFF`).
2. Verifier les paths webhook (pas de collision).
3. Executer les tests payload via le script [scripts/test-webhooks.sh](/home/azoth/web/n8n/workflows/scripts/test-webhooks.sh).
4. Activer les workflows uniquement apres validation.

## Etat verifie le 2026-03-08

- `DATABASE_URL`: joignable depuis l hote, donc la web app peut lire/ecrire les profils eleves.
- `S3_ENDPOINT`: joignable, bucket `seve` configure.
- `N8N_PEDAGO_EXERCISE_WEBHOOK_URL`: configure vers `https://pedago.azoth.cloud/webhook/seve/pedago/exercise-review`.
- Test reel `POST` sur l URL pedago:
  - statut recu: `404`
  - message n8n: `The requested webhook "POST seve/pedago/exercise-review" is not registered.`

Conclusion:
- le workflow [pedago/seve-pedago-exercise-review.workflow.json](/home/azoth/web/n8n/workflows/pedago/seve-pedago-exercise-review.workflow.json) doit etre reimporte ou reactive sur `pedago.azoth.cloud`
- tant que ce workflow n est pas actif, la correction IA d exercice ne peut pas fonctionner en production

## Remise en ligne minimale du workflow pedago exercice

1. Ouvrir `https://pedago.azoth.cloud`.
2. Importer [pedago/seve-pedago-exercise-review.workflow.json](/home/azoth/web/n8n/workflows/pedago/seve-pedago-exercise-review.workflow.json) si absent.
3. Verifier que le nom importe est bien `SEVE - PEDAGO - Exercise Review`.
4. Verifier les variables env de l instance pedago:
   - `GROQ_API_KEY`
   - `GROQ_VISION_MODEL` (optionnel)
   - `GROQ_TIMEOUT_MS` (optionnel)
5. Verifier le `Webhook path` exact: `seve/pedago/exercise-review`.
6. Mettre `Active = ON`.
7. Rejouer un `POST` de test ou le script [test-webhooks.sh](/home/azoth/web/n8n/workflows/scripts/test-webhooks.sh).
