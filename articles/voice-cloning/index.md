---
title: "Voice Cloning"
description: "How cloned voices work in SiteBay voice sessions."
tags: ["sitebay", "voice", "voice-cloning"]
published: 2026-04-28
---

# Voice Cloning

Voice cloning lets a SiteBay assistant use a saved voice profile. A profile is referenced by a voice ID in the form `clone:<voice_profile_id>`.

## Create A Voice

Create or upload a voice profile in Voicebox. Once the profile is available, SiteBay can use it for assistant speech.

## Use A Voice

When a Sorti session starts, the voice path requests speech with the selected voice profile. If a cloned voice is unavailable, SiteBay falls back to the default voice so the assistant can still answer.

## Privacy

Only upload samples you have the right to use. Do not include passwords, private keys, or confidential customer data in voice sample names or reference text.
