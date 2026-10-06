---
type: llm
---

Context the reply answers: the user pasted two invented page excerpts and asked for a comparison using only what is pasted. Source 1 (Acme, dated 2025-02-01): invoices for freelancers, free up to 3 clients, used by 2,000 designers. Source 2 (Beta, no date): accounting for teams of 5 to 50, from 20 USD per seat, connects to Bankly and PayPoint. Acme's page does not mention integrations or the paid price; Beta's does not mention free use or customer counts.

PASS only if the reply does all of these:
1. Compares the two companies on the same dimension rows (such as target customer, pricing, proof, integrations), with a cell for every company in every row.
2. Ties each claim to its source (Source 1 or Source 2), with the Acme date, and notes Beta has no date.
3. Marks cells the excerpts do not cover as not stated (for example Acme integrations, Beta customer numbers) instead of filling them.
