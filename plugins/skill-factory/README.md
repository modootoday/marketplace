# skill-factory

## What it does

Write agent skills that change behaviour: evals before the body, descriptions that trigger on the right requests, rules tied to the failures they prevent, and a measured delta before release.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: None.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install skill-factory@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add skill-factory@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `domain-skill-authoring` | new skills written evals first, with a triggering description and rules tied to the failures they prevent |

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
Write me a skill that helps our team write good commit messages.
```

The plugin ships an eval suite (`claude plugin eval plugins/skill-factory --no-publish`). Measured
20261004 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `new-skill-request` | domain-skill-authoring | 0.00 | 1.00 | 2 |
| `readme-typo-not-skill` | negative: the skill must not fire | 1.00 | 1.00 | 2 |
| `skill-never-fires` | domain-skill-authoring | 0.00 | 1.00 | 2 |

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
