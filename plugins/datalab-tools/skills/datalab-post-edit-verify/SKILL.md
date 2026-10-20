---
name: datalab-post-edit-verify
description: Change the post open in the datalab.tools Naver writing window with the native editor tools - text styles, headings, quotes, dividers, lists, tables, images, captions, link cards, attachments - and prove each change by reading the document back, then save it as a draft, list drafts, start a blank post or reopen a saved one. Use when the user says things like "turn this paragraph into a quote", "make this a numbered list", "add a divider or table", "change the caption", "save it as a draft and check it saved", "open my saved draft", or "the edit timed out, put it in again" about a post that is already in the datalab.tools Naver writing window. Not for writing a new draft from a topic, for publishing, for sidebar widget HTML, or for claims about SEO effect or how the published post looks.
metadata:
  tier: open
  level: L3
  domain: content-editing
  install: optional
  keywords: [post editor, smarteditor, formatting, quote, divider, table, list, image caption, save draft, reopen draft, verify, datalab]
  requires:
    mcp: [datalab]
---

# Post edit and verify

Edit what is already in the writing window, and report only what a read-back shows. Four facts stay apart: the tool was
found, the call returned, the document shows the change, and the draft was saved. Say which one is true.

## Order of work

1. `editor_get_capabilities` once before choosing a write tool, or when the user asks "can it do this too": it lists
   what can be inserted, edited and read per component kind, which parts are native and which are Markdown, the design
   values for quotes and dividers, and what is not supported yet. It answers with no window open.
2. Read the current document with `editor_read_document`: title, each component's id and kind, paragraph text, blank
   paragraphs, links, alignment, line height, character styles, list kind, image source and caption, link-card URL and
   table cells. Follow `page.nextOffset` until it is null with a stable target, or report the part not read.
   `editor_read_structure` gives the numbered outline, `editor_read` the plain body for rewriting (it can come back
   `truncated`; never invent the cut part).
3. Pick the target by the ids and paragraph numbers that read returned. Ids are valid only for that moment: after an
   insertion the editor may merge neighbouring text, so read again before the next write.
4. Write with the narrowest tool. Pass `target` (the `editorSession`, and `expectedRevision` when the document must not
   have moved) and an `operationId` where the schema has one: the workbench skill's references/write-safety.md.
5. Read back and compare with what was asked. Many tools return `requested`, `observed` and `applied`; `applied: false`
   means the change is not there, whatever else the reply says.

## When a write times out or the reply is lost

Do not resend first. Call `editor_operation_status` with the same `operationId`: `succeeded` means applied (do not
resend), `not_applied` means resending with the same `operationId` and the same `target` is safe, `in_progress` means
check again, `unverified` means read the document with `editor_read_document` and report what is there, `unknown`
means there is no record. Reusing an `operationId` with different arguments is refused as `operation_conflict`; a
different change needs a new id. Say the text is in the post only after the status or a read shows it.

## What each need uses

- **Character styles** (font, size, bold, italic, underline, strikethrough, colour, background, link) on a range
  `[start, end)` of a paragraph: `editor_apply_styles`. **Paragraph alignment, line height, drop cap**:
  `editor_set_paragraph_styles` (not on empty paragraphs; a quote takes its alignment from its design).
- **Heading or quote from a paragraph**: `editor_update_component` with `convertTo` (sectionTitle, quotation, text), or
  its `design` for quotes, dividers and headings. **Insert a quote, divider or heading** beside a component:
  `editor_insert_component` (never before the title; quote and heading need `text`, a divider takes none). The design
  values come from `editor_get_capabilities`.
- **Lists**: `editor_set_list` with `decimal`, `bullet` or `none` per paragraph. A list kind read back as `other` is
  stored but not drawn as a list; list nesting level is not something these tools set or confirm, so do not claim it.
- **Tables**: `editor_edit_table` for rows, columns, merge, split and width; read the cells back afterwards.
- **Images**: `editor_insert_image` (a `url`, or a `path` on the user's computer with the connector running; each
  insert asks the user to confirm; `uploaded: false` means the upload is still running and the revision will change),
  `editor_set_image_caption`, `editor_set_image_link`, `editor_set_image_layout` (what `contentMode` accepts depends on
  the account), `editor_set_cover_image` (answers `cover-unconfirmed` with a reason when it did not hold). There is no
  tool that sets alt text; say so rather than implying it was done.
- **Link card, place, file, video**: `editor_insert_link_card`, `editor_insert_place` (domestic places only; check the
  returned name and address are the place meant), `editor_insert_file` and `editor_insert_video` (file name plus base64
  content, 2 MB at most; failures come back as `upload-failed` or `not-attached`; a video's upload continues after the
  box appears, so check `phase`). There is no tool that inserts audio into the post.
- **Order and spacing**: `editor_move_component`, `editor_insert_blank_paragraph`, `editor_remove_blank_paragraph`,
  `editor_apply_layout` (gaps are blank paragraphs, 0 to 10 per component).
