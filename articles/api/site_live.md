---
title: Live-site API
slug: site_live
authors:
- SiteBay
contributors:
- SiteBay
description: Manage a site identified by its fully qualified domain name.
keywords:
- site live
- sitebay documentation
published: 2025-03-18
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- api-contract
- api-auth
modified: 2026-10-07
---

Manage a site identified by its fully qualified domain name. Inspect read_state and legal_actions before a write. A created job or accepted request is not proof of a completed deployment. Deleting a live site is destructive and also affects staging.

## Contract and authentication

The operations below are extracted from the checked-in SiteBay client contract. They describe source-supported routes, not a live availability test. Use the deployed service at `https://my.sitebay.org`, the exact method, and the full path shown. A bearer credential does not override team membership or action-specific authorization.

### Get your sites

`GET /f/api/v1/site/`

Parameters: `team_id` (query, optional), `page` (query, optional), `size` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Create a site

`POST /f/api/v1/site/`

Parameters: `Idempotency-Key` (header, optional).

Request schema: `SiteLiveCreate`. Required body fields: `team_id`, `fqdn`, `wordpress_blog_name`, `wordpress_first_name`, `wordpress_last_name`, `wordpress_email`, `wordpress_username`.

Documented responses: `201`, `422`. This operation changes state; review its target and effect before sending it.

### Delete your live site

`DELETE /f/api/v1/site/{fqdn}`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get your live site

`GET /f/api/v1/site/{fqdn}`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Update a site

`PATCH /f/api/v1/site/{fqdn}`

Parameters: `fqdn` (path, required).

Request schema: `SiteLiveUpdate`. Consult the schema for optional body fields.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Selected backup environment

`GET /f/api/v1/site/{fqdn}/backups/environment`

Parameters: `fqdn` (path, required), `target` (query, optional), `site_stage_id` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Resolve the local-fs bridge root for a site

`GET /f/api/v1/site/{fqdn}/bridge-bind`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Generate a WordPress admin auth cookie for the site

`POST /f/api/v1/site/{fqdn}/browser/admin-cookie`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Click an element on the site

`POST /f/api/v1/site/{fqdn}/browser/click`

Parameters: `fqdn` (path, required).

Request schema: `BrowserClickRequest`. Required body fields: `selector`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Close the site's browser context

`POST /f/api/v1/site/{fqdn}/browser/close`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Run JavaScript on the site

`POST /f/api/v1/site/{fqdn}/browser/eval`

Parameters: `fqdn` (path, required).

Request schema: `BrowserEvalRequest`. Required body fields: `js`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Fill a form field on the site

`POST /f/api/v1/site/{fqdn}/browser/fill`

Parameters: `fqdn` (path, required).

Request schema: `BrowserFillRequest`. Required body fields: `selector`, `value`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Navigate browser to a path on the site

`POST /f/api/v1/site/{fqdn}/browser/goto`

Parameters: `fqdn` (path, required).

Request schema: `BrowserGotoRequest`. Consult the schema for optional body fields.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get buffered browser console logs

`GET /f/api/v1/site/{fqdn}/browser/logs`

Parameters: `fqdn` (path, required), `level` (query, optional), `limit` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Take a screenshot of the site

`POST /f/api/v1/site/{fqdn}/browser/screenshot`

Parameters: `fqdn` (path, required).

Request schema: `BrowserScreenshotRequest`. Consult the schema for optional body fields.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get text content of an element

`POST /f/api/v1/site/{fqdn}/browser/text`

Parameters: `fqdn` (path, required).

Request schema: `BrowserTextRequest`. Consult the schema for optional body fields.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Update Cloudflare zone settings

`PATCH /f/api/v1/site/{fqdn}/cf_settings`

Parameters: `fqdn` (path, required).

Request schema: `CfSettingsPatch`. Consult the schema for optional body fields.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Toggle Cloudflare dev mode

`PATCH /f/api/v1/site/{fqdn}/change_dev_mode`

