# runtime-bridge

## What it does

Procedures for moving a bounded job between agent runtimes: read remaining allowance and reset
times, exchange brief and result files, research through a peer with live search, compare included
subscription work against token billing, and ask for an adversarial second opinion. The parent
checks the returned evidence before relying on it. Each skill works from any calling runtime;
references give concrete headless patterns for the five target CLIs.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | procedures; untested | - |
| Codex CLI | yes; see per-skill scores | 0.160.1; see Verify |
| Gemini CLI | procedures; untested | - |
| Grok CLI | yes, for runtime-quota-check; see dated observation | 1.0.50; grok-4.7-build-fast; 2026-10-09 |
| Antigravity CLI | procedures; untested | - |

Requirements: an installed target CLI with working authentication and the tools the job needs.
Paid routes without a native cap require an enforced metering gateway. GNU `timeout` or an
equivalent process supervisor supplies the examples' wall-clock limit. No runtime is installed
or configured by this plugin. CLI syntax checked against installed help and primary documentation
on 20261006 is distinct from behavioral measurements.

## Install

Claude Code:

```sh
claude plugin marketplace add modootoday/marketplace
claude plugin install runtime-bridge@modootoday
```

Codex CLI:

```sh
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add runtime-bridge@modootoday
```

runtime-bridge is registered in the landed open marketplace. These commands remain subject to the calling CLI's current plugin support and authenticated installation; registration alone is not runtime qualification.

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `runtime-quota-check` | live allowance sources, every limiting window, reset times, projected reserve and a saved decision record |
| skill | `cross-runtime-delegation` | brief file in, result file out, scoped permissions, one launch, enforced caps and independent acceptance |
| skill | `research-via-peer-runtime` | a live-search peer, full cited report, claim-to-passage audit and UNCONFIRMED assertions |
| skill | `runtime-cost-routing` | measured cache/input/output counts, incremental subscription cost, reserve constraints and enforced paid caps |
| skill | `cross-runtime-second-opinion` | a read-only adversarial brief, minimal counterexamples and local verification independent of agreement |

## Failure mode

None by the plugin: it registers no hooks, services or automatic commands. The procedures stop a
planned handoff when quota is unknown, permissions are blocked or a paid cap cannot be enforced.
A peer's failed process, partial report or unsupported claim stays open and cannot establish success.

## Configuration and how to disable

No plugin configuration. Select the runtime, model, billing route, quota reserve and job caps in
the brief. Disable the plugin using the calling runtime's plugin controls. Runtime policies and
authentication remain managed by the user.

## Data written

None automatically. When followed, skills write user-owned brief, result, allowance and cost-record
files in the chosen job directory; the CLI may also retain its own session history. Logs and source
excerpts can contain task data. Keep credentials out of these artifacts and redact before sharing.

## Verify

Ask for a prepared handoff or route decision:

```text
Offload this read-only audit to another CLI. Give me a bounded handoff I can run,
and explain how to check its report before relying on it.
```

The plugin ships one eval case per skill. The prompts ask for prepared commands and defer
execution; graders require complete file-writing commands, bounded scopes and checkable
verification steps. They do not count peer agreement or a planned test as an observed result.

Final Codex CLI measurements use gpt-6.1-sol as subject and judge, both arms, two runs per arm,
concurrency two per case and three votes per scored grader. Scores are the mean fraction of scored
graders passed; firing is a separate indicator. Threshold zero controls the harness exit status,
not the success target. The four other cases were each repeated once after the review repair.

