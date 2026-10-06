# Brief example

Scenario (synthetic): a worker translates the help text of one command-line tool from English to
German. Other workers translate other tools in the same repository at the same time.

```
OBJECTIVE
Translate the user-facing strings of the tool "tidy" into German. Done when
locales/de/tidy.po has a translation for every msgid in locales/en/tidy.pot and
"msgfmt --check locales/de/tidy.po" exits 0.

CONTEXT
- Glossary decisions already made: "workspace" = "Arbeitsbereich", "stash" stays "Stash".
- Placeholders such as %s and {name} must be kept unchanged and in the same order.
- Style: formal "Sie".

BOUNDARIES
- You may write only locales/de/tidy.po and your pending file pending/tidy.json.
- Do not edit locales/index.json, the glossary, any test, or any other tool's files.
  If the index needs an entry, put it in pending/tidy.json.
- Do not run git commands that change state. Delete nothing you did not create; no wildcards.

FIELD CONTRACT (pending/tidy.json)
- "status": exactly one of "complete", "partial", "blocked".
- "confidence": exactly one of "low", "medium", "high" (no numbers).
- "notes": free text; put doubts here, never in "status".

STOP RULE
- At most 2 rounds of fixing msgfmt errors. Then stop and report status "partial" with the errors.
- If a string cannot be translated without a product decision, mark it in "open" and move on.

FORBIDDEN
- Do not edit the check or the .pot file to make it pass. If the .pot looks wrong, report it.

HAND-BACK (headings in this order)
Done: count of translated strings.
Evidence: the msgfmt command and its output.
Not verified: anything you could not run or check.
Open: untranslated or doubtful strings with the reason.
Spend: turns used.
Report everything you noticed, even minor; the coordinator filters.
```

What each part prevents: duplicate or conflicting glossary choices (context), a shared-index edit
(boundaries, pending file), a status field filled with prose (contract), endless retries (stop rule),
a rewritten check (forbidden), an unverifiable "all done" (hand-back).
