# Applying a whole manifest to the post editor

Measured against Datalab MCP 1.17.1; the schema in the discovery result decides the step format.

`editor_apply_manifest` (destructive) applies a title, body and images in one call, running `steps` in array order.

## When to use it

- A long run nobody is watching, where the content is already decided: use the manifest.
- Anything that needs a look at each result before the next step (a layout choice, a rewrite the user wants to see, a
  doubtful image): use the single editor tools one at a time, as in write-safety.md.
- It still changes the user's post, so state the full content and order, and get the user's confirmation, before the
  call.

## Resuming

`operationId` is required and names the whole job. After a cut-off or a lost reply, call again with the same
`operationId`: steps already applied are skipped and the run continues from where it stopped, so the same paragraph or
image is not inserted twice. Use a new id for a different job. Do not send changed steps under an old id.

## What it does not include

It does not open or tidy the writing window. Prepare it first with `editor_open_window`. It does not replace
verification: afterwards read the document with `editor_read_document` and report what is actually there, not just that
the call returned.
