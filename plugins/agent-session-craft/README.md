# agent-session-craft

## What it does

Habits for long agent sessions that one person steers: a status the reader can act
on, remaining work run in waves the user picks with standing instructions kept
across context compaction, large uniform jobs fanned out to subagents from one
brief, and one living document per workstream kept current in place.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | yes; eval suite measured 20261005 (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: None.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install agent-session-craft@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add agent-session-craft@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `session-status-briefing` | done with proof, in progress, blocked and the next decision, in the user's language; scope growth listed; a resumed session runs a preflight first |
| skill | `followup-wave-loop` | remaining work as a numbered table with recommended order and forgotten-if-deferred marks, one chosen wave at a time, gates respected, deploy targets named, standing instructions kept as session rules |
| skill | `subagent-fanout-brief` | one BRIEF file, chunks of 16 to 25 items with disjoint ownership, a hard-rules block, integration notes, one integration agent, only the coordinator commits |
| skill | `living-doc-sync` | one document per workstream updated in place: checklist, dated measurements, open decisions, restructured rather than appended, link returned each time |

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
We have been at this for six hours. Where are we?
```

The plugin ships an eval suite (`claude plugin eval plugins/agent-session-craft --no-publish`):

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `status-after-long-run` | session-status-briefing | 1.00 | 1.00 | 2 |
| `next-wave-table` | followup-wave-loop | 0.00 | 0.50 | 2 |
| `fanout-forty-files` | subagent-fanout-brief | 0.00 | 1.00 | 2 |
| `workstream-doc-update` | living-doc-sync | 0.00 | 1.00 | 2 |

Measured 20261005 on Claude Code 2.1.288 with Sonnet as judge. The skill fired in every run.
session-status-briefing shows no lift: the baseline model already passed its case. A case that already passes without the plugin stays in the suite to catch
a regression, not as evidence that the skill helps.

## License

MIT
