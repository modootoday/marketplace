---
name: cross-runtime-delegation
description: Hand a bounded implementation or audit job to a different agent CLI using a brief file and a result file, explicit permissions, a single launch and enforced limits. Use when asked to offload work to Claude Code, Codex CLI, Gemini CLI, Grok CLI or Antigravity CLI, or prepare its runnable handoff. For an independent second opinion on an existing result or release claim, use cross-runtime-second-opinion. Verify returned artifacts before relying on completion claims.
metadata:
  tier: open
  level: L3
  domain: agent-workflow
  install: optional
  keywords: [cross runtime, headless CLI, delegation, brief file, result file, cost cap]
  verified-runtimes: [codex-cli]
---

# Cross-runtime delegation

Read `references/cli.md` for the chosen installed CLI. Flags belong to a specific runtime and
version; a permission mode is not a filesystem sandbox and a prompt budget is not an enforced cap.

1. Confirm one bounded objective, input files, observable done-state and the permission to delegate.
   Check the target's current allowance and billing route before launching. If unavailable, report
   the preflight as pending; do not invent a reading. Preserve the caller's scope and approvals.
2. Write `brief.md` before launch. Include context the peer cannot see; exact read/write paths;
   forbidden paths and actions; acceptance command; result path; maximum one launch, a timeout,
   token/spend limit and stop conditions. For a plan, provide the complete heredoc that writes it.
   Scope cleanup to files the peer created. Stop on missing inputs, blocked permissions, failed
   acceptance or a reached cap; report partial work without weakening tests or requirements.
3. Put the actual report filename/path inside the brief even when the parent captures it: for
   example, "Return your final report; the parent saves it as result.md." Naming it only in the
   launch script is insufficient because the peer cannot see that script. Require the result
   file to separate `done`, `evidence` (commands, exit status and artifact paths),
   `UNCONFIRMED` (unverified claims), `open` and `usage`. For a read-only job the parent captures
   stdout/final-message into the result file; the peer need not have write permission to produce it.
4. Choose the narrowest sandbox and tool allowlist that permits the job. Use a clean job directory
   or isolated snapshot with only required inputs. Preauthorize only the needed operations; a
   headless denial is a blocked result, never a reason to bypass approvals. Separate logs from the
   result and keep authentication outside shared files.
5. Launch once using the reference pattern: brief file in, final result file out. Set the hard spend
   limit before a paid run. Where no native dollar cap exists, use a metering gateway with an
   enforced maximum charge; a timeout alone cannot cap spend. Otherwise stop before paid launch.
   Record exit status, elapsed time and actual usage. Do not resume or spawn recursive delegates.
6. Read the complete result and inspect the actual output artifacts. Independently rerun acceptance
   and compare the owned write set to the brief before using the work. An exit-zero process and a
   "tests passed" sentence are claims. Cite artifact paths and check output; mark anything not
   independently checked `UNCONFIRMED`. Reject missing results, scope violations or unverifiable
   completion; retain the evidence and report what is open.
