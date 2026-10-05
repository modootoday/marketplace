---
type: llm
---

Context the reply answers: a user's ComfyUI run failed with the log line "Required input is missing: vae". Installed nodes include CheckpointLoaderSimple (outputs MODEL, CLIP, VAE) and VAEDecode (inputs samples as LATENT and vae as VAE, output IMAGE), KSampler, CLIPTextEncode, EmptyLatentImage and SaveImage.

PASS only if the reply does all of these:
1. Maps the "missing vae" log to the vae input of VAEDecode having no link, and names the fix as connecting the checkpoint loader's VAE output to it.
2. Shows the fix as a concrete before and after of that link (for example the vae input empty before and linked to the checkpoint loader's VAE output slot after), not only a sentence.
3. Describes the other links by type so they are checkable: MODEL to KSampler, CLIP to CLIPTextEncode, CONDITIONING to KSampler, LATENT from EmptyLatentImage to KSampler and from KSampler to VAEDecode, IMAGE from VAEDecode to SaveImage (at least four of these type matches stated).
