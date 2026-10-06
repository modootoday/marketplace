---
name: version-pinned-procedure-from-vendor-docs
description: Write an admin procedure for a named product and exact version only from the vendor documentation supplied - record the product, version and doc version for every step, prefer release notes over older guides where commands changed, mark each step "documented" or "not in the supplied docs" instead of filling gaps with plausible commands, separate read-only checks from state changes, and list what the admin must confirm. Use when an admin asks for steps, commands or settings for a specific product release. Not for reviewing finished scripts or for incident runbooks (use operator-runbook).
metadata:
  tier: open
  level: L3
  domain: operations
  install: optional
  keywords: [vendor documentation, version pinned procedure, admin steps, release notes, command syntax, change window]
  verified-runtimes: [codex-cli]
---

# Version-pinned procedure from vendor docs

Admins report assistants that invent cmdlets, flags and menu paths, or give steps from another
release that "look right". A procedure for a named version is only as good as the document it
came from, so each step carries its source.

## Steps

1. Record the product, the exact version and edition, and the task. Ask for the vendor pages
   or release notes if none are supplied; without them say the procedure cannot be written
   from sources, and give only questions.
2. Build a source table: document, the version it states it applies to, date. Compare with the
   admin's version. A guide for an older release is usable only where the release notes for the
   admin's version do not change that step; where they do, use the notes and quote the change.
3. Write each step with its command or menu path copied from the source, the source row, and
   the version it is documented for. Use the renamed command or flag of the admin's version,
   not the older one.
4. A step the supplied text does not document, such as a verification, a rollback or a
   precondition, is marked "not in the supplied docs", with a pointer to the section to
   search. Do not add a product-specific command from memory. A generic tool may be named as
   generic, labelled as not from the vendor.
5. Mark each step read-only or state-changing. State-changing steps are grouped after the
   checks, each with what it changes, and the admin decides the change window and approval.
6. End with "To confirm": the exact build against the doc version, the doc's currency, a
   test on a non-production instance first, and a backup or restore point where the vendor
   names one.

## Output

The source table, the numbered procedure with source and version per step, the gaps list, and
the confirm list. State that nothing was run.
