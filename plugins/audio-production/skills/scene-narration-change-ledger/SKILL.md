---
name: scene-narration-change-ledger
description: Reconcile narration take validity and regeneration blockers in a scene ledger. Use when the user requests the impact of script, display or approved voice/settings changes on existing scene takes, alignment and dependent captions.
metadata:
  tier: open
  level: L3
  domain: audio-production
  install: optional
  keywords: [video workflow, scene narration change ledger]
  verified-runtimes: [codex-cli]
---

# Scene Narration Change Ledger

## Applicability

Enter only when reconciling the validity or dependencies of existing narration artifacts is
requested. Related filenames alone do not establish that intent. For ordinary grammar or
copy editing without this dependency task, stop the ledger workflow and perform the text
edit or ask only for the missing paragraph. Do not invent narration inputs or regeneration.

For an eligible ledger, record supplied identities and evidence; leave unavailable artifact
IDs, hashes, measured durations and timing observations unknown or pending rather than
inventing values. This workflow tracks validity and does not synthesize or authorize spending.

## Separate script identity from take identity

1. Record stable scene ID/revision, display/spoken pair IDs, exact spoken-text hash, provider/engine version, approved voice and synthesis settings hash. Record audio hash, measured duration and alignment revision separately; filenames alone do not establish reuse.
2. When a proposed voice choice affects take validity, compare voices on the same script with controlled settings and comparable playback loudness. Keep sample identities, listening criteria, preference approval and verified rights/use constraints. Do not turn a historical voice ID or engine version into a universal default.
3. On a local spoken-text edit, invalidate that scene's take, alignment and dependent cues/duration. A display-only edit may invalidate captions without invalidating speech. Global voice/settings changes invalidate every affected take; a join/trim change invalidates downstream timings even with unchanged words.
4. Retain approved originals and mark the proposed new take pending until generation, duration measurement, listening and alignment are actually completed. Track requested, generated, rejected and approved states without promoting a cached stale take.
5. List changed scenes and estimated generation scope/cost. Paid calls, custom-voice use and any service execution retain their explicit authorization boundaries. Missing MCP/provider access does not prevent constructing the ledger.

## Deliver

Return the change matrix, approved voice/settings record, artifact mapping, invalidated dependents, regeneration/approval blockers and timing handoff. This skill tracks take validity; it does not perform synthesis, declare licenses legally sufficient or invent measured durations.
