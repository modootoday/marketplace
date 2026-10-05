# Screen reader key commands

Write only keys that appear in a table below. Any other key is marked unverified in the route,
with a pointer to the reader's own list. This list is a sample, not the full command set: never
say or imply that every key in a reply is documented, and say "check your NVDA version's key
list" (see the last section) instead. Facts were read on 2026-10-05; NVDA documents below were
the 2026.2 pages, so an older NVDA may differ.

Sources (the Source column uses these codes):

- UG: NVDA User Guide, https://download.nvaccess.org/documentation/userGuide.html
- KC: NVDA Commands Quick Reference, https://download.nvaccess.org/documentation/keyCommands.html
- MS: Windows keyboard shortcuts, https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec
- FF: Firefox keyboard shortcuts, https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly (the page could not be fetched by script on 2026-10-05; the rows below were confirmed from the search result excerpt only)

## The NVDA key

By default the NVDA key is Insert or Numpad Insert; the user can also set CapsLock (UG, "The NVDA
Modifier Key"). Pressing the key twice quickly gives it its normal job back. Write "NVDA+" before
a key and say once that NVDA+ means the NVDA key the user has set.

## NVDA in browse mode on a web page (desktop layout)

Single letter keys jump to the next item of that type; adding Shift jumps to the previous one
(UG, "Single Letter Navigation"). Not every command works in every document.

| Key | What it does | Mode | Source |
| --- | --- | --- | --- |
| H, Shift+H | Next, previous heading | browse | UG |
| 1 to 6 | Next heading at that level (the guide lists 1 to 9) | browse | UG |
| K | Next link | browse | UG |
| F | Next form field | browse | UG |
| B | Next button | browse | UG |
| E | Next edit field | browse | UG |
| X | Next checkbox | browse | UG |
| C | Next combo box | browse | UG |
| R | Next radio button | browse | UG |
| D | Next landmark | browse | UG |
| L, I, T | Next list, list item, table | browse | UG |
| N | Next text that is not a link | browse | UG |
| P | Next text paragraph (complete sentences) | browse | UG |
| NVDA+F7 | Elements list: radio buttons switch between links, headings, form fields, buttons, landmarks; an edit field filters the list; buttons move to or activate the item | browse | UG, "The Elements List" |
| NVDA+Space | Switch between browse mode and focus mode | both | UG, KC |
| Escape | Back to browse mode when focus mode started automatically | focus | UG, KC |
| Enter or Space on a control that needs typing | Switches to focus mode on that control | browse | UG, "Browse Mode" |
| Tab, Shift+Tab | Move to the next, previous focusable control; NVDA switches to focus mode on controls that need it and back to browse mode on ones that do not | both | UG, "Browse Mode" |
| Down Arrow, Up Arrow | Read the next, previous line | browse | UG ("browsed as a normal text document with the cursor keys") |
| Left Arrow, Right Arrow | Move the browse cursor by character | browse | UG (same passage) |
| NVDA+Down Arrow | Say all: read from here on | both | KC |
| NVDA+Up Arrow | Read the current line; twice spells it | both | KC |
| NVDA+Shift+Up Arrow | Read the selected text | both | KC |
| NVDA+Tab | Say which control has focus | both | KC |
| NVDA+Ctrl+F | Find text in the page (dialog) | browse | UG, KC |
| NVDA+F3, NVDA+Shift+F3 | Find next, find previous match | browse | UG, KC |
| NVDA+Shift+Space | Turn single letter navigation off or on for this page (useful on pages that use letters as shortcuts) | browse | UG |
| NVDA+C | Read the text that is on the clipboard | both | KC |
| NVDA+1 | Input help: each key pressed is described instead of run; press again to leave | both | UG, KC |
| NVDA+N | Open the NVDA menu; then H for Help, which holds the User Guide and the Commands Quick Reference | both | UG |
| Ctrl | Stop speech | both | KC |

## Editing keys that NVDA does not define

These are Windows text keys, not NVDA commands. They are documented by Microsoft, and the NVDA
guide itself mentions Ctrl+C for copying in browse mode.

| Key | What it does | Mode | Source |
| --- | --- | --- | --- |
| Ctrl+C | Copy the selected text | any text | MS; UG "Native Selection Mode" |
| Ctrl+V | Paste from the clipboard | edit field, focus mode | MS |
| Ctrl+A | Select all text | any text | MS |
| Ctrl+X, Ctrl+Z | Cut; undo | edit field | MS |
| Ctrl+Home, Ctrl+End | Cursor to the start, end of the document or field | edit field | MS (browse mode use is not stated in UG) |

In browse mode, text selected with Shift+arrows is copied as plain text by default; NVDA has a
Native Selection Mode (NVDA+Shift+F10) for copying page formatting (UG). A code in an edit field
is pasted in focus mode. If paste does not work in a field, say so and offer typing the code.
App-specific: a page may block paste; this is the page's behaviour, not NVDA's.

## Firefox on Windows

| Key | What it does | Mode | Source |
| --- | --- | --- | --- |
| Ctrl+L | Focus the address bar | browser | FF (excerpt) |
| Ctrl+F | Find in page (Firefox's own bar) | browser | FF (excerpt) |
| Ctrl+Tab | Next tab | browser | FF (excerpt) |
| F5 | Reload | browser | not re-checked on 2026-10-05; standard |
| Alt+Left Arrow | Back | browser | not re-checked on 2026-10-05; standard |

A private-window chord, new-tab or other Firefox chord that is not in this table is unverified:
say "open the Firefox menu" or "open a new tab" and give no chord.

## Not in this list

JAWS, VoiceOver, Narrator, TalkBack and Orca have their own commands, and so do add-ons and other
NVDA layouts (the laptop layout uses different keys for say all and read line, KC). If the user
names one of them, say the key is unverified and ask the user to look it up in the reader's
command list or to say what the reader announces.

For NVDA, the pointers the sources support are: press NVDA+N, then H for Help, then open the
Commands Quick Reference; or press NVDA+1 and press a key to hear what it does (UG). Say these
only as pointers for keys the table does not hold.
