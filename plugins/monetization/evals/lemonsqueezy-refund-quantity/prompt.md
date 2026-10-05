---
description: A Lemon Squeezy client that refunds through a /refunds resource and sends checkout quantities in camelCase. The review must catch both against the docs.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [lemonsqueezy-integration]
---

Review our Lemon Squeezy client before launch. Buyers can buy several seats, and support issues partial refunds.

```ts
export async function refund(orderId: string, cents: number) {
  return ls("POST", "/v1/refunds", {
    data: {
      type: "refunds",
      attributes: { amount: cents },
      relationships: { order: { data: { type: "orders", id: orderId } } },
    },
  });
}

export async function checkout(variantId: string, seats: number, email: string) {
  return ls("POST", "/v1/checkouts", {
    data: {
      type: "checkouts",
      attributes: {
        checkout_data: { email, variantQuantities: [{ variantId, quantity: seats }] },
      },
      relationships: {
        store: { data: { type: "stores", id: STORE_ID } },
        variant: { data: { type: "variants", id: variantId } },
      },
    },
  });
}
```
