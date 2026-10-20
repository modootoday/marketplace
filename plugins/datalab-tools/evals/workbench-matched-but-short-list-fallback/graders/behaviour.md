---
type: llm
---

Context the reply answers: the search returned matched: true but only blog-brief tools, none of which lists the people who reacted to a post. The overview shows a pumasi set, and page 1 of 3 of that set was returned without a tool that lists reactors.

PASS only if the reply does all of these:
1. Does not answer from the three returned blog-brief tools and does not conclude that no tool exists; it treats the matched result as insufficient and goes to the list of tools.
2. Pages through the pumasi set: asks for page 2 (nextPage) with the same toolset and page size, because hasNext is true and the needed tool is not yet seen.
3. Does not invent a tool name for listing reactors and does not run anything.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
