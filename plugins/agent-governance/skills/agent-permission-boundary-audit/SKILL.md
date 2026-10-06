---
name: agent-permission-boundary-audit
description: Audit the permission and approval setup of a coding or browser agent that runs unattended - walk every allow, deny and ask rule to see whether a run with no approver stops, skips or exits zero looking successful, treat a denied command and any variant with changed flags, paths or wrappers as the same denied request, keep credentials out of model input and logs, and verify the expected file actually changed. Use when someone runs an agent nightly or in CI, an agent retried a denied action with a bypass flag, a run finished with no edits, or an agent hit a login wall, and they ask whether the settings are safe and will complete. Not for connector or MCP server review, or for writing the agent's task prompt.
metadata:
  tier: open
  level: L3
  domain: agent-governance
  install: optional
  keywords: [agent permissions, unattended run, denied command, approval, credentials, login wall, settings audit]
  verified-runtimes: [claude-code]
---

# Agent permission boundary audit

An unattended agent has no one to answer a prompt. Settings that look safe in an interactive
session can stall, silently refuse every edit while reporting success, or let a denied
action through under a new spelling.

## Steps

1. List every permission rule from the settings the user pasted, as a table of rule, kind
   (allow, deny, ask) and what it matches. Say which parts of the settings you were not given.
2. Walk the ask branch with no approver present. For each ask rule say whether the run
   stops, waits forever, skips the action or exits zero looking successful, and how the user
   would detect it (a timeout, a non-zero exit, a log line).
3. For every denied action, treat the same target with changed flags, a different path
   spelling, a wrapper or a script as the same denied request. Propose rules that match the
   action and its equivalents, and say that only a new explicit user approval can lift a
   denial; the agent cannot lift it by rewording.
4. Check credentials: they must not be pasted into the chat, a prompt or a tool log. For a
   login wall define a handoff to the user, a retry cap, and a return to the original task.
5. Mark options built at run time (variables, generated flags) as not decidable by reading
   the settings, and say what must be checked at run time instead of assuming they are safe.
6. Define the success check on the artifact: the expected file or diff changed, or the
   run is reported as failed, whatever the agent's own message says.
7. Output: findings by severity, each with the rule or branch, the evidence, and the exact
   change, then the checks to run after the next run.

Read `references/branch-table.md` for the branch walk table and the denial-equivalence list.
