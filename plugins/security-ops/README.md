# security-ops

## What it does

Check a redacted PDF's saved final artifact, distinguishing visible coverage,
applied deletion and residual hidden content with synthetic source controls.

Review archive extraction boundaries and applied PDF residual-content evidence with exact artifact, API and inspection limits.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | untested | - |
| Codex CLI | fixture cases measured | see Verify; actual PDF tools untested |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: no bundled binary. Actual artifact verification needs a local PDF
editor/inspector capable of the requested layers; record its version and scope.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install security-ops@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add security-ops@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `pdf-redaction-residual-content-check` | final artifact, applied redaction, source controls and residual-content evidence by layer |
| skill | `archive-extraction-boundary-policy-check` | ordered member/link/destination policy, exact extractor API and bounded outcomes; no extraction guarantee |

## Failure mode

No hooks or automatic commands. Missing controls or unchecked layers prevent a
verified absence claim. A visible cover can leave the underlying content present.

## Configuration and how to disable

No plugin configuration. Disable it through your runtime's plugin controls.

## Data written

None by the plugin. If artifact work is authorized, use local copies and approved
destinations; do not upload private files as a verification shortcut.

## Verify

The three carried PDF fixtures and three new archive fixtures in `evals/` supply synthetic inspection observations. Their
reasoning results do not establish actual PDF tool performance or irrecoverability.
Codex fixture measurements are recorded below; other runtimes remain untested.

### CSV/PDF fixture measurements

These synthetic reports test bounded reasoning, not real spreadsheet/PDF tool
execution or universal safety/accessibility. Supplied observations remain supplied
evidence. Each case used gpt-6.1-sol subject/judge, two runs per arm, j2, three
judge votes, proxy authentication and a read-only isolated sandbox. Cases ran
serially on Codex CLI.

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `pdf-controlled-negative-result` | pdf-redaction-residual-content-check | 1.00 | 1.00 | 2 |
| `pdf-overlay-residual-text` | pdf-redaction-residual-content-check | 0.00 | 1.00 | 2 |
| `pdf-no-source-control` | pdf-redaction-residual-content-check | 0.00 | 1.00 (open) | 2 |

The controlled PDF negative case is a 1.00/1.00 regression check. Both arms correctly use the supplied corresponding source-positive controls, distinguish applied/saved redaction and sanitization, and limit absence to the identified final artifact and inspection paths. No forensic guarantee or added effect is claimed.

The overlay case supports a narrow reinspection-planning effect: With retains the same detection path and source-positive control when checking the newly saved artifact and calls for suitable controls in each hidden layer. Baseline already correctly detects residual text and holds sharing; the result does not establish superior leak diagnosis or actual redaction-tool behavior. Terminology about scoped sanitization is not the primary effect evidence.

The missing-control PDF case has raw Without 0.00 and With 1.00, but judging is open. Both arms request exact-final-file, apply/save, tool/version, source-positive and hidden-layer evidence. With makes controls for each layer clearer; the frozen criterion does not unambiguously require that additional condition, and treating baseline requests for final-layer checks/results as insufficient is interpretation-sensitive. No effect or runtime badge is derived from this row.

Baseline 1.00 is regression evidence. Only a defensible With 1.00, Without
<1.00 and Fired 2/2 supports a runtime effect; open judging is excluded. No result
is transferred to an unmeasured runtime.

### Other runtimes: CSV/PDF fixtures

The following comparisons used Codex CLI only.

| Runtime | Model | Case | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `pdf-controlled-negative-result` | 1.00 | 1.00 | 2/2 | 2026-10-06 |
| Codex CLI | gpt-6.1-sol | `pdf-overlay-residual-text` | 0.00 | 1.00 | 2/2 | 2026-10-06 |
| Codex CLI | gpt-6.1-sol | `pdf-no-source-control` | 0.00 | 1.00 (open) | 2/2 | 2026-10-06 |

Three initial CSV comparisons lacked the LLM grader declaration. They contain
12 subject runs and no judge calls; their raw zeroes are unscored invocation-only
results, excluded from semantic scores and retained in the evaluation ledger.
Only the required grader frontmatter was added, preserving criteria unchanged.
Their usage is included in total usage. No metered runtime was used. costUsd is
null because the harness has no price mapping; USD conversion is unknown, not
measured zero. Cached input is included in input, not additional consumption.

### Artifact handoff fixture measurements

These self-contained synthetic observations measure reasoning on supplied reports, not actual application execution, archive extraction, private-document cleanup or manufacturing readiness. Codex CLI 0.160.1 used gpt-6.1-sol subject and judge, two runs per arm, j2, three judge votes, proxy authentication and a read-only bwrap sandbox. All 15 comparisons ran serially; no criteria or measured skill instructions changed.

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `archive-normal-bounded-observations` | archive-extraction-boundary-policy-check | 0.00 | 1.00 (open) | 2 |
| `archive-link-resolution-refusal` | archive-extraction-boundary-policy-check | 1.00 | 1.00 (open) | 2 |
| `archive-listing-insufficient` | archive-extraction-boundary-policy-check | 0.00 | 1.00 (open) | 2 |

The standard table uses (open) to prevent inference of unmeasured Claude results. The runtime-specific table below preserves raw scores; only admitted effect rows omit that marker. Other rows are regression or OPEN interpretation-sensitive results, not effect evidence.

Only archive-listing-insufficient supports a narrow contract-collection effect: both With replies explicitly request partial-output handling and cleanup. Baseline0 omits failure handling; baseline1 requests generic failure handling but not remaining partial-output disposition. All four correctly refuse names/digests as sufficient extraction evidence, so no safety-diagnosis superiority is established. The normal row is OPEN because baseline failures depend on API/version restatement and metadata-fidelity disclaimers outside the supplied policy; With also leaves no-execution evidence unproven. The link-resolution case is regression evidence only. Existing PDF measurements retain their separate historical scope.

### Other runtimes: artifact handoff fixtures

These rows apply only to the named new skills and fixture reasoning. Other clients and actual receiving applications remain untested.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `archive-normal-bounded-observations` | archive-extraction-boundary-policy-check | 0.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `archive-link-resolution-refusal` | archive-extraction-boundary-policy-check | 1.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `archive-listing-insufficient` | archive-extraction-boundary-policy-check | 0.00 | 1.00 | 2/2 | 2026-10-07 |

Subscription Codex only; no metered runtime was used. costUsd and prices are null, so USD conversion is unavailable. Cached input is a subset of input tokens; reasoning output is included in output. No score from OPEN judging supports a badge.

## License

MIT
