---
name: subagent-fanout-brief
description: Split a large uniform job (dozens of files, packages or documents) across parallel subagents through one shared BRIEF file - the spec written once, chunks of 16 to 25 items with disjoint file ownership, a hard-rules block (no git, no builds or tests until one final check, touch only your own files), integration notes each agent returns, then one integration agent for the shared files and only the coordinator commits. Use when a task covers many similar items and would take hours serially, when planning parallel agents, or when the user says fan out, split across agents or batch the work. Not for one-off delegation of a single search or for running several builds at once.
metadata:
  tier: open
  level: L3
  domain: agent-workflow
  install: optional
  keywords: [subagents, fan out, parallel agents, brief, chunking, integration agent, coordinator]
  verified-runtimes: [claude-code]
---

# Subagent fan-out with one brief

Parallel agents go wrong in the same few ways: each gets a slightly different
copy of the instructions, two of them edit the same shared file, each runs its
own build and the machine runs out of memory, one commits half the work, and the
coordinator cannot tell what anyone changed.

## 1. Write the brief once, as a file

One `BRIEF.md` in a scratch directory every agent can read. Each agent's prompt
is short: "Read BRIEF.md first and follow it exactly; your items are: ...". The
brief holds:

- **Goal and done-definition** for one item, with one accepted example to copy
  (a finished item, by path).
- **Procedure** per item, as numbered steps.
- **Hard rules** (below), verbatim, marked as not negotiable.
- **Return format**: what each agent reports back (see section 4).

Changing the brief mid-run means every agent started earlier works to the old
one; if it must change, say which agents need a follow-up.

## 2. Chunk by ownership

- 16 to 25 items per agent. Fewer wastes start-up cost; more and the agent runs
  out of context before the end and quietly drops the tail.
- Chunks own disjoint files. An item whose change needs a shared file (an index,
  a lockfile, a root config, a registry) does not edit it: the agent writes the
  needed change into its integration notes instead.
- Name every item explicitly in the prompt. "The rest of the folder" invites
  overlap.

## 3. Hard-rules block

Paste this, adapted, into the brief:

```
HARD RULES
- No git commands that change state: no add, commit, stash, checkout, reset.
- No builds, typechecks or test runs while working. Run the one check named
  below ONCE, at the end, on your own items only. Do not retry it in a loop.
- Edit only the files of your assigned items. Shared files go in your notes.
- Do not delete anything you did not create.
- If an item cannot be done as specified, stop on that item and report why.
```

Heavy checks multiply: ten agents each running a full typecheck is ten times the
memory at the same moment. If the host is shared, serialize the final checks
(a lock file, a queue, or one agent at a time).

## 4. Integration notes and the integration agent

Each agent returns: items done, items skipped with the reason, files touched,
the final check's command and result (with how much it ran), and the shared-file
changes it needs as exact snippets.

After all chunks return, one integration agent (or the coordinator) applies the
shared-file changes together, resolves conflicts between notes, and runs the
whole-project check once.

## 5. Only the coordinator commits

The coordinator reviews the combined diff against the item list, confirms every
item is accounted for (done or skipped with a reason), and commits in logical
units naming the paths. Subagents never commit, push or deploy: a commit from
inside a chunk carries whatever else was in the tree at that moment.
