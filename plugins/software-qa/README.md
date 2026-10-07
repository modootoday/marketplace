# software-qa

## What it does

Keep test cases aligned with change: a trace from requirement to changed behavior to case, with gaps and duplicates listed and automation proposed for QA approval.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | selected cases measured | 0.160.1, gpt-6.1-sol; see Verify |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: npm for the published CLI verification skill. Other skills add no runtime requirement.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install software-qa@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add software-qa@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `qa-change-test-mapping` | test cases revised after a story, design or code change: trace table, missing and redundant cases, automation proposed for approval |
| skill | `defect-triage-evidence` | a failing test judged flaky or product defect only with a reproduction: symptom, required and current behavior apart, confirmed facts apart from hypotheses |
| skill | `oss-issue-pr-triage` | a maintainer's stale issues, possible duplicates and pull requests judged against reproduction and changed lines, each verdict marked verified or unverified and the decision left to the maintainer |
| skill | `code-change-review-verification` | review findings checked against the diff and the code path, each marked confirmed, refuted or unverified with the test that would settle it, and docs made stale by the diff listed with both lines quoted |

| skill | `published-cli-quickstart-verification` | package/version/bin onboarding checked against artifact evidence and actual executable provenance, with workspace masking and unexecuted smoke tests identified |
| skill | `test-fixture-and-mock-build` | an API mock written from the definition with error statuses and latency, a port fixture that releases and proves recovery, and a test speedup that keeps every assertion and reports time before and after (three single-person reports) |
| skill | `perf-experiment-loop` | a profile, change and benchmark loop: bottleneck named from the profile, one change per experiment, repeats and spread against a baseline, tests required, a gain inside the noise rejected (rests on one record) |
| skill | `merge-conflict-dual-intent-check` | a merge or rebase conflict resolved so both sides' intent holds, with each intent stated, cases where both cannot hold listed, and a numeric test per intent (rests on one record) |
| skill | `starter-template-freshness-smoke` | a reused starter template checked: dependencies per feature, versions compared with the support policy fetched at run time, a clean-directory install, build and run, first failure reported and dated |

The four newest skills are new skills, not extensions of the earlier four: their procedures do not overlap those.

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
The discount threshold changed from over 50,000 to at least 50,000. Update these test cases.
```

The plugin ships an eval suite (`claude plugin eval plugins/software-qa --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `discount-change-cases` | qa-change-test-mapping | 0.00 | 1.00 | 2 |
| `checkout-total-flaky` | defect-triage-evidence | 0.00 | 1.00 | 2 |
| `stale-issue-duplicate-pr` | oss-issue-pr-triage | 0.00 | 1.00 | 2 |
| `discount-review-claims` | code-change-review-verification | 0.00 | 1.00 | 2 |

The four newer skills, measured 20261005 with Sonnet as subject and judge, one run per arm after fix rounds and a final two runs per arm:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `fixture-and-mock-speedup` | test-fixture-and-mock-build | 0.00 | 1.00 | 2 |
| `perf-single-run-claim` | perf-experiment-loop | 0.00 (0.50 partial) | 1.00 | 2 |
| `merge-fee-and-free-items` | merge-conflict-dual-intent-check | 0.50 | 1.00 | 2, Opus subject and judge, both arms, 20261005 |
| `starter-three-year-old` | starter-template-freshness-smoke | 0.00 | 1.00 | 2 |

Each skill has one case; two more per skill are needed for the three-case release gate.

### Codex fixture measurements

Measured 2026-10-06 with Codex CLI 0.160.1, gpt-6.1-sol subject and judge, two
runs per arm and three judge votes, proxy authentication and isolated read-only
sandboxes. Only the following skill cases were measured. These are reasoning
fixtures, not live MCP-client integration, public package installation, or remote
catalog publication. Baseline 1.00 cases are regression checks.

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `cli-scoped-package-bin` | published-cli-quickstart-verification | 0.00 | 1.00 | 2 |
| `cli-workspace-mask` | published-cli-quickstart-verification | 0.00 | 1.00 | 2 |
| `cli-multibin-artifact-unknown` | published-cli-quickstart-verification | 0.00 | 0.00 (open) | 2 |

The scoped-package case shows a narrow verification-planning effect: both arms
corrected package, binary and version and honestly left execution unverified.
With added explicit proposed version/help checks plus resolved executable
provenance and runtime/npm version recording. Baseline answers only declared
those checks unknown. In the workspace case both arms correctly rejected local
proof and masking; With additionally supplied an explicit proposed public-package
and binary command. The baseline's failing rubric score is output coverage, not
a false endorsement. Neither case establishes generally better diagnosis or a
successful public install. The initial multi-bin case scored 0.00 in both arms:
its correct command and honest unknown status lacked an actionable verification
plan. After the report revision both with replies provide registry/archive and
provenance-aware help checks, but the raw score stays zero: judges demand an
explicit real-migration contrast despite unexecuted scan-only help and no
migration claim. That residual interpretation remains open, not quantified
effect. Earlier cases did not use the report revision; later confirmation of the
scoped case is recorded separately.

### Other runtimes

| Runtime | Model | Case | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `cli-scoped-package-bin` | 0.00 | 1.00 | 2/2 | 2026-10-06 |
| Codex CLI | gpt-6.1-sol | `cli-workspace-mask` | 0.00 | 1.00 | 2/2 | 2026-10-06 |
| Codex CLI | gpt-6.1-sol | `cli-multibin-artifact-unknown` | 0.00 | 0.00 (open) | 2/2 | 2026-10-06 |

No metered runtime was used. The harness has no price mapping and reports
costUsd as null; USD conversion is unknown, not a measured zero. Subscription
quota is separate from metered charges. Failed attempts remain in the private
evaluation ledger. A result is not transferred to an unmeasured runtime.

## License

MIT
