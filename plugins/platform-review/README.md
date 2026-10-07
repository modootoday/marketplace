# platform-review

## What it does

Reviews of platform pieces that fail in production for configuration reasons: Cloudflare Worker bindings, Manifest V3 extension lifecycles, Chrome Web Store policy before submission, MCP tool design and Postgres migration locks.

Pre-release leak audits of published artifacts are available to signed-in users.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | measured on selected cases | 0.160.1 for the capability and retirement cases; gpt-6.1-sol subject and judge; see Verify |
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
| skill | `existing-capability-before-build` | requested behavior mapped to existing implementation, public package availability and consumer wiring before planning a duplicate |

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

### Codex measurement

Publication sanitization renamed two synthetic path labels in existing-capability-wiring without changing its supplied behavior or assertions. Measurements used the original frozen prompt (SHA256 e7b61ddacbc41d6925a0cf49bbc69225671bc907a4812199e39432cf8bbfc0c4); the published prompt has SHA256 e8a3e46cc068848fe0b40241e29663e7cb3cb538f92fcb3c80fa895064852657. The renamed prompt has not been rerun and receives no separate measured behavior claim.

Measured 2026-10-06 with Codex CLI 0.160.1 and gpt-6.1-sol as subject and judge,
two runs per arm and three judge votes. Runs use a read-only empty application
sandbox; prompts contain the repository evidence. Only the listed cases were
measured on this runtime.

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `existing-capability-wiring` | existing-capability-before-build | 1.00 | 1.00 | 2 |
| `partial-capability-unknown-consumer` | existing-capability-before-build | 0.00 | 1.00 | 2 |
| `capability-constraint-mismatch` | existing-capability-before-build | 1.00 | 1.00 | 2 |
| `stop-with-retained-data` | dead-code-keep-or-retire | 0.00 | 1.00 (open) | 2 |
| `unused-module-retire` | dead-code-keep-or-retire | 0.00 | 0.50 | 2 |
| `retire-with-inflight-audit` | dead-code-keep-or-retire | 1.00 | 1.00 | 2 |

The new capability-planning case is a regression check: the baseline already
passed, so it supplies no evidence of added effect. Its initial measurement
prohibited all commands, unintentionally preventing instruction-document reads:
Without 0.50, With 0.50, fired 0/2. After narrowing that restriction to repository
commands, both with runs opened the skill. The grader was unchanged.

The partial-capability case shows a narrow effect: both baselines recognized
reuse, email side effects, and incomplete evidence, but did not propose an
actionable known-reference search control and broader behavior/registry search.
Both with runs proposed those checks. This is evidence for search validation,
not for a general advantage in architecture planning.

The stop-with-retained-data score remains open for semantic review and does not
establish effect: one baseline explicitly retains queue messages while assessing
remaining publishers, which may already be a permissible shutdown disposition.
The judges failed the ordering requirement, but that alone does not establish
harm reduction. The existing unused-module-retire case has one failing with run:
it identified the dynamic selectors but did not explicitly say to search names
as strings. Its original grader was retained. Both cases opened the intended
skill in both with runs.

The separate in-flight audit case supplies concrete loss-of-work semantics for
the shutdown order. Both arms passed, making it a regression check. The
retirement extension has no confirmed new Codex effect from these measurements.
The capability-planning skill has three positive cases. Its constraint-mismatch
case is another regression check: both arms rejected a callable but incompatible
validator and proposed selective reuse with consumer-boundary and memory checks.
The retirement extension has two new cases and
its retained legacy case, whose 0.50 result remains an open regression issue.

Seven measurement attempts covered six distinct cases, including the corrected
invocation attempt: 28 subject runs and 84 judge calls. Codex subscription quota
was used; no metered runtime was used. The harness reports costUsd as null with
no price mapping, so measured USD cost is unavailable.

### Other runtimes

| Runtime | Model | Case | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `existing-capability-wiring` | 1.00 | 1.00 | 2/2 | 2026-10-06 |
| Codex CLI | gpt-6.1-sol | `partial-capability-unknown-consumer` | 0.00 | 1.00 | 2/2 | 2026-10-06 |
| Codex CLI | gpt-6.1-sol | `capability-constraint-mismatch` | 1.00 | 1.00 | 2/2 | 2026-10-06 |
| Codex CLI | gpt-6.1-sol | `stop-with-retained-data` | 0.00 | 1.00 (open) | 2/2 | 2026-10-06 |
| Codex CLI | gpt-6.1-sol | `unused-module-retire` | 0.00 | 0.50 | 2/2 | 2026-10-06 |
| Codex CLI | gpt-6.1-sol | `retire-with-inflight-audit` | 1.00 | 1.00 | 2/2 | 2026-10-06 |

## License

MIT
