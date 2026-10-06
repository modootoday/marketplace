# Worked example: slide 2 text edit when the files cannot be opened

Synthetic case: a 20-slide training deck built by a script from slides.yaml (text and numbers)
and theme.potx (layout). Slide 2 has a heading, a four-line agenda list, a bar chart and a
speaker photo. The user hand-adjusted the chart colours on slide 11 and the page number position
on slide 17 directly in the .pptx after the last build.

## 1. Preservation list (before the edit)

| Slide | Element | Status |
| --- | --- | --- |
| 2 | Heading | required, unchanged |
| 2 | Agenda list | wording may change, line count stays four |
| 2 | Bar chart | required, unchanged, must come through the edit |
| 2 | Speaker photo | required, unchanged |
| other 19 | everything | untouched; the list is built from the user's description, not the file |

## 2. Diff to run afterwards

Report separately: removed, moved or resized, changed text (old and new), duplicated, slide
order changed. Call out any unrequested deletion and restore or flag it, the slide 2 chart
first. Do not say nothing else changed; the files cannot be opened here, so give the checks:
shapes, charts and images counted per slide, and the chart still present with its series.

## 3. Source write and out-of-source edits

- The new agenda wording goes into slides.yaml, not only into the pptx. Layout stays in
  theme.potx and is not touched.
- Two hand edits exist only in the current pptx, so a regeneration overwrites them:
  the chart colours on slide 11 and the page number position on slide 17.
- Proposed write-back: colours into slides.yaml or the build script, position into theme.potx.
  Ask the user to confirm, and regenerate only after the answer.

## Checklist before sending

- Preservation list names heading, agenda, chart and photo.
- Diff categories listed, no "nothing else changed" claim, checks given.
- Slide 2 chart named as must-survive, restored or flagged if lost.
- Wording change aimed at the content source; both hand edits named; write-back proposed; no
  regeneration before the user answers.
