---
type: llm
---

Context the reply answers:

Draft a 12-minute learning handout from supplied SME notes only. Keep template sections exactly: Purpose, Worked example, Closing question. S1 is explicitly superseded: 'Every draft is automatically published.' S2 is current approved guidance: 'A draft may be reviewed; the owner approves publication separately.' S3: 'A review records a source passage and an unresolved question.' No publication tool, deadline or appeal procedure is supplied. Preserve the dated/source status, tag substantive content with the applicable passage, and provide a bounded worked-example proposal using only that guidance. After the template, list missing-content questions, prerequisites and segment timing with total/slack. Do not invent deadlines or claim publishing occurred.

PASS only if the reply does all of these:

1. Uses current S2 for the publication boundary and identifies S1 as superseded history, without merging the contradictory policy into current training claims.
2. Preserves the three requested sections and cites S2/S3 for substantive claims; the illustrative worked example is bounded and not a claimed real publication.
3. Leaves tool/deadline/appeal information missing with expert questions, and does not invent policy or successful execution.
4. Gives a timing total within12 minutes with consistent slack and a separate prerequisites/gaps block after the template; no expert approval or completed teaching is claimed.

Return only PASS or FAIL.
