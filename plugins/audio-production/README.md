# audio-production

## What it does

Audio from brief to file: a brand's sonic directions, scripts written for the ear, Korean TTS with spoken numbers, mixing to a measured loudness, and consistent sound effect sets.

Voice rights reviews are available to signed-in users.

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
| skill | `korean-tts-production` | Korean TTS from script to file: spoken numbers, pronunciation fixes, chunked synthesis, loudness and listening QA |
| skill | `sfx-design` | UI and video sound effects designed as one family with length, timbre and loudness rules and recorded licences |
| skill | `sonic-identity-sparring` | two or three distinct sonic directions for a brand, with the case against each and one cheap listening test |
| skill | `longform-narration-text-prep-and-proof` | long text prepared for synthetic narration (main text versus footnotes, pronunciation list with chosen readings) and the result proofed against a transcript by span, with chapter order and file sequence checks; it prepares and checks text and does not synthesize audio |

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
| `cafe-sound` | sonic-identity-sparring | 0.00 | 1.00 | 2 |
| `tts-numbers` | korean-tts-production | 0.00 | 1.00 | 2 |
| `ui-sound-set` | sfx-design | 0.00 | 1.00 | 2 |
| `academic-chapter-main-text-only` | longform-narration-text-prep-and-proof | 0.00 | 1.00 | 2 |

`academic-chapter-main-text-only` was measured on 20261005 with Sonnet as subject and judge. The skill rests on three first-person reports; treat the lift as moderate evidence.

korean-tts-production first scored lower with the plugin (1.00 without, 0.50 with) because it did not fire; after its description named store announcements and quick checks of numbers, a re-run fired in both runs and passed both (0.00 without, 1.00 with). The baseline varies between runs on this case, so treat the lift as weak evidence.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
