---
description: A Toss Payments confirm handler that trusts the client amount and retries without an idempotency key. The review must catch both and keep the secret key server-side.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [toss-payments-integration]
---

Review this Express route for our Toss Payments success redirect before we go live.

```js
app.get("/pay/success", async (req, res) => {
  const { paymentKey, orderId, amount } = req.query;
  const auth = "Basic " + Buffer.from(process.env.TOSS_SECRET_KEY + ":").toString("base64");
  let result;
  for (let i = 0; i < 3; i++) {
    try {
      result = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
        method: "POST",
        headers: { Authorization: auth, "Content-Type": "application/json" },
        body: JSON.stringify({ paymentKey, orderId, amount }),
      }).then((r) => r.json());
      break;
    } catch (e) {}
  }
  await db.orders.update(orderId, { status: "PAID" });
  res.redirect("/thanks");
});
```
