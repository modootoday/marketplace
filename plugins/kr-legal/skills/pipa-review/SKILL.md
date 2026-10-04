---
name: pipa-review
description: Review a feature, form, vendor setup or data flow against Korea's Personal Information Protection Act - collection and consent notices, entrustment to processors, provision to third parties, overseas transfer, minors and sensitive data - citing the current article text. Use when the user asks whether a Korean product's handling of personal data is lawful, or needs a consent notice, privacy policy section or vendor review for Korean users. Not a substitute for counsel on a dispute.
metadata:
  tier: open
  level: L3
  domain: legal-review
  install: optional
  keywords: [PIPA, Korean privacy law, consent notice, overseas transfer, entrustment, privacy policy]
  locales: [ko]
  requires:
    mcp: [korean-law]
---

# Personal Information Protection Act review

The Act is amended often; the article numbers below are a map, not the text.
Retrieve the current text of every article you rely on with the `korean-law`
MCP server (`search_law`, then `get_law_text` with the article), quote what it
says, and state the effective date of the version you read. If the server is not
connected, say that every citation is unverified. The article map with its Korean
names is in `references/articles.ko.md`.

## Walk the data, then the law

First write the flow as a table: which items, from whom, for what purpose, where
they are stored, who else touches them (vendors, affiliates, other countries),
and for how long. Most findings come from this table, not from the statute.

Then check, in order:

1. **Lawful basis for collection.** Consent is one basis among several (contract
   performance, legal obligation and others are listed in the same article). Do
   not ask for consent where another basis applies, and do not claim one that
   does not.
2. **The consent notice, when consent is the basis.** It must tell the purpose,
   the items, the retention period, and the right to refuse with any
   disadvantage of refusing. Missing any one is a finding.
3. **Entrustment vs provision.** A vendor that processes data for your purpose
   (hosting, messaging, payments) is entrustment: a written contract with the
   required terms, and public disclosure of the work and the processor.
   Handing data over for the recipient's own purpose is provision to a third
   party and needs its own basis.
4. **Overseas transfer.** Storage or processing abroad, including cloud regions
   and foreign SaaS, is a transfer. It needs one of the grounds the Act lists, and
   the notice items it requires (items, country, timing and method, recipient,
   purpose and retention, how to refuse).
5. **Children under 14** need the legal representative's consent.
6. **Sensitive and unique identifiers** (health, resident registration number and
   others) have stricter rules; resident registration numbers in particular may
   only be processed where a law allows it.
7. **Retention and destruction**: data is destroyed when the purpose ends,
   unless another law requires keeping it.

## Output

A findings table: the data flow row, the article (quoted, with version date),
the gap, and the fix (a corrected notice text, a contract clause, a design
change). End with what you could not verify and what needs counsel.
