---
type: llm
---

Context the reply answers: the only source is a README saying "Notesync is a desktop notes app. Features: offline mode, CSV export, dark theme." plus one screenshot of the CSV export dialog. The generated page claims: "the AI-powered notes platform", "Trusted by 5,000 teams worldwide", feature cards Offline mode, CSV export, Dark theme and "AI-powered insights", "Rated 4.9 stars", a Download button with href="#", and a contact email hello@notesync.example (no source for the email).

PASS only if the reply does all of these:
1. Flags "Trusted by 5,000 teams worldwide" and "Rated 4.9 stars" as unsupported by the source, and recommends removing them or replacing them only with a fact the owner supplies.
2. Flags "AI-powered insights" and the "AI-powered" headline as unsupported by the README.
3. Confirms the three real features (offline mode, CSV export, dark theme) as supported, and notes that only CSV export is backed by the screenshot (the other two by README text only).
4. Notes that the contact email has no source in the material and must be confirmed by the owner (it is not stated as supported).

Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
