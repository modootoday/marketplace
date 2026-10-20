---
name: datalab-card-news
description: Plan a post or topic as a multi-page canvas - card news, an Instagram carousel or presentation slides - and build it page by page in the datalab.tools photo editor from gallery images and plain backgrounds, then check the render and hand the files over when asked. Use when the user asks for card news, a carousel, or slides made from a post or topic in the datalab.tools editor. Not for prompts to paste into outside image generators, for predicting saves or reach, or for filling slides with numbers the user did not give.
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

Open with a concrete proposal: reuse the available gallery images for the relevant slides and solid/gradient
backgrounds for the rest, which are free. This editor has no AI image generation tool: state that as fact in the
reply, even when no tools can be checked in the session and even when the user says an image count was approved
earlier (that approval cannot be spent, so plan every slide with gallery images and plain backgrounds and quote no
charge). A request to generate images for the slides gets that said plainly together with this proposal; the user's own image files can be brought in through the staging path
(see "Images from the user's files"). If an existing project has pages, explicitly offer both choices: preserve it and
append, or start a new project. If discovery does return a tool marked paid, keep its approval rule below. Leave
unsupported market-size and growth slots empty.

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
`photo_sticker_add`, `photo_frame_add`; arrange with `photo_node_arrange`; reorder with `photo_page_reorder`. Edits go
through `photo_node_update`. Starting from a ready-made template, making pages from a published post, undo, rename and
slideshow timing: references/templates-import-history.md.

This skill never deletes pages or elements. A delete request needs its own destructive confirmation; say so and do
not run it inside this flow. `photo_template_apply` is not a layout-repeat tool: it applies a catalog template, and
`mode: replace` erases every element on the current page (the catalog says it cannot be undone), so it is a destructive
call with its own confirmation.

## Images, and what costs money

There is no image-generation tool in the Datalab MCP 1.17.1 catalog, and `generate_images` does not exist there. Do
not call it, promise it, or describe a price for it. Check by discovery, not by memory: if a future tool for making
images appears in a discovery result, follow its returned `paid` flag.

- Default: colour or gradient backgrounds with text, then gallery images (`photo_gallery_list`,
  `photo_image_add_from_gallery`). Name the gallery images in the plan.
- "Generate AI images for all slides" cannot be done here. Say so, offer the default, and ask whether to proceed; do
  not substitute a prompt for an outside generator.
- Editing tools that work on a photo already on the canvas run in the browser and are free: `photo_auto_tone`,
  `photo_auto_collage`, `photo_upscale`, `photo_inpaint`. Offer them only when the user asks for that effect.
- Any tool whose discovery result says `paid: true` needs an approved count first. Unit prices are unknown; confirm
  the count only, and never run one per slide without approval.

## Images from the user's files

A photo that is only on the user's machine reaches the canvas by staging it (`media_stage_begin`, upload,
`media_stage_commit`), then `gallery_image_add` with the handle, then `photo_image_add_from_gallery`. Each gallery add
asks the user to confirm. Details and limits: the workbench skill's references/media-staging.md.

## Batch and check

- Many edits at once: `photo_apply` runs up to 50 ops in order, all or nothing, and one undo reverts the batch. The
  allowed ops are `photo_text_add`, `photo_shape_add`, `photo_sticker_add`, `photo_frame_add`,
  `photo_image_add_from_gallery`, `photo_page_add`, `photo_node_update`, `photo_node_remove`, `photo_node_arrange`,
  `photo_group`, `photo_ungroup`, `photo_background_set`, `photo_canvas_resize`, `photo_page_reorder` and
  `photo_page_remove`. A later op refers to what an earlier op created as `$N`, the position of that op. Give each op
  the arguments from its own discovered schema, and put `editor_session`, `expected_project` and `expected_revision`
  on `photo_apply` itself, not inside the ops. Page removal is a delete: it still needs its own confirmation.
  `photo_auto_tone`, `photo_auto_collage`, `photo_upscale`, `photo_inpaint` are not batch ops; call them on their own.
