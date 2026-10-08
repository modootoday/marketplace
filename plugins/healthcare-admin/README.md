# healthcare-admin

## What it does

Fact-preserving drafting of clinical notes: a clinician's own brief notes placed into a required template, empty fields marked NOT DOCUMENTED, model wording listed for the clinician to confirm.

This plugin is a preview: the full set is available to signed-in users.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | narrow supplied-fixture effects | codex-cli 0.161.0, 2026-10-08; treatment-plan and context-corrected DAP administrative review boundaries only (see Other runtimes) |
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

The skill rests on two weak records (both from therapists, no independent corroboration). As of the recorded 20261006 cut, it had one case and needed two more for the three-case release gate.
It now has three cases: the original case and two supplied-fixture additions. This is case coverage, not a claim that the complete three-case quality gate passed. The original DAP comparison retains its raw failure and judge-reason uncertainty; a separate context-corrected comparison below supports a narrow administrative review effect.

The output is a draft for the clinician to edit and sign. It is not clinical advice and it adds no diagnosis, risk assessment or code.

### Other runtimes: supplied-fixture closeout

Measured on 2026-10-08 with gpt-6.1-sol as subject and judge, two runs per arm and three judge votes. Scores below are original behavioural aggregates. Process exit zero at threshold zero is not quality evidence.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `dap-client-report-versus-observed-action` | clinical-note-fact-preserving-structuring | 0.00 | 0.00 | 2/2 | 2026-10-08 |
| Codex CLI | gpt-6.1-sol | `treatment-plan-supplied-target-not-achievement` | clinical-note-fact-preserving-structuring | 0.00 | 1.00 | 2/2 | 2026-10-08 |

The treatment-plan case supports only the administrative review boundary: own wording and empty fields for confirmation/deletion, clinician edit/sign-off and pasted-notes-only verification limits. Both arms already preserve the target as proposed rather than achieved. The original DAP comparison retains twelve FAIL votes, but all six With reasons allege normalized factual wording despite preservation of the five supplied sentences and explicit review/sign-off boundaries. That historical judge-reason mismatch is not a confirmed clinical-content defect, and the original score is not overridden. No actual clinical record, treatment outcome or system access was verified.

### Other runtimes: context-corrected DAP comparison

Measured on 2026-10-08 with Codex CLI 0.161.0, gpt-6.1-sol subject and judge, two runs per arm and three judge votes. Only the grader Context was expanded to include the complete supplied facts; PASS criteria and final acceptance guidance remained byte-identical.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `dap-client-report-versus-observed-action` | clinical-note-fact-preserving-structuring | 0.00 | 1.00 | 2/2 | 2026-10-08 |

Six PASS and six FAIL votes support only the clinician review/sign-off and pasted-notes-only verification boundary that both new baselines omit. Both With replies preserve the supplied facts and identify owned labels and missing-field markers. The historical normalization allegation did not recur. New subject answers were generated, so this comparison does not isolate the causal effect of grader Context. It proves no actual clinical verification, EHR access or record writing; historical scores and votes remain unchanged.

## License

MIT
