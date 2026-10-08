---
title: Work with your site in Sorti
description: Inspect the site application, distinguish live and staging, and verify operations through their
  owning service.
slug: work-with-your-site
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- work with your site in sorti
- sorti
- sitebay documentation
tags:
- sorti
- guides
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- sorti-current-app
- sorti-current-core
- sorti-canvas
weight: 30
---

Sorti presents a SiteBay site as an application in the workspace. Its state and available actions come from SiteBay; the host does not invent them from a product description.

## Inspect the selected site

Open the intended site and read its current situation. The same site can be live, asleep, restoring, creating a staging copy, or promoting staging. A busy state explains the operation in progress rather than promising that another action is safe.

Check the site identity and whether the request concerns live or staging. A page selected on the canvas gives useful context, but an editor connection can point to a different environment. Verify both before changing files.

A useful first request is:

> Inspect this site and its available actions. Tell me whether staging exists and whether an operation is already running. Do not change anything yet.

For a technical inspection, the site application declares `sitebay_site_read_state` and `sitebay_site_legal_actions`. Use their current schemas and the authenticated site's identity. The state reader can return an unchanged response for a matching state revision; that is not an empty site.

## Use the actions the site exposes

The app manifest is available under `sorti-app://manifest`. It identifies the site application, its required site input, quick actions, and panel resource. The visible site panel is `ui://sitebay/site`; the manifest itself is not a panel body.

The legal-actions result describes what is available from the current facts. It includes a label, a tool name, and arguments. Refresh this state after an operation instead of reusing an earlier action indefinitely. Permissions and the operation's own checks still apply when it is invoked.

## Make a staging change

Choose a narrow change, such as correcting a heading or checking a form. Confirm that the staging copy is ready, then inspect the relevant files or page selection. Use the [editor workflow]({{< relref "products/code-server/get-started/index.md" >}}) when the change belongs in the repository or WordPress files.

Verify the result on staging. A saved file proves the write occurred; it does not prove the page works or that visitors see the change. Check the affected page, interaction, and any relevant test output.

Promoting staging is a separate operation. Read the currently available action, review the target, and inspect its result. Do not treat a successful staging test as a completed live deployment.

## Recover the right operation

Use [Time Machine]({{< relref "products/time-machine/get-started-with-pit-machine/index.md" >}}) for the recovery procedure and file/database scope. The backend can offer an undo for the latest successful promotion when its recovery checkpoint remains available. That is not a general undo for every historical deployment or external side effect.

When an operation's result is uncertain, retain its ID and inspect the original job before repeating it. A mission's **Stop attempt** control stops that execution attempt; it does not restore a site checkpoint.

## Find the implementation

The site state and app declaration are owned by `sitebay/app/factory/sorti_site_app.py`. State and available-action routes live in `sitebay/app/api/site/legal_actions.py`; situation and action rules live in `sitebay/app/services/site_situation.py`.

Sorti owns the host interface and connected-session behavior. This split is why a new host build does not automatically update the SiteBay server's available operations.
