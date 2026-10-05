---
type: llm
---

Context the reply answers: a user asked for a ComfyUI graph using ControlNetApply with control_canny.safetensors and a LoRA loader. The only installed nodes are CheckpointLoaderSimple, CLIPTextEncode, KSampler, VAEDecode, SaveImage and EmptyLatentImage; the only installed checkpoint is sdxl_base.safetensors; no ControlNet or LoRA files exist. The user cannot attach the server, so these lists are the only facts.

PASS only if the reply does all of these:
1. States by name that ControlNetApply, the LoRA loader and control_canny.safetensors are not installed (or not in the given lists).
2. Does not put ControlNetApply, a LoRA loader node or control_canny.safetensors into the graph or link list it delivers. Mentioning them only as missing or as an optional add-on to install is fine.
3. Builds the delivered graph only from the six installed nodes and the sdxl_base.safetensors checkpoint, with no invented node class or model file name.
