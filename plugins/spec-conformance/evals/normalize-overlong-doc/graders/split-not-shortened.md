---
type: llm
---

PASS only if all three hold:
1. The plan splits the document into parts along its existing sections, and every section's full
   text survives in some file. A short summary left in the parent next to a link to the full part
   is fine; what fails is a section whose text is cut, condensed or replaced by a summary with no
   full copy anywhere.
2. The reasons and incident history in Refunds are kept in full; nothing proposes cutting them.
3. `billing-rules` stays reachable for the documents that link to it: it remains as a parent or
   index that links to the parts (and the parts link back or are named by it).

FAIL if any section is to be shortened or summarised to meet the limit, or if the existing links
to billing-rules would break.
