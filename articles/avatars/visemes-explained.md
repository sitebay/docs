---
title: Understand avatar viseme tiers
description: Visemes are mouth shapes used to represent speech. Sorti reads the avatar's manifest to determine which
  controls the model provides.
tags:
- sitebay
- avatars
- voice
published: 2026-04-28
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- visemes explained
- sitebay documentation
slug: visemes-explained
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- avatar-contract
modified: 2026-10-07
---

Visemes are mouth shapes used to represent speech. Sorti reads the avatar's manifest to determine which controls the model provides.

| Tier | Meaning |
| --- | --- |
| `oculus` | Oculus viseme set for detailed lip sync |
| `arkit` | ARKit mouth shapes |
| `vrm` | VRM vowel expressions |
| `minimal` | Basic jaw or open-close movement without phoneme shapes |
| `none` | No recognized mouth morphs; speech may drive amplitude or head motion only |

## Check the result

Inspect the manifest for the imported file, then preview speech. A model's title or description cannot establish which controls survived download or conversion.

The tiers describe capability, not a promise that every animation or camera view will look correct. Review the final appearance before using an avatar in a session.

See [Import an avatar]({{< relref "avatars/custom.md" >}}).
