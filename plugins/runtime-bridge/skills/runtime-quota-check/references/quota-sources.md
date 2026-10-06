# Allowance readers

Use documented interfaces first. Checked 2026-10-06; inspect installed help for version differences.
These commands read usage; none authorizes purchasing credits or changing a plan.

| Runtime | Documented source | Interpret carefully |
| --- | --- | --- |
| Claude Code | Interactive `/usage`; plan usage in the provider's Usage screen | Plan bars are allowance; session dollars/tokens are consumption. Record each window and reset. Cached bars say last-known usage; refresh before routing. |
| Codex CLI | Interactive `/status`; `codex app-server` protocol `account/rateLimits/read` after initialization | Use every applicable model bucket/window. `usedPercent` becomes `100-usedPercent`; `resetsAt` is Unix seconds. Login status is not quota. |
| Gemini CLI | Interactive `/stats model`; billing-route quota console if the CLI omits fields | Model quota and session tokens differ. Record remaining requests and reset only when exposed; otherwise `UNKNOWN`, not a guessed daily allowance. |
| Grok CLI | Check interactive `/help` for an allowance reader and the provider's usage screen | `grok usage --help` describes persisted session consumption, not subscription remainder. No stable public machine-readable subscription quota interface is established here. |
| Antigravity CLI | `/usage` (alias `/quota`), including standalone `agy -p /usage` when supported | Capture model-specific remaining and resets. Keep the command separate from stream-json research calls. Missing fields stay `UNKNOWN`. |

Sources: [Claude costs and usage](https://code.claude.com/docs/en/costs),
[Codex commands](https://developers.openai.com/codex/cli/slash-commands),
[Codex app-server](https://developers.openai.com/codex/app-server),
[Gemini commands](https://geminicli.com/docs/reference/commands/),
[Grok CLI reference](https://docs.x.ai/build/cli/reference),
[Antigravity CLI reference](https://www.agy.dev/docs/cli/reference/).

## Documented Codex automation

Start `codex app-server`, send newline-delimited JSON-RPC and wait for initialization before the
read. A client must read replies by id, not assume the next line is its response:

```json
{"id":1,"method":"initialize","params":{"clientInfo":{"name":"allowance-reader","version":"1.0.0"},"capabilities":{}}}
{"method":"initialized"}
{"id":2,"method":"account/rateLimits/read"}
```

After receiving id 2, retain only observation time, relevant limits, percentages and reset fields;
close the process. Do not emit authentication details. Inspect `rateLimitsByLimitId` when present,
not just the legacy single-bucket field. API-key-only billing may not expose subscription limits.

## When there is only an undocumented endpoint

For a runtime with no documented headless quota read, use its documented UI or request a fresh
sanitized reading. If the only automation is an undocumented authenticated endpoint, label it
`undocumented`, version-dependent and `UNCONFIRMED` until cross-checked against the UI. Do not
invent its URL, treat an HTTP 200 as a valid schema, scrape credential stores, print raw headers,
or claim it is a supported CLI command. A failed reader is `UNKNOWN`, never zero used.

## Record contract

`allowance-record.json` should contain `observed_at`, `freshness_seconds`, `runtime`, `model`,
`billing_route`, `source`, `live_or_cached`, and `windows` with `unit`, `remaining`, `reset_at`,
`estimated_burn`, `reserve_floor`, `projected_remaining`. Add `eligible`, `reason` and `selected`.
Keep authentication expiry separate from allowance `reset_at`: expiry says when a login/session
token stops authenticating, not when subscription quota replenishes. In the associated handoff,
explain why the selected route's session consumption cannot replace its allowance reading.
Reset values need a date and timezone; leave unavailable values explicitly `UNKNOWN`.
For a failed or stale allowance read, record its source and rejection reason with current
remaining, reset and projected remaining as `UNKNOWN`. Session consumption counters and unusable
historical allowance values do not belong in the current routing record.
For percentage windows a 12% remaining reading and an 8-point job leave 4%, below a 10% floor.
Do not choose it merely because the pre-job reading exceeds 10%.
