# it-ops

## What it does

A fix made on an anonymized copy of an administration script patched back to the real script through a local replacement table, changed hunks only, with no real value sent to a model. It never runs a script.

Admin script reviews before a run are available to signed-in users.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | narrow supplied-fixture effects | codex-cli 0.161.0, 2026-10-08; identifier-change planning and follow-up unverified-state reporting (see Other runtimes) |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: None.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install it-ops@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add it-ops@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `anonymized-script-patch-back` | a change made on a scrubbed script applied to the real one through a local replacement table, hunk only, with an outbound-text check (one evidence record) |

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
I fixed the anonymized copy of our script (HOST1, TOKEN_X). Apply the fix to the real script.
```

The plugin ships an eval suite (`claude plugin eval plugins/it-ops --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `patch-back-retry-loop` | anonymized-script-patch-back | 0.00 | 1.00 | 2 per arm |

As of the recorded 20261006 cut, the skill had one case and needed two more for the three-case release gate.
It now has three cases: the original case and two supplied-fixture additions. This is case coverage, not a passed three-case quality gate; the initial repeated-context comparison failed and remains recorded below.
The Claude row is a both-arm run on the then-current skill text, Sonnet subject and judge, 20261006. It predates the 2026-10-08 closing-report reinforcement and is not a measurement of that revised body.

### Other runtimes: supplied-fixture closeout

Measured on 2026-10-08 with gpt-6.1-sol as subject and judge, two runs per arm and three judge votes. Scores below are original behavioural aggregates. Process exit zero at threshold zero is not quality evidence.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `patch-back-identifier-change-gate` | anonymized-script-patch-back | 0.00 | 1.00 | 2/2 | 2026-10-08 |
| Codex CLI | gpt-6.1-sol | `patch-back-repeated-context-drift` | anonymized-script-patch-back | 0.00 | 0.00 | 2/2 | 2026-10-08 |

Only the identifier-change case supports a narrow planning effect: both With replies supply runnable owner-local outbound-text checks and context-matched application of the admitted logic hunk. Both baselines already hold identifier changes pending owner decisions. The repeated-context case retains twelve FAIL votes: both With replies supply local mapping and outbound scans but omit the explicit statement that script behaviour and absence of leakage remain unverified. No patch, leak detection or private inspection occurred; no general security guarantee follows.

### Codex follow-up: unverified-state reporting

One original repeated-context case was measured again after a minimal closing-report instruction was added to the skill. The prompt, four semantic criteria and activation grader were unchanged. The initial 0.00/0.00 comparison and its twelve FAIL votes above remain historical evidence; they were not regraded. The earlier identifier-change result also predates this body revision and was not rerun.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `patch-back-repeated-context-drift` | anonymized-script-patch-back | 0.00 | 1.00 | 2/2 | 2026-10-08 |

The follow-up used codex-cli 0.161.0, gpt-6.1-sol subjects and judges, two runs per arm and three votes per answer: six PASS and six FAIL votes, four completed answers and no model errors. Both With replies supplied owner-local scan commands and explicitly stated that script behavior and absence of leakage remain unverified until the corresponding local checks are completed. Both baselines already held ambiguous target selection; that hold is not a new benefit. The bounded difference is reporting and local-check planning completeness, not proven script behavior, actual patch application, leak detection or a general security guarantee. No private script, replacement table, credential or host was inspected or used. No new Claude comparison was performed.

## License

MIT
