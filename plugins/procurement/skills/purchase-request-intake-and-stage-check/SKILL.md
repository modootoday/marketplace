---
name: purchase-request-intake-and-stage-check
description: Normalise a free-form purchase request into fixed intake fields while keeping the original text and turning missing fields into questions for the requester, then compare a request's recorded history to the stage requirements from requisition to payment and list the unmet conditions per stage, claimed approvals marked as unverified, and next actions with owners only where the source states them. Use when a procurement operator receives informal requests or must say where a tracked request stands and what blocks it. Not for approving spend, choosing suppliers, or navigating a specific ERP system.
metadata:
  tier: open
  level: L3
  domain: procurement
  install: optional
  keywords: [purchase request, intake, requisition, purchase order, goods receipt, stage check]
---

# Purchase request intake and stage check

Informal requests leave out what the next stage needs, and a stage is easy to call done because
someone said so. Two jobs: intake the request, then check its stage against the rules.

## Intake

1. Quote the original request text unchanged at the top.
2. Fill fixed fields: requester, item or service, quantity, spec, budget, cost center, needed-by
   date, delivery location, preferred supplier, quote attached, approver. Use the user's required
   field list when one is given, otherwise these.
3. Write only what the text states. A field the text does not state is "missing", and each missing
   required field becomes a question to the requester. "ASAP" is not a date; ask for one.
4. Record approvals as claimed ("approved by X, per the request text") until a record shows them.

## Stage check

5. Take the stage rules the user gives (what each stage needs from the one before). If none are
   given, say so and ask rather than inventing them.
6. For each stage, from the first, list the conditions the rules require and mark each as met (with
   the history entry that shows it), unmet, or unknown. Never mark a stage complete from the
   request text alone; a stage whose requirement is unmet blocks the later stages, which are
   "not started".
7. Next action per blocked stage: the missing item, and the owner and deadline only if the source
   states them; otherwise "owner unknown" and "deadline unknown".

## Output

Intake table with the original text, questions for the requester, a stage table (stage, status,
unmet conditions, evidence), and the next actions. The operator decides what to chase.
