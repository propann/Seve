# ORDRE DE MISSION N°012 — Architecture Réseau & Documentation Système

## Services clés et sous-domaines

### Site principal : azoth.cloud
Rôle : Frontend Next.js (L'Arbre des Connaissances)
Mode : Docker (Coolify application)
Port interne : 3000 (via Traefik/Coolify Proxy)

### Base de données : db.azoth.cloud
Rôle : Interface de gestion PostgreSQL (Adminer)
Mode : Docker (Coolify)
Port interne : 8080 (via Traefik/Coolify Proxy)

### Stockage S3 : s3.azoth.cloud
Rôle : API S3 MinIO (stockage binaire)
Mode : Docker (Coolify)
Port interne : 9000 (via Traefik/Coolify Proxy)

### Automatisation système : n8n.azoth.cloud
Rôle : Gestion des comptes, mails et facturation
Mode : Docker (Coolify)
Port interne : 5678 (via Traefik/Coolify Proxy)

### IA pédagogique : pedago.azoth.cloud
Rôle : Analyse Vision et feedback du Maître
Mode : Docker (Coolify)
Port interne : 5678 (instance n8n pedagogie)

### Temps réel : realtime.azoth.cloud
Rôle : Serveur Websockets (Soketi)
Mode : Docker (Coolify)
Port : 6001

## Actions de configuration (Coolify Proxy)

Strategie : `coolify-proxy` (Traefik) sert la passerelle HTTPS et route vers les conteneurs/services.

Proxy Traefik :
- Compose : `/data/coolify/proxy/docker-compose.yml`
- Dynamic routes : `/data/coolify/proxy/dynamic/azoth-public.yaml`
- Entry points publies :
  - `80/tcp` (HTTP)
  - `443/tcp` + `443/udp` (HTTPS/HTTP3)

Domains publics :
- https://azoth.cloud
- https://n8n.azoth.cloud
- https://pedago.azoth.cloud
- https://s3.azoth.cloud
- https://db.azoth.cloud

SSL :
- Gere par Traefik ACME (`/data/coolify/proxy/acme.json`)

## Protocole de sécurité SSL

- Emission/renouvellement ACME par `coolify-proxy` (resolver `letsencrypt`).
- Stockage certificats : `/data/coolify/proxy/acme.json`.
- Les certificats Nginx/Certbot historiques restent presents, mais ne servent plus le frontal public.

## Livrables attendus

- Confirmation de la création du fichier /home/azoth/web/docs/RESEAU.md
- Rapport de statut des certificats SSL (Coolify Proxy)
- Confirmation que le frontal est `coolify-proxy` (et non `seve-web`)

## Avancement global (au 2026-02-28)

- OK : `coolify-proxy` actif et sain sur 80/443.
- OK : HTTPS actif + redirection HTTP -> HTTPS via Traefik.
- OK : correction seccomp appliquee sur stacks Coolify, healthchecks revenus en `healthy`.
- OK : n8n-systeme healthy (n8n + worker + task-runners + postgres + redis).
- OK : n8n-pedagogie healthy (n8n + worker + task-runners + postgres + redis).
- OK : MinIO healthy, console exposée via s3.azoth.cloud.
- OK : Adminer déployé et exposé via db.azoth.cloud.
- OK : frontend servi depuis conteneur Coolify.
- OK : legacy desactive : `seve-web`, `pm2-azoth`, `nginx`.

## Mémoire opérationnelle

- `coolify-proxy` sert de passerelle HTTPS pour tous les domaines publics.
- `azoth.cloud` route vers conteneur app `f0c0sgw04kwk4scc8kcw00ck:3000`.
- `n8n.azoth.cloud` route vers `n8n-sskgoc8kw4wgcoo48wcw480s:5678`.
- `pedago.azoth.cloud` route vers `n8n-u8owwg444s004wo8okwgsgkg:5678`.
- `s3.azoth.cloud` route vers `minio-k8ksosogoc8s04cs4okgw08o:9000`.
- `db.azoth.cloud` route vers `adminer-seve:8080`.
- Le stockage binaire `n8n-pedagogie` est externalisé en mode S3 sur MinIO.
- Les instances n8n utilisent des DB séparées :
  - n8n-systeme -> n8n_system
  - n8n-pedagogie -> n8n_pedago
