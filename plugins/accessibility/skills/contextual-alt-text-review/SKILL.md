---
name: contextual-alt-text-review
description: Review or draft image alternatives for a web page, document or publication with the caption, surrounding text, link target and audience in view - classify each image as decorative, informative, functional, text-bearing or complex, write the alternative that purpose needs, drop invented emotions, identities and chart readings, and check the alternative that the exported file actually carries. Use when an assistant, CMS or tool produced alt text drafts, or alt text must be written for images whose page context is available. Not for describing an image to a blind user, for navigation help, or for certifying accessibility compliance.
metadata:
  tier: open
  level: L2
  domain: accessibility
  install: optional
  keywords: [alt text, image alternatives, accessibility review, caption, decorative image, functional image, EPUB, CMS]
  verified-runtimes: [codex-cli, gemini-cli, grok-cli]
---

# Contextual alt text review

Practitioners who publish with generated alt text report drafts that are "very wrong" or
"technically not incorrect" but unhelpful: a mug described for a bracelet, a scene described
for a download button. The fix is context, not a better caption. This skill works from the
drafts, captions and page facts the user supplies; it cannot see the images unless pixels are
supplied, and it says so.

## Steps

1. For each image, collect: the draft or current alt text, the caption, the nearby text, the
   link or button target, and the audience. Missing facts are listed as questions, not guessed.
2. Classify the purpose and write down what the reader needs from the image:
   - decorative: adds nothing the text lacks; the alternative is empty (`alt=""`), not a scene;
   - functional (button, link, icon): state the action or destination, not the picture
     ("Download the reading sheet (PDF, 2 pages)");
   - informative: the point the image makes in this context, short;
   - text-bearing: the visible text, verbatim;
   - complex (chart, diagram, map): a short alternative naming the type and the takeaway, plus a
     separate longer description or data table; do not repeat the caption word for word.
3. Remove what the context does not support: names, ages, moods ("happy"), diagnoses, and chart
   trends not stated in the caption or data. An identity or fact may be used only when the
   caption or the author supplies it; otherwise mark "author to confirm".
4. Check length and duplication: no "image of", no repeat of the adjacent caption, language
   matches the page, one idea per alternative.
5. Check the exported artifact, not the editor field. Ask how the page or EPUB is published and
   whether a blank field exports as nothing, as the file name or as a generated caption; the
   alternative in the published HTML or package is what counts. Say that this was not verified
   unless the export was supplied.

## Output

A table: image, purpose class, draft as supplied, proposed alternative, long description needed
(yes or no), author confirmation needed. Then the export checks to run and what could not be
verified (no pixels, no exported file). Do not state that the page is accessible or compliant.
