---
name: datalab-sponsor-fee-quote
description: Prepare a creator sponsorship quote from supplied deliverables, production costs and usage-right terms. Use when pricing a sponsor proposal or negotiating added scope. Not for market-rate claims, legal advice, performance guarantees or sending an offer.
metadata:
  tier: open
  level: L3
  domain: marketing
  install: optional
  keywords: [sponsorship, creator fee, production cost, usage rights, quote, datalab]
---

# Sponsorship fee quote

Separate the price of making and publishing content from permission to reuse it. Work from the proposal and the creator's actual cost inputs; a cost floor is not a market rate or an accepted contract.

## Workflow

1. Identify deliverables by channel, quantity, deadline, included revisions and production responsibility. Mark new channels, reshoots and extra revisions as separate scope rather than silently including them.
2. Read [references/quote-inputs.md](references/quote-inputs.md) when calculating or comparing compensation. Compute hours times the supplied rate plus creator-borne expenses in one stated currency. Keep the proposed fee, minimum cost scenario and expected cash receipt distinct. Unknown costs are unresolved, not zero.
3. Record requested reuse media, duration, territory, advertising, edits, exclusivity and transfer separately. Use only supplied rights prices; unpriced rights stay conditional and prevent describing the quote as all-inclusive. Product retail value is not cash or a cost credit unless the creator explicitly agrees to that treatment.
4. For a fixed-fee offer, compare the same included scope with its cost floor and show options separately. For CPA, require its event, attribution window, valid-event and cancellation rules plus supplied conversion evidence. Views, AdPost earnings and hypothetical conversions do not establish sponsor compensation.
5. Before returning the scoped arithmetic, rights conditions, missing inputs and owner-review negotiation draft, check that the headline, table, comparison, summary and draft agree with the computed residuals; remove contradictory claims rather than appending a self-correction. State which amount excludes unresolved options, documented withholding or taxes. Do not send, sign, verify the counterparty or promise a negotiation result.

## Optional data tools

Supplied records are sufficient; MCP is not required and discovery is not needed when they suffice. If supporting publication evidence is requested, use visible tools only within their actual schema. Otherwise discover using datalab_find_tools and call only returned names and schemas through datalab_call. Do not invent tool names or arguments. If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status. Discovery does not supply rights prices, contract terms or conversion evidence. When optional evidence remains unavailable after discovery, identify that gap and continue the supplied-data quote without invented calls or figures.