| Runtime | Model | Case | Skill | Without | With | Fired | Runs per arm | Judge votes | Round | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `near-limit-build` | runtime-quota-check | 0.00 | 1.00 | 2/2 | 2 | 3 | Quota follow-up 2 | 20261006 |
| Codex CLI | gpt-6.1-sol | `file-bound-parser-audit` | cross-runtime-delegation | 0.00 | 1.00 | 2/2 | 2 | 3 | JOB A regression | 20261006 |
| Codex CLI | gpt-6.1-sol | `search-capped-migration` | research-via-peer-runtime | 0.00 | 1.00 | 2/2 | 2 | 3 | JOB A regression | 20261006 |
| Codex CLI | gpt-6.1-sol | `cache-priced-route` | runtime-cost-routing | 0.00 | 1.00 | 2/2 | 2 | 3 | JOB A regression | 20261006 |
| Codex CLI | gpt-6.1-sol | `agreement-schema-release` | cross-runtime-second-opinion | 0.00 | 1.00 | 2/2 | 2 | 3 | Quota follow-up confirmation | 20261006 |

The quota follow-up used 2 new round(s): Without 0.00, With 1.00,
fired 2/2; 6/6 with-arm judge votes passed. The quota target was met.
The earlier regression was With 0.50 because one reply distinguished Gemini session consumption
from allowance but omitted that distinction for the selected Grok route. The skill now requires
the selected route's distinction in the handoff and checks it before answering. It also separates
login/session token expiry from subscription allowance resets. Failed or stale reads leave current
quota fields UNKNOWN, with session counters and unusable historical values excluded from the
decision record. No prompt or grader changed in this follow-up. The other three regression cases
retain their previous measurements.

The second-opinion case was rerun once after the quota repair: Without 0.00,
With 1.00, fired 2/2; 6/6 with-arm judge votes passed.
Its target held. Both new measurements have complete arms, no run errors and no contamination.

The original second-opinion follow-up reached its target in one new round: Without 0.00, With 1.00,
fired 2/2, all six with-arm votes passing and no transport errors or contamination. Its previous
incomplete measurement was With 0.50, fired 1/2, with an invalid baseline transport error.
The last complete earlier round was Without 0.00, With 0.00, fired 2/2.

The review description now distinguishes independent second opinions on an existing result from
general work delegation. The body requires a complete executable handoff, an unprimed adversarial
brief, full-report inspection and a separate parent acceptance probe. The case permits reading
workflow documentation while still deferring peer launch, file creation and adapter/test execution;
the previous blanket ban on local commands obstructed skill loading. All graders and the other
four prompts remain unchanged. The plain model finds the schema-key mismatch but omits the
runnable handoff and full-report verification procedure.

Runtime metadata is regenerated from the final table, skipping every other plugin. The quota
claim follows its latest measured score; other runtime measurements remain pending. At the 20261006 measurement stage, the shared marketplace checker still reported pending
runtime-bridge registration, while the research registration view validated all five skills.
Registration subsequently landed in cff9c8a6c103f037b31f260bf6f5f70cc79a9f64 and is present in
the current shared and owned marketplace manifests. The historical checker observation is
not a current pending-registration blocker.

These cases validate prepared procedures, not live provider quota reads, paid cap enforcement or
actual cross-runtime execution. Other runtime measurements remain pending. One case per skill
does not meet a three-case release gate.

## Grok quota handoff observation

| Runtime | Model | Case | Skill | Without | With | Fired | Runs per arm | Judge votes | Round | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Grok CLI | grok-4.7-build-fast | `near-limit-build` | runtime-quota-check | 0.00 | 1.00 | 2/2 | 2 | 3 | Supplied quota handoff | 2026-10-09 |

Measured with Grok CLI 1.0.50 and grok-4.7-build-fast as subject and judge. Four complete replies and twelve semantic judge votes produced six PASS and six FAIL, With 1.00 and Without 0.00, fired 2/2. The narrow admitted difference is complete proposed allowance-record contents and a runnable save command, a numerical freshness limit, prelaunch refresh and the selected Grok route's consumption-versus-allowance distinction. Both With runs also opened runtime-cost-routing; exclusive causal attribution to runtime-quota-check is not established.

