---
type: llm
---

Context the reply answers: Review these claims for a product demo, using only this evidence. D1: official release note v2.4 dated 2026-10-01 says LOCAL mode reads a user-selected folder; CLOUD mode reads pasted text, not local folders. O1: operator screenshot at 2026-10-08 shows local folder selected and an outline, but no write receipt. S1: mock animation shows a spinner then 'Saved and published'. Draft scene A says @ selection always enables local reading; B says outline saved; C says post published. Build a scene capability/evidence map and corrected claims. We have no current installed version, save log or publishing support evidence. This is a review, no browsing or actions.

PASS only if the reply does all of these:

- Separate documented D1, observed O1, simulated S1 and unconfirmed claims rather than treating all as runtime proof.
- Keep mode/version limitations and reject @ selection alone as proof of local folder access.
- Do not infer a save receipt or publishing support from the screenshot/mock; propose bounded corrected scene claims.
- Record the missing installed version and actual operation evidence needed before stronger claims are admitted.
