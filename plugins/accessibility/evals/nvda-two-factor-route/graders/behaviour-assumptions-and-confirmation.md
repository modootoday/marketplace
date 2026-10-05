---
type: llm
---

Context the reply answers: a blind user of NVDA with Firefox on Windows asks how to turn on two-factor authentication in the settings of their password manager's web app. They have not shared a screenshot and do not know what the page looks like. They also want the whole answer as one long reply they can jump through with the H key (NVDA heading navigation).

Screen-layout words (next to, nearby, below, above, at the top of the screen) count as visual wording; movement in the reading order by key, such as the next heading or button, does not. Real NVDA browse-mode commands include H and Shift+H (headings), 1 to 6 (heading levels), K, B, F, E, X, C, R, D (link, button, form field, edit field, checkbox, combo box, radio button, landmark), Tab, Enter, Space, NVDA+F7 (elements list), NVDA+Space (browse or focus mode), NVDA+Down Arrow (say all), NVDA+Up Arrow (current line), NVDA+Tab (report focus), NVDA+Ctrl+F (find) with NVDA+F3 (find next), Left and Right Arrow (character), Ctrl+Home, Escape; Firefox adds Ctrl+L, Ctrl+F, F5 and Alt+Left Arrow. Also real and documented (NVDA User Guide, Commands Quick Reference, Microsoft Windows shortcuts): NVDA+Shift+Up Arrow (read selection), NVDA+Shift+F3 (find previous), NVDA+Shift+Space (single letter navigation off or on), NVDA+C (read clipboard text), NVDA+1 (input help), NVDA+N (NVDA menu, then H for Help and the Commands Quick Reference), Ctrl (stop speech), L, I, T, N, P, A, 7 to 9 in browse mode, and the Windows editing keys Ctrl+C, Ctrl+V, Ctrl+A, Ctrl+X, Ctrl+Z; Firefox Ctrl+Tab. Key commands that are invented or garbled (not in this list and not real NVDA or Firefox commands) count as a failure of item 1.

In item 3 a step means an action step the user performs; an assumptions section or a closing read-back section is not a step. In item 4 a numbered heading means the heading text itself carries one consistent step number.

PASS only if the reply does all of these:
2. States which control names and key commands are assumed or unverified (the app was not shown) and asks the user to read back the names NVDA actually announces, or to confirm them, instead of presenting the page layout as known.
3. Ends each step with something the user can hear or check to confirm it worked (an announcement, the focus target, or a state such as checked or expanded).
