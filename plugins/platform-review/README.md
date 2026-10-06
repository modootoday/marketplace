# platform-review

## What it does

Reviews of platform pieces that fail in production for configuration reasons: Cloudflare Worker bindings, Manifest V3 extension lifecycles, Chrome Web Store policy before submission, MCP tool design and Postgres migration locks.

Pre-release leak audits of published artifacts are available to signed-in users.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | yes | Codex CLI with gpt-6.1-sol, the new case only (see Verify) |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: None.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install platform-review@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add platform-review@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `cf-worker-binding-review` | wrangler config reviewed for environments that share production data, secrets in vars, and calls that should be bindings |
| skill | `mcp-server-design` | MCP tools designed so a model can choose and call them: names, typed inputs, stable ids, destructive annotations |
| skill | `mv3-extension-review` | Manifest V3 extensions reviewed for service worker lifetime, top-level listeners, alarms, storage and permissions |
| skill | `chrome-store-policy-review` | a Chrome extension checked against Web Store policy before submission: permissions, remote code, data disclosures |
| skill | `pg-migration-safety` | Postgres migrations reviewed for locks on large tables: concurrent indexes, NOT VALID constraints, lock timeouts |
| skill | `cf-placeholder-404` | a retired Cloudflare redirect replaced by a 404 Worker on the free plan, routes attached before the redirect is deleted so no 522 gap opens |
| skill | `static-site-migration-parity` | a static site moved to a new host or renderer with every URL form, status, media type and heading id compared against a live snapshot before DNS cutover |
| skill | `csp-live-verification` | a Content-Security-Policy checked against the live page in a headless browser: wanted beacons allowed, injected inline snippets left blocked, own inline script hashed |
| skill | `dead-code-keep-or-retire` | code reported unused checked for dynamic calls, external control and string references before removal, kept when valuable, retired with a record and a copy location |

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
Review this Postgres migration for a 50-million-row table: CREATE INDEX on orders(user_id).
```

The plugin ships an eval suite (`claude plugin eval plugins/platform-review --no-publish`). Measured
20261004 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `http-status-201-negative` | negative: the skill must not fire | 1.00 | 1.00 | 2 |
| `all-urls-rejection` | chrome-store-policy-review | 1.00 | 1.00 | 2 |
| `index-and-not-null` | pg-migration-safety | 1.00 | 1.00 | 2 |
| `preview-writes-prod` | cf-worker-binding-review | 1.00 | 1.00 | 2 |
| `review-mcp-tools` | mcp-server-design | 1.00 | 1.00 | 2 |
| `state-lost-after-idle` | mv3-extension-review | 1.00 | 1.00 | 2 |
| `cf-placeholder-404` | cf-placeholder-404 | 0.00 | 1.00 | 2 |
| `csp-live-verification` | csp-live-verification | 0.00 | 0.50 | 2 |
| `static-site-migration-parity` | static-site-migration-parity | 0.00 | 1.00 | 2 |
| `unused-module-retire` | dead-code-keep-or-retire | 0.00 | 1.00 | 2 |

chrome-store-policy-review, cf-worker-binding-review, mcp-server-design, mv3-extension-review, pg-migration-safety show no lift yet: the baseline model already passed these cases, or both arms failed. The cases stay as regression checks. The Codex scores below add a case with lift for all five skills named there.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

Codex scores, measured 20261006 with the Codex eval harness, both arms, 2 runs per arm, subject gpt-6.1-sol, judge gpt-6.1-sol with 3 votes:

| Case | Skill | Without | With | Skill fired |
| --- | --- | --- | --- | --- |
| `deployed-fails-local-works` | cf-worker-binding-review | 0.50 | 1.00 | 2 of 2 |
| `history-cookies-rejection` | chrome-store-policy-review | 0.50 | 1.00 | 2 of 2 |
| `invoice-tools-key-in-args` | mcp-server-design | 0.00 | 1.00 | 2 of 2 |
| `listener-in-async-callback` | mv3-extension-review | 0.00 | 1.00 | 2 of 2 |
| `fk-type-rename-drop` | pg-migration-safety | 0.00 | 1.00 | 2 of 2 |

## License

MIT
