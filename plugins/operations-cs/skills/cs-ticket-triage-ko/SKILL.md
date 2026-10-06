---
name: cs-ticket-triage-ko
description: Triage Korean customer support tickets - classify by type and urgency, pull out the facts needed to act (account, order, error, time), detect duplicates and incidents across tickets, route to the right owner, and draft a polite reply in haeyo-che that promises only what the product does. Use when sorting a batch of Korean support messages or answering one. Not for writing help-center articles.
metadata:
  tier: open
  level: L2
  domain: customer-support
  install: optional
  keywords: [customer support, ticket triage, support reply, Korean CS, helpdesk]
  locales: [ko]
  verified-runtimes: [claude-code]
---

# Korean support ticket triage

## Classify

For each ticket: type (payment, refund, account and login, bug, how-to, feature
request, complaint, abuse report), urgency (money moved wrongly, cannot use the
product, data or privacy risk first), and sentiment. Extract the facts the owner
needs: account or email, order or payment id, what they did, what happened, when
(convert to one timezone), device or browser.

## Look across tickets

Several tickets about the same error in a short window are an incident, not
separate cases: group them, tell the on-call owner, and hold individual
explanations until the cause is known. Merge exact duplicates from the same
person.

## Route

Name the owner for each type. Anything about payments, refunds or personal data
goes to the person who can check the system of record, not to a reply template.

## Reply

Polite haeyo-che, short: acknowledge the specific problem, say what happens next
and when, ask only for the facts still missing. Do not promise refunds,
features or dates the owner has not confirmed. Korean reply patterns are in
`references/replies.ko.md`.

## Output

A table: ticket, type, urgency, extracted facts, owner, and the draft reply;
then any incident groups with their ticket count and time window.
