# video-production

## What it does

Video work that can be executed and verified: briefs and storyboards someone else can produce from, Remotion explainers rendered from frame math, talking-head edits with ffmpeg that keep a list of every cut, and Korean subtitles timed to the voice by forced alignment.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | yes | Codex CLI with gpt-6.1-sol, the new case only (see Verify) |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: Node.js for remotion-explainer; ffmpeg for remotion-explainer and talking-head-edit; Python 3 for tts-subtitle-sync, plus torch, torchaudio and transformers for its forced aligner.

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
| skill | `product-demo-capability-evidence-map` | version/mode-bound feature and scene claims separated into documented, observed, simulated and unconfirmed evidence |
| skill | `subtitle-media-timebase-check` | subtitle/media clock mapping from independent fit and held-out anchors, preserving intentional overlap |
| skill | `remotion-explainer` | Remotion videos driven by frame math, with assets loaded before render and the output verified with ffprobe |
| skill | `talking-head-edit` | talking-head edits with ffmpeg: silences cut with margins, voice levelled, subtitles re-timed, every cut listed |
| skill | `video-brief-storyboard` | a video brief and a scene table someone else can produce from, with durations that add up and sourced assets |
| skill | `tts-subtitle-sync` | Korean subtitles and motion cues timed to the voice by forced alignment or TTS alignment, mapped from spoken to displayed text, broken only between eojeol |
| skill | `generated-video-clip-spec-check` | an AI-generated clip tested against its brief with measured frame checks (locked camera, loop seam, stray text, prop era, joins), then a prompt fix limited to the failing constraint and a retry cap |
| skill | `transcript-cut-boundary-check` | clips and paper edits from a timed transcript checked so each cut lands on a complete thought and word boundary, with handles, preserved pauses, a filler count and a quoted timeline; it plans the cuts and renders nothing |
| skill | `lipsync-viseme-timeline-check` | a mouth-animation plan for a cartoon or non-human character, a song or long audio: viseme timeline with a length check, closed-mouth mapping, per-segment frame counts and sampled-frame verification; it checks and plans and does not render |
| skill | `scripted-code-animation-verification` | a code-driven animation checked against its required event order, deterministic timeline, scene continuity, reused motion, mechanical phase and preview-versus-export timing; it verifies and does not generate the animation |
| skill | `subject-continuity-reference-sheet-check` | fictional or user-owned characters in generated shots checked against the approved reference sheet: fixed traits split from per-episode state, each re-appearance labelled match, intended change, drift or cannot judge with frame evidence, approval left to the director; it checks and does not generate footage or identify real people |

The newly added `subtitle-media-timebase-check` reviews subtitle/media clock mapping from independent fit and held-out anchors, preserving intentional overlap. It ships three self-contained synthetic cases (normal, exception and missing input). These cases were compared as supplied-fixture reasoning; the results and limitations are recorded under Verify. Existing sibling-skill runtime results do not verify this skill.

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
| `subtitles-from-whisper` | tts-subtitle-sync | 0.00 | 1.00 | 2 |
| `roman-market-locked-shot` | generated-video-clip-spec-check | 0.00 | 1.00 | 2 |
| `podcast-clip-incomplete-end` | transcript-cut-boundary-check | 0.00 | 1.00 | 2 |
| `bird-beak-long-narration` | lipsync-viseme-timeline-check | 0.00 | 1.00 | 2 |
| `rabbit-train-timeline` | scripted-code-animation-verification | 0.00 | 1.00 | 2 |
| `webseries-reference-sheet-drift` | subject-continuity-reference-sheet-check | 0.00 | 0.83 | 2 and 3 |
| `webseries-reference-sheet-drift` (Opus) | subject-continuity-reference-sheet-check | 0.00 | 1.00 | 2, Opus subject and judge |

remotion-explainer, talking-head-edit show no lift yet: the baseline model already passed these cases, or both arms failed. The cases stay as regression checks. The Codex scores below add a case with lift for remotion-explainer and talking-head-edit.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

