# Limits found by live testing of the writing-window tools

These were measured against the real Naver writing window with connector versions 1.15 to 1.17. When discovery or
`editor_get_capabilities` returns something different, trust the returned text and say so.

## Styles

- A quote takes only font size, font colour, bold, italic, underline and line height as character styles. Font family,
  strikethrough and background colour on a quote come back as `unsupported-in-component` with `unsupportedKeys`; do not
  retry them and do not report them as applied.
- A quote has no alignment setting. Its design decides the alignment, so alignment on a quote is also
  `unsupported-in-component`; change the design with `editor_update_component` instead.
- The editor does not store a value that equals the component default. A write can succeed while the stored node shows
  `null` (for example a line height of 1.8 on plain text). Read it back through `effective.lineHeight` and
  `effective.fontSizeCode`: each carries a value and a source (`stored`, `theme`, `default`, `mixed`). A key missing from
  `effective` means unknown, not default. A rule confirmed by `default` is applied.
- A design or layout change must change the revision; if the revision did not move, the read projection did not show it,
  so read the component again before saying it held.

## Typing, lists, tables

- `editor_type_text` works on plain text components: up to 20 operations and 2,000 characters per call, no newline
  characters (use the `enter` operation), and emoji are refused before anything is written. Ordinary symbols are fine.
  `cell: { row, col }` writes inside one table cell; `erase` removes the given number of characters after the caret.
- A `#word` in the body is read by the editor's tag service as a tag. That is the only hashtag route; the publish step is
  not touched.
- Lists are `decimal`, `bullet` or `none`. The editor stores other values without drawing them, which a read reports as
  list kind `other`. Nesting level is not set or confirmed by any tool.
- A table edit that the editor rejects returns the editor's own error text; report it and read the table again before
  any retry. A merge is the edit most likely to be refused.
- Blank paragraphs are paragraphs inside a text component, and the editor merges adjacent text components. A component id
  from `editor_insert_blank_paragraph` is valid only until the next insertion, so read again. Blank paragraphs inside a
  merged component are removed by component id plus paragraph numbers; the first paragraph is never removed.

## Images and media

- No tool sets image alt text: the editor does not save it. Say so; offer a caption (`editor_set_image_caption`).
- Cropping or retouching a picture belongs to the photo editor window, not to the post tools.
- Replacing a picture is a composition, not one tool: insert the new picture, move it to the old position, copy the old
  alignment and display mode with `editor_set_image_layout`, then delete the old one. The deletion is destructive and
  asks for its own confirmation; read the document before and after.
- `editor_set_cover_image` answers `cover-set` with `changed: true`, `changed: false` when that picture was already the
  cover, or `cover-unconfirmed` with a reason. Each image in a read carries `represent`; check it, and check again after a
  save and reopen.
- A link card is built from what the editor's crawler returns for the address. An address the crawler refuses produces no
  card. Check that the read shows the card's title.
- Audio goes in as a file attachment (`editor_insert_file`); there is no audio component. An external audio address
  gives no player. Video and file boxes appear at once while the upload continues; check `phase`.
- Places come from the editor's domestic place search; confirm the returned name and address are the place meant.

## Undo, limits, windows

- A single undo can leave the document unchanged, and a second one may be needed. After every `editor_undo` read the
  document and compare with the state wanted; repeat only on a mismatch.
- The bridge allows many calls but not unlimited ones; on `rate_limited`, wait and slow down rather than looping.
- A window hidden behind others still works. If a tool says no writing window is open, open one with `editor_open_window`
  and retry once.
