---
name: crawling-legality-review
description: Judge the legal risk of collecting data from a website or app in Korea - unauthorised access, database rights, the data and free-riding clauses of the Unfair Competition Prevention Act, personal data in what is collected, and contract terms - with current article text and court decisions retrieved, not remembered. Use when the user plans or reviews scraping, crawling or bulk collection of another service's data for a Korean product. Not a substitute for counsel in an actual dispute.
metadata:
  tier: open
  level: L3
  domain: legal-review
  install: optional
  keywords: [web scraping law, crawling legality, Korean law, database right, unfair competition, data misuse]
  locales: [ko]
  requires:
    mcp: [korean-law]
---

# Is this collection lawful in Korea

Risk in crawling cases has turned less on the act of fetching pages than on
three facts: whether access was authorised, how much of the source's investment
was taken, and what was done with it. Get those facts first. Then read the law
with the `korean-law` MCP server: `get_law_text` for each article and
`search_decisions` for court decisions, quoting what you retrieved with its
date. If the server is not connected, say every citation is unverified. The
article map in Korean is in `references/statutes.ko.md`.

## The facts to establish

| Fact | Why it matters |
| --- | --- |
| Is the data public without login, or behind login, paywall or API keys? | Bypassing an access control is where unauthorised-access offences start |
| Were blocks, robots rules or technical protections ignored or circumvented? | Circumventing protection is itself a listed act in the data clause |
| How much, how often: a few records, or a substantial part of a database, repeatedly? | Database rights protect substantial or systematic reproduction |
| Is it used to compete with the source (the same listings, the same customers)? | Free-riding on another's investment is what the catch-all clause targets |
| Does it contain personal data (names, contacts, reviews tied to people)? | Personal data brings the privacy act in, whatever the source |
| What do the site's terms say, and did you accept them? | Breach of contract is a separate exposure from the statutes |
| Load: request rate and impact on the service | Heavy load strengthens every other claim |

## The law to check against those facts

1. **Unauthorised access** under the network act's intrusion provision.
2. **Database producer's rights** under the Copyright Act.
3. **The Unfair Competition Prevention Act**: the data misuse item (data
   acquired by unauthorised access or by circumventing protection) and the
   catch-all item for taking another's substantial investment against fair
   trade practice.
4. **Personal data** under the Personal Information Protection Act, if any.
5. **Contract** under the site's terms.

Search decisions on crawling between competing services and cite the ones you
actually retrieved; outcomes have split between criminal and civil cases, so
say which kind each one is.

## Output

A risk table per fact: the fact, the provision, the retrieved text or holding,
and a risk level with the reason. Then the changes that lower risk (use the
official API, collect less, respect blocks, drop personal data, avoid competing
use), and what needs counsel.
