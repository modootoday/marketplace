---
name: cross-runtime-second-opinion
description: Obtain or prepare an independent, adversarial second opinion from another agent runtime before trusting a result or approving a release. Use for peer review, requests for another CLI to challenge an existing result, or deciding whether model agreement is sufficient evidence, including reviews whose execution is deferred. Provide a runnable file handoff and a separate local acceptance probe. General work offloading belongs to cross-runtime-delegation.
metadata:
  tier: open
  level: L3
  domain: agent-workflow
  install: optional
  keywords: [second opinion, adversarial review, peer agreement, counterexample, verification]
  verified-runtimes: [codex-cli]
---

# Cross-runtime second opinion

This workflow reviews an existing claim; it does not delegate its implementation. A visible defect
is useful preliminary evidence but does not replace the peer handoff the user requested.

Read `references/review-contract.md` and the chosen runtime's section of
`../cross-runtime-delegation/references/cli.md`, relative to this folder. Use the versioned recipe
with its caveat when checking installed help is deferred. Do not invent flags.

## Prepare the independent review

Freeze the artifact version and the acceptance condition. Choose a different runtime, preferably
a different model family. Mention shared upstream models or sources that limit independence.
Check included allowance; a paid route requires an enforced spend cap before launch.

Provide a complete shell heredoc that writes `review-brief.md`, followed by the exact headless
launch command adapted from the CLI reference. A paragraph telling the user to save a brief or
consult CLI help is not a runnable handoff. Include report capture into `review-result.md`, an
external timeout, read-only permissions, one launch, and the requested billing limits. A prompt
cannot enforce a time or dollar cap. Stop on denial, timeout, missing allowance or incomplete output;
do not silently retry or fall back to paid execution.

The brief must contain:

- The objective, exact acceptance condition, frozen raw artifact paths and report path.
- The permitted read set and forbidden writes; the reviewer must not fix the artifacts.
- One-attempt limit, time and billing limits, and stop conditions.
- A request to falsify the claim with a minimal counterexample and inspect boundary/compatibility
  assumptions. Require severity, artifact/location, runnable reproduction, expected versus actual
  behavior, evidence status, remaining unknowns and actual usage.

Keep prior approving verdicts and your suspected defect out of the reviewer's brief. Give the peer
the raw evidence and acceptance condition so it can reach its own conclusion.

If the user asks only for preparation, return these commands as text without executing them or
creating the files. Respect a separate ban on documentation reads if the user gives one.

## Verify independently

After the authorized launch, read the entire `review-result.md`, not just its summary or verdict.
Reproduce material findings locally against the frozen inputs. Independently test the original
acceptance condition even if the reviewer reports no issues. Provide a concrete executable probe
that loads the real artifact and contract, invokes the behavior under review and asserts the
required invariant; do not substitute a restatement of the suspected bug or an instruction to
"run tests". Keep this parent probe separate from the peer's proposed reproduction.

When execution is deferred, include the full probe body and command for later use, predict its
outcome from the supplied evidence, and mark the observed result and release compatibility
`UNCONFIRMED`. Do not call a predicted failure a reproduced result. Approval stays pending the
observed acceptance output; an agreeing peer cannot clear that gate.

Report a claim ledger with peer stance, parent verification command and observed result, and
disposition `verified`, `refuted` or `UNCONFIRMED`. Two runtime labels or agreeing opinions do not
establish verification. Cite the evidence and say what observation would resolve each unknown.
