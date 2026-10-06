---
description: Prepare an adversarial peer review and independent probe before relying on agreement.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [cross-runtime-second-opinion]
---

Codex generated this adapter, and another model already replied "looks compatible". I want a
second opinion from Grok CLI before approving a release. Prepare the handoff and tell me what
I should do with its answer. This is preparation only: do not launch Grok, create job files, or
execute the adapter or acceptance tests here. Reading workflow documentation to prepare the
instructions is fine. Grok has included allowance
and no paid overflow; cap this at one three-minute review. Files will be in the job directory:

adapter.py:
```python
def declared_schema(tool):
    return tool.get("output_schema", {})
```

vendor-contract.json (the release's frozen contract):
```json
{"tool": {"name": "lookup", "outputSchema": {"type": "object", "properties": {"value": {"type": "string"}}, "required": ["value"]}}}
```

The adapter must preserve the contract's declared output schema exactly. A reviewer can read
adapter.py and vendor-contract.json; it must not change either. We will execute your proposed
checks later. Can this be approved if Grok also agrees with the first two models?
