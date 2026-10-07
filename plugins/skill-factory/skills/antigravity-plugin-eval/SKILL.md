---
name: antigravity-plugin-eval
description: Evaluate a plugin's skill activation and answer quality with Antigravity CLI, paired with and without the plugin, scored cases, JSON results, and an HTML report. Use for plugin regressions and release checks.
metadata:
  tier: open
  level: L3
  domain: agent-workflow
  install: optional
  keywords: [plugin eval, antigravity, ablation, skill activation, regression]
  requires:
    bin: [node, bwrap, agy]
  approval: scripts
---

# Antigravity plugin evaluation

Use this script for a plugin eval suite compatible with the case/grader layout of claude plugin eval. Keep this skill inside the complete skill-factory plugin: its relative imports require ../../shared from the skill directory. Run only evaluation calls authorized by the user, using their chosen login and spending limits.

## Requirements

- Node.js 22 or later; agy CLI tested at 1.3.0, installed on PATH or selected with --cli.
- Linux with bubblewrap (bwrap) on PATH and permission to create namespaces for default isolation.
- Log in with agy outside the harness. The login directory must contain antigravity-oauth-token; this harness does not persist credential refreshes.
- Plugin directory at <marketplace>/plugins/<plugin>, with evals/<case>/prompt.md and graders/*.md. Codex requires the marketplace's .claude-plugin/marketplace.json; Gemini and Antigravity require gemini-extension.json.
- Keep the plugin's shared directory next to skills when installing or distributing these skills.

## Quick start

From this skill directory:

```sh
node scripts/antigravity-plugin-eval.mjs --help
node scripts/antigravity-plugin-eval.mjs ./marketplace/plugins/example --model MODEL --runs 1 --ablation none --judge-votes 1 --auth oauth --json --output-dir ./results
```

Model calls can consume paid usage. Check the subscription allowance with node ../../shared/runtime-usage.mjs --json agy; this read-only helper does not invoke inference. An unavailable allowance is not proof that a run is free. Regex and tool-call graders require no judge calls; llm graders do.

Named Gemini presets such as Gemini VERSION Flash (High) already select their effort. The harness omits --effort for these presets and records the preset's actual level. An explicit conflicting --effort or --judge-effort is refused before authentication and inference. Other model identifiers retain the native effort flag.

## Flags

Place the plugin directory before variadic flags. All four scripts share these names, meanings, and help layout; runtime restrictions are explicit errors.

| Flag | Meaning |
| --- | --- |
| --eval-dir <dir> | Eval directory, default manifest experimental.evals or evals |
| --case <glob> | Repeat to select case names |
| --tag <tags...> | Select cases by skill tags |
| --runs <n> | Positive runs per arm; default case frontmatter or 3 |
| -j, --concurrency <1-8> | Shared subject and judge process limit; default 1 |
| --model <id> | Subject model; default runtime configuration |
| --judge-model <id> | Judge model; default subject model |
| --effort <level> | Reasoning effort; default low, subject to runtime support |
| --judge-effort <level> | Judge effort; default subject effort |
| --judge-votes <odd n> | Positive odd vote count; default 3 |
| --ablation none\|with-without | With arm only or both arms; default with-without |
| --threshold <0..1> | Passing score; default 1 |
| --json [file.json] | Print result JSON or write the specified file |
| --output-dir <dir> | Result directory; default evals/results/<timestamp> |
| --report <path> | HTML report; default output-dir/report.html |
| --price-in <usd/1M> | Override input price for subject and judge |
| --price-out <usd/1M> | Override output price for subject and judge |
| --price-cached <usd/1M> | Override cached input price |
| --max-cost-usd <usd> | Stop new calls at observed estimated cost; requires prices |
| --max-tokens <n> | Stop new calls at observed input plus output tokens |
| --timeout <seconds> | Positive subject and judge timeout; default 600 |
| --work <dir> | Temporary run parent; default OS temp directory |
| --cli <bin> | Runtime executable; default CLI on PATH |
| --runtime-lock <file> | Verify CLI version, launch artifacts and Node before authentication |
| --isolation bwrap\|none | Default bwrap; none disables filesystem and environment isolation |
| --auth proxy\|oauth\|api-key | Default proxy; unsupported modes are refused |
| --auth-from <dir> | Login directory or Gemini ADC directory |
| --api-key-env <NAME> | Source variable for api-key authentication only |
| --suite-minutes <n> | Required proxy credential validity; default 30 |
| --project <id> | Vertex project; default environment or gcloud configuration |
| --location <name> | Vertex location; default environment or gcloud configuration |
| --mcp <names...> | Selected servers from this runtime configuration, subjects only |
| --mocks off | Only real selected MCP servers are supported |
| --allow-real-servers | Compatibility flag for real selected MCP servers |
| --allow-tools <tools...> | Enable mapped Write, Edit, Bash tools |
| --hooks | Enable plugin hooks in with arm |
| --scaffold | Run case scaffold_script |
| --keep-temp | Retain run directories and traces |
| --no-publish, --publish-report, --trust-plugin, --no-scaffold, --verbose | Accepted compatibility flags; no effect |
| -h, --help | Show this help without loading configuration or credentials |

--codex, --grok, --gemini, and --agy remain runtime-specific executable aliases. Prefer --cli in reusable commands. --keep aliases --keep-temp.

For a qualified installation, capture a private lock with node ../../shared/runtime-contract.mjs capture antigravity ./runtime-lock.json, then pass --runtime-lock ./runtime-lock.json to this evaluator. Capture inspects --version with a fresh HOME and scrubbed environment; it makes no inference call. The lock records CLI entry/package hashes, Codex native payloads, Gemini bundle files and the harness Node binary. It excludes transitive dependencies, native API schemas and credentials. Capture is a snapshot, not qualification or a signature; retain evidence from authorized smoke/regression checks separately. Existing locks cannot be overwritten by capture. After an upgrade, repeat those checks before creating a replacement lock. Keep locks outside distributed plugins because they record absolute installation paths.

## Authentication and sandbox visibility

Pass --auth oauth explicitly. The default proxy mode is refused, as is api-key, because this harness cannot reliably route Antigravity model requests through a credential proxy. OAuth exposes antigravity-oauth-token read-only. --isolation none is refused. --api-key-env is unavailable.

Under bwrap, subjects and judges see system binaries/libraries, the CLI installation, their own writable run directory, and required TLS/DNS files. Network access is available. Proxy mode exposes a loopback URL and a per-suite dummy key, while the real login stays in the host harness process. The proxy restricts API paths, not arbitrary network access or token volume. It does not make a malicious plugin harmless.

Only --mcp names from this runtime's user configuration are imported. Selected MCP commands, arguments, and configured environment values are visible to the subject sandbox; their executable/package paths are bound read-only. Plugin-bundled MCP definitions are stripped from installed copies. Judges get no MCP servers. There is no mock recorder; --mocks accepts off only.

--hooks and --scaffold execute plugin code. --allow-tools maps Write/Edit/Bash to the runtime's available gates. With --isolation none the full operator environment and readable filesystem are available. Runtime restrictions in the table below still apply. Authentication records omit credential values; keep-temp retains traces and generated config, which can contain MCP configuration values or API-key output if a plugin echoes them.

## Result JSON

The script always writes aggregate-result.json and report.html in the output directory. --json also prints JSON; --json file.json writes it. Top-level fields are identical across runtimes:

```json
{
  "schemaVersion": 1,
  "runtime": "antigravity",
  "runtimeVersion": "CLI version string",
  "startedAt": "ISO timestamp",
  "durationSeconds": 0,
  "costUsd": null,
  "partial": false,
  "partialReason": null,
  "tokens": {},
  "suite": {},
  "cases": [],
  "aggregates": {}
}
```

suite records models, effort, votes, filters, isolation, authentication mode/source, price selection, ceilings, plugins, and notes. cases contain with/without arms, graders, scores, tokens, skill activation, and MCP calls. aggregates summarize scores and failures. Ungraded runs have null scores. Runtime-specific evidence may appear inside run records. partialReason is max-tokens, max-cost-usd, interrupted, or null. Raw traces are retained only with --keep-temp.

## Exit codes

| Code | Meaning |
| --- | --- |
| 0 | Completed; scored cases meet threshold |
| 1 | A scored case is below threshold |
| 2 | Cost or token budget stopped new calls; partial results written |
| 3 | Every launched run failed before answering |
| 64 | Invalid arguments, configuration, unsupported mode, or missing auth |
| 70 | Harness, executable, setup infrastructure, or unexpected error |
| 130 | Interrupted; partial results written when possible |

## Cost notes

shared/pricing.mjs holds model-specific snapshot prices in USD per million tokens. These are estimates, not a current provider quote or subscription charge. Unknown models report null cost unless --price-in and --price-out supply the missing rates. Each override replaces its rate for both models; explicit price-in defaults cached input to that price unless price-cached is supplied. Input includes cached tokens; cached input is discounted once. Output includes reasoning tokens where the CLI includes them in output usage.

--max-cost-usd refuses to run when either model lacks prices. --max-tokens counts observed input plus output across subjects and judges. Both stop future calls after completed usage is recorded; concurrent and in-flight calls can exceed the ceiling. They are not provider billing caps. A zero ceiling launches no model calls. Tool/network charges and unreported auxiliary requests are outside these estimates. Grok's native total_cost_usd does not replace the common pricing mechanism.

## Known limits and runtime differences

| Runtime | CLI tested | Authentication | Configuration and plugin format | Runtime limits |
| --- | --- | --- | --- | --- |
| Codex | 0.160.1 | Proxy default using ChatGPT login; OAuth or CODEX_API_KEY | CODEX_HOME/config.toml or ~/.codex/config.toml; marketplace manifest and Claude plugin | Skill reads inferred from command events; OAuth login bind is read-only; refresh the login outside the harness; bwrap mounts temp CODEX_HOME at /eval-codex |
| Grok | 1.0.46 | Proxy default using Grok session; OAuth or XAI_API_KEY | GROK_HOME/config.toml or ~/.grok/config.toml; Claude plugin | Native streaming skill events; provider cost may differ from common token-price estimate; OAuth login bind is read-only; refresh the login outside the harness |
| Gemini | 0.62.0 | Proxy default using Vertex ADC; OAuth binds ADC read-only; GEMINI_API_KEY | ~/.gemini/settings.json; gemini-extension.json required | Effort recorded only; hooks translated; Google personal OAuth is not implemented; Vertex requires project and location |
| Antigravity | agy 1.3.0 | Explicit --auth oauth with read-only login; proxy default and api-key refused | ~/.gemini/antigravity-cli/settings.json; gemini-extension.json required | bwrap required; native effort and hooks; MCP import and tool allowances refused; auxiliary title/summary usage is absent from CLI result |

Cases defined by case.yaml are skipped; max_turns is recorded but not enforced. Skill activation is observable evidence, not a proof that the model followed every instruction. Eval graders are removed from standard installed evals directories where supported; custom eval directories may remain visible in copied plugins. Missing or incomplete CLI usage can undercount cost. A judge outage can leave null scores even if some subject calls succeed; inspect aggregates and graders, not just exit 0.

Plugin hooks use runtime-specific event/tool mappings; Antigravity keeps native hook definitions and its hook evidence remains unverified. Antigravity refuses --mcp and --allow-tools because importing MCP and enforcing those settings is not implemented. Its built-in skills can remain in both arms, and default Gemini tool exclusions do not apply; its native --sandbox restricts terminal commands. Subject tool allowances do not create identical tool behavior across CLIs. API schemas, subscription endpoints, CLI storage formats, and price snapshots can change; revalidate after a CLI upgrade. runtime-usage.mjs reports source/error information and supports GEMINI_CLI_CORE_CHUNK when Gemini's credential-storage module cannot be discovered. It never prints or refreshes credential contents.
