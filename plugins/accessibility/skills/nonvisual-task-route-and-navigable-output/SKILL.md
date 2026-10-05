---
name: nonvisual-task-route-and-navigable-output
description: Write task routes for screen reader and keyboard users and shape long answers for heading navigation - name controls by label with real key commands for the stated reader and platform, mark each key command or control name as confirmed or unverified, end every step with a non-visual completion signal, and give long replies stable numbered headings with a one-line summary first. Use when a screen reader user asks how to do a task in an app, site or device, or wants a long answer they can jump through by headings and re-read. Not for reading images or documents aloud, for auditing a site's accessibility, or for writing alt text.
metadata:
  tier: open
  level: L3
  domain: accessibility
  install: optional
  keywords: [screen reader, NVDA, keyboard navigation, task steps, headings, non-visual, assistive]
---

# Non-visual task routes and navigable output

Instructions written for a sighted user say click, left, red or the icon. A screen reader user
needs the control name, the key to reach it and something audible that shows it worked. For
reading images and documents use `accessible-visual-reading`; this skill writes routes and
shapes replies.

## Task route

1. Take the screen reader and platform the user named (for example NVDA with Firefox on Windows).
   If none is named, ask before giving key commands.
   Read `references/screen-reader-keys.md` (relative to this skill) before writing any key
   command and mark every command outside it as unverified.
2. Each step has the shape: action by keyboard, the control by its label and role, and what the
   reader should announce. Use real commands for that reader (Tab, Shift+Tab, Enter, Space,
   arrow keys, a quick-navigation key, the reader's elements or links list).
3. No mouse, position, color or icon wording. This includes screen-layout words such as
   next to, nearby, side, below, above, under, at the top or the bottom of the page: name the control by
   label and role, and reach it by a key command (next heading, next button, the elements
   list). If a control may have no text label, give the way to
   find it by role and neighbouring text, and say its announced name may differ.
4. Mark every key command and control name as confirmed (the user said it, or it is a documented
   standard) or unverified (assumed). Do not state the exact layout of an app page you were
   not shown. Say what you are assuming, and ask the user to read back the name the page
   announces when a step fails or the name differs.
5. End each step with a non-visual completion signal: an announcement, the focus target, a changed
   state such as "checked" or "expanded", or a status message. Add a recovery line for the
   step most likely to go wrong (focus lost, dialog not announced). Use only key commands you
   are sure exist for that reader; if unsure, say "read back what is announced" instead of
   inventing a chord. Re-read the finished route and delete any garbled or unusable command.
   Write no key command outside the tables in `references/screen-reader-keys.md`: for a key not
   there, say what to do in words ("open the Firefox menu") and mark it unverified. Copy, paste
   and select all (Ctrl+C, Ctrl+V, Ctrl+A) are in the table and may be used. Never invent an
   "NVDA equivalent" for a key, and never say the reply's keys are all documented or complete:
   say "check your NVDA version's key list: NVDA+N, Help, Commands Quick Reference".
   For a step that scans a QR code, give the text route instead (the setup key shown as text,
   typed or pasted into the authenticator app), as `references/nonvisual-wording.md` says.
6. Prefer the app's own documented keyboard route over guessing; say when only the vendor docs can
   confirm it.

## Navigable long answers

1. Give each part its own heading, numbered in order, with a short title that makes sense when
   heard alone, such as "Step 3: confirm the code". Use one numbering only: the heading text
   carries the number ("Step 3: ..."), with no second markdown number in front of it, and
   the same level for every part. Every heading is numbered, with no unnumbered headings:
   Step 1 is "What I assume and what to have ready", the action steps follow, and the last
   step is "What to read back if a step does not match". Give each action step a completion
   signal.
2. Put exactly one short sentence as the summary under each heading, then the detail. This
   includes Step 1 and the last step: the first line under "Step 1" is one summary sentence, and
   the assumptions follow as a list.
3. When a part is repeated or revised, reuse the same heading text and say what changed in its
   summary line, so the user can jump to it again.
4. Keep tables, nested lists beyond two levels and symbol-only formatting out. Spell out
   abbreviations on first use.
5. Say in one line how to move through the reply (for example the heading key) only if the
   user's reader is known.

Before sending, read `references/screen-reader-keys.md`, `references/nonvisual-wording.md` and
`references/route-self-check.md`. Check every key in the reply against the key tables, apply the
word rules and the word search, and apply the shape to the finished reply.

## Output

A numbered, headed route with a completion signal per step, an assumptions block listing what is
unverified, and the one thing to read back if a step does not match.
