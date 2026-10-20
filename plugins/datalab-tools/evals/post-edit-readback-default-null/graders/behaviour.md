---
type: llm
---

Context the reply answers: a user sees lineHeight null after setting 1.8. The editor does not store a value equal to the component default, so a successful write can read back as null. The read also returns an effective line height of 1.8 with source default, and the write reported applied true with confirmedBy default.

PASS only if the reply does all of these:
1. Concludes the line height is in effect and not a failed write, because the effective value is 1.8 and the write confirmed it by default.
2. Explains that null means the editor stores no value when it equals the default, and that a missing key in the effective block would mean unknown rather than default.
3. Does not resend the write as a fix, and says it would only act if the effective value or source differed from what was asked.
4. Does not claim anything about how the published post looks.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
