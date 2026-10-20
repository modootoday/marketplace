---
name: datalab-video-script
description: Turn a topic or idea into a scene-by-scene short-form script and build it in the datalab.tools video editor - subtitles written for the ear, colour or gallery backgrounds, the user's own clips and music, paid AI narration only after the user confirms the count, and a preview and exported file when asked. Use when the user asks for a shorts or reels script, a scene plan, subtitles, AI narration or an exported video in the datalab.tools video editor, or to put a video file or music file from their computer into it as a scene background or background music. Not for camera shoots (shot lists, angles, lighting), outside video generators, or view and engagement predictions.
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

This editor builds scenes from images, the user's own video and audio files, subtitles, and AI voice. It does not direct a camera shoot: when camera angles or lighting are requested, say in the reply that this editor makes image, subtitle and voice scenes, not live-action shoots. State as fact that it has no AI image generation tool, so no image count or charge applies, even if the user says images were approved. When scenes already exist, explicitly ask whether to preserve and continue the existing project or start a new one. Count voices still missing in the current timeline, separately from voices for any proposed added scenes, before seeking paid-generation approval. Convert every parenthetical repetition count and numeric unit into spoken subtitle text before presenting the scene plan.

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
The user's own video and audio files can be added (see "Clips and music from the user's files") and the finished video can be exported to a file (see "Preview and hand the files over"). No tool uploads to any channel.

## Voices are paid, images are not generated

- The catalog has no AI image generator and `generate_images` does not exist there. Do not call or promise it. Default
  to colour backgrounds with subtitles, then gallery images and the user's own files; if the user asks for AI images,
  say they cannot be made here and offer those. A tool that discovery returns with `paid: true` needs an approved
  count first.
- `video_narration_generate` is the paid tool in this flow. Count the scenes that still need a voice from the narration state in
  `video_timeline_get`, tell the user that number, and get approval before calling. Omitting the target charges every
  scene at once.
- Unit prices are unknown; confirm counts only. Never run one per scene without approval.

## Clips and music from the user's files

A video or audio file on the user's machine is staged first, before any other call that depends on it. The four
`media_stage_*` tools are already in the host's own tool list: do not look for them with `datalab_find_tools` and do not
run them through `datalab_call`. The steps: `media_stage_begin` (declared bytes, six identifiers) returns an upload
path and token; the bytes are sent outside MCP by a POST to that path with the token as a bearer header; then
`media_stage_commit` with the file's `sha256` and byte count seals it and returns the `handle`. Limits and details: the
workbench skill's references/media-staging.md. Then `video_source_add` with the `handle`:
`as: clip` makes it the scene background (the scene defaults to the active one; at most 10 minutes from the start, or
the `range` given in seconds; `quality` defaults to balanced), and `as: bgm` makes it the background music
(`start_ms` places a new track when one exists). It returns a job: follow it with `video_job_status` and read the
timeline before saying it was added. One undo reverts it.

## Batch edits

`video_apply` runs up to 50 ops in order, all or nothing, with one undo. The allowed ops are `video_scene_add`,
`video_subtitle_set`, `video_scene_image_set`, `video_image_add_from_gallery`, `video_scene_update`,
`video_background_set`, `video_scene_reorder`, `video_text_add`, `video_image_add`, `video_node_update`,
`video_node_arrange`, `video_node_remove`, `video_scene_remove`, `video_scene_split`, `video_bgm_update`,
`video_bgm_split`, `video_bgm_remove`, `video_pip_add`, `video_pip_update`, `video_pip_remove`, `video_scene_camera`,
`video_marker_add`, `video_marker_remove` and `video_lane_set`. A later op refers to a scene or element an earlier
op created as `$N`, the position of that op. Use each op's discovered schema for its arguments, and put
`editor_session`, `expected_project` and `expected_revision` on `video_apply` itself. Removal ops are deletes and
keep their own confirmation. `video_narration_generate` and `video_source_add` are not batch ops. Colour grading, a
LUT and `video_auto_edit` stages: the workbench skill's references/finishing.md.

## Preview and hand the files over

- `video_preview` renders one frame as a small JPEG: `scene` for that scene's middle frame, or `at_ms`. It shows what
  was drawn; it does not prove playback, audio sync or reading comfort.
- Export only when the user wants a file. `video_export` takes `format` (mp4 or webm), `scale` (0.5, 1 or 2),
  `quality` (medium, high or very-high) and an optional `start_sec` and `end_sec`. It returns a job at once and can
  take minutes.
- `video_job_status` shows progress and, when finished, the file name, size and sha256.
- `gallery_export_save` with the `job` saves the file after asking the user every time; through MCP it lands in the
  connector's export folder and returns the path. If the browser could not encode the sound, the job gives the video
  and the audio as two files; `artifact` picks one by position and leaving it out saves all.

Finding the tools, a started job, a finished job and a saved file are four different facts; say which one is true.
Nothing here uploads to a channel or sets a thumbnail.

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
which existing/new scenes still need it, and that voices bill per scene. Ask whether to preserve and
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
- `video_narration_generate`: paid; only after an approved scene count.
- `media_stage_begin`, `media_stage_commit`, `video_source_add`: bring in the user's own clip or music.
- `video_apply`: a batch of editing ops, all or nothing, with `$N` references.
- `video_preview`: render one frame to check.
- `video_export`, `video_job_status`, `gallery_export_save`: hand the video over as a file, one step at a time.
- `my_content_read`, `my_content_info`: read a published post to adapt.

Only when discovery cannot find the required tools, deliver the scene-by-scene plan as text, say which calls would run, and keep every rule above.
