# commerce

## What it does

Seller checks: second-hand items identified from photos and markings, listing copy kept to each SKU's spec row, reorder points from a sales sheet, and shopping-feed disapprovals triaged without invented identifiers or prices.

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
claude plugin install commerce@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add commerce@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `item-identification-from-photos` | a seller's photos or described markings turned into ranked identification candidates with the visible features behind each, the extra photos to ask for, what the photos cannot confirm (authenticity, working order, value) and neutral listing wording; no price claims |
| skill | `listing-copy-spec-fidelity-batch` | titles and descriptions for many SKUs written only from each SKU's spec row, titles counted against the channel limit, unsourced claims rejected and listed, SKU keys kept; new skill, rests on medium evidence (web reports and two shared-file records) |
| skill | `reorder-point-from-sales-sheet` | reorder points and order quantities from a sales sheet with units converted, MOQ and pack rounding, scenario rows and thin-history flags; new skill, medium evidence |
| skill | `product-feed-disapproval-triage` | feed diagnostics grouped by attribute, fixes only from the product source, no invented GTIN, brand or price, counts before and after; new skill, rests on weak evidence (one article, one shared-file record, one demand signal) |

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
What could this be? A small 35mm camera, logo scuffed to "...MPUS", sticker "XA" then a worn character, no photo of the underside.
```

The plugin ships an eval suite (`claude plugin eval plugins/commerce --no-publish`). Scores are the
share of runs that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm | Subject and judge |
| --- | --- | --- | --- | --- | --- |
| `camera-photo-partial-marking` | item-identification-from-photos | 0.00 | 1.00 | 2 per arm | Sonnet, Sonnet (20261006) |

The three skills added 20261006 were measured with the Codex harness (`codex-eval.mjs`), 2 runs per arm, 3 judge votes:

| Case | Skill | Without | With | Fired | Runs per arm | Subject and judge |
| --- | --- | --- | --- | --- | --- | --- |
| `listing-copy-from-spec-rows` | listing-copy-spec-fidelity-batch | 0.00 | 1.00 | 2/2 | 2 per arm | Codex, gpt-6.1-sol / gpt-6.1-sol, 3 votes, 20261006 |
| `reorder-point-weeks-vs-days` | reorder-point-from-sales-sheet | 0.25 | 1.00 | 2/2 | 2 per arm | Codex, gpt-6.1-sol / gpt-6.1-sol, 3 votes, 20261006 |
| `feed-diagnostics-missing-gtin` | product-feed-disapproval-triage | 0.00 | 1.00 | 2/2 | 2 per arm | Codex, gpt-6.1-sol / gpt-6.1-sol, 3 votes, 20261006 |

The identification skill rests on one first-person report. The eval describes the photo in text because the sandbox has no images. The identification skill has one case; the other three skills have one case each, so none has the three-case release gate yet.

The output is a set of candidates to check against the object. It is not an appraisal or an authentication.

### Other runtimes

Grok CLI, both arms, 2 runs per arm, 3 judge votes, the model as subject and judge, 20261006. A row where the skill fired and With is 1.00 sets the runtime in the skill's verified-runtimes.

| Runtime | Model | Case | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- |
| Grok CLI | grok-4.7-build-fast | `feed-diagnostics-missing-gtin` | 0.00 | 1.00 | 2/2 | 20261006 |
| Antigravity CLI | gemini-3.8-flash-low | `feed-diagnostics-missing-gtin` | 0.00 | 0.25 | 2/2 | 20261006 |
| Gemini CLI | gemini-3.8-flash | `feed-diagnostics-missing-gtin` | 0.00 | 0.50 | 2/2 | 20261006 |

## License

MIT
