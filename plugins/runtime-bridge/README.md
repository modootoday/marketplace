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
| Grok CLI | procedures; untested | - |
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

Registration is pending the coordinator's merge; these commands become available after that merge.

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
claim follows its latest measured score; other runtime measurements remain pending. The shared
marketplace checker still reports the pending runtime-bridge registration; the research
registration view validates all five skills. The shared manifest remains unchanged.

These cases validate prepared procedures, not live provider quota reads, paid cap enforcement or
actual cross-runtime execution. Other runtime measurements remain pending. One case per skill
does not meet a three-case release gate.

## License

MIT
