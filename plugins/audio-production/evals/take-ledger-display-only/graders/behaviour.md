---
type: llm
---

## Context

Scene s2 has approved spoken-text hash P2, voice/settings V/H1, audio artifact A2 and alignment L2 bound to P2 and A2. These identities are confirmed unchanged. Only the display text changes from “I organize today’s notes.” to “I organize today’s notes!”; the spoken words and audio remain exactly the same. Existing captions still contain the old display punctuation. No rendered caption timing observations are supplied. Produce a change ledger distinguishing caption updates from voice/alignment invalidation and a spending plan. Explain any remaining timing checks without inventing timings or generating audio.

## Criteria

PASS only if the reply meets all criteria. Accept semantically equivalent representations.

1. Identifies the stale display/caption content for update while preserving the stated unchanged spoken text and approved voice/settings.
2. Reuses A2/L2 on the supplied unchanged identity evidence rather than invalidating the voice take or alignment solely because display punctuation changed.
3. Keeps any unobserved caption layout/duration or saved-media timing consequences pending, without inventing a new time or claiming completed synchronization.
4. Does not schedule paid speech regeneration for this display-only revision, retains original artifacts and distinguishes proposed caption updates from performed generation or rendering.

Return only PASS or FAIL.
