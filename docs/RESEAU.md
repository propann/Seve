# ORDRE DE MISSION N°012 — Architecture Réseau & Documentation Système

## Services clés et sous-domaines

### Site principal : azoth.cloud
Rôle : Frontend Next.js (L'Arbre des Connaissances)
Mode : Natif Linux (service systemd `seve-web`)
Port : 3000

### Base de données : db.azoth.cloud
Rôle : Interface de gestion PostgreSQL (Adminer)
Mode : Docker (Coolify)
Port : 8080

### Stockage S3 : s3.azoth.cloud
Rôle : API S3 MinIO (stockage binaire)
Mode : Docker (Coolify)
Port : 9000

### Automatisation système : n8n.azoth.cloud
Rôle : Gestion des comptes, mails et facturation
Mode : Docker (Coolify)
Port : 5678

### IA pédagogique : pedago.azoth.cloud
Rôle : Analyse Vision et feedback du Maître
Mode : Docker (Coolify)
Port : 5679

### Temps réel : realtime.azoth.cloud
Rôle : Serveur Websockets (Soketi)
Mode : Docker (Coolify)
Port : 6001

## Actions de configuration (Nginx natif)

Stratégie : Nginx natif sert de passerelle HTTPS et route le trafic vers le service local.

Vhost Nginx :
- Fichier : /etc/nginx/sites-available/azoth.cloud
- Proxy : http://127.0.0.1:3000
- Redirect : HTTP -> HTTPS
- Fichier : /etc/nginx/sites-available/seve-services
- Proxys :
  - n8n.azoth.cloud -> http://127.0.0.1:15678
  - pedago.azoth.cloud -> http://127.0.0.1:15679
  - s3.azoth.cloud -> http://127.0.0.1:19001
  - db.azoth.cloud -> http://127.0.0.1:18080

Domains (Nginx) :
- https://azoth.cloud
- https://n8n.azoth.cloud
- https://pedago.azoth.cloud
- https://s3.azoth.cloud
- https://db.azoth.cloud

SSL :
- Géré par Certbot (Let's Encrypt)

## Protocole de sécurité SSL

- Certbot utilisé via nginx plugin.
- Certificat : /etc/letsencrypt/live/azoth.cloud/fullchain.pem
- Expiration : 2026-05-28 (renouvellement auto)
- Certificat : /etc/letsencrypt/live/n8n.azoth.cloud/fullchain.pem
- SAN : n8n.azoth.cloud, pedago.azoth.cloud, s3.azoth.cloud, db.azoth.cloud
- Expiration : 2026-05-28 (renouvellement auto)

## Livrables attendus

- Confirmation de la création du fichier /home/azoth/web/docs/RESEAU.md
- Rapport de statut des certificats SSL (Coolify Proxy)
- Confirmation que `systemctl status seve-web` affiche le service en ligne

## Avancement global (au 2026-02-27)

- OK : Nginx natif configuré pour azoth.cloud + www.azoth.cloud (proxy 127.0.0.1:3000).
- OK : HTTPS actif + redirection HTTP -> HTTPS via Certbot.
- OK : Certificat émis (expiration 2026-05-28, renewal auto).
- OK : n8n-systeme healthy (n8n + worker + task-runners + postgres + redis).
- OK : n8n-pedagogie healthy (n8n + worker + task-runners + postgres + redis).
- OK : MinIO healthy, console exposée via s3.azoth.cloud.
- OK : Adminer déployé et exposé via db.azoth.cloud.
- OK : service frontend basculé sur `systemd` (`seve-web`) en mode production (`next start`).
- OK : correctif UI déployé sur la landing (`/`) : bande haute retirée et exception client corrigée.

## Mémoire opérationnelle

- Nginx natif sert de passerelle HTTPS pour azoth.cloud.
- Nginx route vers http://127.0.0.1:3000.
- Certbot gère SSL + redirection HTTP -> HTTPS.
- `s3.azoth.cloud` route vers l'API MinIO (`127.0.0.1:19000`).
- Le stockage binaire `n8n-pedagogie` est externalisé en mode S3 sur MinIO.
- Les instances n8n utilisent des DB séparées :
  - n8n-systeme -> n8n_system
  - n8n-pedagogie -> n8n_pedago
