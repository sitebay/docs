---
title: "Voice And Agent Troubleshooting"
description: "Common fixes for Sorti voice and provider issues."
---

## Gemini Token Expired

Reconnect your Google-backed SiteBay account and start a new Sorti session. If
the same error returns, confirm that the workspace still has access to the
selected Gemini model.

## Codex Rate Limited

Wait a few minutes, then retry the request. If the task is urgent, switch to a
different available provider from the SiteBay session controls.

## Anthropic Context Full

Start a new session or shorten the request. Sorti compacts old context
automatically, but very large site edits can still exceed the selected model's
window.

## Agent Responds With Nothing

Retry once. Sorti treats empty or non-actionable model output as a transient
provider error and should surface a provider-specific message when retrying.

## Tool Call Failed

Check whether the failed action needs approval, site credentials, or a connected
workspace. Sorti keeps provider selection separate from SiteBay permissions; a
working model cannot bypass missing site access.
