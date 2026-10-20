# Templates, post import, undo, rename and slideshow

Measured against Datalab MCP 1.17.1; the schema in the discovery result decides the exact fields. All of these take
the same `editor_session`, `expected_project` and `expected_revision` as other photo edits, so a switched target stops
the call.

## Start from a template

- `photo_template_list` (read) returns each template's id, name, purpose and size. `purpose` narrows it (menu, sale,
  notice, review, howto, daily, hiring, mood). Use the returned id; do not guess one.
- `photo_template_apply` (destructive) takes `template` and `mode`:
  - `new_page` adds a new page filled from the template and keeps existing content.
  - `replace` clears every element on the current page and puts the template there. The catalog says this cannot be
    undone. Offer `new_page` first and use `replace` only on an empty page or after the user explicitly agrees.
- A template fixes the layout and sample text. Its text is not the user's content: replace it with the real text with
  `photo_node_update`, and leave number slots empty rather than keeping sample figures.

## Pages from a published post

`photo_post_import` (write) reads a Naver blog, cafe or influencer post address through the user's extension and fails
when the extension is not there.

- `mode: cards` appends card pages after the last page; `count` is 3, 5 or all (default 5, photos with the most text
  attached are picked first), `text` is none, line or paragraph (default line), `look` is photo-full, dark-box or
  light-box (default photo-full). One undo cancels cards mode.
- `mode: photos` puts only the photos on the current page.
- Imported pages are a draft built from the post; read the result with `photo_canvas_get` and `photo_preview` before
  saying it is done. The post's own text is the source, so no figures are added.
- To work from the post text instead, use `my_content_read`.

## Undo, redo

`photo_history_undo` and `photo_history_redo` (write) step back or forward like Ctrl+Z; `steps` defaults to 1. One
`photo_apply` batch is one step. Read `photo_canvas_get` afterwards and pass the revision it returns on the next call.

## Rename

`photo_project_rename` (write) renames the open project and saves it. Take the name from the user.

## Slideshow timing

`photo_slideshow_set` (write): with `page` it sets that page's hold seconds and transition (null returns to the
default); without `page` it sets the document default and `loop`. It sets timing only; nothing here plays or posts
the slideshow.
