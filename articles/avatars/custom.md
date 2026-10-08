---
title: "Bring Your Own Avatar"
description: "Upload a custom GLB avatar and understand whether it can lip sync."
tags: ["sitebay", "avatars", "voice"]
published: 2026-04-28
---

# Bring Your Own Avatar

Avatar Studio accepts GLB avatars. A good assistant avatar should be lightweight, include stable materials, and include mouth controls for lip sync.

## Import A GLB

Open Avatar Studio and choose the custom avatar import flow. You can upload a local GLB or import from a supported source such as Sketchfab.

After import, Avatar Studio scans the file and adds a viseme badge to the avatar card. The badge explains how well the avatar can match speech.

## Lip-Sync Badges

- **Excellent** means the avatar includes standard viseme morph targets.
- **Good** means the avatar includes ARKit-style mouth blend shapes.
- **Acceptable** means the avatar has a jaw or mouth-open control, but less detailed lip sync.
- **None** means the avatar has no recognizable mouth controls. Avatar Studio blocks these by default because speech would look poor.

## Tips For Better Results

Use GLB files built for realtime characters rather than high-poly renders. Prefer avatars that mention visemes, ARKit blend shapes, facial blend shapes, or lip sync in the model description.

If an import is blocked, choose a model with a stronger viseme badge or use the Sketchfab browser's filtered results.

See [Sketchfab Avatars](/docs/avatars/sketchfab/) for finding compatible models and [Visemes Explained](/docs/avatars/visemes-explained/) for what the badges mean.
