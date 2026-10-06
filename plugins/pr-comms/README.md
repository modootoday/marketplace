# pr-comms

## What it does

Media targets and pitch angles for a PR pitch, checked against what was actually pasted: journalist beats and bylines marked verified or unverified, no contact details that are not on a source page, calendar deadlines compared with today and hooks tied to approved expertise only. It prepares a checkable worksheet; it does not write the pitch or profile anyone.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | yes, for the cases listed in Verify | measured 20261006 with gpt-6.1-sol |
| Grok CLI | yes | measured 20261006 on grok-4.7-build-fast; see Other runtimes |
| Gemini CLI | yes | measured 20261006 on gemini-3.8-flash; see Other runtimes |

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
| skill | `press-release-fact-and-quote-approval` | a release in which every sentence carries an approved fact id, quotes are copied verbatim from approved text, unsourced sentences are removed and listed, claims such as first or AI-powered are flagged and an approval checklist closes it (rests on web records of fabricated facts and quotes, medium evidence) |
| skill | `interview-briefing-fact-pack` | spokesperson briefing with likely and hostile questions, approved key messages, figures with source and date from pasted material only, a staleness flag past 12 months, bridge-back lines and a separate off-limits list (rests on two weak records) |

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

Codex CLI, measured 20261006 (Codex, gpt-6.1-sol / gpt-6.1-sol, 3 votes), both arms, 2 runs per arm:

| Case | Skill | Without | With |
| --- | --- | --- | --- |
| `press-release-quote-polish` | press-release-fact-and-quote-approval | 0.00 | 1.00 |
| `interview-brief-stale-figure` | interview-briefing-fact-pack | 0.00 | 1.00 |

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

### Other runtimes

Both arms, 2 runs per arm, 3 judge votes, the model as subject and judge. A row where the skill fired and With is 1.00 sets the runtime in the skill's verified-runtimes.

| Runtime | Model | Case | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- |
| Grok CLI | grok-4.7-build-fast | `press-release-quote-polish` | 0.50 | 1.00 | 2/2 | 20261006 |
| Antigravity CLI | gemini-3.8-flash-low | `press-release-quote-polish` | 0.00 | 1.00 | 2/2 | 20261006 |
| Gemini CLI | gemini-3.8-flash | `press-release-quote-polish` | 0.25 | 1.00 | 2/2 | 20261006 |

## License

MIT
