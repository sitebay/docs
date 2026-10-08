---
title: Choose an agent and voice provider
description: The agent model and the speech service perform different jobs. Changing one does not necessarily change
  the other.
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- voice and agent providers
- sitebay documentation
published: 2026-10-08
slug: providers
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- voice-runtime
modified: 2026-10-07
---

The agent model and the speech service perform different jobs. Changing one does not necessarily change the other.

## Agent model

Choose from the models available to the current session and credentials. The model catalog records context and output limits, tool-calling and image capabilities, and pricing metadata when available. A missing or zero catalog price is not a promise that a provider is free.

Use a model that supports the tools and input types your task needs. Provider authentication failures require valid credentials; changing a prompt does not repair access.

## Speech output

Speech uses the configured text-to-speech service and selected voice. A custom voice must be available to that service. If validation fails, the session can use its configured fallback voice.

## Verify a change

Start with a short text request and a short spoken reply. Check model selection, audio output, and the intended tools separately.

See [Voice troubleshooting]({{< relref "voice/troubleshooting.md" >}}).
