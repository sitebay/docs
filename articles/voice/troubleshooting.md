---
title: Troubleshoot voice
description: Check input, model response, and audio output separately to locate a voice problem.
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- voice and agent troubleshooting
- sitebay documentation
published: 2026-10-08
slug: troubleshooting
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- voice-runtime
modified: 2026-10-07
---

Check input, model response, and audio output separately to locate a voice problem.

## No input

Confirm microphone permission and the selected input device. Check that the session is connected and the microphone is not muted. Test a short phrase in a quiet environment.

## Text works but audio does not

Check the output device, volume, and browser playback restrictions. Confirm that speech output is enabled. An agent response and a speech-service response are separate steps.

## The voice changed

A selected clone may have failed validation or become unavailable. Check the selected voice and service access; the session may have used its configured fallback.

## Report a failure

Record the session, time, symptom, and whether text still worked. Share the relevant error without access tokens or private audio. See [provider selection]({{< relref "voice/providers.md" >}}).
