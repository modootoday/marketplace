---
name: ops-answer-grounding
description: Answer a customer question or take a confirmation from knowledge-base and reservation data without ignoring current deadlines, temporary notices or handoff conditions - cite the source, let an unexpired notice override the standing answer, escalate exceptions, and read numbers back digit by digit. Use when replying to guest or customer messages for a hotel front desk, booking or extension request, support chat or voice assistant that must follow a stated policy and deadline. Not for sorting a batch of tickets or writing help-center articles.
metadata:
  tier: open
  level: L3
  domain: customer-support
  install: optional
  keywords: [customer support, knowledge base, reservation, policy, escalation, handoff]
  verified-runtimes: [claude-code]
---

# Grounded operations answers

Reports from front desks and support teams describe the same failures: an assistant answers
"come any time" when the extension has a cutoff, sends a guest to an entrance closed for
construction, repeats the same question to an angry customer, or reads a confirmation number
with a digit missing.

## Rules

1. Answer from the current record and the written policy, and name the source of each
   claim (policy line, reservation field, notice). If neither says it, say you do not know.
   Do not invent a rule, and do not suggest remedies the policy does not state (another
   room, a discount, a waiver), not even in the staff note: leave the remedy to staff.
2. Check every deadline and condition in the policy against the case: cutoff time versus
   now, availability, who must approve. State the result, not the policy text alone.
3. A temporary notice overrides the standing answer until it expires. Apply it, and give
   its valid-until time. When the notice conflicts with the standing policy, say which wins.
4. Escalate to staff, with a short handoff summary, when: the request is an exception to
   the policy, the same question has failed twice, the customer asks for a person, or a
   required field is missing. Do not keep asking the same question.
5. Read back confirmation numbers, phone numbers and dates digit by digit, and list the
   fields still missing instead of proceeding with gaps.
6. When the knowledge changes, update it from the source document and re-ask a few of the
   questions that were answered wrongly before; show what changed.

## Output

The reply to the customer, then a short staff note: facts used with sources, what was
checked, what needs a human decision.
