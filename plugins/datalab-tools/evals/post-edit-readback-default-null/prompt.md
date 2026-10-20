---
description: A null stored value can still be the applied default; judge by the effective value and its source
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-post-edit-verify, coverage-20261020, from-live-probe]
---

datalab.tools 글쓰기 창에서 첫 문단 행간을 1.8로 맞췄는데, 읽어 보니 lineHeight 가 null 이야. 적용이 안 된 거야? 다시 해야 해?

Supplied, not executed in this session: the earlier editor_set_paragraph_styles call returned one rule with requested lineHeight 1.8, applied true and confirmedBy "default". The later editor_read_document returned for component c1 paragraph 0: "lineHeight": null, and effective: { "lineHeight": { "value": 1.8, "source": "default" } }; the revision is unchanged since the write. The host lists the editor_* tools directly.

No MCP/discovery tool is available in this test; work only from the supplied text and say what you would do and what you would tell the user.
