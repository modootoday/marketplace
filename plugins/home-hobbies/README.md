# home-hobbies

## What it does

Hobby help that keeps its facts straight: game state and rules kept legal across chess, board game and family role-playing sessions, and crochet or knit patterns with every stitch count recomputed and every part joined.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

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

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
