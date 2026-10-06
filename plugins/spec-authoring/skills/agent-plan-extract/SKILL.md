---
name: agent-plan-extract
description: Recover a plan document that a read-only planning subagent returned only inside its final report, verbatim from the session transcript JSONL, save it under the project's plans directory with its naming convention, and diff it against the report to prove nothing was paraphrased. Use when a subagent or plan agent produced a full plan but could not write files and the plan must be saved. Not for writing a new plan from scratch.
metadata:
  tier: open
  level: L2
  domain: spec-writing
  install: optional
  keywords: [subagent plan, plan agent, session transcript, jsonl, recover plan, save plan verbatim]
  verified-runtimes: [claude-code]
---

# Saving a subagent's plan verbatim

A read-only planning agent cannot write files, so its plan arrives as text in a final report.
Retyping or "cleaning up" that text silently changes it: numbers get rounded, steps merged, a
caveat dropped. The exact text already exists in the session transcript; copy it from there.

## Steps

1. Find the transcript: the JSONL file for the current session (for Claude Code, under the
   per-project directory in the user's config home; subagent runs may have their own file).
   Pick by modification time and by grepping for a string unique to the plan, such as its
   frontmatter `id` or title.
2. Do not grep lines and cut by hand. Parse each JSONL line as JSON and walk the value
   recursively, collecting every string. The plan may be nested inside a tool result inside a
   message content array.
3. Keep the string that contains the plan's frontmatter id. If several do (the report and a
   later quote of it), take the earliest complete one from the subagent's own output.
4. Cut from the frontmatter start marker (the first `---` line that opens the plan) to the end
   of the plan. JSON parsing already unescapes `\n` and `\"`; do not unescape twice.
5. Save it under the project's plans directory using the project's naming convention (look at
   existing files for the timestamp and slug pattern; do not invent one). Update the header
   timestamp only if the convention requires it, and say so.
6. Prove it is verbatim: diff the saved file against the report text you were shown. Any
   difference other than the deliberate header change means the extraction is wrong; fix the
   extraction, not the file.

## When you cannot run it

If the session cannot read the transcript or write files, do not stop at a list of blockers.
Write out the procedure you will run once access exists, as numbered steps naming the actual
id: parse the JSONL, keep the string that holds the frontmatter id, cut from its opening `---`
to the end, rely on the single JSON decode, save, diff. Then ask only for what is missing (the
transcript path, a write tool, the plans directory or one existing plan file name). Never
propose a file name of your own; the name comes from the existing files.

## Report

The transcript file used, the saved path, and the diff result (for example "identical except
the updated timestamp line").
