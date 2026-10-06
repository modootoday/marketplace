---
name: nontechnical-editor-content-model
description: Design and test the editing path of a site that a non-developer must update - name the editors and their three most frequent changes, hold content in data a form or sheet can edit instead of in templates, require login for the editing page, run the real edit end to end, and write the editor's one-line how-to. Use when an owner, staff member or couple must change a menu, guest list, posts or pages without a developer or an AI agent. Not for building the first version of a page from a design or for payment and account systems.
metadata:
  tier: open
  level: L3
  domain: growth
  install: optional
  keywords: [cms, editable content, menu, admin page, non-developer, content model, permissions, owner how-to]
---

# An editing path the owner can actually use

A generated site often looks finished while every price and paragraph sits in markup, and the
"admin" page is a link anyone can open. The owner then asks the agent for each change, or
edits a page that anyone else can edit too. Design the path from the editor outward. This
skill rests on a handful of first-person reports; keep to the editors and changes the user names.

## 1. Name the editors and the frequent changes

Before choosing a structure, write down: who edits (owner, staff, a guest-list keeper), on
what device, and the three most frequent changes (change a price, add a weekly item, add a
post). Ask if the user has not said. Rare changes (a new page layout) may stay with a developer;
say so in the plan.

## 2. Content as data, layout as template

- Every value the editor changes lives in a data file, table or sheet row the editing tool can
  write: items, prices, categories, dates, images, publish status. Templates only render it.
- Check the current pages for values written in the markup; list each and where it moves to.
- Keep the editing surface to the frequent changes: one form or sheet column per field, with
  validation (a price is a number, a date is a date). More fields mean more mistakes.
- Adding an item must reuse the existing layout. A new listing that needs a template edit is
  not editable content.

## 3. Permission

Name who may edit and how they prove it. An editing page without login is a defect: add
authentication on the server side (a hidden URL is not protection), with the smallest set of
accounts, and keep the publish credentials out of the page source. If the data lives in a shared
sheet, restrict the sheet's sharing instead of publishing it openly.

## 4. Run the real edit

Test as the editor, not as the developer. Run every frequent change from section 1 through
all three steps, one table row each (so a "weekly special" gets its own add and its own
unpublish rows, not a mention under "dish"):

1. Change an existing value (a price) and confirm the public page shows it, and that cached
   copies update within the time you state.
2. Add a new item (the special, a dish) and confirm it appears in the right place and list,
   with layout, order and counts intact. State the layout check in the row for each item type,
   the weekly special included.
3. Delete or unpublish that same item and confirm nothing is left behind.

Then test permission with three identities, each both opening the editing page and submitting a
change to it:

4. Signed out: refused on open and on submit.
5. Signed in with no rights at all (an account that is not an editor): refused on open and on
   submit.
6. Signed in with partial rights (a staff role limited to the special): allowed in scope,
   refused for anything out of scope, such as a price change.

Record each step as: action, expected, result. If you cannot run it, mark it as not run and
give the exact steps for the owner.

## 5. Owner how-to

End with a how-to the editor can follow without help: where to sign in, the three frequent
changes in one line each, how to see that it worked, and who to contact when it did not. Keep
it to what fits on one screen.

## 6. Report

The editors and changes, the data moves, the permission change, the test log, open questions,
then the how-to as the end of the reply, followed only by one closing line headed "Not run or
verified" that says which tests have not been run (every row, when the site was not available
to run) and what remains manual or unchecked. Nothing comes after that line.
