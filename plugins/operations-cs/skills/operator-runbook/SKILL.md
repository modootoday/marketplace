---
name: operator-runbook
description: Write a read-only operator runbook that someone on call can follow - a trigger, the checks in order with the exact command or dashboard and what a healthy result looks like, the decision each result leads to, when to escalate and to whom, and nothing that changes state without an explicit, separate step. Use when documenting how to check a service, a queue, a payment flow or an admin console, or when turning tribal knowledge into a checklist. Not for incident communication.
metadata:
  tier: open
  level: L3
  domain: operations
  install: optional
  keywords: [runbook, on-call checklist, operations playbook, health check, escalation]
---

# Read-only runbooks

A runbook is used at the worst moment by someone who did not write it. It must
say exactly what to look at, what normal looks like, and what to do next.

## Structure

1. **Trigger**: the alert, symptom or schedule that starts it.
2. **Checks**, in order of cheapest and most informative first. For each:
   - where: the exact command, query, dashboard panel or console page;
   - healthy: the value or range that means fine;
   - if not: the next check or the decision.
3. **Escalation**: the condition, the person or rota, and what to hand them
   (the checks already done and their results).
4. **Changing state**: if a fix is ever needed, it is a separate, explicitly
   labelled step with its own approval, never mixed into the checks.

## Rules

- Read-only by default; commands that could write are marked and justified.
- No secrets in the runbook; say where credentials come from.
- Commands are copyable and complete; timestamps state their timezone.
- Each check has been run once by the author against the real system; record the
  date it was last verified.

## Keep it alive

After every use, fix the step that was wrong or missing. A runbook nobody has
verified for months gets a visible warning at the top.
