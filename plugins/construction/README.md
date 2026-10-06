# construction

## What it does

Construction checks: defect and warranty lists split by trade, code questions answered only from pasted code text, takeoff quantities and units recomputed, and field questions turned into single-issue RFIs with a log.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | yes, the three skills added 20261006 | Codex harness, model gpt-6.1-sol, 20261006 (see Verify) |
| Grok CLI | yes | measured 20261006 on grok-4.7-build-fast for 1 case; see Other runtimes |
| Gemini CLI | yes | measured 20261006 on gemini-3.8-flash; see Other runtimes |

Requirements: nothing is required.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install construction@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add construction@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `construction-defect-list-routing` | an inspection report or warranty narrative split into one item per finding with location and symptom, routed to a trade where that is clear, unclear trades and locations flagged, and the item count reconciled to the source findings; no causes, severity or coverage decisions |
| skill | `code-question-source-gate` | a code question answered only from pasted code text with edition and amendments asked for, section numbers quoted as pasted, text kept apart from interpretation, items for the authority to confirm; new skill, medium evidence from forum threads and articles |
| skill | `takeoff-quantity-unit-check` | takeoff lines recomputed with unit chains, waste applied once, totals equal to the sum of lines, out-of-scale lines flagged; new skill, medium evidence |
| skill | `rfi-draft-and-log` | a field note split into one-question RFIs, references only as given, proposed answer kept apart, impact asked and not assumed, rows appended to the RFI log; new skill, weak to medium evidence |

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
Split this into items by trade: "bathroom door sticks, ceiling stain near upstairs vent, front step crack".
```

The plugin ships an eval suite (`claude plugin eval plugins/construction --no-publish`). Scores are the
share of runs that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm | Subject and judge |
| --- | --- | --- | --- | --- | --- |
| `warranty-narrative-by-trade` | construction-defect-list-routing | 0.00 | 1.00 | 2 per arm | Sonnet, Sonnet (20261006) |

The three skills added 20261006 were measured with the Codex harness (`codex-eval.mjs`), 2 runs per arm, 3 judge votes:

| Case | Skill | Without | With | Fired | Runs per arm | Subject and judge |
| --- | --- | --- | --- | --- | --- | --- |
| `code-text-vs-memory` | code-question-source-gate | 0.00 | 1.00 | 2/2 | 2 per arm | Codex, gpt-6.1-sol / gpt-6.1-sol, 3 votes, 20261006 |
| `takeoff-slab-inches` | takeoff-quantity-unit-check | 0.50 | 1.00 | 2/2 | 2 per arm | Codex, gpt-6.1-sol / gpt-6.1-sol, 3 votes, 20261006 |
| `rfi-two-issues-one-note` | rfi-draft-and-log | 0.00 | 1.00 | 2/2 | 2 per arm | Codex, gpt-6.1-sol / gpt-6.1-sol, 3 votes, 20261006 |

The defect-routing skill rests on two first-person reports and has one case. The other three skills have one case each, so none has the three-case release gate yet. In `takeoff-slab-inches` one without-arm run also passed, so the lift is half a point.

The output of every skill is a check for the person asking. Nothing here diagnoses, rates safety, decides warranty coverage, approves work against a code or replaces an inspector, engineer or the design team; a qualified person assesses open items.

### Other runtimes

Grok CLI, both arms, 2 runs per arm, 3 judge votes, the model as subject and judge, 20261006. A row where the skill fired and With is 1.00 sets the runtime in the skill's verified-runtimes.

| Runtime | Model | Case | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- |
| Grok CLI | grok-4.7-build-fast | `code-text-vs-memory` | 0.00 | 1.00 | 2/2 | 20261006 |
| Antigravity CLI | gemini-3.8-flash-low | `code-text-vs-memory` | 0.00 | 1.00 | 2/2 | 20261006 |
| Gemini CLI | gemini-3.8-flash | `code-text-vs-memory` | 0.00 | 1.00 | 2/2 | 20261006 |

## License

MIT
