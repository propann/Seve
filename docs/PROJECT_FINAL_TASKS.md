# Backlog Final Projet SEVE

Derniere mise a jour: 2026-02-28

Objectif: regrouper en un seul endroit tout ce qu il reste a faire pour terminer le projet.

## 0) Regle globale (a conserver)

- Le Jardin est le hub principal.
- Chaque graine doit avoir une page de presentation.
- Le bouton retour doit toujours fonctionner vers `/garden`.
- L editeur de cours devra generer des pages au meme format de presentation que la photographie.

Format de presentation obligatoire (template v1):

1. Hero (image, titre, sous-titre, CTA)
2. Philosophie (texte court, typo editoriale)
3. Curriculum (grille de modules)
4. Gallery (grid visuel)
5. CTA retour (`Retour au Jardin`)

## 1) Navigation et UX critique

- [x] Boutons des graines -> pages de presentation dediees
- [x] Retour au Jardin depuis pages de presentation
- [ ] Ajouter breadcrumb standard sur toutes les pages de presentation
- [ ] Ajouter etat "cours en construction" harmonise (cinema/dessin/linux)
- [ ] Verifier parcours mobile complet (`garden -> presentation -> module -> garden`)

## 2) Editeur de cours (priorite produit)

- [ ] Definir schema de sortie de l editeur (JSON + metadata)
- [ ] Implémenter generation de page presentation selon template v1
- [ ] Mapper automatiquement `presentationHref` apres publication
- [ ] Ajouter workflow publication -> validation -> activation
- [ ] Ajouter previsualisation responsive avant publication

## 3) Donnees eleves et personnalisation IA

- [x] Profil apprentissage enrichi (age, profil cognitif, rythme, objectifs)
- [x] Inventaire materiel par graine
- [ ] Normaliser valeurs autorisees (enum strict + garde-fous API)
- [ ] Ajouter ecran admin lecture seule de l avancement eleve
- [ ] Ajouter events app vers n8n pour snapshots progression en continu

## 4) IA entraide et recommandations

- [x] Workflows n8n templates: progress-state + aid-recommendation
- [ ] Brancher workflow pedago sur source reelle DB/API (pas seulement payload de test)
- [ ] Ajouter logique anti-suggestions absurdes (historique refus, disponibilite)
- [ ] Exposer suggestions dans UI chat Mycelium
- [ ] Logger resultat des suggestions (acceptee/refusee/utile)

## 5) Cours et contenu

- [x] Presentation photographie exploitable
- [x] Presentation Linux "Voie de l Alchimiste" (Hero + 4 paliers + projet final)
- [ ] Finaliser assets manquants photo (images, corrections)
- [ ] Construire presentations cinema/dessin (version complete)
- [ ] Valider coherence modules vs promesse presentation
- [ ] Definir checklist qualitative par module (pedagogie + UX + exercices)

## 6) n8n et operations

- [x] Templates importables versionnes
- [x] Payloads de test et script de test
- [ ] Import reel dans les 2 instances n8n + activation controlee
- [ ] Secret webhook partage + verification signature partout
- [ ] Alerting erreur workflow (Slack/email)
- [ ] Runbook d exploitation n8n (incident + rollback)

## 7) Qualite technique

- [ ] Reduire warnings lint prioritaires (`any`, refs en render)
- [ ] Ajouter tests critiques auth/session/navigation
- [ ] Ajouter tests sur routes API n8n/profil
- [ ] CI obligatoire: lint + build + tests avant merge
- [ ] Revue accessibilite (contraste, focus, clavier)
- [ ] Reconciler l historique Prisma pour Postgres (retirer lock legacy sqlite)
- [ ] Ajouter procedure standard de migration DB (plus de correctifs SQL manuels)

## 8) Mise en production finale

- [ ] Validation fonctionnelle end-to-end sur domaine prod
- [ ] Validation charge legere + monitoring
- [ ] Audit securite des secrets/env
- [ ] Validation restoration backup
- [ ] Go/No-Go final avec checklist signee

## Definition of Done (Projet termine)

Le projet est considere termine quand:

1. Les 4 graines ont presentation + retour stable.
2. L editeur publie des presentations conformes template v1.
3. Les recommandations IA utilisent un etat d avancement fiable.
4. Les parcours critiques sont testes automatiquement.
5. Le runbook prod + n8n est a jour et valide.
