---
name: runtime-cost-routing
description: Compare subscription allowance and token billing for the same workload before routing it to an agent runtime. Use when choosing between an included CLI allowance and a paid API route, estimating a peer job's cost, or evaluating a runtime subscription. Use real input, cache, output and tool counts, preserve the quota floor, and enforce a spend cap before paid execution.
metadata:
  tier: open
  level: L3
  domain: agent-workflow
  install: optional
  keywords: [runtime cost, subscription allowance, token billing, spend cap, cached tokens]
  verified-runtimes: [codex-cli]
---

# Runtime cost routing

Read `references/cost-model.md` for accounting and
`../cross-runtime-delegation/references/cli.md` for per-CLI cap support.

1. Freeze the same task, model capability, quality bar and number of launches for all candidates.
   Read a comparable run's actual usage: total input, cached input, output including billable
   reasoning, tool charges and retries. Label estimates explicitly; don't replace supplied measured
   counts with a round-number guess. Note any route-specific change in token demand.
2. Record price source, date, currency and units. Fetch current official rates for a real purchase;
   use supplied hypothetical prices as assumptions. Compute fresh input as total input minus
   cached input, then `(fresh*input_rate + cached*cache_rate + output*output_rate)/1e6 + tools`.
   Do not bill cached input twice or count one fixed tool fee twice. Include the verifier's usage.
3. Compare incremental cost separately from an already-paid subscription's sunk monthly fee.
   An included job may cost zero additional cash yet consume a scarce allowance. Read all applicable
   quota windows and resets, estimate the job's burn and preserve the reserve floor after the job.
   Missing quota conversion or stale observations remain `UNCONFIRMED`; no invented token quota.
4. Save `routing-costs.json` with counts, rates and sources, arithmetic, allowance projections,
   uncertainty, chosen route and reason. When only preparing a plan, supply its complete contents
   and a command to write it. State sensitivity to output growth, retries and cache misses.
5. Before any paid run, name the numerical spend cap and how it is enforced. A prompt instruction,
   timeout or billing alert is not a hard cap. Use the native cap when supported; otherwise require
   an enforced metering gateway/maximum-charge reservation or decline paid launch. Check quota or
   billing overflow settings so a subscription run cannot silently use credits.
6. Choose the cheapest eligible route that meets quality, deadline and reserve constraints. If no
   route fits, stop and report the reset or changed budget needed. Launch once, verify the result
   independently, and reconcile actual usage against the saved estimate before another job.

Before handing the decision to an operator, check the written decision itself: explicitly distinguish
the already-paid subscription fee (sunk) from additional cash for this job, and identify the actual
hard-cap mechanism. Say why a timeout, a prompt budget or a billing alert cannot enforce a dollar
ceiling even when the proposed gateway can. This prevents the operator substituting a weaker
control when turning the record into a launch command.
