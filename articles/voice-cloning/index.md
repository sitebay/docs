---
title: Use a custom voice
description: Select a custom voice only when you have permission to use the recording and the speaker's identity.
tags:
- sitebay
- voice
- voice-cloning
published: 2026-04-28
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- voice cloning
- sitebay documentation
slug: voice-cloning
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- voice-runtime
- avatar-contract
modified: 2026-10-07
---

Select a custom voice only when you have permission to use the recording and the speaker's identity.

## Select and test

Use a voice profile available to your account. Start a session and test a short phrase before relying on it for a longer interaction. The speech service validates the selected voice ID; unavailable or rejected profiles can fall back to the configured default.

## Keep voice and avatar separate

A voice profile determines speech output. An avatar's manifest determines its mouth controls. Selecting a custom voice does not add lip-sync shapes to the model.

If the result is unexpected, check [Voice troubleshooting]({{< relref "voice/troubleshooting.md" >}}) and [Viseme tiers]({{< relref "avatars/visemes-explained.md" >}}).
