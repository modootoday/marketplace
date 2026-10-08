# monetization

## What it does

Prices framed as hypotheses with a test: who pays, for what unit of value, against which alternative, what result would change the decision, and the cheapest test before anyone builds a pricing page.

Payment integrations, refunds and disputes, payment provider choice and USD price localization are available to signed-in users.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | case-specific pricing-unit/value effect | codex-cli 0.161.0, 2026-10-08; see complete prospective comparison |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: None.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install monetization@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add monetization@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `pricing-hypothesis` | a price framed as a testable hypothesis: buyer, unit, today's alternative, a prediction with a threshold, and the cheapest test |

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
We're launching a scheduling app for small hair salons. Help me decide the monthly price.
```

The plugin ships an eval suite (`claude plugin eval plugins/monetization --no-publish`). Measured
20261004 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `price-feels-right` | pricing-hypothesis | 0.00 | 1.00 | 2 |

At the recorded 20261004 cut, the skill had one case and two more were needed for the three-case release gate.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

### Codex comparison with incomplete judge evidence

The supplied `pricing-free-alternative-unit-test` case for pricing-hypothesis was run on 2026-10-08 using codex-cli 0.161.0 and gpt-6.1-sol as subject and judge, with two runs per arm and three requested judge votes. The untouched aggregate reports Without 0.00, With 1.00 and skill activation 2/2. One baseline judge call returned a capacity ERROR instead of a verdict: only eleven of the twelve required votes are valid, comprising six PASS and five FAIL. The aggregate's partial=false flag does not establish complete judge coverage.

These raw values are retained as incomplete evidence in prose, not a qualifying runtime result. No runtime qualification, automatic retry, score override or general pricing benefit is claimed. The existing Claude runtime qualification remains unchanged. The skill now has two case paths, still short of three-case coverage.

### Other runtimes: complete prospective pricing comparison

A separately reviewed complete comparison on 2026-10-08 used codex-cli 0.161.0 and gpt-6.1-sol as subject and judge, two runs per arm and three judge votes. All four answers and twelve votes are valid: five PASS and seven FAIL. The earlier eleven-vote comparison above remains immutable and unqualified on its own.

| Runtime   | Model       | Case                                 | Skill              | Without | With | Fired | Date       |
| --------- | ----------- | ------------------------------------ | ------------------ | ------- | ---- | ----- | ---------- |
| Codex CLI | gpt-6.1-sol | `pricing-free-alternative-unit-test` | pricing-hypothesis | 0.00    | 1.00 | 2/2   | 2026-10-08 |

Both With answers explain the pricing-unit/value tradeoff of one account fee across different location usage, including poor fit for lighter users and greater value for heavier users without asserting cost cross-subsidy. Both baselines question the location allowance but omit that tradeoff. This is the admitted supplied-segment effect, not proof of demand, an optimal price, conversion, profitability or actual research execution.

One minority With vote rejects a generic free-workflow description in place of the named one-location alternative; the other two votes accept the segment distinction. The dissent and raw majority aggregate remain preserved. All four answers propose bounded future tests and reject invented willingness to pay, completed contacts and guaranteed discount conversion. The unchanged body was measured; no skill-body repair causality or universal rubric agreement is claimed.

## License

MIT
