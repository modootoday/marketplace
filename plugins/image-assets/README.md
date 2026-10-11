# image-assets

## What it does

Images that hold up at their real size: share images rendered from HTML with Korean text that wraps, consistent hand-written SVG icon sets, batch post-processing that crops, compresses and strips location data, and product shots edited from the real product photo with a ledger and a label check.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | yes | Codex CLI with gpt-6.1-sol, the new case only (see Verify) |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: Node and a headless browser library (Playwright or Puppeteer) where the images are rendered; Python 3 with Pillow, or ImageMagick, for image-postprocess; Python 3 for product-shot-direction's ledger (Pillow for its check), and an image editing tool.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install image-assets@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add image-assets@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `og-thumbnail-render` | share images rendered from HTML at 1200x630 with fonts loaded, Korean wrapping, measured titles and correct og tags |
| skill | `image-postprocess` | batch crop, resize, compress and watermark with originals kept and GPS and device metadata removed |
| skill | `svg-icon-illustration` | icon sets and small illustrations hand-written as SVG on one grid and stroke, themable with currentColor |
| skill | `ai-photo-retouch-qc` | AI removal, denoise, masks, upscales and composites reviewed against the original at 100 percent and print size, as a located defect list the photographer approves |
| skill | `product-shot-direction` | product shots edited from the real product photo, recorded in an append-only shot ledger and checked against the reference down to label text and numbers |
| skill | `generated-asset-delivery-spec-check` | a generated logo, print card, texture, map or transparent asset accepted or rejected by measured palette, alpha, size, seam and count checks, with one corrective line per failure and a three-round cap; it checks assets and does not generate them |
| skill | `editable-layered-design-delivery-check` | a layered, editable design delivery checked by opening the file, listing layers and confirming the download exists, plus per-artboard linked, ratio, centre and margin checks for bulk scripts run on a copy; it verifies and does not generate designs |
| skill | `subject-cutout-alpha-matte-check` | a background-removed subject checked by measured alpha, baked checkerboards, graded mattes for glass and hair, and composites over light, dark and target backgrounds; it checks cutouts and does not make them |
| skill | `sprite-sheet-rig-and-frame-audit` | a generated 2D sprite sheet, direction atlas or equipment overlay checked against its frame manifest and rig: missing or duplicated directions, held-prop handedness, mirror-pair warnings and a per-frame fail table; it audits and does not draw frames |
| skill | `comfyui-workflow-live-schema-check` | a ComfyUI graph written and checked against the installed nodes, model files and link types, missing parts reported instead of assumed, a condition-to-output table for batches and a failure log mapped to one cause with a before and after link diff; it checks and plans and does not run the graph or generate images |

## Failure mode

None. This plugin registers no hooks and runs no commands of its own. It cannot block, slow
or interrupt anything.

## Configuration and how to disable

No configuration. Disable it the way your runtime disables plugins.

## Data written

None by the plugin. A skill that produces files writes them only where the user asks.

## Verify

Ask for something the plugin covers:

```
Our shared link preview shows no image; og:image is /og/post-12.png.
```

The plugin ships an eval suite (`claude plugin eval plugins/image-assets --no-publish`). Measured
20261004 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `og-korean-title-breaks` | og-thumbnail-render | 1.00 | 1.00 | 2 |
| `og-preview-missing` | og-thumbnail-render | 0.00 | 1.00 | 3 |
| `resize-photo-not-og` | negative: the skill must not fire | 1.00 | 1.00 | 2 |
| `batch-for-marketplace` | image-postprocess | 1.00 | 1.00 | 2 |
| `icon-set` | svg-icon-illustration | 1.00 | 1.00 | 2 |
| `tea-tin-lifestyle` | product-shot-direction | 0.00 | 1.00 | 2 |
| `wedding-retouch-review` | ai-photo-retouch-qc | 0.50 | 1.00 | 2 |
| `monochrome-logo-alpha-report` | generated-asset-delivery-spec-check | 0.00 | 1.00 (open) | 2 |
| `banner-psd-120-artboards` | editable-layered-design-delivery-check | 0.00 | 1.00 | 2 |
| `glass-bottle-binary-matte` | subject-cutout-alpha-matte-check | 0.00 | 1.00 | 2 |
| `comfyui-missing-nodes-vae-log` | comfyui-workflow-live-schema-check | 0.00 | 1.00 | 2 |
| `eight-direction-sword-atlas` | sprite-sheet-rig-and-frame-audit | 0.25 | 1.00 | 2 |

`eight-direction-sword-atlas` was measured on 20261005 with Sonnet as subject and judge, both arms, after its `references/direction-table-example.md` was rewritten to a scenario that differs from the eval prompt; earlier Sonnet with-arm runs varied between 0.75 and 1.00. The skill rests on four first-person reports from one game-asset sub-domain.

image-postprocess, svg-icon-illustration show no lift yet: the baseline model already passed these cases, or both arms failed. The cases stay as regression checks. The Codex scores below add a case with lift for image-postprocess and svg-icon-illustration.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

Codex scores, measured 20261006 with the Codex eval harness, both arms, 2 runs per arm, subject gpt-6.1-sol, judge gpt-6.1-sol with 3 votes:

| Case | Skill | Without | With | Skill fired |
| --- | --- | --- | --- | --- |
| `ceramics-webp-batch` | image-postprocess | 0.00 | 1.00 | 2 of 2 |
| `tidy-pasted-toolbar-svgs` | svg-icon-illustration | 0.00 | 1.00 | 2 of 2 |

## Scene asset maintenance release 0.5.1

The existing `generated-asset-delivery-spec-check` binds requested scene packages to exact asset versions and measured delivery evidence. Its scope guard requires scene/cut/style mapping only when the supplied or requested package needs it. Missing intended-use/spec inputs remain pending. Historical qualification values marked (open) retain their original numbers.

Codex CLI 0.161.0 with gpt-6.1-sol subjects and judges measured With-only supplied-text regressions on 2026-10-11, two runs and one behaviour vote per run. Three initial cases produced six subjects and six votes: four PASS, two FAIL, exit 0, cleanup complete, partial false and no execution errors.

| Case                                       | Phase                     | Behaviour votes | Exact target opening |
| ------------------------------------------ | ------------------------- | --------------- | -------------------- |
| scene-asset-version-check-effect           | Initial                   | 2 PASS          | 2/2                  |
| scene-asset-version-check-missing-evidence | Initial                   | 2 FAIL          | 2/2                  |
| scene-asset-version-check-negative         | Initial                   | 2 PASS          | 0/2                  |
| scene-asset-version-check-missing-evidence | Bounded source correction | 2 PASS          | 2/2                  |

The original missing-evidence answers made scene/style mapping mandatory for a generic checklist; the correction leaves it conditional rather than inventing a package. Raw failures remain unchanged. No paired effect, new badge, actual pixel inspection or generation is claimed. Unknown measurements and external actions remain unknown; other skills and runtime history retain their scope.

## License

MIT
