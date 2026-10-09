---
name: runtime-quota-check
description: Check remaining allowance and reset times before choosing an installed agent runtime for a job. Use when a runtime is near its quota, several CLIs are available, or asked where a job can run without exhausting a subscription. Normalize every applicable window, reject stale or unknown readings, reserve a floor after the job, and save the routing evidence.
metadata:
  tier: open
  level: L3
  domain: agent-workflow
  install: optional
  keywords: [runtime quota, remaining allowance, reset time, subscription, routing]
  verified-runtimes: [codex-cli, grok-cli]
---

# Runtime quota check

A login, a token counter and a successful small call do not prove remaining allowance.
Read `references/quota-sources.md` for the selected runtime's documented reader before probing.

1. Discover installed candidates with `command -v claude codex gemini grok agy`; inspect only
   their version/help, never credentials. Identify the selected model and billing route: subscription,
   API or credits. A different runtime can still share the same upstream quota.
2. Read allowance using the documented command or usage screen first. Capture observation time,
   source, every applicable window/model bucket, used versus remaining, reset time with timezone,
   and whether the reading is live or cached. For absent fields write `UNKNOWN`; for an unsupported
   inference write `UNCONFIRMED`. After a failed or stale read, current remaining, reset and
   projected remaining stay `UNKNOWN`. Explain rejected historical/session evidence by category
   and freshness; leave consumption counters and unusable historical allowance values out of the
   decision record. In the handoff, explicitly distinguish the chosen runtime's
   session token consumption from subscription allowance. For Grok, persisted session usage
   (including `grok usage`) is consumption history; obtain subscription remaining and resets from
   a supported allowance reader or provider usage screen. A login/session token expiry is an
   authentication deadline, not an allowance reset or evidence of remaining subscription quota.
3. Normalize percentages to remaining (`100 - used`). For a job using multiple buckets, all must
   fit; the minimum remaining is the bottleneck, not the average. Keep request-count and percentage
   units apart. Do not invent a tokens-to-quota conversion: use a comparable measured pilot or mark
   the job's quota burn unknown.
4. Set the reserve floor before choosing (user's floor, otherwise propose 10% and label it a policy
   assumption). Compute `remaining - estimated job burn >= floor` in each window. Reject candidates
   below the projected floor, stale observations, missing resets or unknown limiting buckets.
   Use a stated freshness bound, such as five minutes; a cached reading older than it is not live.
5. Save a small `allowance-record.json` with the observation, units, sources, resets, burn estimate,
   floor, projected remainder and eligibility reason for each candidate, followed by the selected
   route. When only preparing a plan, return a file-writing command and its complete contents.
   Refresh the selected route immediately before launch; never claim a read you did not perform.
   Before returning the handoff, check that it names the selected route's allowance source,
   numerical freshness bound and prelaunch refresh, and explains the consumption/allowance
   distinction for that route, even when another candidate's session counter is also discussed.
6. If none qualify, stop and report the earliest confirmed reset or missing reading. Do not quietly
   enable credits, switch to paid API billing or retry on the exhausted pool. Check again after the
   bounded job and record the actual burn for the next estimate.

For launch flags and budget enforcement read
`../cross-runtime-delegation/references/cli.md`. A quota decision authorizes no external changes.
