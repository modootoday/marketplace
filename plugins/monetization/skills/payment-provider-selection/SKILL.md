---
name: payment-provider-selection
description: Choose how each thing a business sells gets paid - a merchant of record, a payment gateway, or an invoice - by what is sold, who buys it, where, and in which currency, and check each choice against the provider's prohibited categories and the tax duty it leaves with the seller. Use when the user asks which payment provider to use, whether a product can be sold through a given provider, or how to split products across providers. Not for implementing one provider's API.
metadata:
  tier: open
  level: L3
  domain: payments
  install: optional
  keywords: [merchant of record, payment gateway, invoice, VAT, sales tax, prohibited products, cross-border, PayPal, Stripe, Lemon Squeezy, Paddle]
---

# Payment provider selection

The expensive mistake is not a high fee. It is a product sold through a provider
whose terms forbid it (the account is closed with the money in it), or a
provider that leaves a tax duty nobody noticed. Decide per product line, not per
company.

## 1. List what is sold, one row each

For every product line write down: what it is (software subscription, one-off
digital good, human service, marketplace sale for others, usage), who buys
(consumers or businesses), where they are, the currency, and whether it renews.

## 2. Pick the channel per row

| Channel | Who is the seller | You owe | Fits |
| --- | --- | --- | --- |
| Merchant of record | The provider | Income tax on payouts | Software and digital goods sold to consumers abroad |
| Payment gateway | You | Every sales tax and VAT where you have to register | Domestic sales, or abroad once you can register and file |
| Invoice | You | The same as a gateway, plus reverse-charge wording for business buyers abroad | Services, pilots, enterprise deals |

- **Consumers abroad + digital goods** is where a merchant of record pays for
  itself: without one you register for VAT or sales tax in each place you sell.
- **Business buyers abroad** can usually be invoiced with reverse charge.
- **Domestic sales** usually go through a local gateway in local currency.

## 3. Check each row against the provider's terms

Read the provider's acceptable-use or prohibited-products page and quote the
line. Common exclusions: **services of any kind** (consulting, setup, custom
work, retainers), **marketplaces** (selling others' goods), and regulated goods.
A provider that bans services cannot take a pilot fee, even if the checkout
technically works.

## 4. Check the money side

- Currency: a merchant of record often settles in one currency (often USD).
  Set prices in that currency rather than converting at checkout.
- Fees: compare the full cost per sale, including the fixed part, the
  surcharges for cross-border cards, subscriptions or PayPal, and payout fees.
- Account risk: a payment account that holds tax obligations it cannot meet
  can be limited. Pick the channel that matches who files the tax.

## 5. Write the split down

End with a table: product line, channel, provider, currency, who files tax, and
the terms line each choice relies on. Mark anything that needs an accountant's or
lawyer's confirmation; do not present tax treatment as settled.
