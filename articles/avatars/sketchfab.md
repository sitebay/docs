---
title: "Sketchfab Avatars"
description: "Find and import lip-sync-ready avatars from Sketchfab."
tags: ["sitebay", "avatars", "sketchfab"]
published: 2026-04-28
---

# Sketchfab Avatars

Avatar Studio can search downloadable Sketchfab models and scan each result before import. The default search favors characters that mention visemes, blend shapes, or ARKit support.

## Choose A Model

Search for a character, then wait for the scan badge on each card. The import button becomes useful once the scan finishes.

Models without recognizable mouth controls are hidden by default. Turn on **Show models without visemes** only when you want to import a model that will use basic audio-driven mouth movement.

## What The Scan Checks

The scanner looks for common mouth morph targets, ARKit-style face blend shapes, jaw controls, and basic model metadata. It stores the scan result so repeated searches do not need to inspect the same model again.

## If Import Fails

Try a more specific search such as "visemes", "blendshapes", or "arkit". Some Sketchfab downloads are unavailable, too large, or packaged in a way the browser cannot inspect.

For the best voice avatar, pick a model with an **Excellent** or **Good** badge.
