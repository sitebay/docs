---
title: "Voice And Agent Providers"
description: "How Sorti chooses AI providers for voice and agent sessions."
---

Sorti can route agent work through several provider families. SiteBay selects a
provider based on the session, available credentials, and the model needed for
the task.

## Supported Agent Providers

- Anthropic for long-context planning and reliable tool use.
- Gemini CLI for Google-authenticated workspaces and fast multimodal turns.
- Antigravity for Google-backed coding models.
- Codex for OpenAI coding workflows.

Each provider must pass the same offline contract before it is exposed. That
contract checks normal chat, multi-turn history, tool calls, tool results, image
attachments, and invalid output handling.

## Switching Providers

Provider selection is controlled by the SiteBay session and model settings. If
a provider is unavailable, Sorti falls back only to a model that exists in the
installed provider catalog.

## If Gemini Fails To Authenticate

Reconnect the SiteBay account that grants Google access, then start a fresh
Sorti session. Expired Gemini credentials are handled as an authentication
problem, not a generic agent failure.

## What Changes Between Providers

- Latency varies by provider and model.
- Multimodal support depends on the provider. Gemini and Anthropic support image
  input in the active Sorti paths.
- Cost varies by model. SiteBay tracks usage at the session level.
- Tool calling should behave the same across supported providers.
