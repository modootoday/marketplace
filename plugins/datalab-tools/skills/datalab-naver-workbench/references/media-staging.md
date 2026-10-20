# Bringing image, video, audio and LUT files into the editors

Files from the user's machine reach the editors in two steps: stage the bytes with the connector, then pass the
sealed handle to an editor tool. Measured against Datalab MCP 1.17.1.

## The four staging tools are direct tools

`media_stage_begin`, `media_stage_commit`, `media_stage_status` and `media_stage_cancel` appear in the host's own
tool list next to the `datalab_*` tools. They are answered by the connector itself, not by the browser, and are not
run through `datalab_call` and are not found by `datalab_find_tools`. They work with no browser attached. When the
host does not list them, say that staging is unavailable here; do not invent a substitute.

Every staging call carries the same six identifiers: `blogId`, `runId`, `slot`, `actionId`, `fence` (an integer;
the larger number is the newer attempt) and `jobId` (one per file). Never send a file path.

## Path

1. `media_stage_begin` with `declaredBytes` (and `declaredMime`). It returns where to send the bytes. The same `jobId`
   again gives the same slot. Limits: video and audio 500 MB, image 10 MB, LUT (`.cube`) 2 MB.
2. Send the bytes outside MCP: an HTTP POST to the returned `uploadPath` on the same address as the MCP endpoint,
   with the header `Authorization: Bearer <uploadToken>` and the file as the streamed body. This needs a host that can
   make that request; if it cannot, stop and say so.
3. `media_stage_commit` with the file's `sha256` and `bytes`. It checks them against what arrived and seals only on a
   match. The same bytes again return the same `handle`. The result also names the detected `kind`: image, video,
   audio, cube or other.
4. `media_stage_status` asks what state the file is in. `STATE_UNKNOWN` means the state cannot be confirmed, which is
   not a failure and not proof the file is absent. `media_stage_cancel` succeeds only when every incoming stream is
   confirmed closed, and a sealed file cannot be cancelled.

## What takes a handle

- `gallery_image_add` with `handle` instead of `path`, for a host that cannot give a file path. Then
  `photo_image_add_from_gallery` puts it on the canvas. Each gallery add asks the user to confirm.
- `video_source_add` with `handle` and `as`: `clip` makes it the scene background (up to 10 minutes are kept) and
  `bgm` makes it the background music. It starts a job; follow it with `video_job_status` and verify in the editor.
- A staged LUT (`kind: cube`) goes into the `grade.lut` field as `{ handle, strength, name }` (strength 0 to 1) on
  `photo_node_update` (inside `patch`), `video_scene_update` or `video_pip_update`. `lut: null` removes only the LUT,
  leaving `lut` out keeps the one already there, and `grade: null` clears the whole grade. Read the element back
  before saying the LUT is on; see references/finishing.md.

Staging a file is not editing it: until an editor tool consumes the handle and the result is read back, nothing has
changed in the document.
