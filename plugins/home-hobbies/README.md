# home-hobbies

## What it does

Hobby help that keeps its facts straight: game state and rules kept legal across chess, board game and family role-playing sessions, and crochet or knit patterns with every stitch count recomputed and every part joined.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | yes | Codex CLI with gpt-6.1-sol, the two new cases only (see Verify) |
| Grok CLI | yes | measured 20261006 on grok-4.7-build-fast; see Other runtimes |
| Gemini CLI | yes | measured 20261006 on gemini-3.8-flash; see Other runtimes |

Requirements: Nothing is required.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install home-hobbies@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add home-hobbies@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `game-state-rules-grounded-play` | chess, board games and family role-playing sessions played with an explicit state block rebuilt from the move list, every move checked against the rules with the rule named, rules answers quoted from the pasted rulebook and edition, and a resume note for sessions |
| skill | `product-label-claim-and-trial-check` | a cosmetic or household product question answered from the pasted label rather than the name, observation kept apart from inference, a source to check and a small one-change trial, no efficacy or safety claim |
| skill | `craft-pattern-count-and-assembly-check` | crochet and knit patterns with every round recomputed from its repeats and a running total, a parts table with a join point for each part, ranked causes for a photo diagnosis and reversible steps for alterations |
| skill | `garden-plan-constraint-check` | a site brief, layout table, frost-bounded calendar, soil and light fit table and a confirm list, with guesses marked and the grower named as the one who verifies local suitability (moved here from the former land-growing plugin; five single-record first-person reports) |
| skill | `plant-photo-id-confidence-gate` | a plant, pest or disease photo or description ranked into candidates with supporting and opposing features, toxic lookalikes always named, the photos that would settle it requested, and edibility or toxicity sent to poison control or extension; rests on four web reports |
| skill | `pesticide-label-rate-and-interval-check` | a pasted pesticide label quoted, its rate converted to the user's area and sprayer in code, pre-harvest and re-entry intervals and application limits checked against the plan, tank mixes allowed only where the label says so, everything else marked not on the label; rests on four web reports |

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
Let's play chess, I am White. Moves so far: 1. e4 e5 2. Nf3 Nc6. Print the board.
```

The plugin ships an eval suite (`claude plugin eval plugins/home-hobbies --no-publish`).

Measured 20261005 on Claude Code 2.1.289 with Sonnet as subject and judge:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `chess-board-rebuild-illegal-bishop` | game-state-rules-grounded-play | 0.00 | 0.00 | 1 without, 2 with |
| `chess-board-rebuild-illegal-bishop` (Opus) | game-state-rules-grounded-play | 0.00 | 1.00 | 2, Opus subject and judge |
| `giraffe-pattern-counts-and-joins` | craft-pattern-count-and-assembly-check | 0.00 | 0.50 | 2 |
| `giraffe-pattern-counts-and-joins` (Opus) | craft-pattern-count-and-assembly-check | 0.00 | 0.00 | 2, Opus subject and judge, before the count script and format reference |
| `giraffe-pattern-counts-and-joins` (Opus, after `scripts/count-rows.mjs` and `references/corrected-pattern-format.md`) | craft-pattern-count-and-assembly-check | 0.00 | 1.00 | 2, Opus subject and judge |

The Sonnet-judged rows are below 1.00 for both cases: the skills fire every time, but the
one-word judge failed most runs. With an Opus subject and judge both cases reach 1.00 (the
giraffe case only after the count script and format reference were added; 2 runs, so a
single sample of the model's variance).

| `serum-under-sunscreen-label` | product-label-claim-and-trial-check | 0.00 | 1.00 | 2, Opus subject and judge, 20261005 (both arms in one run, skill fired 2 of 2; earlier Sonnet round stayed at 0.50); rests on two weak records |

| `raised-bed-alkaline-clay` | garden-plan-constraint-check | 0.25 | 1.00 | 2, Sonnet subject and judge, 20261005 (carried over from land-growing) |

Codex scores, measured 20261006 with the Codex eval harness, both arms, 2 runs per arm, subject gpt-6.1-sol, judge gpt-6.1-sol with 3 votes:

| Case | Skill | Without | With | Skill fired |
| --- | --- | --- | --- | --- |
| `hollow-purple-stem-photo` | plant-photo-id-confidence-gate | 0.00 | 1.00 | 2 of 2 |
| `tomato-lettuce-label-rate` | pesticide-label-rate-and-interval-check | 0.50 | 1.00 | 2 of 2 |

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

### Other runtimes

Both arms, 2 runs per arm, 3 judge votes, the model as subject and judge. A row where the skill fired and With is 1.00 sets the runtime in the skill's verified-runtimes.

| Runtime | Model | Case | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- |
| Grok CLI | grok-4.7-build-fast | `tomato-lettuce-label-rate` | 0.50 | 1.00 | 2/2 | 20261006 |
| Antigravity CLI | gemini-3.8-flash-low | `tomato-lettuce-label-rate` | 0.50 | 0.50 | 2/2 | 20261006 |
| Gemini CLI | gemini-3.8-flash | `tomato-lettuce-label-rate` | 0.50 | 1.00 | 2/2 | 20261006 |

## License

MIT
