---
description: A ComfyUI graph is requested with nodes and models that are not installed, plus a missing-vae log. The reply must report what is missing, use only installed parts and map the log to a link fix without claiming a run.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [comfyui-workflow-live-schema-check]
---

Write me a ComfyUI graph for a canny-edge guided image using ControlNetApply with control_canny.safetensors and a LoRA loader, then fix my last failure.

Installed nodes (from my object_info): CheckpointLoaderSimple, CLIPTextEncode, KSampler, VAEDecode, SaveImage, EmptyLatentImage.
Installed checkpoints: sdxl_base.safetensors. I have no ControlNet or LoRA files.

The log from my previous run said: Required input is missing: vae

I cannot attach the server, so these lists are all you have.
