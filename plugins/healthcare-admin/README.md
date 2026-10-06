# healthcare-admin

## What it does

Fact-preserving drafting of clinical notes: a clinician's own brief notes placed into a required template, empty fields marked NOT DOCUMENTED, model wording listed for the clinician to confirm.

This plugin is a preview: the full set is available to signed-in users.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: nothing is required.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install healthcare-admin@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add healthcare-admin@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `clinical-note-fact-preserving-structuring` | a clinician's short session notes or stated goals placed into a progress-note or treatment-plan template without added findings, diagnoses or risk statements; empty fields written NOT DOCUMENTED; a closing list of wording that is the model's own |

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
Put these notes into a SOAP template without adding anything: "Client anxious re work deadline, sleep poor 3 nights, practiced box breathing in session, agreed to log sleep."
```

The plugin ships an eval suite (`claude plugin eval plugins/healthcare-admin --no-publish`). Scores are the
share of runs that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm | Subject and judge |
| --- | --- | --- | --- | --- | --- |
| `soap-note-from-brief-notes` | clinical-note-fact-preserving-structuring | 0.00 | 1.00 | 2 | Sonnet, Sonnet (20261005) |

The skill rests on two weak records (both from therapists, no independent corroboration). The skill has one case; two more are needed for the three-case release gate.

The output is a draft for the clinician to edit and sign. It is not clinical advice and it adds no diagnosis, risk assessment or code.

## License

MIT
