# TODO - Liaison Avatar vers MinIO (Web)

Date: 2026-03-01

## Objectif
Basculer la photo de profil (`/rituel`) vers un stockage MinIO/S3 fiable, puis afficher correctement l’avatar dans l’UI (fiche + header).

## Etat actuel
- Fait: la fiche personnage upload maintenant l’image via API serveur (`POST /api/profile/avatar`) puis sauvegarde l’URL retournée en base.
- Fait: l’avatar s’affiche dans la fiche personnage et dans le header avec fallback si URL invalide.
- Fait: `AGENTS.md` mis à jour avec l’état réel du workspace.
- Bloquant restant: `S3_SECRET_KEY` n’est pas renseigné dans `web/.env`.

## Fichiers déjà modifiés
- `/home/azoth/AGENTS.md`
- `/home/azoth/web/components/ui/PlayerProfile.tsx`
- `/home/azoth/web/components/layout/UnifiedHeader.tsx`
- `/home/azoth/web/lib/avatar-url.ts`
- `/home/azoth/web/lib/s3-upload.ts`
- `/home/azoth/web/app/api/profile/avatar/route.ts`
- `/home/azoth/web/.env.example`
- `/home/azoth/web/.env`

## TODO (ordre recommandé)
1. Renseigner la variable manquante dans `/home/azoth/web/.env`:
   - `S3_SECRET_KEY=<secret-minio>`
2. Vérifier que les variables suivantes sont présentes:
   - `S3_ENDPOINT=https://s3.azoth.cloud`
   - `S3_REGION=us-east-1`
   - `S3_BUCKET=seve`
   - `S3_ACCESS_KEY=minioadmin`
   - `S3_SECRET_KEY=...`
   - `S3_FORCE_PATH_STYLE=true`
   - `NEXT_PUBLIC_S3_PUBLIC_BASE_URL=https://s3.azoth.cloud/seve`
3. Redémarrer l’application web pour recharger l’environnement.
4. Tester en UI:
   - Se connecter
   - Aller sur `/rituel`
   - Uploader une image avatar
   - Cliquer sauvegarde profil
5. Vérifier le rendu:
   - Avatar visible sur `/rituel`
   - Avatar visible dans le header
6. Vérifier persistance:
   - Se déconnecter/reconnecter
   - Vérifier que l’avatar reste affiché
7. Vérifier stockage MinIO:
   - Confirmer qu’un objet est créé sous un chemin du type `avatars/<userId>/...`

## Critères d’acceptation
- Upload avatar OK sans erreur API.
- URL avatar sauvegardée et non vide en base (`User.avatar`).
- Affichage avatar stable après refresh et reconnexion.
- Objet présent dans MinIO.

## Dépannage rapide
- Erreur `S3 config incomplete`: variable(s) manquante(s) dans `web/.env`.
- Erreur upload 401: session `arbre_session` absente/invalide.
- Avatar non affiché: URL inaccessible publiquement ou bucket/ACL/policy incorrecte.
- Avatar cassé après migration: vérifier `NEXT_PUBLIC_S3_PUBLIC_BASE_URL`.