Parameters: `fqdn` (path, required), `enable` (query, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### List checkpoints

`GET /f/api/v1/site/{fqdn}/checkpoints`

Parameters: `fqdn` (path, required), `target` (query, optional), `site_stage_id` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Create a checkpoint

`POST /f/api/v1/site/{fqdn}/checkpoints`

Parameters: `fqdn` (path, required), `target` (query, optional), `site_stage_id` (query, optional).

Request schema: `SiteCheckpointCreate`. Required body fields: `name`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Delete a checkpoint

`DELETE /f/api/v1/site/{fqdn}/checkpoints/{checkpoint_id}`

Parameters: `checkpoint_id` (path, required), `fqdn` (path, required), `target` (query, optional), `site_stage_id` (query, optional).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get a checkpoint

`GET /f/api/v1/site/{fqdn}/checkpoints/{checkpoint_id}`

Parameters: `checkpoint_id` (path, required), `fqdn` (path, required), `target` (query, optional), `site_stage_id` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Purge Cloudflare CDN cache

`POST /f/api/v1/site/{fqdn}/clear_cache`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Create a site clone job

`POST /f/api/v1/site/{fqdn}/clone_jobs`

Parameters: `fqdn` (path, required).

Request schema: `SiteCloneJobRequest`. Required body fields: `url`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get a site clone job

`GET /f/api/v1/site/{fqdn}/clone_jobs/{job_id}`

Parameters: `job_id` (path, required), `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Write bridge config to code-server

`POST /f/api/v1/site/{fqdn}/code-server-bridge`

Parameters: `fqdn` (path, required).

Request schema: `BridgeConfigRequest`. Required body fields: `room_name`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Code Server Sso

`GET /f/api/v1/site/{fqdn}/code-server-sso`

Parameters: `fqdn` (path, required), `env` (query, optional), `file` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### List custom hostnames

`GET /f/api/v1/site/{fqdn}/custom_hostname`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Add custom hostname

`POST /f/api/v1/site/{fqdn}/custom_hostname`

Parameters: `fqdn` (path, required).

Request schema: `CustomHostnameCreate`. Required body fields: `hostname`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Remove custom hostname

`DELETE /f/api/v1/site/{fqdn}/custom_hostname/{hostname_id}`

Parameters: `hostname_id` (path, required), `fqdn` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get site dashboard

`GET /f/api/v1/site/{fqdn}/dashboard`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Database table diff

`GET /f/api/v1/site/{fqdn}/database_changes/diff`

Parameters: `fqdn` (path, required), `from_commit` (query, optional), `to_commit` (query, optional), `table` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Human-readable diff summary

`GET /f/api/v1/site/{fqdn}/database_changes/diff-summary`

Parameters: `fqdn` (path, required), `from_commit` (query, optional), `to_commit` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Database commit log

`GET /f/api/v1/site/{fqdn}/database_changes/log`

Parameters: `fqdn` (path, required), `limit` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Get DNS records

`GET /f/api/v1/site/{fqdn}/dns`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Create DNS record

`POST /f/api/v1/site/{fqdn}/dns`

Parameters: `fqdn` (path, required).

Request schema: `DNSRecordCreateRequest`. Required body fields: `name`, `type`, `content`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Delete DNS record

`DELETE /f/api/v1/site/{fqdn}/dns/{dns_id}`

Parameters: `dns_id` (path, required), `fqdn` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Update DNS record

`PATCH /f/api/v1/site/{fqdn}/dns/{dns_id}`

Parameters: `dns_id` (path, required), `fqdn` (path, required).

Request schema: `DNSRecordUpdateRequest`. Consult the schema for optional body fields.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get site events

`GET /f/api/v1/site/{fqdn}/event`

Parameters: `fqdn` (path, required), `page` (query, optional), `size` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Get external paths

`GET /f/api/v1/site/{fqdn}/external_path`

Parameters: `fqdn` (path, required), `page` (query, optional), `size` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Create external path

`POST /f/api/v1/site/{fqdn}/external_path`

Parameters: `fqdn` (path, required).

Request schema: `ExternalPathCreate`. Required body fields: `external_name`, `path`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Delete external path

`DELETE /f/api/v1/site/{fqdn}/external_path/{external_path_id}`

Parameters: `external_path_id` (path, required), `fqdn` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get external path

`GET /f/api/v1/site/{fqdn}/external_path/{external_path_id}`

Parameters: `external_path_id` (path, required), `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Update external path

`PATCH /f/api/v1/site/{fqdn}/external_path/{external_path_id}`

Parameters: `external_path_id` (path, required), `fqdn` (path, required).

Request schema: `ExternalPathUpdate`. Required body fields: `external_name`, `path`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get download URLs

`POST /f/api/v1/site/{fqdn}/get_download_urls`

Parameters: `fqdn` (path, required), `at_date` (query, optional), `target` (query, optional), `site_stage_id` (query, optional).

Request schema: `Body_get_download_urls_f_api_v1_site__fqdn__get_download_urls_post`. Required body fields: `keys`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Unlink git repository

`DELETE /f/api/v1/site/{fqdn}/git`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get git-sync process logs

`GET /f/api/v1/site/{fqdn}/git/logs`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Resume suspended git-sync

`POST /f/api/v1/site/{fqdn}/git/resume`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Hosting Domain Start

`POST /f/api/v1/site/{fqdn}/hosting/domains`

Parameters: `fqdn` (path, required).

Request schema: `HostingDomainRequest`. Required body fields: `hostname`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Hosting Execute

`POST /f/api/v1/site/{fqdn}/hosting/execute`

Parameters: `fqdn` (path, required).

Request schema: `HostingExecuteRequest`. Required body fields: `reviewId`, `confirmation`.

Documented responses: `202`, `422`. This operation changes state; review its target and effect before sending it.

### Hosting Recovery Points

`GET /f/api/v1/site/{fqdn}/hosting/recovery-points`

Parameters: `fqdn` (path, required), `offset` (query, optional), `limit` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Hosting Review

`POST /f/api/v1/site/{fqdn}/hosting/reviews`

Parameters: `fqdn` (path, required).

Request schema: `HostingReviewRequest`. Required body fields: `kind`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### List IP access rules

`GET /f/api/v1/site/{fqdn}/ip_access`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Create IP access rule

`POST /f/api/v1/site/{fqdn}/ip_access`

Parameters: `fqdn` (path, required).

Request schema: `IpAccessRuleCreate`. Required body fields: `target`, `value`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Delete IP access rule

`DELETE /f/api/v1/site/{fqdn}/ip_access/{rule_id}`

Parameters: `rule_id` (path, required), `fqdn` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### What you can do to this site right now

`GET /f/api/v1/site/{fqdn}/legal_actions`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Get site logs

`GET /f/api/v1/site/{fqdn}/logs`

Parameters: `fqdn` (path, required), `log_type` (query, optional), `lines` (query, optional), `level` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### List available containers

`GET /f/api/v1/site/{fqdn}/logs/containers`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Stream site logs

`GET /f/api/v1/site/{fqdn}/logs/stream`

Parameters: `fqdn` (path, required), `container` (query, optional), `follow` (query, optional), `lines` (query, optional), `since_seconds` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Get container logs

`GET /f/api/v1/site/{fqdn}/logs/{container_name}`

Parameters: `container_name` (path, required), `fqdn` (path, required), `lines` (query, optional), `since` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Move an existing WordPress site into SiteBay

`POST /f/api/v1/site/{fqdn}/migrate`

Parameters: `fqdn` (path, required).

Request schema: `SiteMigrationJobRequest`. Required body fields: `source_url`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Progress of a WordPress migration

`GET /f/api/v1/site/{fqdn}/migrate/{job_id}`

Parameters: `job_id` (path, required), `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### [Retired] Execute an INSERT, UPDATE, or DELETE on the site database

`POST /f/api/v1/site/{fqdn}/mysql/exec`

Parameters: `fqdn` (path, required).

Request schema: `MySQLExecRequest`. Required body fields: `sql`.

Documented responses: `410`, `422`. This operation changes state; review its target and effect before sending it.

### [Retired] EXPLAIN a SQL statement on the site database

`POST /f/api/v1/site/{fqdn}/mysql/explain`

Parameters: `fqdn` (path, required).

Request schema: `MySQLExplainRequest`. Required body fields: `sql`.

Documented responses: `410`, `422`. This operation changes state; review its target and effect before sending it.

### [Retired] Run a SELECT query on the site database

`POST /f/api/v1/site/{fqdn}/mysql/query`

Parameters: `fqdn` (path, required).

Request schema: `MySQLQueryRequest`. Required body fields: `sql`.

Documented responses: `410`, `422`. This operation changes state; review its target and effect before sending it.

### Check nameserver propagation

`GET /f/api/v1/site/{fqdn}/ns_status`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Get PIT Restores

`GET /f/api/v1/site/{fqdn}/pit_restore`

Parameters: `fqdn` (path, required), `page` (query, optional), `size` (query, optional), `target` (query, optional), `site_stage_id` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Create PIT Restore

`POST /f/api/v1/site/{fqdn}/pit_restore`

Parameters: `fqdn` (path, required), `target` (query, optional), `site_stage_id` (query, optional).

Request schema: `PITRestoreCreate`. Consult the schema for optional body fields.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get backups to create PIT Restore

`GET /f/api/v1/site/{fqdn}/pit_restore/commits`

Parameters: `fqdn` (path, required), `restore_point` (query, required), `number_to_fetch` (query, optional), `target` (query, optional), `site_stage_id` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Restore a single file from PIT backup

`POST /f/api/v1/site/{fqdn}/pit_restore/file`

Parameters: `fqdn` (path, required), `target` (query, optional), `site_stage_id` (query, optional).

Request schema: `Body_pit_file_restore_f_api_v1_site__fqdn__pit_restore_file_post`. Required body fields: `path`, `version_id`, `restore_point`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### PIT Files

`GET /f/api/v1/site/{fqdn}/pit_restore/files`

Parameters: `fqdn` (path, required), `restore_point` (query, required), `target` (query, optional), `site_stage_id` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Preview PIT Restore

`POST /f/api/v1/site/{fqdn}/pit_restore/preview`

Parameters: `fqdn` (path, required), `target` (query, optional), `site_stage_id` (query, optional).

Request schema: `PITRestoreCreate`. Consult the schema for optional body fields.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get PIT Restore

`GET /f/api/v1/site/{fqdn}/pit_restore/{pit_restore_id}`

Parameters: `pit_restore_id` (path, required), `fqdn` (path, required), `format` (query, optional), `target` (query, optional), `site_stage_id` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### The site app's view-model

`GET /f/api/v1/site/{fqdn}/read_state`

Parameters: `fqdn` (path, required), `known_state_rev` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Read recovery request history, including retired stage instances

`GET /f/api/v1/site/{fqdn}/recovery-jobs`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Read a recovery operation receipt

`GET /f/api/v1/site/{fqdn}/recovery-jobs/{job_id}`

Parameters: `job_id` (path, required), `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### List redirect rules

`GET /f/api/v1/site/{fqdn}/redirects`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Create redirect rule

`POST /f/api/v1/site/{fqdn}/redirects`

Parameters: `fqdn` (path, required).

Request schema: `RedirectCreateRequest`. Consult the schema for optional body fields.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Delete redirect rule

`DELETE /f/api/v1/site/{fqdn}/redirects/{rule_id}`

Parameters: `rule_id` (path, required), `fqdn` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Renew code-server lease

`POST /f/api/v1/site/{fqdn}/renew_lease_code_server`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get security settings

`GET /f/api/v1/site/{fqdn}/security`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Update security settings

`PATCH /f/api/v1/site/{fqdn}/security`

Parameters: `fqdn` (path, required).

Request schema: `SecuritySettingsPatch`. Consult the schema for optional body fields.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Sleep site

`POST /f/api/v1/site/{fqdn}/sleep`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Switch site's git source from internal to external (GitHub)

`POST /f/api/v1/site/{fqdn}/switch-git-provider`

Parameters: `fqdn` (path, required).

Request schema: `SwitchGitProviderBody`. Required body fields: `provider`, `repo_url`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Return a cached staging thumbnail for the site

`GET /f/api/v1/site/{fqdn}/thumbnail`

Parameters: `fqdn` (path, required), `w` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Time Machine activity heatmap

`GET /f/api/v1/site/{fqdn}/timemachine/heatmap`

Parameters: `fqdn` (path, required), `from` (query, required), `to` (query, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Get Cloudflare tools

`GET /f/api/v1/site/{fqdn}/tools`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Get usage statistics

`GET /f/api/v1/site/{fqdn}/usage`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Visitor Connection

`GET /f/api/v1/site/{fqdn}/visitor-insights/connection`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Visitor Query

`POST /f/api/v1/site/{fqdn}/visitor-insights/query`

Parameters: `fqdn` (path, required).

Request schema: `InsightQuery`. Required body fields: `connection_id`, `lens`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Site visit analytics

`GET /f/api/v1/site/{fqdn}/visits`

Parameters: `fqdn` (path, required), `hours` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Toggle WAF login protection

`POST /f/api/v1/site/{fqdn}/waf_login_protection`

Parameters: `fqdn` (path, required).

Request schema: `WafToggle`. Required body fields: `enabled`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Wake site

`POST /f/api/v1/site/{fqdn}/wake`

Parameters: `fqdn` (path, required), `wake_code_server` (query, optional).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Wake a sleeping site because someone visited it

`POST /f/api/v1/site/{fqdn}/wake-on-traffic`

Parameters: `fqdn` (path, required), `x-sitebay-signature` (header, optional).

Documented responses: `202`, `422`. This operation changes state; review its target and effect before sending it.

### Create Wp Admin Sso

`POST /f/api/v1/site/{fqdn}/wp-admin-sso`

Parameters: `fqdn` (path, required).

Request schema: `WordPressAdminSSORequest`. Consult the schema for optional body fields.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### [Retired] Edit multiple files atomically

`POST /f/api/v1/site/{fqdn}/wpfile/multi_edit`

Parameters: `fqdn` (path, required).

Request schema: `MultiEditRequest`. Required body fields: `edits`.

Documented responses: `410`, `422`. This operation changes state; review its target and effect before sending it.

### [Retired] Read a WordPress file

`POST /f/api/v1/site/{fqdn}/wpfile/read`

Parameters: `fqdn` (path, required).

Request schema: `FileReadRequest`. Required body fields: `file_path`.

Documented responses: `410`, `422`. This operation changes state; review its target and effect before sending it.

### [Retired] Read then edit a WordPress file

`POST /f/api/v1/site/{fqdn}/wpfile/read_and_edit`

Parameters: `fqdn` (path, required).

Request schema: `ReadAndEditRequest`. Required body fields: `file_path`, `file_edit_using_search_replace_blocks`.

Documented responses: `410`, `422`. This operation changes state; review its target and effect before sending it.

### [Retired] List wp-content file tree

`POST /f/api/v1/site/{fqdn}/wpfile/tree`

Parameters: `fqdn` (path, required).

Request schema: `FileTreeRequest`. Consult the schema for optional body fields.

Documented responses: `410`, `422`. This operation changes state; review its target and effect before sending it.

### [Retired] Edit a file in your wp-content folder

`POST /f/api/v1/site/{fqdn}/wpfile_diff_edit`

Parameters: `fqdn` (path, required).

Request schema: `FileEdit`. Required body fields: `file_path`, `file_edit_using_search_replace_blocks`.

Documented responses: `410`, `422`. This operation changes state; review its target and effect before sending it.

## Integration checks

Handle authorization and validation errors without silently retrying a mutation. Preserve returned IDs and inspect the result after an accepted background operation. Keep bearer tokens out of URLs, browser bundles, logs, screenshots, and commits.

[API integration guide]({{< relref "products/platform/api-reference/index.md" >}}) explains authentication, pagination, and error handling.
