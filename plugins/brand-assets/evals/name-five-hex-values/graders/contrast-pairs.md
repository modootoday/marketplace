---
type: llm
---

Context the reply answers: the user wants token names for five tea-shop HEX values and says they will put the yellow #F4B63F on the cream #FFF8EC background for badge text, and the green #2E7D5B link text on the cream background. The contrast ratios are about 1.71:1 for yellow on cream (fails the 3:1 and 4.5:1 thresholds) and about 4.73:1 for green on cream (passes 4.5:1 for body text). The blue #1F3A5F on cream is about 10.9:1.

PASS only if the reply does all of these:
1. Reports a contrast ratio for each of the two pairs the user named (yellow on cream, green on cream), with numbers close to 1.7 and 4.7.
2. Says yellow text on the cream background fails (far below 4.5:1 and 3:1) and proposes a fix such as dark blue text on the yellow badge or a different badge background, without changing the yellow HEX itself.
3. Says green on cream passes for body text.
4. Names the tokens so a scale or later addition does not force renaming (for example a role plus a step or variant), or says which tokens would form a scale.
