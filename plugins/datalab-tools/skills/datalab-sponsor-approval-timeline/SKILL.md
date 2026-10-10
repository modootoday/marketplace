---
name: datalab-sponsor-approval-timeline
description: Reconcile supplied sponsorship deadlines and approval messages into a source-linked timeline. Use when relative dates, revision requests or approval states conflict. Not for scheduling, sending, publishing or legal deadline advice.
metadata:
  tier: open
  level: L3
  domain: marketing
  install: optional
  keywords: [sponsorship, deadline, approval, revisions, timeline, datalab]
---

# Sponsorship approval timeline

Work from supplied agreements and dated messages. A requested change is not final approval, and a requested extension is not an accepted new deadline.

## Workflow

1. Identify the deliverable and revision version each message concerns. Record the source ID, sender, timestamp and stated time zone; do not infer authority from a display name or possession of the draft.
2. Read [references/timeline-evidence.md](references/timeline-evidence.md) when interpreting relative dates or conflicting records. Anchor each relative expression to its own message's stated local date and calendar convention. Show the original expression, resolved absolute date and time zone; missing anchors or conventions remain unresolved.
3. Keep original agreed deadlines separate from proposed changes and explicitly accepted amendments. An edit request, silence, delivered draft or requested extension does not prove final approval or permission to publish. Distinguish draft received, revision requested, resubmitted, final approval and publication evidence.
4. Compare the deadline and approval records for the same version. Flag contradictory dates, absent approval, unidentified approver or missing zone; do not choose a convenient interpretation or manufacture a calendar time. Attribute any final approval only to its supplied wording and scope.
5. Return a source-linked timeline, confirmed versus pending states and an unsent clarification draft for the unresolved decision. Do not send, reserve a slot, schedule, publish or assert legal enforceability.

## Optional evidence tools

Supplied records suffice without MCP or discovery. If additional draft evidence is requested, use only visible tools within their returned schemas or discover with datalab_find_tools and call returned names through datalab_call. Do not invent tool names or arguments. If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status. Editor observations can identify a draft but cannot establish advertiser approval. If optional evidence is unavailable, retain the gap and continue from supplied records.

