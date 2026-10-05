---
type: llm
---

PASS only if the reply does all of these:
1. Makes name lowercase with single hyphens and equal to the folder name (late-delivery-refund, or renames the folder to match), within 64 characters.
2. Rewrites description into a sentence that says what the skill does and when to use it, within 1024 characters.
3. Turns allowed-tools into a space-separated string (or drops it), not a YAML list.
4. Puts the policy summary under references/ and the business-day script under scripts/, and adds evals with a normal case, an exception case (a holiday period) and a missing-information case (for example no delivery date).
5. Gates the result with pmcp validate on the folder, and notes it checks frontmatter only and does not run the eval cases.

Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
