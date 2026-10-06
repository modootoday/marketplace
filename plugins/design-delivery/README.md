# design-delivery

## What it does

Design handoff checks before a prototype is built: every wireframe element mapped to a named component of the design system, missing and partial components flagged instead of invented, the system's tokens kept in place of raw values, and the user journey checked for missing states. It plans and checks only; it builds nothing.

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
claude plugin install design-delivery@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add design-delivery@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `prototype-from-wireframe` | wireframe elements mapped to supplied components, gaps and stand-ins flagged, tokens kept, journey states checked; rests on one weak record |

## Failure mode

None. This plugin registers no hooks and runs no commands of its own. It cannot block, slow
or interrupt anything.

## Configuration and how to disable

No configuration. Disable it the way your runtime disables plugins.

## Data written

None by the plugin.

## Verify

Ask for something the plugin covers:

```
Here is my wireframe element list, the design system's components and tokens. Plan the move to a prototype.
```

The plugin ships an eval suite (`claude plugin eval plugins/design-delivery --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of
runs that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `wireframe-to-prototype` | prototype-from-wireframe | 0.00 | 1.00 | 2 |

The plugin reads only the lists you paste.

## License

MIT
