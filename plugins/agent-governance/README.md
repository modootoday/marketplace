# agent-governance

## What it does

Permission setups for agents that run without a person watching: approval branches walked, denied actions held across rewordings, credentials kept out of the model and success checked on the artifact.

This plugin is a preview: the full set is available to signed-in users.

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
claude plugin install agent-governance@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add agent-governance@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `agent-permission-boundary-audit` | an unattended agent's permission rules walked branch by branch, denied actions held against changed flags and wrappers, credentials kept out of the model, a handoff with a retry cap, success checked on the changed file |

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
My agent runs nightly with no one watching. It retried a denied delete with a force flag. Review these settings.
```

The plugin ships an eval suite (`claude plugin eval plugins/agent-governance --no-publish`).
Measured 20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of
runs that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `nightly-agent-settings` | agent-permission-boundary-audit | 0.00 | 1.00 | 2 |

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
