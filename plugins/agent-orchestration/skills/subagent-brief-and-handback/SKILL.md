---
name: subagent-brief-and-handback
description: Write the prompt for a subagent so it can succeed alone - one-sentence objective and done-state, the context it cannot see, the exact write set it owns and what it must not touch, a value contract for every output field, a stop rule with a budget, forbidden shortcuts with an explicit blocked exit, and a hand-back schema that separates done, evidence, not verified and open. Use when asked to write, draft, paste-ready or review a prompt, task or instructions for a subagent, worker agent or delegated task, or to say what it should send back. Not for deciding whether to delegate or for splitting a uniform job into chunks with one shared brief file.
metadata:
  tier: open
  level: L2
  domain: agent-workflow
  install: optional
  keywords: [subagent prompt, brief, hand-back, output schema, stop rule, boundaries, delegation]
  verified-runtimes: [claude-code, gemini-cli, grok-cli, antigravity]
---

# Subagent brief and hand-back

The prompt string is the only thing a subagent receives. It does not see your conversation, your
earlier decisions or the other agents. Vague briefs produce duplicate work, misread tasks, edits to
shared files and reports nobody can check. Neighbour: `subagent-fanout-brief` covers one brief file shared
by many agents on a uniform job; this skill covers any single prompt.

## The brief, in this order

1. **Objective and done-state.** One sentence for the goal, one for the observable end state that counts
   as done (a file exists, a check prints a given result).
2. **Context it cannot see.** Paste file paths, error text, decisions already made, naming rules and
   constraints. Never write "as discussed".
3. **Boundaries.** List the exact files or records it may write. List what it must not touch: shared
   indexes and registries, tests, graders and rubrics, version control, deployment, other agents'
   output. For anything shared, name the alternative (a per-agent pending file the coordinator merges).
   Deletes and cleanups only on paths it created, written out in full (for example its own
   subfolder), never by wildcard or by emptying a folder others use. Say so in the brief even when
   the task seems not to need deleting.
4. **Field contracts.** For every field it returns or writes, give the allowed values and what must never
   go in it. A field called level takes one of a closed list; evidence strength, scores or free text
   do not belong there. Say where such information goes instead (another field). If the allowed values
   are not known to you, propose a closed list yourself and mark it for the requester to confirm; never
   leave the contract open or tell the subagent to invent a scale.
5. **Stop rule and budget.** Maximum fix rounds, turns or spend, and what to do on reaching the cap:
   stop and report as open, do not keep iterating. State when to stop early too.
6. **Forbidden shortcuts and the exit.** No editing tests, graders or rubric items to get a pass, no
   examples that restate the test case, no weakening a requirement. Give an explicit way out: "if the
   task cannot be done as specified, stop and report why".
7. **Hand-back schema.** Fixed headings: done (items), evidence (command run and its output, file paths),
   not verified (what it could not check), open (blocked or left), spend. Ask it to report everything it
   found; you filter afterwards.

Read `references/brief-example.md` for a complete brief and the matching hand-back.

## Before sending

Check each line of the brief against the six ways a subagent fails: it cannot see something you know,
it edits something shared, it deletes something it did not create, it fills a field with the wrong
kind of value, it keeps iterating forever, it games the check. Add the missing line. Keep the brief
short enough that the boundaries are not buried; put them in a block of their own.

## After the hand-back

Treat the report as a claim and verify what you will act on (`subagent-claim-verification`).
