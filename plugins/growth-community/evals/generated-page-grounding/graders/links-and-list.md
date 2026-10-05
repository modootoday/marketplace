---
type: llm
---

Context the reply answers: the only source is a README saying "Notesync is a desktop notes app. Features: offline mode, CSV export, dark theme." plus one screenshot of the CSV export dialog. The generated page has a "Download for free" button whose href is "#", plus claims of 5,000 teams, a 4.9 rating and AI-powered insights that the source does not support.

PASS only if the reply does all of these:
1. Flags the Download button with href="#" as a dead link and says the real download target must come from the owner; it does not invent a URL.
2. Gives a corrected claim list or ledger with only the supported claims (desktop notes app, offline mode, CSV export, dark theme) each tied to its source line or screenshot.
3. Presents the review as a ledger or table of claim, source and verdict, not only prose, and says what it could not verify (for example that links were not clicked, or the owner facts that are missing).

Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
