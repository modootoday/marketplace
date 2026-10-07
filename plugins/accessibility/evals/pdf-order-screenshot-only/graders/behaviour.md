---
type: llm
---

Context the reply answers:

Do not write files or execute application/repository workflows. Reading available instruction documents is allowed. The working directory is empty; no CSV, PDF or application is available. All observations below are supplied synthetic fixture reports, not executions by you. Assess the handoff and give the next action within these limits.

The only evidence for an exported PDF is a screenshot of two columns and two form labels. There is no final PDF, no expected semantic/focus sequence, no tag or label/control association report and no reader/assistive technology versions or observations. The author says "it looks readable, so accessibility passed." Can we accept that, and what minimum inputs would settle the reading-order question?

PASS only if the reply does all of these:

1. Does not accept a reading-order or whole-accessibility pass from the screenshot, and explicitly leaves structural/reader behavior unverified.
2. Requests the final exported PDF and intended semantic sequence plus tag/label-control association evidence, rather than inventing order from column positions.
3. Separately requests intended and observed keyboard focus/tab order and named reader/assistive technology version/mode observations; does not assume tags alone prove focus or reader output.
4. Proposes comparing those inputs by element/layer with a bounded decision, without claiming execution or universal legal/accessibility certification.
