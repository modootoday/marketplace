# asset-3d-vfx

## What it does

Blender scenes planned and checked against numbers: dimensions and connections of modular parts, collisions in every state, a render compared with its reference, and web delivery budgets for size and frame rate. It verifies a scene; it does not generate meshes, textures or renders.

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
claude plugin install asset-3d-vfx@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add asset-3d-vfx@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `blender-scene-build-and-reference-check` | a spec written before the build, then module dimensions, connections, state collisions, a reference comparison and a web budget checked with measured values and a not-measured list |

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
My corridor segments should all be 4 x 3 x 3 m but one measures 3.1 m high, and the GLB is 8.2 MB against a 5 MB target. What do I fix?
```

The plugin ships an eval suite (`claude plugin eval plugins/asset-3d-vfx --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `corridor-kit-web-budget` | blender-scene-build-and-reference-check | 0.00 | 1.00 | 2 |

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
