---
name: claude-plugin-eval
description: Evaluate plugin skill activation and answer quality with Claude Code native plugin eval, paired baseline runs, case graders, common JSON results, and local HTML reports. Use when a user requests Claude plugin regression or release evaluation.
metadata:
  tier: open
  level: L3
  domain: agent-workflow
  install: optional
  keywords: [plugin eval, claude, ablation, skill activation, regression]
  requires:
    bin: [node, bwrap, claude]
  approval: scripts
---

# Claude plugin evaluation

Use the thin adapter to Claude Code's native plugin eval engine. Keep this skill
inside the complete skill-factory plugin; its script imports ../../../shared.
Run model calls only within the user's authorized evaluation and spending scope.
Evaluate plugins and case code that the user trusts.

## Requirements and usage

Node.js 22 or later, Claude Code 2.1.269 or later, and Linux bubblewrap with namespace
permission are required. The adapter was smoke-tested with Claude Code 2.1.291.
Authenticate outside the evaluator; this adapter does not refresh saved logins.

From this skill directory:

```sh
node scripts/claude-plugin-eval.mjs --help
node scripts/claude-plugin-eval.mjs ./example-plugin --model sonnet --runs 1 --ablation none --max-cost-usd 1 --json --output-dir ./results
```

Put the plugin directory before variadic flags. The target needs
.claude-plugin/plugin.json and native evals/<case>/prompt.md with graders/*.md,
or native case.yaml cases. The native engine evaluates activation graders and
paired with/without arms. A synthetic regex smoke is evidence of harness operation;
it does not establish skill activation or improvement.

## Shared interface and native differences

The common parser accepts --eval-dir, --case, --tag, --runs, --concurrency,
--model, --judge-model, --ablation, --threshold, --json, --output-dir, --report,
--max-cost-usd, --work, --cli, --runtime-lock, --isolation, --auth, --auth-from,
--api-key-env, --suite-minutes, --allow-tools, --allow-real-servers, --scaffold,
--no-scaffold, --keep-temp, and --no-publish. --claude aliases --cli.

Unsupported --effort, --judge-effort, --judge-votes, price overrides, --max-tokens,
--hooks, --mcp and --publish-report fail before loading credentials. Native judge
defaults and voting apply; set --judge-model explicitly for reproducible checks.
--timeout bounds the entire suite process group, default 600 seconds. Set native
timeout_seconds and max_turns in each case to bound individual runs. --verbose and
--trust-plugin remain compatibility flags. Publication is always disabled.

The native engine retains its grader formats and HTML report. aggregate-result.json
uses the shared top-level schemaVersion, runtime, runtimeVersion, startedAt,
durationSeconds, costUsd, partial, partialReason, tokens, suite, cases and aggregates.
Missing token totals remain null. Native per-run graders and trace references are
preserved; the adapter does not invent literal replies or activation evidence.
Output directories containing an aggregate result are refused to avoid stale evidence.

Exit codes follow the shared convention: 0 pass, 1 threshold failure, 2 budget or
suite timeout, 3 native runs failed, 64 invalid options or authentication, 70 harness
failure, 130 interruption. A terminated native process may leave no partial result.
Inspect graders, case errors and partial state alongside the exit code.

## Authentication and isolation

Default --auth proxy reads ~/.claude/.credentials.json, CLAUDE_CONFIG_DIR, or
--auth-from outside the sandbox. Its saved OAuth token must retain user:inference
scope and the requested validity window, default 30 minutes. The sandbox receives
a dummy token and loopback URL; the proxy accepts only authenticated inference
POST requests to the Anthropic messages and token-count endpoints. It never refreshes
or writes the original credential file. Renew an expiring login outside the harness.

--auth api-key reads ANTHROPIC_API_KEY or --api-key-env outside the sandbox and
injects it through the same host proxy. --auth oauth requires bubblewrap and mounts
the saved credential file read-only into a fresh private configuration directory.
No operator settings or other plugins are imported. --isolation none still uses a
scrubbed environment and private config, but exposes the operator's readable filesystem.

Bubblewrap binds system libraries, the CLI installation, the private run directory
and selected output directories. Network access remains available; this public
evaluator does not provide network confinement. Plugin hooks are removed from the
evaluation copy. Bundled MCP definitions are removed unless --allow-real-servers
explicitly grants them; native tool gates still apply. --scaffold runs case shell
code only when selected. Plugin copies reject symlinks and exceed neither 10000
entries nor 64 MiB. Retained traces and reports can contain sensitive model output.

Use node ../../shared/runtime-contract.mjs capture claude ./runtime-lock.json
[binary], then pass --runtime-lock to check the CLI version, binary artifacts and
harness Node before authentication. Existing locks cannot be overwritten. Keep locks
outside published plugins; they record absolute installation paths. Capture is a
snapshot, not upgrade qualification or attestation.

## Budgets and verification

Native cost estimates include supported subject and grader usage. --max-cost-usd
stops launching runs after observed usage, including zero-budget checks. In-flight
runs can exceed the ceiling; it is not a provider billing cap. Subscription usage
and API charging follow the selected account. Regex graders use no judge model.

Run shared helper tests without authentication or model calls:

```sh
node --test --test-concurrency=1 ../../shared/*.test.mjs
```

Source reference: [Claude Code plugin evals](https://code.claude.com/docs/en/plugin-evals).
Recheck CLI help and authorized runtime acceptance after upgrades.
