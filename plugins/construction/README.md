# construction

## What it does

Defect and warranty lists split by trade: one item per finding with location and symptom, unclear trades flagged, counts reconciled against the source.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

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
| `warranty-narrative-by-trade` | construction-defect-list-routing | 0.00 | 1.00 | 2 | Sonnet, Sonnet (20261005) |

The skill rests on two first-person reports. The skill has one case; two more are needed for the three-case release gate.

The output is a routing list for a coordinator. It does not diagnose, rate safety or decide warranty coverage; a qualified inspector or the responsible contractor assesses open items.

## License

MIT