- Crop, LUT, colour correction, collage, upscale and object removal: which tool for which wish is in the workbench
  skill's references/finishing.md. Pick one by the user's wish; do not run them all.
- Look before declaring done: `photo_preview` renders a page as a small JPEG. A preview shows what the renderer drew;
  it is not a judgement of the design, and a tool that ran is not a slide that looks right.

## Hand the files over

Only when the user wants files, not just the canvas. Offer the choices first: leave it on the canvas, or export.

1. `photo_export` with `format` (png, jpeg, webp, pdf or svg), `pages` (`active` for one page, `all` for a zip),
   `dpi` 150 or 300 for print or `scale` 1 to 4, and `transparent` for PNG or WebP. It returns a job at once.
2. `photo_job_status` until the job is done; it then gives the file name, size and sha256.
3. `gallery_export_save` with that `job` saves the file, after asking the user every time. Through MCP it lands in the
   connector's export folder and returns the file path.

Say which step is done. Finding the tools, a started job, a finished job and a saved file are four different facts.
Nothing here uploads to Instagram or any other channel.

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

Whenever the user mentioned AI images, whether asking for them or saying a count was approved, the reply must contain a
plain sentence that AI image generation is not available in this editor, that the earlier approval or count therefore
cannot be used and no image charge applies, and that every slide is planned with gallery images and plain backgrounds.
Do not quote a count or a price for AI images, and do not reserve slides for them.

Whenever a template or a post import is part of the plan, the reply must: list the templates first and use a returned
id (never a guessed one); say that template mode `replace` erases what is on the page and cannot be undone, ask for
the user's confirmation, and offer `new_page` (keeps the content) instead; plan the post import in `cards` mode
appended after the last page with the page count named, check the result afterwards, and say one undo reverts the
import; and pass the project reference and revision to every changing call.

## Tools

Use the actual tools needed for the request directly when they are visible. Otherwise, send the original user intent to
`datalab_find_tools`, then use `datalab_call` only with tool names and argument schemas returned by discovery.
Do not invent tool names or arguments.
If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status.
Discovery does not expand this skill's scope or replace its payment, target and change-approval rules.
Only when discovery cannot find the required tools, work from supplied text or pasted tool output,
or provide a text-only plan within this skill's scope; state what could not be read or performed.

- `photo_project_get`, `photo_canvas_get`: read the open project, revision and pages before any change.
- `photo_project_new`: start an empty project; confirm first.
- `photo_project_list`, `photo_project_open`: find and open saved work; confirm before opening.
- `photo_canvas_resize`: set the platform ratio before the first page.
- `photo_page_add`, `photo_page_reorder`: add slides and change their order.
- `photo_background_set`: slide background, solid or gradient by default.
- `photo_text_add`: title, subtitle, body and CTA text.
- `photo_shape_add`, `photo_sticker_add`, `photo_frame_add`: decoration, only when asked or needed.
- `photo_template_list` (read), `photo_template_apply` (destructive): pick and apply a catalog template.
- `photo_post_import` (write): make card pages, or only photos, from a Naver blog, cafe or influencer post address.
- `photo_history_undo`, `photo_history_redo` (write): step back or forward through edits.
- `photo_project_rename` (write): rename the open project.
- `photo_slideshow_set` (write): hold time and transition per page, or document defaults and loop.
- `photo_node_arrange`, `photo_node_update`: position elements; edit existing ones.
- `photo_gallery_list`, `photo_image_add_from_gallery`: reuse the user's gallery images before generating any.
- `photo_apply`: a batch of the editing ops above, all or nothing, with `$N` references between ops.
- `photo_preview`: render a page to check it.
- `photo_export`, `photo_job_status`, `gallery_export_save`: hand the files over, one confirmed step at a time.
- `media_stage_begin`, `media_stage_commit`, `gallery_image_add`: bring the user's own image file onto the canvas.
- `my_content_read`, `my_content_info`: read the published post the cards are made from.

Only when discovery cannot find the required tools, deliver the slide-by-slide plan as text, state which calls would run, and keep every rule above.
