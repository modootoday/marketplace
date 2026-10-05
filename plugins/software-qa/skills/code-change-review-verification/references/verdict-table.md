# Verdict table and scope check

## Worked example

Diff: `-  if (!code) throw new Error("empty code");` becomes `+  if (!code) return cart;`.
Caller: `try { applyDiscount(c, code) } catch { return { error: "bad code" } }` then `charge(c.total)`.
Review claims: (1) null-pointer on cart.items, (2) checkout now double-charges, (3) docs stale.

| # | Claim restated | Verdict | Path and test |
| --- | --- | --- | --- |
| 1 | applyDiscount reads cart.items and fails when it is undefined | refuted | the function reads only `cart.total` and `RATES[code]`; no line reads `items` |
| 2a | an empty code used to reach the catch and no longer does | confirmed (behaviour change) | old throw was caught, `return { error }`; new path falls to `charge(c.total)`; pin with `checkout({total: 100}, "")` |
| 2b | the change double-charges | refuted as worded | one `charge` call on the path; the effect is one undiscounted charge where an error used to be returned; spy on `charge`, expect 1 call |
| 3 | the README is stale | confirmed | README `throws on an empty code` against `+  if (!code) return cart;` |

## Scope check before sending

Read the reply once more and delete every sentence that is not one of these: a verdict on a
claim the reviewer made, the path or test for it, or a stale doc with both lines quoted.
This includes remarks such as "one more thing", "related", "not counted", an unguarded
lookup, a naming or style point and advice beyond the next test to run. The reply does not
mention what it chose to leave out.