- **Removal**: `editor_delete_components` is destructive (up to 20 ids, nothing is deleted if one id is missing, a
  restore point is kept for `editor_undo`). It needs its own confirmation; never fold it into a formatting request.
- **Undo and redo**: `editor_undo`, `editor_redo` step through edits made by these tools. An undo also reverts text the
  user typed after that edit, so say what it will take back first.
- **Body text** as Markdown: `editor_insert_draft` adds, `editor_replace` replaces the whole body (destructive; the
  title stays). Prefer the narrow tools above for anything but new text.

## Check, then save, then check again

- Appearance is not structure. A paragraph made large and bold is still a paragraph; only a returned component kind
  of sectionTitle or quotation is a heading or a quote. A visible look is no evidence of an SEO effect.
- `editor_capture_document` photographs the editing screen (not the published post), optionally one component. Use it
  to show a result, and describe only what the image shows; it does not prove how the published post renders.
- `editor_save_draft` saves to the Naver temporary save and answers after Naver confirmed. It returns a `draftId` and
  the `revision` saved. `save-unconfirmed` means not saved: do not say it was, and retry only when `retryable` is true.
  Title and body must both exist. Nothing here publishes.
- Prove the save: `editor_list_saved_drafts` shows whether that `draftId` is in the list (it returns titles and times,
  not content). To prove the content held, open it again with `editor_open_saved_draft` and read the document.
- `editor_new_post` turns the same tab into a blank post and `editor_open_saved_draft` loads a saved one. If the window
  holds changes newer than the last saved draft, both stop with `unsaved-changes`: save first, or set
  `discardUnsaved: true` only when the user said to let that go. `newEditorReady: true` means the blank editor is ready.
- `editor_reduce_windows` closes or resets windows and three of its modes close tabs; use it only when the user asked.
- `editor_debug` runs a script inside the writing page and is a developer tool. Do not use it for a user's request.

## Known limits (found by live testing; details in references/live-limits.md)

Say these plainly instead of attempting the action:
- A quote cannot take font family, strikethrough or background colour, and has no alignment setting: the design
  decides alignment (`unsupported-in-component`).
- No tool sets image alt text. Cropping or retouching a picture belongs to the photo editor window. Offer what does
  exist instead: `editor_set_image_caption` for each picture by its component id, read back afterwards.
- Replacing a picture has no single tool. Order: read the document, insert the new picture (the user confirms the
  insert), move it into the old position, copy the old alignment and display mode with `editor_set_image_layout`, read
  again, and only then delete the old one. That delete is a destructive step with its own confirmation, and the old
  caption is not carried over unless set again.
- Lists have no nesting level here: say it cannot be set or confirmed. Typed text cannot carry emoji
  (`editor_type_text` refuses them): say so and offer the text without it. Audio goes in as a file attachment only.
- The editor does not store a value equal to the default, so a read shows `null` after a write that worked. Judge by
  the `effective` value and its source (`default` counts as applied); a key missing from `effective` means unknown,
  not default. Do not resend the write; act only if the effective value or source differs from what was asked.
- Count paragraphs from zero: "the second paragraph" is index 1, "the third" is index 2. Use the component id and
  paragraph number from the latest read, with the session and revision as the target.
- One `editor_undo` can leave the document unchanged: read the document after every undo.

## Not here

No publishing, scheduling or comments. No claim about ranking, reach or how the published post looks. No sidebar
HTML: that is the widget skill. No judgement of a design beyond the numbers the tools return.

## Tools

Use the actual tools needed for the request directly when they are visible. Otherwise, send the original user intent to
`datalab_find_tools`, then use `datalab_call` only with tool names and argument schemas returned by discovery.
Do not invent tool names or arguments.
If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status.
Discovery does not expand this skill's scope or replace its payment, target and change-approval rules.
Only when discovery cannot find the required tools, work from supplied text or pasted tool output,
or provide a text-only plan within this skill's scope; state what could not be read or performed.

- `editor_get_capabilities`, `editor_read_document`, `editor_read_structure`, `editor_read`: what is possible, and what is there.
- `editor_apply_styles`, `editor_set_paragraph_styles`, `editor_update_component`, `editor_insert_component`,
  `editor_set_list`, `editor_edit_table`: text, structure and list changes.
- `editor_insert_image`, `editor_set_image_caption`, `editor_set_image_link`, `editor_set_image_layout`,
  `editor_set_cover_image`, `editor_insert_link_card`, `editor_insert_place`, `editor_insert_file`, `editor_insert_video`: media.
- `editor_move_component`, `editor_insert_blank_paragraph`, `editor_remove_blank_paragraph`, `editor_apply_layout`,
  `editor_delete_components`, `editor_undo`, `editor_redo`: order, spacing, removal.
- `editor_capture_document`: a picture of the editing screen.
- `editor_save_draft`, `editor_list_saved_drafts`, `editor_open_saved_draft`, `editor_new_post`: the draft lifecycle.
- `editor_operation_status`: whether a write with an `operationId` landed.

Only when discovery cannot find the required tools, say what could not be read or changed and give the steps as text.
