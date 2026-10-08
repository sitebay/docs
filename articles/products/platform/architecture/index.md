---
slug: sitebay-architecture
description: "How SiteBay's infrastructure works under the hood: Kubernetes, CephFS, MariaDB, Celery workers, and the full deployment pipeline."
keywords: ['architecture', 'kubernetes', 'infrastructure', 'cephfs', 'mariadb', 'celery', 'helm']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2026-03-15
modified: 2026-03-15
modified_by:
  name: SiteBay
title: "SiteBay Infrastructure Architecture"
bible: true
tags: ["sitebay", "architecture", "kubernetes", "infrastructure"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# SiteBay Infrastructure Architecture

SiteBay runs WordPress at scale on Kubernetes. Every site gets its own isolated namespace, dedicated database, and persistent storage — no shared hosting, no noisy neighbors.

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| API | **FastAPI** (Python) | REST API at `https://my.sitebay.org/f/api/v1` |
| ORM | **SQLModel** + SQLAlchemy | Data models backed by PostgreSQL |
| Task Queue | **Celery** + Redis | Async operations (deploy, backup, restore, delete) |
| Orchestration | **Kubernetes** + Helm | WordPress pod lifecycle, scaling, namespaces |
| Storage | **CephFS** | Persistent volumes for WordPress files (`wp-content`) |
| Database (WordPress) | **Percona XtraDB Cluster** (MariaDB) | Each site gets its own database |
| Database (Platform) | **PostgreSQL** | Users, teams, sites, billing metadata |
| Object Storage | **MinIO** (S3-compatible) | Point-in-time backups of `wp-content` |
| CDN / DNS | **Cloudflare** | Edge caching, SSL, DNS management |
| Monitoring | **Grafana + Loki** | Per-team dashboards, centralized log aggregation |
| Analytics | **PostHog** | Session replay, product analytics, feature flags |
| Error Tracking | **Sentry** | Backend error monitoring |

## How a WordPress Site is Deployed

When you create a site, the following happens:

1. **API receives the request** — validates the domain, checks team plan quotas, and creates a `SiteLive` record in PostgreSQL.
2. **Celery task dispatched** — the `deploy_site_live` worker task runs asynchronously. The site status transitions to `creating`.
3. **Kubernetes namespace created** — each site gets namespace `live-{uuid}`.
4. **CephFS PVC provisioned** — a persistent volume claim is created for the site's WordPress files. Size is based on the team's plan tier (1 GiB for free, up to 20 GiB for paid plans).
5. **MariaDB database created** — a dedicated database (`live_{uuid_hex}`) is created on the Percona XtraDB Cluster with a unique user and password.
6. **Helm chart installed** — WordPress is deployed via `helm upgrade --install` using SiteBay's custom Helm chart, which configures:
   - The WordPress deployment (PHP-FPM + Nginx)
   - Kubernetes ingress for the domain
   - CephFS volume mounts
   - Database connection secrets
   - Code Server sidecar
7. **DNS configured** — if nameservers point to SiteBay (`ns1.sitebay.org` / `ns2.sitebay.org`), Cloudflare DNS records are automatically created.
8. **Health check** — the system polls the site until WordPress responds, then marks the site as `idle` and `active`.

## Regions

SiteBay currently operates in one region:

| Region | ID | Location | CNAME |
|--------|-----|----------|-------|
| free | 0 | Calgary, Canada | `calgary.sitebay.org` |

The `free` region is the main and default region. All sites deploy here.

## Storage Architecture

Each site's files live on CephFS:

```
/mnt/file-share-{fs_value}-{env}/volumes/csi/{volume_handle}/{subvolume}/wordpress/
├── wp-content/
│   ├── plugins/
│   ├── themes/
│   ├── uploads/
│   └── ...
├── wp-config.php
└── ...
```

- **Live site**: `/wordpress/wp-content/`
- **Staging site**: `/stage/wordpress/wp-content/`
- Both live and stage share the same PVC (same CephFS subvolume).

## Backup Architecture

SiteBay uses two backup systems:

1. **MinIO (S3)** — periodic snapshots of `wp-content` files stored in S3-compatible object storage. Each site has a bucket named `live-{uuid}`. The Point-in-Time Machine uses these snapshots to let you browse and restore files at any past timestamp.

2. **Dolt** — version-controlled database backups. Dolt tracks changes to WordPress database tables, enabling point-in-time database restores with commit granularity.

## Worker Tasks (Celery)

Long-running operations are handled by Celery workers, each dispatched to the correct region queue:

| Task | Description |
|------|-------------|
| `deploy_site_live` | Full WordPress deployment via Helm |
| `deploy_site_stage` | Deploy a staging copy of a live site |
| `delete_site_live` | Tear down namespace, PVC, database, DNS |
| `delete_site_stage` | Remove staging deployment |
| `commit_site_stage` | Push staging changes back to live |
| `sleep_site` | Scale deployment to 0 replicas, serve static snapshot |
| `activate_site` | Wake a sleeping site (scale back up) |
| `restore_site` | Point-in-time restore from backups |
| `hourly_site_usage` | Collect visits, bandwidth, storage metrics |
| `sanity_check_all_sites` | Verify all sites are healthy |

## Code Server

Every site includes a browser-based VS Code instance (Code Server) accessible at:

```
https://sitebaycs-{site_uuid}.sitebay.org
```

Code Server runs as a sidecar container in the WordPress pod, with direct filesystem access to the site's `wp-content` directory.

## Git Sync

Git Sync provides bidirectional synchronization between a Git repository and a WordPress site's `wp-content` directory. Supported providers:

- **GitHub** — via GitHub App installation
- **GitLab** — via OAuth token
- **Bitbucket** — via app password

The live site always uses the repository's default branch. Staging sites can target a specific branch, enabling branch-based workflows.
