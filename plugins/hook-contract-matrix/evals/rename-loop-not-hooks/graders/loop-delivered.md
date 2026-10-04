---
type: llm
---

PASS if the reply gives a bash loop that renames *.jpeg to *.jpg (for example using mv with
"${f%.jpeg}.jpg"). FAIL otherwise.