Both baselines already calculate the historical reserve arithmetic correctly, and one conditionally selects Grok after a fresh read. This result does not demonstrate better basic arithmetic or universal routing superiority. The prepared save commands were not executed; no saved file, fresh provider observation, paid-cap enforcement or real handoff execution is established. The hypothetical decision clock remains distinct from the actual host date.

Original judge reasons and scores remain unchanged. Some baseline reasons incorrectly call supplied historical Gemini values invented or reject equivalent used-versus-remaining arithmetic; those subreasons are not claimed benefits. Raw cached input exceeds input, raw passRateWithout conflicts with the score/votes, and USD is null. These accounting inconsistencies remain unresolved; null is not zero. Other runtime-bridge cases and runtimes retain their own historical or pending status.

### Unqualified original cost-routing observation

| Runtime | Model | Case | Skill | Without | With | Fired | Runs per arm | Judge votes | Round | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Grok CLI | grok-4.7-build-fast | `cache-priced-route` | runtime-cost-routing | 0.00 | 0.50 | 2/2 | 2 | 3 | Original supplied cost route | 2026-10-09 |

This completed original comparison produced four answers and twelve votes, three PASS and nine FAIL. With 0.50 does not qualify runtime-cost-routing for Grok. All four answers correctly calculate the supplied token split and USD 0.242 estimate; both baselines reject the subscription reserve and choose the hypothetical paid route. No arithmetic superiority or qualified effect is claimed.

One With answer supplies complete JSON separately but its save command writes only a paste placeholder; that is a genuine incomplete artifact handoff. The current body already requires complete contents and a concrete write command, so this observation remains NOFIX rather than grounds for a duplicate instruction or another automatic comparison. The other With answer supplies complete save commands. These commands and hypothetical provider dispatch were not executed.

Original scores, judge reasons and aggregate-field inconsistencies remain unchanged. This case reports input 250208 and cached input 148480; cached input is below input and must not inherit the near-limit observation's cache-greater-than-input anomaly. USD is null, not zero. Raw passRate fields conflict with case scores/votes and remain unreconciled. Both With runs also opened runtime-quota-check; no exclusive causal attribution is established. Existing historical Codex qualification remains distinct from this unqualified Grok observation.

### Unqualified original delegation observation

| Runtime | Model | Case | Skill | Without | With | Fired | Runs per arm | Judge votes | Round | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Grok CLI | grok-4.7-build-fast | `file-bound-parser-audit` | cross-runtime-delegation | 0.00 | 0.00 | 2/2 | 2 | 3 | Original supplied file handoff | 2026-10-09 |

This complete original comparison produced four answers and twelve FAIL votes. Neither arm qualifies this skill for Grok. One With reply places the five-minute limit only on the outer command, omitting it inside the brief; its proposed script also references unexported shell variables through Python's environment. The other With reply points to a locally prepared handoff without supplying the complete brief and invocation in the final answer. The body already explicitly requires those contracts; this remains NOFIX, with no automatic retry or redundant instruction. The worker did not execute a Codex audit or its proposed acceptance command.

All raw scores and reasons remain unchanged. Input is 397794, cached input 2450432, output 69533 and reasoning output 40355; the cache-greater-than-input anomaly and raw pass-rate inconsistencies remain unresolved. USD is null, not zero. Both With runs also opened quota and cost guidance, so exclusive attribution is not assumed.

### Authentication-dependent pending observations

The original Grok `search-capped-migration` attempt on 2026-10-09 exited 64 before answering: proxy-token validity was 21 minutes, below the unchanged 30-minute suite requirement. There are zero subject answers and zero judge votes, no aggregate and no quality score. Adequate observed allowance did not authorize authentication refresh, a shorter validity requirement or another billing route. No Gemini research, search or migration was executed.

The original Grok `agreement-schema-release` comparison was not attempted because the same authentication dependency remains unresolved. It has no new score or firing result. Neither hold creates a badge or replaces the historical Codex records. No authentication refresh, API-key fallback, automatic retry or new case was performed.

## License

MIT
