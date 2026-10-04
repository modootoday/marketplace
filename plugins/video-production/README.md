# video-production

## What it does

Video work that can be executed and verified: briefs and storyboards someone else can produce from, Remotion explainers rendered from frame math, and talking-head edits with ffmpeg that keep a list of every cut.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: Node.js for remotion-explainer; ffmpeg for remotion-explainer and talking-head-edit.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install video-production@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add video-production@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `remotion-explainer` | Remotion videos driven by frame math, with assets loaded before render and the output verified with ffprobe |
| skill | `talking-head-edit` | talking-head edits with ffmpeg: silences cut with margins, voice levelled, subtitles re-timed, every cut listed |
| skill | `video-brief-storyboard` | a video brief and a scene table someone else can produce from, with durations that add up and sourced assets |

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
Make a storyboard for a 20-second Instagram Reel that most people watch with sound off.
```

The plugin ships an eval suite (`claude plugin eval plugins/video-production --no-publish`). Measured
20261004 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `fps-question-negative` | negative: the skill must not fire | 1.00 | 1.00 | 2 |
| `reel-storyboard` | video-brief-storyboard | 0.00 | 1.00 | 2 |
| `remotion-timers` | remotion-explainer | 1.00 | 1.00 | 2 |
| `remove-silences` | talking-head-edit | 1.00 | 1.00 | 2 |

remotion-explainer, talking-head-edit show no lift yet: the baseline model already passed these cases, or both arms failed. The cases stay as regression checks.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
