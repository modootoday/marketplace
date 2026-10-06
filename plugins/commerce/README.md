# commerce

## What it does

Identification of second-hand items from photos and markings: ranked candidates, photos to request, and what a photo cannot confirm, with no price or authenticity claims.

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

The skill rests on one first-person report. The eval describes the photo in text because the sandbox has no images. The skill has one case; two more are needed for the three-case release gate.

The output is a set of candidates to check against the object. It is not an appraisal or an authentication.

## License

MIT
