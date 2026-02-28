# N8N Sessions Roadmap (Systeme + Pedago)

Derniere mise a jour: 2026-02-28

## Objectif

Definir clairement les workflows n8n a construire pour deux sessions distinctes:

- session `systeme` (`n8n.azoth.cloud`): orchestration plateforme (auth, events communautaires, audit)
- session `pedago` (`pedago.azoth.cloud`): logique pedagogique (feedback exercice, coaching, recommandations)

Ce document est le backlog de travail n8n a suivre avant mise en production "full auto".

## Etat actuel cote app web

- L'app envoie deja des evenements vers un webhook n8n via `NEXT_PUBLIC_N8N_WEBHOOK_URL`.
- Le chat emet un payload de type `chat_message` (voir `lib/actions/chat.ts`).
- Le greeting maitre peut etre branche sur n8n (`lib/n8n-service.ts`).
- Le parcours Jardin inclut maintenant proposition + vote communautaire de cours.

## Architecture cible

### Session SYSTEME (n8n.azoth.cloud)

Responsabilites:

1. Recevoir et normaliser les evenements applicatifs.
2. Journaliser les evenements (audit, moderation, suivi usage).
3. Router vers integrations externes (Slack, email, CRM, logs).
4. Retourner un ack standardise a l'app.

Evenements minimum a gerer:

- `auth_signup`
- `auth_login`
- `seed_selected`
- `chat_message`
- `course_proposal`
- `course_vote`

Livrable workflow:

- `n8n/workflows/system/seve-system-session-router.workflow.json`

### Session PEDAGO (pedago.azoth.cloud)

Responsabilites:

1. Recevoir les signaux pedagogiques de l'app.
2. Determiner l'action pedagogique (coach, review, recommendation).
3. Appeler un moteur IA (etape ulterieure) et formater la reponse.
4. Renvoyer un feedback exploitable cote frontend.

Evenements minimum a gerer:

- `exercise_submission`
- `chat_message`
- `course_proposal`

Livrable workflow:

- `n8n/workflows/pedago/seve-pedago-session-router.workflow.json`

## Sequence de mise en place

1. Importer les deux workflows templates du dossier `n8n/workflows`.
2. Configurer les chemins webhook definitifs (prod + staging).
3. Ajouter authentification webhook (secret header ou token query).
4. Brancher stockages cibles (Postgres, Airtable, Sheets, S3, etc.).
5. Brancher IA pedagogique reelle sur la session pedago.
6. Ajouter alerte erreur (Slack/Email) sur chaque workflow.
7. Activer les workflows seulement apres tests payloads.

## Standards payload conseilles

Payload commun:

```json
{
  "type": "chat_message",
  "source": "web",
  "userId": "usr_xxx",
  "userName": "Alice",
  "timestamp": "2026-02-28T10:00:00.000Z",
  "data": {}
}
```

Regles:

- `type`: obligatoire, `snake_case`
- `timestamp`: ISO 8601 UTC
- `source`: `web` ou `admin`
- ne jamais envoyer de secret brut ni password

## Variables env recommandees

Conserver l'existant:

- `NEXT_PUBLIC_N8N_WEBHOOK_URL`

Ajouter progressivement:

- `NEXT_PUBLIC_N8N_SYSTEM_WEBHOOK_URL`
- `NEXT_PUBLIC_N8N_PEDAGO_WEBHOOK_URL`
- `N8N_SHARED_WEBHOOK_SECRET`

## Criteres d'acceptance

- SYSTEME:
  - chaque event retourne `status=accepted` + `eventType`
  - erreurs monitorables via logs n8n
- PEDAGO:
  - chaque event retourne `nextAction` + `coachReply`
  - format de reponse stable pour le frontend
