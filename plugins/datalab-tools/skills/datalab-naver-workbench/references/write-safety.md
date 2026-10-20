# Writing into the editors safely

How a write to the post editor is made repeatable, pinned to its target and checkable after a lost reply. Measured
against Datalab MCP 1.17.1; the tool list returned by discovery stays the authority on names and schemas.

## One id per intended change

Every post-editor write whose schema declares `operationId` (24 tools in 1.17.1, for example `editor_insert_draft`,
`editor_replace`, `editor_set_title`, `editor_insert_image`, `editor_apply_styles`, `editor_type_text`,
`editor_set_list`, `editor_edit_table`) takes an id you choose. Check the schema in the discovery result; do not
assume a write has one.

- Make a new `operationId` for each distinct change (64 characters at most). Keep it for every resend of that change.
- Same id, same arguments, already applied: the first result comes back with `replayed: true` and nothing is written
  twice.
- Same id, different arguments: refused as `operation_conflict`. The change is not applied. Use a new id for new work.
- Same id while the first outcome is still unknown: refused as `operation_in_progress`. Check status before anything
  else.

## Pin the target

Pass `target` with the `editorSession` that `editor_read_document` returned and, when the document must not have
moved, `expectedRevision`. A different writing window or a changed document stops the call as a stale target and
writes nothing. After that stop, read the document again and decide from what it shows; do not send the same call
again unchanged.

Photo and video editors pin the same way with `editor_session`, `expected_project` and `expected_revision` from
`photo_project_get`, `photo_project_new` or `photo_project_open` (and the video equivalents). `photo_apply` and
`video_apply` run their ops in order, all or nothing, and undo with one step.

## After a timeout or a dropped reply

1. Do not resend yet.
2. Call `editor_operation_status` with the same `operationId`.
   - `succeeded`: it was applied. Do not resend.
   - `not_applied`: it was not applied. Resending with the same id is safe.
   - `in_progress`: still running. Check again before doing anything else.
   - `unverified`: cannot be judged. Read the document with `editor_read_document` and report what is there.
   - `unknown`: no record of that id.
3. Report only what the status or the document read shows. A reply that never arrived is not a failure and not a
   success.

## Saving is its own step

`editor_save_draft` writes to the Naver temporary save and answers only after Naver confirmed it. A result of kind
`save-unconfirmed` means the save was not confirmed: never say it was saved, retry only if `retryable` is true.
Nothing here publishes. A ticket that is `awaiting_confirm` is followed with `datalab_confirm_status` and never sent
again.
