# skill-factory

## What it does

Write agent skills that change behaviour: evals before the body, descriptions that trigger on the right requests, rules tied to the failures they prevent, and a measured delta before release.

Version 0.3.0 also includes four CLI evaluation harnesses for paired plugin runs,
skill activation evidence, scored cases, result JSON, and HTML reports. Their scripts
share helpers in `shared/`; distribute that directory together with `skills/`.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | authoring and iteration skills measured; evaluation harness smoke checked | 0.160.1, gpt-6.1-sol / gpt-6.1-sol, 3 votes, 20261006 (see Verify); OAuth harness smoke below |
| Grok CLI | evaluation harness smoke checked; skill activation unmeasured | 1.0.46, grok-4.7, OAuth harness smoke below |
| Gemini CLI | help and argument validation checked; inference untested in this release | Harness developed against 0.62.0; no model calls in this release |
| Antigravity CLI | help and argument validation checked; inference untested in this release | Harness developed against agy 1.3.0; no model calls in this release |

Requirements: The authoring and iteration skills require no external tools. Evaluation
scripts require Node.js 22 or later, Linux with bubblewrap (`bwrap`) and permission to
create namespaces, and the chosen CLI (`codex`, `grok`, `gemini`, or `agy`) on PATH or
selected with `--cli`. Log in outside the harness before using subscription OAuth.
Gemini Vertex authentication additionally requires `gcloud`, application default
credentials, and a configured project and location. API-key runs can incur charges.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install skill-factory@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add skill-factory@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `domain-skill-authoring` | new skills written evals first, with a triggering description and rules tied to the failures they prevent |
| skill | `eval-iteration` | reading a skill eval result and deciding what to change next |
| skill | `codex-plugin-eval` | paired plugin evaluation using Codex CLI |
| skill | `grok-plugin-eval` | paired plugin evaluation using Grok CLI |
| skill | `gemini-plugin-eval` | paired plugin evaluation using Gemini CLI |
| skill | `antigravity-plugin-eval` | paired plugin evaluation using Antigravity CLI |

Each evaluation entrypoint is `skills/<runtime>-plugin-eval/scripts/<runtime>-plugin-eval.mjs`.
Run it with `--help` before supplying a plugin directory. The scripts import
`../../../shared/` relative to their own location and use a common flag and result schema.

The shared modules provide isolation, credential proxying, allowance inspection,
argument validation, snapshot pricing, Vertex configuration, plugin-copy sanitation,
event normalization, credential leak counts, and credential state comparison. The
bundled canary plugin uses synthetic fixtures. No credentials are distributed.

## Failure mode

The plugin registers no hooks. Evaluation scripts run only when invoked; missing
CLIs, authentication, manifests, or namespace support stop the run. Evaluations may
consume subscription allowance or paid API usage. Cost estimates use snapshot prices;
budgets stop future calls after usage is observed and can overshoot during in-flight calls.

## Configuration and how to disable

Evaluation flags select authentication, models, cases, output directories, budgets,
and optional hooks or selected MCP servers. Proxy authentication is the default for
Codex, Grok, and Gemini; Antigravity requires explicit `--auth oauth`. Under bubblewrap,
OAuth login files are bound read-only for all four runtimes. Refresh expired logins
outside the harness. Antigravity refuses MCP import and tool-allowance flags; Gemini
OAuth supports Vertex ADC rather than personal Google OAuth. See each skill for details.

Disable it the way your runtime disables plugins.

## Data written

Evaluation runs write `aggregate-result.json` and `report.html` to their output
directory, defaulting to the evaluated plugin's `evals/results/<timestamp>/`.
Temporary isolated run directories are removed unless `--keep-temp` is selected.
Retained traces and imported MCP configuration may contain sensitive output; keep
them outside distributed plugins. Credential state helpers write hashes and metadata
to the requested snapshot file and never print credential contents.

## Verify

Ask for something the plugin covers:

```
Write me a skill that helps our team write good commit messages.
```

The plugin ships an eval suite (`claude plugin eval plugins/skill-factory --no-publish`). Measured
20261004 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `new-skill-request` | domain-skill-authoring | 0.00 | 1.00 | 2 |
| `readme-typo-not-skill` | negative: the skill must not fire | 1.00 | 1.00 | 2 |
| `skill-never-fires` | domain-skill-authoring | 0.00 | 1.00 | 2 |

Codex CLI 0.160.1, 20261006, after integrating the evaluation harnesses: gpt-6.1-sol
subject and judge, 3 judge votes, 2 runs per arm, concurrency 2, and threshold 0.

| Case | Skill | Without | With | Fired |
| --- | --- | --- | --- | --- |
| `eval-table-readings` | eval-iteration | 0.00 | 1.00 | 2/2 |
| `new-skill-request` | domain-skill-authoring | 0.00 | 1.00 | 2/2 |
| `skill-never-fires` | eval-iteration | 0.00 | 1.00 | 2/2 |
| `readme-typo-not-skill` | negative regression check | 1.00 | 1.00 | 0/2 |

`eval-iteration` is new (reading an eval result table: description first, both arms, rerun on
a single judge failure, references independent of the eval prompt, two fix rounds at most);
`eval-table-readings` rests on the measurement lessons of one internal repair series, stated generically.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

OAuth harness smoke checks on 20261006 used an unchanged synthetic reply case,
one subscription-backed subject run per runtime, and a regex grader with zero judge
calls. These scores verify harness operation and read-only login mounts; activation
and behavioural benefit of the four new evaluation skills remain unmeasured.

| Harness | CLI | Model | Smoke score | Subject runs | Judge calls | Login mount | Login unchanged |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex | 0.160.1 | gpt-6.1-sol | 1.00 | 1 | 0 | read-only | yes |
| Grok | 1.0.46 | grok-4.7 | 1.00 | 1 | 0 | read-only | yes |

All four integrated entrypoints pass `--help` and argument validation. Gemini and
Antigravity made no model calls for this release.

## License

MIT
