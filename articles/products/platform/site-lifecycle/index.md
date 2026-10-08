---
slug: site-lifecycle
description: "Understanding SiteBay site statuses, the state machine that governs site operations, and what each status means."
keywords: ['site status', 'lifecycle', 'state machine', 'busy', 'idle', 'sleeping', 'creating']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2026-03-15
modified: 2026-03-15
modified_by:
  name: SiteBay
title: "Site Lifecycle and Statuses"
bible: true
tags: ["sitebay", "sites", "lifecycle", "status"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# Site Lifecycle and Statuses

Every SiteBay WordPress site has a **status** that reflects its current operational state. The status controls what operations are allowed — you cannot start a new operation while the site is busy with another.

## Site Statuses

The main statuses are:

- **idle** — site is running normally, all operations available
- **sleeping** — scaled to zero, serving a static HTML snapshot. Can only be woken or deleted.
- **creating** — initial deployment in progress
- **busy states** — `updating`, `deleting`, `creating_stage`, `committing_stage`, `restoring`, `applying_template`, etc.

A site is **busy** when it is in any status other than `idle` or `sleeping`. While busy, no new operations can be started — the API returns an error. Each busy status has a timeout; if exceeded, it can be force-cleared.

## The Site Lifecycle

### 1. Creation
A new site starts in `creating` status. The backend provisions a Kubernetes namespace, CephFS volume, MariaDB database, and deploys WordPress via Helm. On success, the site transitions to `idle` with `active=true`.

### 2. Normal Operation
In `idle` status, the site is fully operational. Users can edit files, run WP-CLI commands, install plugins, create staging environments, configure DNS, and more.

### 3. Staging
Creating a staging site transitions the live site to `creating_stage`. The staging site (`SiteStage`) is a separate WordPress deployment in the same Kubernetes namespace, sharing the live site's CephFS volume (under a `/stage/` subdirectory) and using a separate database. When ready, committing staging pushes changes back to live.

### 4. Sleep Mode
Free-tier and inactive sites can be put to sleep. The process:
1. Site enters `entering_sleep` status.
2. A static HTML snapshot of the homepage is captured and uploaded to MinIO.
3. The WordPress deployment is scaled to zero replicas.
4. Cloudflare is configured to serve the static snapshot.
5. Site transitions to `sleeping` status.

Waking a site reverses this: the deployment scales back up and DNS is restored to the live pod.

### 5. Point-in-Time Restore
Restoring a site is a two-phase process:
1. **Preview** (`previewing_restore`): The system calculates what files and database state would be restored without making changes.
2. **Restore** (`restoring`): Files are restored from MinIO backups and the database is rolled back using Dolt commits.

The minimum restore point is the later of: the site's creation date or 2 weeks ago. The maximum restore point is the last successful Dolt backup.

### 6. Deletion
Deleting a site (`deleting` status) removes:
- The Kubernetes namespace and all deployments
- The MariaDB database
- Cloudflare DNS records (if nameserver-controlled)
- The CephFS persistent volume
- A `SiteLiveDeleted` record is created for abuse tracking.

## Data Model

- **SiteLive** — the production site. Belongs to a User and a Team.
- **SiteStage** — an optional staging copy. Always linked to a SiteLive via `site_live_id`. Shares the same namespace and CephFS volume.
- Each site is identified by its **FQDN** (fully qualified domain name, e.g., `www.example.com`) and a **UUID**.
- The Kubernetes namespace is `live-{uuid}` for live sites, deployment names follow `live-{uuid}-wordpress`.
