---
name: product-shot-direction
description: Direct AI product photos that keep the real product - start from a photo of the actual product and edit it into a scene instead of generating it from a description, record every prompt, model, seed and variant in a shot ledger, check each candidate against the reference zoomed in on logos, label text and numbers, and export only approved shots with their licence. Use when making product photos, lifestyle shots or marketplace images of a real product with an image generation or editing tool. Not for concept art of products that do not exist yet.
metadata:
  tier: open
  level: L3
  domain: asset-image
  install: optional
  approval: scripts
  keywords: [product photo, AI product shot, image editing, label fidelity, shot approval, lifestyle photo]
  requires:
    bin: [python3]
    capabilities: [image.edit, image.generate]
  output-license: the user's own product photos; generated output follows the terms of the model used, which the ledger records
  verified-runtimes: [claude-code]
---

# Product shots that keep the real product

A product photo that changes the product is false advertising, however good it looks. Measured
on three products with known labels (gpt-image-1-mini, 2026-10):

- **Generated from a description**, the wording came out mostly right but the product did not:
  a bold logo became thin, label text changed case and position, the label grew. It is a
  different product that shares a name.
- **Edited from the real photo**, layout, typeface and colours held, but small text broke:
  "30 ml / 1.0 fl oz" became "39 ml / 10 fl oz", and a size line changed colour.
- **Edited with an open model** (Qwen-Image-Edit-2511, self-hosted) from the same photos, all
  three labels came out exact, small print included. Models differ; the check below is what
  tells you which one you got.

So: always start from the photo, and always read the small print on every candidate. If a
workflow loads its input image by file name, confirm the output shows your product and not a
placeholder: an upload that is renamed on arrival leaves the model editing an empty image.

## 1. Brief

Product, where the image will be used (size, ratio, background rules of the marketplace), scene,
lighting, mood, and what must not change (logo, label text, colours, shape, accessories). Get a
clean, sharp photo of the product from the angle the shot needs; cut it out if the tool works
better on a plain background.

## 2. Generate from the photo

Use the editing capability with the photo as the input image. Ask to change only background and
lighting and to keep the product exactly. Keep the seed when the tool exposes one. Generate a
few variants, not dozens; a product shot is chosen, not mined.

When an edit keeps failing on fine print, generate the scene without the product and composite
the real cut-out photo into it, matching light direction and adding a contact shadow.

## 3. Record every candidate

```
python3 scripts/shot_ledger.py add out/variant-1.png --prompt "..." --model <model> \
  --provider <tool> --seed 42 --refs product.jpg --license "<model output terms>"
```

The ledger (`shots.jsonl`) is append-only: prompts, models, seeds, parents and decisions stay
reconstructable, and an image changed after it was recorded cannot be approved.

## 4. Check against the reference

```
python3 scripts/shot_ledger.py check product.jpg out/variant-1.png --ref-box x,y,w,h --cand-box x,y,w,h --id s-0001
```

The numbers (colour difference and a perceptual hash on the product area) flag drift. They do
not read text. Then look at the product area zoomed in, beside the reference, and tick each:

| Check | Pass when |
| --- | --- |
| Logo | same shape, weight and position |
| Label text | every word and number identical, including volumes, weights and units |
| Colours | product and label colours match the reference |
| Shape and proportions | outline, cap, handle, edges unchanged |
| Parts | nothing added or removed |

Any failure is a rejection with its reason:
`shot_ledger.py reject s-0001 --by <name> --reason "30 ml rendered as 39 ml"`.

## 5. Approve and export

A person approves (`approve s-0003 --by <name>`). `export-approved <dir>` copies only approved
shots with a manifest of prompt, model, seed, lineage, check result and licence. If the image is
used in an ad, follow the platform's AI labelling rules.
