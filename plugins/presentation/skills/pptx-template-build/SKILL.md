---
name: pptx-template-build
description: Build a PowerPoint file that respects a template - slides created from the template's layouts and placeholders, the slide master's fonts and colors, native charts and tables that stay editable, and checks for overflow and missing placeholders. Use when generating or editing a .pptx from data or an outline with a company template. Not for designing a template from scratch or writing the storyline.
metadata:
  tier: open
  level: L3
  domain: presentation
  install: optional
  keywords: [pptx, PowerPoint template, slide master, python-pptx, native charts]
  requires:
    bin: [python3]
---

# Building a .pptx from a template

A generated deck looks off-brand when it draws text boxes on blank slides
instead of filling the template's placeholders, and is useless when its charts
are pictures nobody can edit.

## Use the template's structure

- Open the template and list its slide layouts and each layout's placeholders
  (index, type, name). Choose a layout per slide by its purpose (title, title and
  content, two content, section header, blank only when nothing fits).
- Put text into placeholders, not new text boxes, so fonts, sizes and positions
  come from the master. Do not set fonts or colors in code unless the template
  lacks them.
- Remove placeholders left empty; an empty "Click to add text" box ships as
  visible text in some viewers.

## Charts and tables

Create native charts (python-pptx chart data) and native tables so they remain
editable and pick up theme colors. Use images only for screenshots and photos.

## Text fitting

Slide titles one line where the layout expects it; body text within the
placeholder. Check overflow by rendering (convert to PDF or images with
LibreOffice) rather than trusting auto-fit; shorten or split slides that
overflow.

## Check

Render the deck, look at every slide, confirm no empty placeholders, no text
outside its box, charts editable, and the file opens without a repair prompt.
Report slides that needed shortening.
