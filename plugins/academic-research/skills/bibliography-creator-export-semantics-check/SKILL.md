---
name: bibliography-creator-export-semantics-check
description: Compare approved personal or literal creator identities, order and roles across bibliography source metadata, export, consumer parsing and rendered style. Use when Zotero, BibTeX or CSL output appears to split, reorder or change multilingual authors or institutional names. Not for DOI existence, citation renumbering, guessing family names from strings or global brace rewrites.
metadata:
  tier: open
  level: L3
  domain: academic-research
  install: optional
  keywords: [bibliography export, Zotero, BibTeX, CSL, literal author, creator identity, multilingual names]
---

# Bibliography creator export semantics check

Preserve approved creator structure rather than inferring it from appearance. A style may initialize or invert a personal name while retaining identity; similar rendered strings may hide a changed parsed identity. Review supplied artifacts and observations without claiming an exporter or parser was executed.

## Establish the comparison contract

Obtain stable item IDs and the approved ordered creator list: role, personal family/given parts or literal/single-field name, and any supplied particles/suffixes. Ask for missing mode or name boundaries. Script, whitespace and a screenshot do not authorize a personal-to-literal conversion or a guessed family-name split. Retain multilingual characters and original metadata.

Record the export format, exporter/version, settings, encoding and overrides; then the downstream parser/backend/version, style and parsed/rendered observations tied to the same artifact. BibTeX, biblatex, CSL JSON and a rendered bibliography are different contracts. A citation key or DOI does not establish creator identity, and attachment mappings are outside this review.

## Locate semantic loss

1. Build an item/index crosswalk from approved source through export representation to parsed consumer structure and rendered output. Compare creator count, order, role, mode and approved name parts; retain literal organization names as one creator when that is the source contract.
2. Interpret raw syntax using the named format/parser. In BibTeX, unprotected and separates creators and braces/commas can influence name parsing; plain-text escaping and raw LaTeX are distinct. Raw brace differences alone are not proof of identity loss. Do not apply a global brace rewrite or copy an unverified community postscript.
3. Separate layers: incomplete source metadata, exporter representation, consumer parsing and style display. Name inversion, initialization and script-dependent display can be intended style behavior when parsed semantics remain unchanged. A literal-to-personal split or role/order change is a semantic mismatch even when output looks plausible.
4. Flag the first evidenced mismatch and retain unknown root cause where observations do not locate it. Propose a minimal item/settings correction only when the approved source and consumer contract justify it. Preserve originals and show before/after structure; do not alter all CJK creators to institutional mode.
5. Request a fresh export/parse/render observation for the changed artifact, including an unaffected creator control and the problematic item. Without approved source structure or parsed results, report inspectable facts and the next discriminating check instead of certifying identity preservation.

## Output

Provide environment/artifact identities, an item/index/role/mode crosswalk, semantic mismatch versus style-only findings, minimal proposed corrections and unresolved evidence. Source-truth checks and numeric citation renumbering remain separate tasks. Do not infer that an historical workaround demonstrates a current exporter bug.

For contracts, consult [Zotero name parsing](https://www.zotero.org/support/kb/name_parsing), [CSL name behavior](https://docs.citationstyles.org/en/stable/specification.html#name), [Better BibTeX export settings](https://retorque.re/zotero-better-bibtex/exporting/) and [BibTeXing](https://mirrors.mit.edu/CTAN/biblio/bibtex/base/btxdoc.pdf), pages 14-15 of the historical 0.99b manual. The [2026 creator report](https://github.com/retorquere/zotero-better-bibtex/discussions/3390) and [2021 organization-name report](https://forums.zotero.org/discussion/90313/include-and-in-author-name-or-easier-way-to-do-this) were resolved. They establish bounded workflow problems, not a current defect, Korean-specific failure or AI failure. Historical source evidence does not establish demand or model effect; comparative results and limits are recorded in the plugin README.
