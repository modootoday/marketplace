---
name: lemonsqueezy-integration
description: Implement or review a Lemon Squeezy integration - hosted checkout, signed webhooks, subscriptions, refunds, catalog reads and fees - and check each API detail against the official Lemon Squeezy docs, including the details that are easy to get wrong (the refund endpoint, snake_case checkout keys, no webhook delivery id, the hidden default variant, ten-row pages). Use when the user builds, debugs or reviews checkout, webhooks, refunds or subscription sync with Lemon Squeezy. Not for other payment providers.
metadata:
  tier: open
  level: L3
  domain: payments
  install: optional
  keywords: [Lemon Squeezy, merchant of record, checkout, webhook, X-Signature, refund, variant, subscription]
---

# Lemon Squeezy integration

Lemon Squeezy is a merchant of record: it sells to the buyer, collects and files
the tax, and pays you out. That changes what your code owns. You own mapping its
events onto your ledger and never granting access it did not confirm. Check
every endpoint and field below against the official docs
(docs.lemonsqueezy.com) before you rely on it, and say which ones you could not
check.

## What the API will not do

- **Stores, products and variants are made in the dashboard.** The API reads
  them; it cannot create or edit them. Design the catalog sync as verify-only:
  read the store, compare with your catalog, and report what a person must
  create. Never try to create and fall back to guessing.
- **Every transaction is in USD** and payouts are in USD. A store has one
  currency; plan prices in that currency only.
- **Services and marketplaces are prohibited** under the acceptable-use terms.
  Human service work, agencies' retainers and reselling other sellers' goods
  need another channel (an invoice or a payment gateway).

## Things that look right and are wrong

1. **Refunds go to `POST /v1/orders/:id/refund`**, not a `/refunds` resource.
   The body is `{ data: { type: "orders", id, attributes: { amount } } }`;
   omitting `amount` refunds the whole order. The answer is the updated order:
   read `refunded_amount` from it, and report what moved, not what you asked.
2. **Checkout keys are snake_case.** `checkout_data.variant_quantities` is a list
   of `{ variant_id, quantity }`. A camelCase key is ignored without an error, and
   the buyer is charged for one.
3. **Quantity multiplies one variant's price.** A checkout cannot combine a base
   fee and a per-unit fee. Sell a two-part price as tier variants instead.
4. **A multi-variant product keeps a hidden default variant** with status
   `pending`. Do not map it or sell it; a single-variant product sells that one.
5. **Lists page at 10 rows.** Ask for `page[size]=100` and follow
   `links.next`, or a product with more variants reads as smaller than it is.
6. **Timestamps carry microseconds** (`...27.000000Z`). Parse them as ISO
   instants before comparing.
7. **API keys expire** (one year). Track the expiry and warn before it lapses.
8. **Turn tax-inclusive pricing off unless you priced for it.** With it on, a
   checkout from some buyer countries was refused with "An error occurred while
   attempting to authorize the payment" on the `country` field, and the same
   card and variant went through once it was off. It also means your listed
   price contains the tax, so your share shrinks by the buyer's rate.
9. **Date a payment by when it was paid.** An invoice's `updated_at` moves when
   the subscription is later changed, so a `subscription_payment_success`
   delivered after a cancellation can carry the cancellation's timestamp and
   undo it in a ledger that only skips strictly older events. Use the invoice's
   `created_at` as the event time and keep `updated_at` in the idempotency key.

## Webhooks

- **Verify `X-Signature`:** HMAC-SHA256 of the raw request body with the
  webhook secret, hex, compared in constant time. Verify before parsing, and
  verify the exact bytes received.
- **There is no delivery id.** Build your idempotency key from the event name,
  the resource id and its `updated_at`. A redelivery then lands on the same key,
  and a later change gets a new one.
- **Map by event and resource type.** `order_created` and `order_refunded` carry
  an order; `subscription_*` carry a subscription; `subscription_payment_*`
  carry a subscription invoice (its `subscription_id` points at the
  subscription). Read `subscription_updated` by the status it reports
  (`active`, `on_trial`, `past_due`, `unpaid`, `paused`, `cancelled`, `expired`).
- **A cancelled subscription runs to `ends_at`.** Stop access there, not at
  `renews_at`.
- **Carry your own ids through `checkout_data.custom`** (user, order, brand).
  They come back in `meta.custom_data` and are the decisive way to tie a payment
  to a user.
- **Refuse what you cannot classify.** Keep the body, grant nothing, and
  answer the delivery so it is not retried forever. An unpaid order is not a
  paid one.

## Fees (check the current fees page)

The base fee is a percentage plus a fixed amount per transaction, with
surcharges for buyers outside the US, for subscriptions and for PayPal, plus
payout fees outside the US. Abandoned-cart recovery and affiliates add their own
percentage. The fixed part dominates small prices: set a minimum price or sell
annual plans so the fee stays a small share.

## Before going live

Build and test everything in test mode, then copy each product to live mode in
the dashboard (copies get new ids), register the live webhook, and run one real
purchase, renewal and refund through your ledger.
