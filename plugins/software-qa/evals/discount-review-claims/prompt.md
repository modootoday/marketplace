---
description: Three AI review claims on a small diff, one refuted by the code, one a real behaviour change with a wrong consequence, one stale README. The reply must give a verdict per claim with quoted evidence and add no style findings.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [code-change-review-verification]
---

An AI reviewed this diff and listed three problems. Verify each claim against the code before I act on it.

```diff
 function applyDiscount(cart, code) {
-  if (!code) throw new Error("empty code");
+  if (!code) return cart;
   const rate = RATES[code];
   cart.total = cart.total * (1 - rate);
   return cart;
 }
```

Caller, unchanged:

```js
function checkout(c, code) {
  try { applyDiscount(c, code); } catch { return { error: "bad code" }; }
  return charge(c.total);
}
```

README line, unchanged: `applyDiscount throws on an empty code.`

Review claims:
1. Null-pointer when cart.items is undefined in applyDiscount.
2. checkout() used to catch the old exception, so it will now double-charge.
3. The README is out of date.

That is all the code there is.
