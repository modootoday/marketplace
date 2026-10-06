# pr-comms

## What it does

Media targets and pitch angles for a PR pitch, checked against what was actually pasted: journalist beats and bylines marked verified or unverified, no contact details that are not on a source page, calendar deadlines compared with today and hooks tied to approved expertise only. It prepares a checkable worksheet; it does not write the pitch or profile anyone.

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
claude plugin install pr-comms@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add pr-comms@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `media-target-and-angle-verification` | a media list and angle worksheet from pasted outlet pages: beat, byline URL and date or unverified, deadline status against today, approved-topic fit, a human-check list for sensitive or fast-moving news and a manual verification list |

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
Find angles and three journalist candidates for our client; the October special has a deadline of Sep 12 and today is Oct 5.
```

The plugin ships an eval suite (`claude plugin eval plugins/pr-comms --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `stale-calendar-no-browsing` | media-target-and-angle-verification | 0.25 | 1.00 | 2 |

The skill rests on three first-person reports (stale lists, calendar-based angles, reactive news screening); treat the lift as moderate evidence.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
