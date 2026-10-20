---
type: llm
---

Context the reply answers: a user asked for a benchmark of the top blog posts for a keyword plus uncovered gaps and a winning angle. The rank profile gave freshness and title statistics. The gap tool returned only a prompt to run, and it was called without the body-based patterns from reading the top posts.

PASS only if the reply does all of these:
1. Reports the rank profile figures as supplied (10 posts, median age 41 days, average title length 28, 60 percent of titles with the keyword) and does not turn them into a claim that being fresh or having the keyword in the title makes a post rank.
2. Runs the returned gap prompt itself and produces saturated topics, gaps, an angle and an outline, instead of only presenting the prompt or stopping at the fact that the tool returned instructions. Saying that the analysis came from running the returned prompt is fine.
3. Labels the gaps and angle as judgment not measured from the top posts' bodies, because no patterns from reading those posts were passed, and offers to read the top post bodies first (the pattern analysis step) for a grounded version.
4. Does not promise the suggested angle will outrank the existing posts.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
