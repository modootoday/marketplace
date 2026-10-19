# sales-ops

## What it does

Sales follow-through from the record: forgotten promises recovered from sent email with dates resolved and the quoted line, and CRM framework fields and a follow-up email filled only from call transcript evidence.

## Runtime support

| Runtime     | Supported                | Measured on                                           |
| ----------- | ------------------------ | ----------------------------------------------------- |
| Claude Code | yes                      | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI   | effect unconfirmed       | 0.163.0, supplied-email case only; see limits below   |
| Grok CLI    | selected skills verified | 1.0.50, supplied-text cases below                     |
| Gemini CLI  | untested                 | -                                                     |

Requirements: Nothing is required.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install sales-ops@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add sales-ops@modootoday
```

## What it registers

| Kind  | Name                              | Covers                                                                                                                                                                                 |
| ----- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| skill | `email-history-commitment-mining` | sent-email history mined for promised follow-ups, each marked done, open or unclear with the completing message or the quoted line, internal and automated senders excluded            |
| skill | `competitive-research-brief`      | pasted public-page excerpts turned into a same-rows comparison, every claim tagged with its source and date, stated facts apart from inference, gaps listed; rests on two weak records |
| skill | `sales-call-extraction-followup`  | filling CRM framework fields and a follow-up from a call transcript                                                                                                                    |

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
Today is 2025-03-01. Here are my sent emails; list the follow-ups I promised and which are still open.
```

The plugin ships an eval suite (`claude plugin eval plugins/sales-ops --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case                       | Skill                           | Without | With | Runs per arm                                           |
| -------------------------- | ------------------------------- | ------- | ---- | ------------------------------------------------------ |
| `quote-promise-open-loops` | email-history-commitment-mining | 0.00    | 1.00 | 2                                                      |
| `two-competitor-pages`     | competitive-research-brief      | 0.00    | 1.00 | 2                                                      |
| `discovery-call-no-budget` | sales-call-extraction-followup  | 0.00    | 1.00 | 2, Sonnet subject and judge, 20261005 (moved 20261006) |

The second row was measured 20261005 on Claude Code 2.1.289 with Sonnet as subject and judge.

The plugin reads only the emails you supply and sends nothing.

### Other runtimes

Measured 2026-10-19 with Grok CLI 1.0.50 and grok-4.7-build-fast as subject
and judge, two runs per arm, three behavioral votes and concurrency one.
Proxy authentication and bubblewrap isolation were used without external
servers, hooks, mailbox access or sending. The source and fixtures were unchanged.
All four email answers and twelve behavioral votes were reviewed individually.

| Runtime  | Model               | Case                       | Skill                           | Without | With | Fired | Date       |
| -------- | ------------------- | -------------------------- | ------------------------------- | ------- | ---- | ----- | ---------- |
| Grok CLI | grok-4.7-build-fast | `quote-promise-open-loops` | email-history-commitment-mining | 0.00    | 1.00 | 2/2   | 2026-10-19 |
| Grok CLI | grok-4.7-build-fast | `discovery-call-no-budget` | sales-call-extraction-followup  | 0.00    | 1.00 | 2/2   | 2026-10-19 |
| Grok CLI | grok-4.7-build-fast | `two-competitor-pages`     | competitive-research-brief      | 0.00    | 1.00 | 2/2   | 2026-10-19 |

The email effect is narrow: guided replies resolve the quote's due window from
the email date and explicitly leave the holiday phrase undated. Both baselines
already close the quote, keep the catch-up open and exclude the newsletter.
Do not claim the skill discovers those statuses or accesses any actual thread.
Invented surnames in the Grok baselines are preserved as unscored errors,
not a reason to rewrite grades. Table formatting and caveat wording alone do
not establish the effect.

Codex CLI 0.163.0 with gpt-6.1-sol completed the same paired case, two runs per
arm and three votes, with raw With 1.00 / Without 0.00 and activation 2/2.
All answers and votes were reviewed. Its baselines already anchor the promise
to the week after January 10 and recognize the uncertain holiday deadline.
The failed votes demand an explicit numeric date, exact quoted lines and row
fields. Preserve the raw scores, but hold the Codex effect as unconfirmed;
no Codex badge, source repair or retry is included.

The two other Grok cases add eight individually reviewed answers and 36
behavioral votes. Call extraction keeps likely sign-off separate from confirmed
buyer authority and avoids unstated asks in the email. Baselines already
recognize unknown budget, criteria, timing and unproven champion status; one
qualifies budget authority elsewhere. Do not claim these safeguards are absent.
One of six With votes rejects resolving Friday to October 9 from the supplied
Monday October 5 call. That dissent is retained; no actual sending or CRM write
is measured.

The competitor case separates user proof from integrations into common rows
with explicit missing coverage, and labels broader sales conclusions as inference.
Baselines already preserve dates and company attribution and sometimes list the
gaps in prose. Literal source-label or caveat wording alone is not the effect.
One With vote demands that explicit audience claims also be called inference;
the other eleven behavioral votes pass. A guided reference to bank-style
connections appears as inference and does not verify banking functionality.
These supplied-text checks establish neither current prices nor real integrations.

## License

MIT
