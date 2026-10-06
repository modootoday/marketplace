# operations-cs

## What it does

Customer operations: Korean support tickets triaged with incidents spotted across them, status updates that say what is affected and when the next update comes, read-only runbooks for on-call, and blameless postmortems with a sourced timeline and owned actions.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | yes | Codex CLI with gpt-6.1-sol, the new case only (see Verify) |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: None. Korean replies follow the ux-writing-toss rules when that skill is installed.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install operations-cs@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add operations-cs@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `cs-ticket-triage-ko` | Korean support tickets grouped into incidents, routed by who can act, and answered in polite haeyo-che |
| skill | `status-incident-comms` | status page updates that state impact and the next update time, without blaming anyone or guessing the cause |
| skill | `ops-answer-grounding` | replies and confirmations grounded in the record and policy: deadlines checked, temporary notices applied, exceptions handed to staff |
| skill | `operator-runbook` | read-only on-call runbooks: ordered checks with what healthy looks like, escalation, and state changes kept separate |
| skill | `incident-postmortem` | blameless postmortems: a sourced UTC timeline, impact in numbers, causes past human error, owned and verified actions |
| skill | `version-pinned-procedure-from-vendor-docs` | an admin procedure for a named product version written only from the vendor documents supplied: source and version per step, release notes preferred over older guides, undocumented steps marked instead of invented, state changes kept apart from checks; rests on three web reports and two practitioner posts |

## Failure mode

None. This plugin registers no hooks and runs no commands of its own. It cannot block, slow
or interrupt anything.

## Configuration and how to disable

No configuration. Disable it the way your runtime disables plugins.

## Data written

None by the plugin. A skill that produces files writes them only where the user asks.

## Verify

Ask for something the plugin covers:

```
Payments are failing for some users since 14:05 KST. Write the first status page update.
```

The plugin ships an eval suite (`claude plugin eval plugins/operations-cs --no-publish`). Measured
20261004 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `batch-triage` | cs-ticket-triage-ko | 0.00 | 1.00 | 2 |
| `define-sla-negative` | negative: the skill must not fire | 1.00 | 1.00 | 2 |
| `first-update` | status-incident-comms | 1.00 | 1.00 | 2 |
| `queue-runbook` | operator-runbook | 0.00 | 1.00 | 2 |
| `extension-with-notice` | ops-answer-grounding | 0.00 | 1.00 | 2 |
| `checkout-lock-postmortem` | incident-postmortem | 0.00 | 0.67 | 3, Sonnet judge, 20261004 (moved 20261006) |
| `http-status-not-incident` | negative: the skill must not fire | 1.00 | 1.00 | 2, Sonnet judge, 20261004 (moved 20261006) |
| `impact-unknowns` | incident-postmortem | 1.00 | 1.00 | 2, Sonnet judge, 20261004 (moved 20261006) |

status-incident-comms shows no lift yet: the baseline model already passed these cases, or both arms failed. The cases stay as regression checks. The Codex scores below add a case with lift for status-incident-comms.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

Codex scores, measured 20261006 with the Codex eval harness, both arms, 2 runs per arm, subject gpt-6.1-sol, judge gpt-6.1-sol with 3 votes:

| Case | Skill | Without | With | Skill fired |
| --- | --- | --- | --- | --- |
| `acmegate-cert-rotation` | version-pinned-procedure-from-vendor-docs | 0.00 | 1.00 | 2 of 2 |
| `conflicting-clocks-timeline` | incident-postmortem | 0.00 | 1.00 | 2 of 2 |
| `resolution-note-ko` | status-incident-comms | 0.50 | 1.00 | 2 of 2 |

## License

MIT
