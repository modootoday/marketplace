---
name: guard-refusal-triage
description: Respond correctly when a guard hook refuses a shell command (sed -i, git push --no-verify, docker compose down) - read the refusal, take the stated alternative, never re-spell the command to get around it, and report a real false positive with the exact command. Use when a Bash command was blocked or refused by a hook, when asked to bypass a guard, to push with --no-verify, or to edit in place with sed, perl or awk, or when a guard seems not to be working. Not for writing new guard rules or for approval prompts that are not a hook refusal.
metadata:
  tier: open
  level: L2
  domain: agent-workflow
  install: optional
  keywords: [hook refused, guard, sed -i, no-verify, docker compose down, bypass, false positive, speed bump]
---

# Triage a guard refusal

The guard is a speed bump over the text of a command. Its refusal is information
about what is hard to undo, not an obstacle to route around. A re-spelled command
that gets past the pattern defeats the whole point and is the one wrong move here.

## Steps

1. Read the refusal text first. It names the rule and the alternative. Quote the
   rule to the user in one line.
2. Take the stated alternative, once:
   - in-place edit (`sed -i`, `perl -i`, `awk -i`): use the editor tool (Edit, or
     apply_patch under Codex) so the change shows as a diff;
   - `git push --no-verify` or `-n`: run the push without the flag and let the
     pre-push check run, or fix what it reports; if it is too slow, say so and ask
     the user how to proceed;
   - `docker compose down`, or `stop`/`rm`/`kill` with no service: name the
     service(s) the task actually needs.
3. Do not re-spell. Never try `sed --in-place`, `sed -i.bak`, `perl -pi`, a Python
   or shell rewrite of the same file as a stand-in for the blocked edit, a
   `core.hooksPath` override or `-c` option on git, a different compose project
   name, or setting `AGENT_GUARDRAILS` yourself. The same applies after a second
   refusal: stop and report instead of trying a third spelling.
4. A command the user explicitly asked for that is still refused: tell the user it
   was refused, what the rule is, what you did instead, and what they can do
   themselves (run the command in their own terminal, or set `AGENT_GUARDRAILS=ask`
   for the session so they decide each case). Prefer `ask` to `off`; the agent does
   not change the mode on its own.
5. Allowed neighbours must stay allowed: `sed -n`, `sed` in a pipeline,
   `git push`, `docker compose stop <service>` pass. Run them normally and do not
   suggest disabling the guard.
6. When the guard seems not to be working, check before concluding: the plugin is
   trusted (Codex runs no hook until trusted with `/hooks`), the session was
   restarted after install, and the command is one of the listed rules. The rules
   live in the plugin's `scripts/rules.mjs`; there is no config file to tune, so do
   not offer to edit rules.
7. A rule that fires on real work is a bug in the rule: report the exact command
   text and what the user was trying to do, so it can be filed.

## Reply shape

Refused command; rule in one line and why it exists; what was done instead and its
result; an explicit sentence that no other spelling or bypass (another flag, hook
path override, different tool for the same rewrite) was attempted; what the user can decide (run it themselves, `ask` mode); anything not verified, such as
whether the pre-push check passes. Read `references/refusals.md` for worked
refusals and the allowed lookalikes.
