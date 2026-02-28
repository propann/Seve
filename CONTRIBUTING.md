# Contributing

## Workflow Git

1. Creer une branche:
```bash
git checkout -b feat/nom-court
```
2. Developper + verifier:
```bash
npm run lint
npm run build -- --webpack
```
3. Commit avec convention:
```text
type(scope): resume
```
Exemples:
- `feat(auth): add seed onboarding guard`
- `fix(build): lazy init resend client`
- `docs(ops): add deployment runbook`
4. Push + PR.
5. Merge vers `main` uniquement quand checks OK.

## Definition of done

- Aucun error lint bloquant.
- Build production OK.
- Impact env/documentation mis a jour si necessaire.

## Secrets

- Ne jamais commit `.env` ou tokens.
- Utiliser `.env.example` comme reference.
