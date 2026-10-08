---
layout: documentation-section
title: "Voice Agent"
description: "How SiteBay voice sessions work on mobile, web, and VS Code."
tags: ["sitebay", "voice", "sorti"]
published: 2026-04-28
---

# Voice Agent

SiteBay voice sessions let you talk to Sorti while it works with your site context. The same session can carry speech, assistant responses, editor context, and avatar animation cues.

## Start A Session

Open Sorti from SiteBay and allow microphone access when prompted. A session connects through LiveKit, then sends the active site and team context so Sorti knows what you are viewing.

If you also use the SiteBay VS Code bridge, the extension can send the file you are viewing and the selected line range into the same session.

## What Happens During A Turn

1. Your speech is transcribed.
2. Sorti reads the active site, editor, and session context.
3. Sorti replies with a message and optional action.
4. The voice service synthesizes audio.
5. Avatar cues are delivered so the assistant face can move with speech.

Custom avatars work best when the GLB includes speech visemes or compatible facial blend shapes. See [Visemes Explained](/docs/avatars/visemes-explained/) before importing a custom avatar.

## Troubleshooting

If voice does not start, check that microphone permission is enabled for the app or browser. If the assistant connects but does not answer, disconnect and start a new session so the room token and site context refresh.

If VS Code context is stale, run the SiteBay bridge reconnect command and switch files once to send a fresh editor snapshot.
