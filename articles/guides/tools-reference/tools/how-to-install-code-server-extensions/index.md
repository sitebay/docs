---
slug: how-to-install-code-server-extensions
description: An extension can execute code with the workspace's access, so review its publisher and purpose before
  installation.
keywords:
- Linux terminal
- terminal HOWTO
- SiteBay terminal tutorial
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-04
image: CodeServerExtensions.png
title: Install a compatible code-server extension
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- code-server
---

An extension can execute code with the workspace's access, so review its publisher and purpose before installation. Code-server is not the same distribution as Microsoft's desktop Visual Studio Code, and marketplace availability and licensing can differ.

## Inspect the environment

Open the intended site's workspace and view installed extensions. Check the code-server version, language/runtime requirements and configured extension gallery. The old list of supposedly preinstalled PHP and WordPress extensions is not a guarantee for the current image.

## Use the available gallery

Open Extensions, search for the intended extension and inspect its exact identifier, publisher and compatibility. Code-server normally uses Open VSX rather than the complete Microsoft marketplace. An unavailable extension should not be replaced with an unverified package bearing a similar name.

## Install a trusted VSIX when supported

Use the editor's “Install from VSIX” action, or the installed code-server command's supported extension option, for a package obtained from its legitimate publisher. Verify that the license permits this environment and that the package matches the runtime architecture. Do not download and execute arbitrary installation commands solely to bypass a gallery restriction.

## Verify the feature

Reload when requested and test the actual language-server, formatter or debugger behavior on a small file. Installing an extension does not automatically install every runtime or configure a debug connection. Keep secret configuration out of shared workspace files, and remove an extension through the supported UI when it is no longer needed.

For the managed filesystem and connection scope, see [the workspace guide]({{< relref "products/code-server/get-started/index.md" >}}).
