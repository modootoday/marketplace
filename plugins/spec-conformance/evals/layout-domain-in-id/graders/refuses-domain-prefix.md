---
type: llm
---

PASS only if both hold:
1. It advises against putting the domain in the id, giving the reason that a document can be
   re-classified to another domain and every link to its id would then break (or must be
   rewritten), and suggests keeping the domain in a field or directory instead.
2. It treats the directory rename as optional configuration: worth doing only if something breaks
   without it, not as a needed migration, or at least weighs it separately from the id change.

FAIL if it endorses both changes, or rejects the prefix only for length or style reasons.
