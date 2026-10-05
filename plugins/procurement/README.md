# procurement

## What it does

Procurement working procedures: spend projection, dedicated lane cost models, freight classification lookups, shortlist verification, request intake with stage checks, and ERP navigation with verification notes.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: Nothing is required.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install procurement@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add procurement@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `spend-projection-and-pattern` | year-to-date and full-year spend from PO lines with supplier merges reported, ledger reconciliation, a named projection method and concentration |
| skill | `dedicated-fleet-lane-cost-model` | fixed-plus-per-mile bids compared at one volume with empty returns counted, break-even miles and excluded fees listed |
| skill | `freight-classification-lookup` | density and a provisional class from a user-supplied table, edition named, no invented item numbers, a broker confirms (rests on one record) |
| skill | `real-vendor-shortlist-verification` | hard conditions screened first, three to five candidates with verified dates and stale claims flagged |
| skill | `purchase-request-intake-and-stage-check` | free-form requests normalised to intake fields with questions, then a stage check from requisition to payment |
| skill | `sap-procurement-navigation` | version asked first, route names marked unverified, change control for master data and an export mapping table (rests on three weak records) |

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
Bid A is 4,200 per week plus 1.35 per mile, bid B is 2.40 per mile, on a 310-mile lane with an empty return. Which is cheaper and where do they break even?
```

The plugin ships an eval suite (`claude plugin eval plugins/procurement --no-publish`). Measured
on Claude Code 2.1.289; the score is the share of runs that passed every grader, without the
plugin and with it:

| Case | Skill | Without | With | Runs per arm | Subject / judge |
| --- | --- | --- | --- | --- | --- |
| `spend-ytd-acme-merge` | spend-projection-and-pattern | 0.00 | 1.00 | 2 | Sonnet / Sonnet |
| `fleet-bid-break-even` | dedicated-fleet-lane-cost-model | 0.00 | 1.00 | 2 | Sonnet / Sonnet |
| `led-panel-class-lookup` | freight-classification-lookup | 0.00 | 1.00 | 2 | Sonnet / Sonnet |
| `nd-filter-shortlist` | real-vendor-shortlist-verification | 0.00 | 1.00 | 2 | Opus / Opus |
| `laptop-request-stage-gap` | purchase-request-intake-and-stage-check | 0.00 | 1.00 | 2 | Sonnet / Sonnet |
| `po-payment-terms-navigation` | sap-procurement-navigation | 0.00 | 1.00 | 2 | Sonnet / Sonnet |

The plugin reads only what you supply, does no browsing of its own, and gives no classification,
accounting or award decisions.

## License

MIT
