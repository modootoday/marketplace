---
description: "Local subtitle timing review"
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-video-script]
---

# Local subtitle timing review

Please review a small editable copy of this existing datalab video project and propose a local readability change. Preserve the project and all other scenes; do not execute changes, generate voices or export/upload.

Supplied video_timeline_get snapshot: project P1, editor E1, expected_revision 12.
Scene c-scene1 has subtitle "Three steps to label a box.", duration4000ms, durationLocked false, voice present and matching this text.
Scene c-scene2 has subtitle "Write the project name, add the supplied date, and keep the original until you check the copy.", duration1000ms, durationLocked true, voice present and matching this text.
Scene c-scene3 has subtitle "Now find the renamed copy.", duration4000ms, durationLocked false, voice present and matching.
Supplied viewer observation on this copy: the viewer could read c-scene1 and c-scene3, but c-scene2 disappeared before they could finish reading. The owner prefers a faster feel for a short-video channel; no platform duration rule or measured reading-speed target is supplied.

Discovered video_scene_update schema supports scene, optional durationMs, durationLocked, transition and motion. The adapter supports optional editor_session, expected_project and integer expected_revision control fields. Use the supplied E1/P1/12 values as safety guards for the intended target, not as schema-required fields. No export/upload or arbitrary source-video-import tool was returned. A subtitle edit would require reevaluating its existing matching voice; paid narration is not approved.

Return a scene/subtitle timing comparison, one bounded local proposal and a check plan that preserves original evidence. Explain any voice dependency if proposing a text change. Reading available instruction documents is allowed. No applications, network calls, file changes, playback or paid generation; there is no application checkout.
