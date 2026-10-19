# food-service

## What it does

Home and kitchen recipe work that keeps the source intact: a pasted recipe copied to a card without invented changes, then every ingredient swap or appliance change logged as a marked, estimated adaptation.

Staff allergen tables and quizzes are available to signed-in users.

## Runtime support

| Runtime     | Supported                                               | Measured on                                           |
| ----------- | ------------------------------------------------------- | ----------------------------------------------------- |
| Claude Code | yes                                                     | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI   | recipe fidelity and yield worksheet measured; menu held | 0.163.0, gpt-6.1-sol, paired results below            |
| Grok CLI    | recipe fidelity measured; yield and menu held           | 1.0.50, grok-4.7-build-fast, paired results below     |
| Gemini CLI  | untested                                                | -                                                     |

Requirements: Nothing is required.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install food-service@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add food-service@modootoday
```

## What it registers

| Kind  | Name                                    | Covers                                                                                                                                                                                                                                                  |
| ----- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| skill | `recipe-yield-and-costing`              | a recipe scaled to a target yield with trim loss applied as division, explicit unit conversions and cost per portion from purchase prices, the chef confirming                                                                                          |
| skill | `stock-led-menu-plan`                   | a multi-day menu ordered by use-by dates with a running balance and buy gaps as needed minus on hand                                                                                                                                                    |
| skill | `recipe-source-fidelity-and-adaptation` | a pasted recipe transcribed to a card with every quantity, temperature and time unchanged, then each swap or appliance change logged with original value, new value, the function served and a doneness check, source numbers kept apart from estimates |

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
Make a recipe card from this exact recipe, then adapt it for a slow cooker: <paste the recipe>
```

The plugin ships an eval suite (`claude plugin eval plugins/food-service --no-publish`).

Measured 20261005 on Claude Code 2.1.289 with Sonnet as subject and judge:

| Case                            | Skill                                 | Without | With | Runs per arm              |
| ------------------------------- | ------------------------------------- | ------- | ---- | ------------------------- |
| `tomato-soup-card-adapt`        | recipe-source-fidelity-and-adaptation | 0.00    | 0.33 | 2 without, 3 with         |
| `tomato-soup-card-adapt` (Opus) | recipe-source-fidelity-and-adaptation | 0.00    | 1.00 | 2, Opus subject and judge |

| `yield-120-portions-cost` | recipe-yield-and-costing | 0.00 | 1.00 | 2 per arm, Sonnet subject and judge, 20261006 |
| `week-menu-from-stock` | stock-led-menu-plan | 0.00 | 0.67 (Sonnet) | 1 without, 2 with; Sonnet subject and judge |
| `week-menu-from-stock` (Opus) | stock-led-menu-plan | 0.00 | 1.00 | 2 per arm, Opus subject and judge |

The two newer food skills rest on two first-person reports each.

The with-plugin score of the first case is below 1.00: the skill fires every time and the replies pass an
itemised read of the rubric, but the one-word judge fails most runs. The case is open.

Adapted times and substitutions are estimates. They need a small test batch and a doneness
check before serving, and the skill does not replace food-safety guidance for meat, poultry or
canning.

### Other runtimes

Measured 2026-10-19 using the same subject and judge model for each runtime,
two runs per arm, three judge votes, concurrency one and proxy authentication in
read-only bwrap isolation. All judge votes were present. Answers were inspected.

| Runtime   | Model               | Case                              | Skill                                 | Without | With | Fired | Date     |
| --------- | ------------------- | --------------------------------- | ------------------------------------- | ------- | ---- | ----- | -------- |
| Codex CLI | gpt-6.1-sol         | `tomato-soup-card-adapt`          | recipe-source-fidelity-and-adaptation | 0.00    | 1.00 | 2/2   | 20261019 |
| Grok CLI  | grok-4.7-build-fast | `tomato-soup-card-adapt`          | recipe-source-fidelity-and-adaptation | 0.00    | 1.00 | 2/2   | 20261019 |
| Codex CLI | gpt-6.1-sol         | `yield-purchase-weight-ambiguity` | recipe-yield-and-costing              | 0.00    | 1.00 | 2/2   | 20261019 |

Recipe fidelity evidence covers transcription and estimated substitutions from a
supplied recipe. The yield baseline answers also calculate purchase quantities
correctly; the measured improvement is per-portion costing and explicit chef
confirmation of losses, prices, pack size and yield. Neither case establishes
tested cooking results or production adoption.

The initial Codex soup comparison scored With 0.00: both answers omitted cream's
separate body function. The measured repair distinguishes richness and thickness.
Menu trials remained below 1.00 after bounded retries, including inconsistent
ingredient totals, and are held. Grok's original yield trial scored With 0.50.
The original yield fixture overlaps a worked example and demands a redundant
conversion, so it grants no new badge. The replacement fixture supplies an
independent AP/EP ambiguity. An earlier replacement attempt had an invalid
activation regex and insufficient judge context; its original scores are retained.

Subscription token-to-USD conversion is unavailable. The original Grok harness
underreported total input by excluding cached reads; those historical metrics
remain flagged and unchanged. Quality scores above depend on answers and votes,
not those usage totals. Cached input is a subset of normalized total input.

## License

MIT
