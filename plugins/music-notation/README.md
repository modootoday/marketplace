# music-notation

## What it does

Review MusicXML imports and proposed edits against explicit playback paths, sounding-pitch references, percussion bindings and approved beat boundaries while preserving musical content.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | untested | None |
| Codex CLI | partial | 0.160.1, gpt-6.1-sol supplied-fixture reasoning; repeat and percussion evidence collection only |
| Gemini CLI | untested | None |
| Grok CLI | untested | None |
| Antigravity CLI | untested | None |

Requirements: supplied score artifacts or observation reports and the task-specific owner references; no bundled executable or required application.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install music-notation@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add music-notation@modootoday
```

These are installation instructions, not measured installation results.

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `musicxml-repeat-playback-path-audit` | ordered measure visits, jump/pass context and termination against supplied playback |
| skill | `musicxml-written-sounding-pitch-roundtrip` | explicit written-to-sounding and linked tab reference across matched events |
| skill | `musicxml-percussion-instrument-binding` | declared note/score/MIDI IDs and approved sound map independently of display |
| skill | `ai-transcribed-score-meter-rebar-review` | approved beat boundaries, per-voice/chord cursor and sound/notated tie preservation |

## Failure mode

None. This plugin registers no hooks and runs no commands automatically. A review can remain unresolved when references or observations are missing.

## Configuration and how to disable

No configuration. Disable or remove it with the runtime's plugin controls.

## Data written

None by the plugin. Review artifacts are written only to a destination requested by the user.

## Verify

Twelve self-contained synthetic reasoning cases were compared on 2026-10-07 with Codex CLI 0.160.1, gpt-6.1-sol subject and judge, two runs per arm and three judge votes. One pitch case was rerun after a narrow correction-verification reporting improvement. No application import, playback, audio listening or rhythm recovery was executed. Scores are the share of replies passing every behavioral condition; raw scores remain visible when independent interpretation is unresolved.

| Skill | Normal case | Exception case | Missing-input case |
| --- | --- | --- | --- |
| musicxml-repeat-playback-path-audit | `musicxml-repeat-visits-match` | `musicxml-repeat-glyphs-no-return` | `musicxml-repeat-context-unobserved` |
| musicxml-written-sounding-pitch-roundtrip | `musicxml-pitch-canonical-match` | `musicxml-tab-only-octave-shift` | `musicxml-transpose-reference-missing` |
| musicxml-percussion-instrument-binding | `musicxml-percussion-binding-match` | `musicxml-percussion-added-instrument-switch` | `musicxml-percussion-map-unobserved` |
| ai-transcribed-score-meter-rebar-review | `musicxml-rebar-approved-voice-timeline` | `musicxml-rebar-unresolved-pickup` | `musicxml-rebar-audio-boundaries-missing` |

The raw table is marked (open) to prevent inference of an unmeasured runtime. Only the explicitly admitted Codex rows below support runtime metadata.

| Case | Skill | Without | With | Runs per arm | Interpretation |
| --- | --- | --- | --- | --- | --- |
| `musicxml-repeat-visits-match` | musicxml-repeat-playback-path-audit | 0.00 | 1.00 (open) | 2 | OPEN: version restatement; baseline path diagnosis correct |
| `musicxml-repeat-glyphs-no-return` | musicxml-repeat-playback-path-audit | 0.00 | 0.00 (open) | 2 | OPEN: conditional future-correction verification applied to inspection-only replies |
| `musicxml-repeat-context-unobserved` | musicxml-repeat-playback-path-audit | 0.50 | 1.00 (open) | 2 | Narrow actual-stop observation request coverage |
| `musicxml-pitch-canonical-match` | musicxml-written-sounding-pitch-roundtrip | 1.00 | 1.00 (open) | 2 | Regression only |
| `musicxml-tab-only-octave-shift` | musicxml-written-sounding-pitch-roundtrip | 0.00 | 0.50 (open) | 2 | Initial missing verification for one corrective proposal; baseline conditional grading OPEN |
| `musicxml-tab-only-octave-shift-r1` | musicxml-written-sounding-pitch-roundtrip | 0.00 | 1.00 (open) | 2 | Proposal verification coverage repaired; baseline only investigates, conditional grading OPEN |
| `musicxml-transpose-reference-missing` | musicxml-written-sounding-pitch-roundtrip | 0.00 | 1.00 (open) | 2 | OPEN: equivalent missing inputs expressed as statements versus requests |
| `musicxml-percussion-binding-match` | musicxml-percussion-instrument-binding | 0.00 | 1.00 (open) | 2 | OPEN: restatement versus implicit agreement |
| `musicxml-percussion-added-instrument-switch` | musicxml-percussion-instrument-binding | 0.00 | 1.00 (open) | 2 | OPEN: baseline diagnosis correct; no correction or success claimed |
| `musicxml-percussion-map-unobserved` | musicxml-percussion-instrument-binding | 0.00 | 1.00 (open) | 2 | Narrow joint source-binding and approved target-map collection |
| `musicxml-rebar-approved-voice-timeline` | ai-transcribed-score-meter-rebar-review | 0.00 | 1.00 (open) | 2 | OPEN: supplied arithmetic versus explicit no-listening disclaimer |
| `musicxml-rebar-unresolved-pickup` | ai-transcribed-score-meter-rebar-review | 0.00 | 0.00 (open) | 2 | Detailed chord/cursor boundary inspection plan omitted |
| `musicxml-rebar-audio-boundaries-missing` | ai-transcribed-score-meter-rebar-review | 0.00 | 0.00 (open) | 2 | Joint approved evidence and detailed cursor checks omitted |

Repeat evidence is limited to requesting an actual observed termination point: one baseline already requested it. Percussion evidence is limited to jointly collecting source binding, an approved target sound map and renderer/version/options; baseline replies already recognized sound as unknown. Neither establishes superior playback or sound diagnosis. Pitch and meter-rebar have no admitted effect case and remain unverified; pitch reporting improved, while the two meter-rebar planning failures remain unresolved. OPEN rows are excluded from effect claims and metadata.

Reproduce a comparison from the marketplace root:

```
node plugins/skill-factory/skills/codex-plugin-eval/scripts/codex-plugin-eval.mjs plugins/music-notation --case musicxml-repeat-visits-match --runs 2 -j 2 --model gpt-6.1-sol --judge-model gpt-6.1-sol --judge-votes 3 --auth proxy --isolation bwrap --threshold 0 --output-dir /tmp/musicxml-repeat-visits-match --json /tmp/musicxml-repeat-visits-match.json
```

Replace the case name and output destinations for each case. Supplied-fixture judgments measure reasoning only. A correct reply does not establish actual app compatibility, sounding output or transcription accuracy. Baseline success can provide regression evidence without establishing a skill effect.

### Other runtimes

Codex CLI reasoning comparisons only, gpt-6.1-sol subject and judge, two runs per arm and three judge votes. All other runtimes remain untested for these four skills.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `musicxml-repeat-context-unobserved` | musicxml-repeat-playback-path-audit | 0.50 | 1.00 | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `musicxml-percussion-map-unobserved` | musicxml-percussion-instrument-binding | 0.00 | 1.00 | 2/2 | 2026-10-07 |

These measurements used subscription Codex, with no metered runtimes. Reported USD cost and token prices were null, so USD conversion is unavailable. Cached input is included in input tokens; reasoning output is included in output tokens. No actual application compatibility is asserted.

## License

MIT
