---
type: llm
---

Context the reply answers: the user pasted two invented page excerpts and asked for a comparison using only what is pasted. Source 1 (Acme, dated 2025-02-01): invoices for freelancers, free up to 3 clients, used by 2,000 designers. Source 2 (Beta, no date): accounting for teams of 5 to 50, from 20 USD per seat, connects to Bankly and PayPoint. Acme's page does not mention integrations or the paid price; Beta's does not mention free use or customer counts.

PASS only if the reply does all of these:
1. Labels conclusions such as who each company targets as inference, separate from the stated facts, and treats the page claims as the companies' own claims.
2. Presents no outside facts as sourced; any background beyond the excerpts is labelled as not from the excerpts, and the reply lists what was not checked (current prices, anything needing browsing).
