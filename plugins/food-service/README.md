# food-service

## What it does

Home and kitchen recipe work that keeps the source intact: a pasted recipe copied to a card without invented changes, then every ingredient swap or appliance change logged as a marked, estimated adaptation.

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
claude plugin install food-service@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add food-service@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
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

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `tomato-soup-card-adapt` | recipe-source-fidelity-and-adaptation | 0.00 | 0.33 | 2 without, 3 with |
| `tomato-soup-card-adapt` (Opus) | recipe-source-fidelity-and-adaptation | 0.00 | 1.00 | 2, Opus subject and judge |

The with-plugin score is below 1.00: the skill fires every time and the replies pass an
itemised read of the rubric, but the one-word judge fails most runs. The case is open.

Adapted times and substitutions are estimates. They need a small test batch and a doneness
check before serving, and the skill does not replace food-safety guidance for meat, poultry or
canning.

## License

MIT
