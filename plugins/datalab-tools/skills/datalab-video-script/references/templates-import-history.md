# Video templates, post import, undo and rename

Measured against Datalab MCP 1.17.1; the schema in the discovery result decides the exact fields. Each call takes
`editor_session`, `expected_project` and `expected_revision` from `video_project_get`, so a switched target stops it.

## Template

- `video_template_list` (read): id, name, purpose, scene count, length and number of photo or video slots.
  `purpose` narrows it (menu, sale, notice, review, howto, daily, hiring, mood). Use a returned id.
- `video_template_apply` (destructive): `template` plus `fill`. It replaces all scenes of the current video. It also
  applies the template's style pack: transitions, motion and colour. `fill: fill` places the current video's photos
  and clips into the template's slots one after another; `fill: empty` leaves the slots empty.
- When the timeline already has scenes the user wrote, ask first: the scenes and any subtitles go. The catalog says one
  undo cancels the application. Read `video_timeline_get` afterwards.
- Narration is not mentioned for templates. Check the narration state in `video_timeline_get` and, if scenes need
  voices, count them and get the paid-count approval before `video_narration_generate`, as in the main skill.

## Scenes from a published post

`video_post_import` (write) reads a Naver blog, cafe or influencer post address through the user's extension and
makes scenes from its photos and paragraphs; it fails without the extension. `targetSec` keeps only the important
scenes to fit that length; without it every scene is kept. One undo cancels it. The catalog does not say whether it
appends to or replaces existing scenes: read the timeline before and after and report what happened. Imported
paragraphs are the post's text, not spoken-form subtitles; apply the writing-for-the-ear rules afterwards and note
that a changed subtitle leaves a voice stale.

## Undo, redo, rename

`video_history_undo` and `video_history_redo` (write) work like Ctrl+Z; `steps` defaults to 1, and one `video_apply`
batch is one step. `video_project_rename` (write) renames the open project and saves it. Take the name from the user.
