---
layout: documentation-section
title: "Avatars"
description: "Use a SiteBay assistant avatar with speech and lip sync."
tags: ["sitebay", "avatars", "voice"]
published: 2026-04-28
---

# Avatars

SiteBay avatars use a shared face-control contract so the app, voice agent, and avatar runtime agree on speech timing and facial movement.

## Supported Avatar Sources

You can use the built-in SiteBay avatars or bring a compatible GLB avatar. For best results, use an avatar with facial blend shapes that can map to common lip-sync visemes.

## Lip-Sync Tiers

SiteBay supports three practical tiers:

- Viseme schedules from the voice service for the best speech match.
- Word timing cues when visemes are not available.
- Amplitude movement as a fallback when only audio energy is available.

## Bring Your Own GLB

Upload or select a GLB avatar in Avatar Studio, then choose it for your assistant. Keep geometry lightweight enough for mobile, and include stable mouth and eye controls when possible.

See [Bring Your Own Avatar](/docs/avatars/custom/) for import steps, [Sketchfab Avatars](/docs/avatars/sketchfab/) for filtered model search, and [Visemes Explained](/docs/avatars/visemes-explained/) for lip-sync quality.

See [Voice Agent](/docs/voice/) for how voice sessions deliver avatar cues.
