---
description: A fine-tuning upload is refused for content type; rows hold objects, code with newlines and Korean text. The reply must name the schema, convert by a stated rule, prove by reload and list rejects by line.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [training-data-format-contract-check]
---

My fine-tuning upload for a chat model was refused: "messages[1].content must be a string". The file train.jsonl has 40,000 lines, one conversation per line, shaped {"messages":[{"role":"system"|"user"|"assistant","content":...}]}. I looked at a few rows. Most rows have a string content. Some assistant rows have content as an object like {"type":"text","text":"..."} and a few have a list of such objects. Some rows contain Python code with newlines and tabs, and some contain Korean text. A first attempt that went through a spreadsheet gave me about 52,000 rows instead of 40,000, and the Korean text came out broken.

You cannot run anything here, so tell me exactly how you would convert and check the file, and give me the conversion script you would run. The target is the provider's chat fine-tuning format. I have not pasted its docs.
