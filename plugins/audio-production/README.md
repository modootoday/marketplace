# audio-production

## What it does

Spoken audio done properly: scripts written for the ear with spoken numbers and a pronunciation list, and voice tracks cleaned, ducked under music and normalised to a measured loudness target with ffmpeg.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: ffmpeg for audio-mix-master.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install audio-production@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add audio-production@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `voice-script-writing` | scripts for the ear: spoken numbers and English, one-breath sentences, pauses, pronunciation list, length estimate |
| skill | `audio-mix-master` | speech cleaned, ducked under music and normalised with two-pass loudnorm to a stated target, then measured |

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
My podcast is quieter than others and peaks hit 0 dB after one loudnorm pass.
```

The plugin ships an eval suite (`claude plugin eval plugins/audio-production --no-publish`). Measured
20261004 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `ad-script-for-tts` | voice-script-writing | 0.50 | 1.00 | 2 |
| `podcast-louder` | audio-mix-master | 0.50 | 1.00 | 2 |
| `wav-to-mp3-not-mastering` | negative: the skill must not fire | 1.00 | 1.00 | 3 |

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
