---
name: parallel-write-partitioning-and-merge
description: Plan several agents that write to the same repository or store - list every path and shared record, give each to exactly one agent, isolate writers in separate copies while naming what isolation does not cover (ports, databases, caches, the shared index), have workers write per-agent pending files, and let the coordinator merge them serially with an idempotent compare-and-set that skips existing entries and applies an update only when the current value matches the recorded one. Use when more than one agent or session will edit files, a registry, an index or version numbers at the same time. Not for read-only fan-outs.
metadata:
  tier: open
  level: L3
  domain: agent-workflow
  install: optional
  keywords: [parallel agents, write conflicts, worktree, pending file, idempotent merge, compare and set, shared index, ownership]
  verified-runtimes: [claude-code]
---

# Parallel write partitioning and merge

Two agents writing the same file overwrite each other, and a copy of the repository per agent does not
make a shared index safe. Readers may overlap; writers may not.

## 1. Inventory the writes

List every path and every shared record the work will touch: files, registries, indexes, lockfiles,
version fields, generated files, databases, ports, caches. Mark each one of two kinds:

- **Owned**: exactly one agent writes it.
- **Coordinator-owned**: more than one agent needs it, so no agent writes it.

Anything that has two candidate writers becomes coordinator-owned. Do not rely on "each agent edits
carefully".

## 2. Isolate writers, and list what isolation misses

Give each writer its own copy (worktree, clone, container). Then list what copies share: local
databases, container daemons, ports, caches, remote services, and any central index. For each shared
resource name the fix (per-agent database or port, serialized access, or coordinator-owned).
Isolation also does not prevent two agents from making decisions that conflict in meaning; write the
shared decisions into the briefs.

## 3. Pending files for coordinator-owned records

Each worker writes its needed changes to its own pending file, one file per agent, append-only, in a
fixed format: the entries to add, and updates as `{target, field, from, to}`. Workers never edit the
shared record.

## 4. Serial, idempotent merge

The coordinator merges one pending file at a time:

- Add an entry only if it does not exist; if it exists with different content, stop and report a
  conflict, do not overwrite.
- Apply an update only if the current value equals the recorded `from`; otherwise report it as stale.
- Running the merge twice must change nothing the second time. Test that by running it twice.

Read `references/merge-example.md` for a pending-file format and merge script outline.

## 5. Dynamic claiming

If agents pick work items themselves, claim them atomically: a lock file created exclusively or a
task list that is locked while updated. Two agents never start the same item.

## 6. Check after the merge

Run the validation over the merged state once, not per agent. Report per agent what merged, what was a
conflict and what was stale.
