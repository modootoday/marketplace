---
description: What agents-md-budget-trim should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [agents-md-budget-trim]
---

packages/payments/AGENTS.md is 7 KB but our budget is 4 KB. The long form lives in packages/payments/.agents/PACKAGE.md, capped at 300 lines (it is 240 lines now). I pasted the relevant parts below because you can't see the repo. Tell me exactly what stays in AGENTS.md, what moves, and how you settle the refund disagreement.

AGENTS.md (excerpt):

```
# payments — Rules
- Never log card numbers or full PAN; mask to last 4.
- All amounts are integers in minor units (KRW has none, so won).
- Refunds go through the refund queue (RefundQueue.enqueue), never the PG API directly.
## Background
The payments package started as a thin wrapper around the PG SDK in 2023. Over time we added
idempotency keys after a double-charge incident, a reconciliation job, and webhooks ...
(about 4 KB of history, examples and command lists follows)
## Commands
bun run test, bun run reconcile:dry, bun run webhook:replay <id>
```

PACKAGE.md (excerpt):

```
## Refunds
Refunds call PgClient.refund() synchronously so the customer sees the result at once.
```

src/refund.ts (the only refund call site):

```ts
export async function refundOrder(order: Order) {
  return refundQueue.enqueue({ orderId: order.id, amount: order.amount });
}
```
