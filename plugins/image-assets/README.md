# image-assets

## What it does

Images that hold up at their real size: share images rendered from HTML with Korean text that wraps, consistent hand-written SVG icon sets, batch post-processing that crops, compresses and strips location data, and product shots edited from the real product photo with a ledger and a label check.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
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
| skill | `product-shot-direction` | product shots edited from the real product photo, recorded in an append-only shot ledger and checked against the reference down to label text and numbers |

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

image-postprocess, svg-icon-illustration show no lift yet: the baseline model already passed these cases, or both arms failed. The cases stay as regression checks.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
