# Comment and neighbour actions

Measured against Datalab MCP 1.17.1; the schema in the discovery result decides the exact fields. All of these act on
someone else's blog from the user's own account.

## Comment on a post

1. `pumasi_comment_open` with the post address (`m.blog.naver.com/{blogId}/{postNo}`). The comment box is not on the
   page until this button is pressed. It opens the box and leaves nothing behind. To read the post first, use
   `web_read`.
2. Show the user the exact comment text. The tool inserts it unchanged; it does not polish.
3. `pumasi_comment_draft` with `url`, `text`, `submit`:
   - Always `submit: false`: it fills the box and stops. The user reads it and presses the button themselves.
   - `submit: true` would post a real comment; this skill never sets it, even on request (the tool allows it only on
     the user's explicit request, and the last click stays with the user here).
   - `secret: true` marks it as a secret comment (visible to the author and the user). If the post does not accept
     secret comments, the tool refuses and does not post publicly.
4. Report which of these happened: box opened, text inserted, comment posted. A call that returned is not proof the
   comment is visible; say what the tool reported.

## Mutual-neighbour request

1. `pumasi_neighbor_state` first: groups listed as name:ok or name:full, `allFull`, `alreadyBuddy`,
   `requestPending`, `spamFiltered`, `naverRefused` with `naverMessage`, and `defaultGroup`. If already a neighbour
   or a request is pending, do not send another. If every group is full or Naver refuses, say so with Naver's
   message.
2. `pumasi_neighbor_open` with a post or blog address. `mode` says which way the window is set (default one-way); it
   does not send anything. Whether the other blog accepts mutual neighbours is answered by the state tool.
3. `pumasi_neighbor_draft` with `url`, `text` (400 characters at most), `submit`, optional `group`:
   - Without `group` Naver uses the first group; a full group is refused, not filled.
   - Always `submit: false`: it fills and stops. `submit: true` would send a real request; this skill never sets it.
   - This tool is what switches the window to mutual neighbour.

## Cancel a request already sent

`pumasi_neighbor_open` first, so the in-progress confirmation window is showing; then `pumasi_neighbor_cancel` with
the blog's post address. Pressing that window's confirm button is the cancellation. With nothing pending the tool
refuses with no-pending-request. Afterwards call `pumasi_neighbor_state` again to see whether the request is really
gone; the cancel call alone does not prove it.

## What stays with the user

Pressing like (no tool does it), any text the user did not approve, and any send the user did not ask for. Do not run
these in a loop over many blogs on the user's behalf.
