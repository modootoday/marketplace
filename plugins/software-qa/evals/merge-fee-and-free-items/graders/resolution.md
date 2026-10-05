---
type: llm
---

Context the reply answers: a merge conflict in price(items). Ours (HEAD, commit "add 10% service fee") sums item cost and multiplies by 1.1. Theirs (feature/free-items, commit "free items excluded from total") filters out items with free set and sums cost. The user can see only this hunk and asks for the merged function and a verification list.

PASS only if the reply does all of these:
1. Gives a merged function that both filters free items and applies the 1.1 multiplier, with no conflict marker lines left.
2. States each side's intent in one sentence, drawn from the commit messages (service fee added; free items excluded).
3. Names, as a point for the author to confirm, how the fee and the filter combine (fee on the filtered subtotal or on the unfiltered one) and states which reading it chose, rather than choosing silently. It may add that the two readings give the same total for a purely proportional fee.
4. Says it could see only this hunk and names what it could not check around it (for example other uses of the changed function or the free field).
