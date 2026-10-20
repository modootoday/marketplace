# Choosing a finishing tool for photos and video

Which tool fits which wish in the photo and video editors. All of these run in the browser and are free except where
noted. Measured against Datalab MCP 1.17.1; the schema in the discovery result decides the exact fields.

## Photo (a photo element on a page)

| The wish | Use | Notes |
| -------- | --- | ----- |
| Cut away the edges, mirror it | `photo_node_update` `patch.crop`, `flipX`, `flipY` | `crop` is a rectangle of 0 to 1 fractions of the original photo; `null` removes it. Photos only. |
| Round, heart or other outline | `patch.frame` (circle, rounded, rect, arch, heart, star, hexagon) or `patch.mask` with a shape on the same page | `mask` cuts the photo to a shape and does not hide the shape. |
| Fix brightness and colour by hand | `patch.adjust` (exposure, brightness, contrast, highlights, shadows, saturation, vibrance, temperature, tint, hue, sharpen, vignette, grain; sharpen, vignette and grain 0 to 1, the rest -1 to 1) | The object replaces the whole earlier adjustment; leaving an item out makes it 0; `null` clears. |
| A ready-made look | `patch.filter` (mono, sepia, vivid, warm, cool, vintage and the other named presets) | Pick from the enum in the schema. |
| Fix it by measuring the photo | `photo_auto_tone` | Sets brightness, contrast, colour temperature and tint, keeps other adjustments, answers `changed: false` when the photo needed nothing. |
| Levels, curves, per-colour HSL, a LUT | `patch.grade` | A LUT is a staged `.cube` file (references/media-staging.md) given as `grade.lut`. |
| Several photos into one tidy grid | `photo_auto_collage` (`refs` for chosen photos, `gap`) | Needs two or more photos; fills the grid cells and crops from the centre so no gaps remain. Without `refs` it uses every photo on the page. |
| Sharper, larger pixels | `photo_upscale` | Doubles the pixels on each side (long edge taken up to 2048 px, made 4096 px); the displayed size stays. First use downloads an 8 MB model; large photos take tens of seconds. |
| Remove a person, text or object | `photo_inpaint` with up to 8 `regions` (rectangles or ellipses, 0 to 1 of the photo) | First use downloads a 28 MB model. It changes the pixels only; displayed size, crop and colour stay. Preview the regions first. |

## Video

- Colour: `grade` on `video_scene_update` (a scene) or `video_pip_update` (a picture-in-picture): levels, curves,
  per-colour HSL, chroma key and a LUT.
- `video_auto_edit` runs the chosen stages in order: `shots` (split scenes), `silence` (tidy quiet parts), `caption`
  (subtitles from speech; downloads a speech model the first time), `reframe` (align photos), `grade` (auto colour).
  Leaving `stages` out runs all but `caption`. Each decision is recorded with its reason and can be undone one at a
  time. It is not narration and is not paid.
- Paid exception: `video_narration_generate` bills the user; see the video skill.

## Before and after

1. Read the element (`photo_canvas_get` or the project read) and keep its ref, revision and editor session; pass them on
   every change.
2. Render with `photo_preview` or `video_preview` before and after a pixel change. A preview shows what was drawn.
3. Say which of these is true: the tool was found, the call returned, the document shows the new value, the render
   looks as intended. The last holds only if the image was actually looked at; a host that returns the image as data
   the model cannot view supports only "the preview was produced". Do not describe a picture that was not seen.
4. One undo reverts a single change, and a `photo_apply` or `video_apply` batch is one undo step.
