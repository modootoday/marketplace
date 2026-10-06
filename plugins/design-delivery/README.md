# design-delivery

## What it does

Design handoff checks: every wireframe element mapped to a named component of the design system before a prototype is built, built UI diffed against the design's values, colour contrast of component states computed, and handoff state matrices whose missing states become questions for the designer. It plans and checks only; it builds nothing.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | yes, except handoff-state-and-edge-case-spec (the model follows a request for filler copy) | Codex harness, model gpt-6.1-sol, 20261006 (see Verify) |
| Grok CLI | yes | measured 20261006 on grok-4.7-build-fast for 1 case; see Other runtimes |
| Gemini CLI | yes | measured 20261006 on gemini-3.8-flash; see Other runtimes |

Requirements: Nothing is required.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install design-delivery@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add design-delivery@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `prototype-from-wireframe` | wireframe elements mapped to supplied components, gaps and stand-ins flagged, tokens kept, journey states checked; rests on one weak record |
| skill | `design-to-code-fidelity-diff` | built values compared with design values per component (expected, built, token), hard-coded values and substituted components flagged, nodes whose design data did not load left uncompared; new skill, medium evidence from forum threads |
| skill | `ui-state-contrast-check` | WCAG contrast ratios computed in code for component states and non-text elements, reported to two decimals against the right threshold; new skill, rests on two first-person failure reports |
| skill | `handoff-state-and-edge-case-spec` | a state matrix per component (specified, missing, not applicable) with missing states turned into designer questions, no invented copy or behaviour; new skill, weak to medium evidence; works in Claude Code, not yet in Codex (see Verify) |

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
Here is my wireframe element list, the design system's components and tokens. Plan the move to a prototype.
```

The plugin ships an eval suite (`claude plugin eval plugins/design-delivery --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of
runs that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `wireframe-to-prototype` | prototype-from-wireframe | 0.00 | 1.00 | 2 |
| `handoff-missing-states` | handoff-state-and-edge-case-spec | 0.00 | 1.00 | 2 (Sonnet subject and judge, 20261006) |
| `handoff-missing-states` | handoff-state-and-edge-case-spec | 0.00 | 1.00 | 2 (Opus subject and judge, 20261006) |

The three skills added 20261006 were measured with the Codex harness (`codex-eval.mjs`), 2 runs per arm, 3 judge votes:

| Case | Skill | Without | With | Fired | Runs per arm | Subject and judge |
| --- | --- | --- | --- | --- | --- | --- |
| `design-code-diff-connector-403` | design-to-code-fidelity-diff | 0.00 | 1.00 | 2/2 | 2 per arm | Codex, gpt-6.1-sol / gpt-6.1-sol, 3 votes, 20261006 |
| `state-contrast-ratios` | ui-state-contrast-check | 0.00 | 1.00 | 2/2 | 2 per arm | Codex, gpt-6.1-sol / gpt-6.1-sol, 3 votes, 20261006 |
| `handoff-missing-states` | handoff-state-and-edge-case-spec | 0.00 | 0.00 | 2/2 | 2 per arm | Codex, gpt-6.1-sol / gpt-6.1-sol, 3 votes, 20261006; the same 0.00 / 0.00 with gpt-6-astra |

`handoff-missing-states` depends on the runtime. In Claude Code (Sonnet and Opus) the skill keeps missing states as designer questions and invents no copy. Under Codex (gpt-6.1-sol and gpt-6-astra) the model reads the skill but still writes the filler copy the requester asked for, so the case fails there. A stricter version of the skill (a precedence rule, a placeholder marker and a fixed output layout) left both Codex models at 0.00 and lowered Sonnet to 0.75, so it was not kept. Both results are stated, not hidden. Each of the three new skills has one case, so none has the three-case release gate yet.

The plugin reads only the lists, values and snippets you paste.

### Other runtimes

Grok CLI, both arms, 2 runs per arm, 3 judge votes, the model as subject and judge, 20261006. A row where the skill fired and With is 1.00 sets the runtime in the skill's verified-runtimes.

| Runtime | Model | Case | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- |
| Grok CLI | grok-4.7-build-fast | `state-contrast-ratios` | 0.25 | 1.00 | 2/2 | 20261006 |
| Antigravity CLI | gemini-3.8-flash-low | `state-contrast-ratios` | 0.50 | 1.00 | 2/2 | 20261006 |
| Gemini CLI | gemini-3.8-flash | `state-contrast-ratios` | 0.00 | 1.00 | 2/2 | 20261006 |

## License

MIT
