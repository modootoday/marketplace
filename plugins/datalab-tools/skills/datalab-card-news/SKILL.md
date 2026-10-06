---
name: datalab-card-news
description: Plan a post or topic as a multi-page canvas - card news, an Instagram carousel or presentation slides - and build it page by page in the datalab.tools photo editor, confirming how many paid AI images to generate first. Use when the user asks for card news, a carousel, or slides made from a post or topic in the datalab.tools editor. Not for prompts to paste into outside image generators, for predicting saves or reach, or for filling slides with numbers the user did not give.
metadata:
  tier: open
  level: L3
  domain: content-design
  install: optional
  keywords: [card news, instagram carousel, slides, presentation, photo editor, canvas, datalab]
  requires:
    mcp: [datalab]
  verified-runtimes: [codex-cli]
---

# Card news planning and build

Open with a concrete free-background proposal: reuse the available gallery images for the relevant slides and
solid/gradient backgrounds for the rest. Make that proposal before any paid-generation question; listing gallery
files merely as a later alternative leaves the default unclear. The user can choose AI instead after seeing the
billed count. If an existing project has pages, explicitly offer both choices: preserve it and append, or start a
new project. For AI images, disclose per-image billing and ask for a count or a free-background choice; if the user
already approved a billed count, keep that approval. Leave unsupported market-size and growth slots empty.

Turn one post or topic into card news and build each slide on the photo editor canvas. The finished canvas is the
deliverable, plus a copyable text summary.

## Choose the project first

- New work: `photo_project_new` makes an empty project (it may open the manager tab). Saved work: find it with
  `photo_project_list`, open it with `photo_project_open`. Both change the current document, so confirm with the
  user before calling them.
- Read the current state with `photo_project_get` and `photo_canvas_get` (project ref, revision, existing pages).
  If pages already exist, ask whether to continue in this project or switch to a new one. Do not overwrite.
- Pass the same editor session, project ref and expected revision on every later change so a switched target stops
  the call.

## Source

1. Text or topic the user gave is the source.
2. A published post ("make this post into card news"): read it with `my_content_read`; with only a title, find it
   first with `my_content_info`.
3. Neither: ask for the topic and stop. Invent nothing.

## Plan briefly

Use the supplied **platform** (Instagram 1:1 or 4:5 by default), **slide count** (propose 5 to 7
from the text length if not given), and **style** (default solid background, restrained tone). Ask only about missing
choices that affect the build, plus the project and billed-count choices described above. Slide
roles (HOOK, INFO, VISUAL, STORY, CTA) and text limits per element (title about 20 characters, subtitle 40, body 100,
CTA 15): references/slide-structure.md.

## Build

`photo_canvas_resize` to the platform ratio before the first page. Then per slide: `photo_page_add`;
`photo_background_set` (solid or gradient by default); images from the gallery first (`photo_gallery_list`,
`photo_image_add_from_gallery`); `photo_text_add` for title, subtitle, body, CTA; decoration with `photo_shape_add`,
`photo_sticker_add`, `photo_frame_add`; repeat a layout with `photo_template_apply`; arrange with `photo_node_arrange`;
reorder with `photo_page_reorder`. Edits go through `photo_node_update`.

This skill never deletes pages or elements. A delete request needs its own destructive confirmation; say so and do
not run it inside this flow.

## AI images are paid

`generate_images` bills the user per image: one per slide for 8 slides is 8 charges.

- Default proposal: colour or gradient backgrounds with text, no charge.
- If the user wants AI images, ask how many to generate before calling, for example "all 8 slides would be 8 charges;
  how many do you want?". The unit price is unknown; confirm the count only. Never run one per slide without approval.
- A request such as "generate all 8" is a wish, not approval of the charge: still ask for the count, and offer the
  gallery images and plain backgrounds first. Gallery images (`photo_gallery_list`) are named in the plan before any
  paid generation.

## No invented numbers on slides

There is no chart tool; every number is typed text. Copy only numbers the user gave, with their source. Leave current
value, target, ROI, growth rate, market size slots empty and ask the user to fill them. No plausible placeholder
figures: on a slide they read as fact. When the user says "fill in something reasonable", still leave the slot empty
and ask them for sourced figures.

## Not here

No prompt formats for outside image generators; this surface calls tools directly. No tool reads saves, shares or
completion rates; never predict them. No quality scores for designs or prompts.

## Output

The filled canvas; a copyable per-slide summary (headline and subtext as placed); hashtag suggestions if wanted, with
no predicted reach.

## Tools

- `photo_project_get`, `photo_canvas_get`: read the open project, revision and pages before any change.
- `photo_project_new`: start an empty project; confirm first.
- `photo_project_list`, `photo_project_open`: find and open saved work; confirm before opening.
- `photo_canvas_resize`: set the platform ratio before the first page.
- `photo_page_add`, `photo_page_reorder`: add slides and change their order.
- `photo_background_set`: slide background, solid or gradient by default.
- `photo_text_add`: title, subtitle, body and CTA text.
- `photo_shape_add`, `photo_sticker_add`, `photo_frame_add`: decoration, only when asked or needed.
- `photo_template_apply`: repeat one layout across pages.
- `photo_node_arrange`, `photo_node_update`: position elements; edit existing ones.
- `photo_gallery_list`, `photo_image_add_from_gallery`: reuse the user's gallery images before generating any.
- `generate_images`: paid; only after the user approves a count.
- `my_content_read`, `my_content_info`: read the published post the cards are made from.

Without the extension, deliver the slide-by-slide plan as text, state which calls would run, and keep every rule above.
