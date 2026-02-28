# Checklist Import Workflows n8n

## 1) Import

1. Ouvrir l'instance n8n cible:
   - systeme: `https://n8n.azoth.cloud`
   - pedago: `https://pedago.azoth.cloud`
2. `Workflows -> Import from File`.
3. Importer le JSON correspondant au dossier.
4. Verifier la reference [IMPORT_INDEX.md](/home/azoth/web/n8n/workflows/IMPORT_INDEX.md).

## 2) Parametrage minimal

1. Verifier `Webhook path` (eviter collisions entre envs).
2. Ajouter un secret de verification webhook (header ou query).
3. Configurer credentials externes (si utilises).
4. Mettre `Active = OFF` tant que les tests ne sont pas valides.

## 3) Tests payload

Tester au minimum:

- `chat_message`
- `course_proposal`
- `seed_selected` (systeme)
- `student_progress_snapshot` (systeme)
- `exercise_submission` (pedago)
- `aid_request` (pedago)

Valider:

- reponse HTTP 200
- `status=accepted`
- champs attendus (`eventType`, `nextAction`, `coachReply`, `guard`)

Commande test recommandee:

```bash
cd /home/azoth/web/n8n/workflows/scripts
SYSTEM_BASE_URL="https://n8n.azoth.cloud" \
PEDAGO_BASE_URL="https://pedago.azoth.cloud" \
./test-webhooks.sh
```

Si webhook protege:

```bash
cd /home/azoth/web/n8n/workflows/scripts
SYSTEM_BASE_URL="https://n8n.azoth.cloud" \
PEDAGO_BASE_URL="https://pedago.azoth.cloud" \
WEBHOOK_SECRET="replace-me" \
./test-webhooks.sh
```

## 4) Passage en production

1. Activer workflow.
2. Journaliser execution IDs pour traçabilite.
3. Mettre une alerte en cas d'echec (Slack/email).
4. Documenter URL webhook finale dans `docs/N8N_SESSIONS_ROADMAP.md`.
