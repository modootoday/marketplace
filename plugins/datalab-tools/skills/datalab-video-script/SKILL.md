---
name: datalab-video-script
description: Turn a topic or idea into a scene-by-scene short-form script and build it in the datalab.tools video editor - subtitles written for the ear, colour or gallery backgrounds, and paid AI images and narration only after the user confirms the count. Use when the user asks for a shorts or reels script, a scene plan, subtitles or AI narration in the datalab.tools video editor. Not for camera shoots (shot lists, angles, lighting), outside video generators, or view and engagement predictions.
metadata:
  tier: open
  level: L3
  domain: video-production
  install: optional
  keywords: [short form video, reels script, shorts, scene plan, subtitles, ai narration, video editor, datalab]
  requires:
    mcp: [datalab]
  verified-runtimes: [codex-cli]
---

# Video script planning and build

This editor builds scenes from images, subtitles, and AI voice. Explain that distinction when camera angles or lighting are requested. When scenes already exist, explicitly ask whether to preserve and continue the existing project or start a new one. Count voices still missing in the current timeline, separately from voices for any proposed added scenes, before seeking paid-generation approval. Convert every parenthetical repetition count and numeric unit into spoken subtitle text before presenting the scene plan.

Plan a topic or script idea as scenes and build each scene on the video editor timeline. The finished timeline is the
deliverable, plus a copyable script summary.

## Choose the project first

- New work: `video_project_new` (may open the manager tab). Saved work: `video_project_list`, then
  `video_project_open`. Both change the current document; confirm with the user first.
- Read the state with `video_project_get` and `video_timeline_get` (project ref, revision, existing scenes and their
  narration state). If scenes already exist, ask whether to continue here or start a new project. Do not overwrite.
- Pass the same editor session, project ref and expected revision on later changes so a switched target stops the call.

## Source

Topic or script from the user is the source. A published post: `my_content_read` (find it first with
`my_content_info` if only the title is known). Neither: ask and stop. Invent nothing.

## Plan briefly

Format (vertical 9:16 short form or horizontal 16:9 by default), scene count (propose 5 to 8 from the script length if
not given), voice (calm explanatory by default). Scene roles HOOK, BODY, CTA and subtitle limits (HOOK about 20
characters, BODY 40, CTA 20): references/scene-structure.md.

## Build

- `video_canvas_resize` sets the ratio before the first scene. On a timeline that already has several scenes, do not
  call it casually: it applies to every scene at once and breaks existing layouts.
- Per scene: `video_scene_add` with the subtitle (narration text). Write it for the ear
  (references/writing-for-the-ear.md): one clause per sentence, commas for breath, ranges and units spelled as
  spoken ("3 to 5", "10 kilometres"), no "see below", no bracketed emotion tags (they would be read aloud).
- Background: `video_background_set` colour (default, free); or reuse images already in this video
  (`video_sources_list`, `video_scene_image_set`); gallery photos via `photo_gallery_list` and
  `video_image_add_from_gallery`.
- On-screen emphasis text (title, CTA) with `video_text_add`, separate from subtitles. Transitions and motion with
  `video_scene_update`. Reorder with `video_scene_reorder`. Fix subtitles with `video_subtitle_set`; a scene that
  already has a voice needs its voice regenerated after.

This skill never deletes scenes or elements; a delete needs its own destructive confirmation.

## Review readability and timing on an editable copy

For a supplied timing problem, compare the actual scene subtitle, duration and narration state with the user's observed reading difficulty and requested pacing.
Keep a channel preference separate from an observed problem; do not invent a universal platform duration or reading-speed threshold.
Propose a local change on a small editable copy and retain unaffected scenes, the original script and the approved project target.
video_scene_update supports the actual returned scene ref, durationMs and durationLocked fields; a locked duration will not automatically extend for newly generated narration.
Use only the discovered schema, including actual target/revision fields, and stop for fresh state if they no longer match.
A changed subtitle may leave its existing voice stale; identify that dependency and obtain separate paid-generation approval before regeneration.
After an authorized change, distinguish the operation receipt from a supplied or actual playback/readability check; neither proves channel performance.
No arbitrary source-video import, exported upload file or cross-channel upload endpoint is established here.

## AI images and voices are paid

- `generate_images` bills per image. Default to colour backgrounds with subtitles; if the user wants AI images, ask how
  many before calling.
- `video_narration_generate` bills too. Count the scenes that still need a voice from the narration state in
  `video_timeline_get`, tell the user that number, and get approval before calling. Omitting the target charges every
  scene at once.
- Unit prices are unknown; confirm counts only. Never run one per scene without approval.

## Not here

No live-action shooting: shot lists, camera angles, lighting gear and locations have no tool; say so when asked. No
cinematography direction in the scene plan, including repackaging a camera-angle or lighting request as an AI-image
prompt. Offer subject descriptions, gallery reuse, or plain backgrounds instead; those match this workflow's
image/subtitle/voice composition.

No
outside video generators or their prompt syntax. One configured AI voice; no voice actor or timbre selection. No
predictions or grades for views, completion, engagement, subscribers or click-through. No upload or thumbnail tool;
title and description text may be suggested for the user to post.

## Output

If a choice or billed-count approval is still pending, the final reply must contain the actual questions, even if
they were mentioned in a progress message. State the existing scene count, which scenes already have narration,
which existing/new scenes still need it, and that images and voices bill per item. Ask whether to preserve and
continue this project or start a new one, and how many paid items to generate. A statement that approval was asked
for earlier leaves the reviewable plan incomplete. Do not repeat an approval already supplied by the user.

The filled timeline; a copyable per-scene subtitle summary as placed; optional title and description suggestions with
no predicted numbers.

## Tools

Use the actual tools needed for the request directly when they are visible. Otherwise, send the original user intent to
`datalab_find_tools`, then use `datalab_call` only with tool names and argument schemas returned by discovery.
Do not invent tool names or arguments.
If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status.
Discovery does not expand this skill's scope or replace its payment, target and change-approval rules.
Only when discovery cannot find the required tools, work from supplied text or pasted tool output,
or provide a text-only plan within this skill's scope; state what could not be read or performed.

- `video_project_get`, `video_timeline_get`: read the project, revision, scenes and narration state first.
- `video_project_new`, `video_project_list`, `video_project_open`: start or open a project; confirm first.
- `video_canvas_resize`: set the ratio before the first scene only.
- `video_scene_add`: add a scene with its subtitle.
- `video_subtitle_set`: change a subtitle; regenerate that scene's voice after.
- `video_scene_update`, `video_scene_reorder`: transitions, motion, order.
- `video_text_add`: on-screen text separate from subtitles.
- `video_background_set`: colour background, free default.
- `video_sources_list`, `video_scene_image_set`: reuse images already in this video.
- `photo_gallery_list`, `video_image_add_from_gallery`: bring in gallery photos.
- `generate_images`: paid; only after an approved count.
- `video_narration_generate`: paid; only after an approved scene count.
- `my_content_read`, `my_content_info`: read a published post to adapt.

Only when discovery cannot find the required tools, deliver the scene-by-scene plan as text, say which calls would run, and keep every rule above.
