---
name: comfyui-workflow-live-schema-check
description: Check a ComfyUI graph against what is actually installed before it is written or run - take the live node list, model files and input types, use only what exists, report every missing node or model instead of silently swapping it, verify each link by output and input type, keep a condition-to-output table for batches, and map a failure log to one cause class with a before and after link diff. Use when a user asks for a ComfyUI workflow or batch, a graph references nodes, LoRAs, ControlNets or checkpoints that may not be installed, a run fails with a missing input or node error, or a custom node must extend an existing one. Not for generating the images, judging finished image quality, or other node editors.
metadata:
  tier: open
  level: L3
  domain: image-assets
  install: optional
  keywords: [comfyui, workflow, node graph, object_info, missing node, batch, failure triage, custom node]
  verified-runtimes: [claude-code]
---

# ComfyUI workflow live schema check

A graph written from memory names nodes, models and inputs that this installation does not
have, so it fails at the first run. This skill writes and checks the graph against the
installed schema. It does not generate images or video: running the graph and producing
assets needs a running ComfyUI and GPU time, which is outside this skill.

## Steps

1. Get the live facts first. Installed nodes and their input and output types come from the
   server's object info (`GET /object_info`), model files from the loaders' option lists or
   the models folders. If the user pasted lists, those are the only facts; if nothing was
   given, say what to fetch and do not assume a default install.
2. List each requested capability and match it to an installed node or file. Write three
   groups: available, missing, and substitutable. A missing node or model is reported by
   name as "not installed" and is not used in the graph. Do not rename a node to something
   similar, and do not invent a file name. A substitute is offered only as a labelled option
   the user decides on (for example the install name to add, or an installed node that does
   a different job).
3. Write the graph with only available parts. For each link give the source node and output
   slot and the target node and input name, and check the type matches (MODEL, CLIP, VAE,
   CONDITIONING, LATENT, IMAGE, MASK). A mismatch or an input left unconnected is a defect
   to fix before delivery. Show links in the API form, for example `["4", 2]` for slot 2 of
   node 4.
4. For a batch or variant run, keep a table of condition (seed, prompt, size, model) to
   expected output file and status. Report missing rows, duplicate rows and rows with the
   same condition under different names before queueing anything.
5. For a failure, quote the log line, map it to one cause class (missing input link,
   node not installed, model file missing, type mismatch, out of memory or other resource
   limit, version incompatibility), and propose one change with a before and after of the
   affected links. A resource or compatibility cause cannot be settled from the graph: mark
   it as needing a separate test on the machine and do not claim a fix.
6. A custom node extending an existing one keeps the original input and output names and
   types so old graphs still load, adds new inputs as optional with defaults, and lists any
   new Python dependency. State that its numeric behaviour and a complex feature such as a
   sampler change are untested until run once on the target install.
7. Never say the graph ran, passed or produced an image unless the user pasted that result.
   State "validated against the lists you gave, not executed".

## Output

Available, missing and substitutable table; the graph or the link list; type check per link;
for failures the cause class, the before and after diff and what still needs a test; a final
line stating what was and was not executed.