Codex scores, measured 20261006 with the Codex eval harness, both arms, 2 runs per arm, subject gpt-6.1-sol, judge gpt-6.1-sol with 3 votes:

| Case | Skill | Without | With | Skill fired |
| --- | --- | --- | --- | --- |
| `three-scene-durations` | remotion-explainer | 0.00 | 1.00 | 2 of 2 |
| `false-start-word-boundary` | talking-head-edit | 0.25 | 1.00 | 2 of 2 |

### Added skill reasoning comparisons

The added `subtitle-media-timebase-check` was measured on 2026-10-07 with Codex CLI 0.160.1, gpt-6.1-sol subject and judge, two runs per arm and three judge votes, in a read-only empty application workspace. All three initial comparisons and their raw scores are retained. There is no admitted applicable effect case; this skill's minimum-effect requirement remains unmet. Regression agreement and OPEN judging interpretations do not establish an effect. No application workflow or actual artifact transformation was executed.

| Case | Skill | Without | With | Runs per arm | Interpretation |
| --- | --- | --- | --- | --- | --- |
| `subtitle-offset-heldout` | subtitle-media-timebase-check | 0.00 | 1.00 (open) | 2 | OPEN: held-out anchor already separated from fit, failure only explicit independent wording. |
| `subtitle-edit-heldout-overlap` | subtitle-media-timebase-check | 0.00 | 0.00 (open) | 2 | OPEN: diagnostic-next-check task does not yet establish a correction; future corrected-artifact acceptance requirement over-applied. One With reply omits explicit nonexecution disclosure but claims no playback. |
| `subtitle-missing-clock-anchors` | subtitle-media-timebase-check | 0.00 | 1.00 (open) | 2 | OPEN: cue-specific verification and wider-track coverage distinguished; unconditional early/middle/late and player-environment wording requirements exceed established scope. |

Reproduce one reasoning comparison from the marketplace root:

```
node plugins/skill-factory/skills/codex-plugin-eval/scripts/codex-plugin-eval.mjs plugins/video-production --case subtitle-offset-heldout --runs 2 -j 2 --model gpt-6.1-sol --judge-model gpt-6.1-sol --judge-votes 3 --auth proxy --isolation bwrap --threshold 0 --output-dir /tmp/subtitle-offset-heldout --json /tmp/subtitle-offset-heldout.json
```

### Other runtimes

Codex reasoning rows for the added skill only. The (open) marker excludes them from verified-runtimes inference; existing measured sibling-skill records retain their scope. No new runtime badge is supported. Other runtimes remain untested for the added skill.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `subtitle-offset-heldout` | subtitle-media-timebase-check | 0.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `subtitle-edit-heldout-overlap` | subtitle-media-timebase-check | 0.00 | 0.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `subtitle-missing-clock-anchors` | subtitle-media-timebase-check | 0.00 | 1.00 (open) | 2/2 | 2026-10-07 |

Measurements used subscription Codex and no metered runtimes. USD cost and token prices were null, so USD conversion is unavailable. Cached input is a subset of input tokens; reasoning output is included in output tokens.

### Other runtimes: capability evidence

Measured 2026-10-10 with codex-cli 0.161.0, gpt-6.1-sol subject and judge, two runs per arm and three judge votes. These are supplied-text reasoning comparisons in an empty read-only application workspace. No application investigation, file operation, render or playback was executed. Only the changed-mode case establishes lift; the mixed evidence and unrelated colour question are regression checks.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | capability-changed-mode-boundary | product-demo-capability-evidence-map | 0.00 | 1.00 | 2/2 | 2026-10-10 |
| Codex CLI | gpt-6.1-sol | capability-mixed-demo-evidence | product-demo-capability-evidence-map | 1.00 | 1.00 | 2/2 | 2026-10-10 |
| Codex CLI | gpt-6.1-sol | capability-logo-colour-negative | negative: no capability skill | 1.00 | 1.00 | 0/2 | 2026-10-10 |

The comparison tests version/mode-specific evidence boundaries. A simulated screen or an old capture cannot certify current production capabilities. Subscription usage has no measured USD conversion here; metered runtimes were not used.

## License

MIT
