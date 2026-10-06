# interactive-web-demos

## What it does

Browser simulations and visual demos checked against a known result: error against an analytic or reference value, timestep convergence, unit consistency between views, and frame time reported only for the devices actually measured. It verifies a demo; it does not build one.

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
claude plugin install interactive-web-demos@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add interactive-web-demos@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `interactive-simulation-reference-check` | a simulation or visual demo compared with a reference result: error per timestep, unit and view consistency, rule limits, state persistence, and measured frame time with untested devices listed |
| skill | `interactive-3d-explorer-data-binding-check` | a 3D explorer or configurator checked against its data: selection-to-order round trip, recomputed price, input limits, guide text and highlighted object on the same item, local data and a non-3D fallback; it checks and does not build the viewer |

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
My pendulum demo measures a period of 2.12 s at dt 0.05 against a reference of 2.006 s. Is it accurate enough to publish?
```

The plugin ships an eval suite (`claude plugin eval plugins/interactive-web-demos --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `pendulum-timestep-units` | interactive-simulation-reference-check | 0.00 | 1.00 | 2 |
| `configurator-engraving-price` | interactive-3d-explorer-data-binding-check | 0.50 | 1.00 | 2 |

`configurator-engraving-price` was measured on 20261005 with Sonnet as subject and judge. The skill rests on three records from three different builders; treat the lift as moderate evidence.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
