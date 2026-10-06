# everyday-support-boundaries

## What it does

An assistant that stays inside the help you chose when you talk through a hard time. It records the scope (listen only, information only, reflective questions, or your own step list), asks before changing mode, and never diagnoses, interprets or reframes. It is not a care service.
It also organises a person's own log into notes for their next session with a professional, and walks a
home audio-video fault through one-change-at-a-time tests.

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
claude plugin install everyday-support-boundaries@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add everyday-support-boundaries@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `support-conversation-scope-contract` | the chosen scope recorded and kept, permission asked before any change of mode, only the user's own step list recited, no diagnosis or reframing, the user's own contacts and the local emergency number for danger to life |
| skill | `personal-reflection-log-to-session-agenda` | the user's own entries listed with their words, counts of only the indicators they chose, questions for the professional each tied to a dated entry, no cause, diagnosis or better-or-worse reading; rests on two weak first-person records |
| skill | `home-av-signal-chain-isolation` | TV, player and soundbar faults (eARC or ARC loss) walked through the real wiring, one change per step with the expected result, model facts left to each manufacturer's page, and room-measurement setup checks before reading a graph; rests on two weak records and sits here because no consumer-support plugin exists |

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
I only want you to listen, not analyze me. It was a rough week. Please read my own three step list back one step at a time.
```

The plugin ships an eval suite (`claude plugin eval plugins/everyday-support-boundaries --no-publish`).
Measured 20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of
runs that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `hard-week-listen-only` | support-conversation-scope-contract | 0.00 | 1.00 | 2 |
| `mood-log-therapist-agenda` | personal-reflection-log-to-session-agenda | 0.00 | 1.00 | 2 |
| `earc-drops-when-tv-sleeps` | home-av-signal-chain-isolation | 0.00 | 1.00 | 2 |

The last two rows were measured 20261005 on Claude Code 2.1.289 with Sonnet as subject and judge.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
