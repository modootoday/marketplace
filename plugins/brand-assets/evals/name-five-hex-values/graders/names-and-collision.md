---
type: llm
---

Context the reply answers: the user gave five HEX values of a tea shop and asked for token names without changing any value: #1F3A5F (logo and headlines), #F4B63F (buttons and sale badge), #FFF8EC (page background), #2E7D5B (links and an "in stock" label), and #1F3A5E (from old website CSS, "I think it is the same blue"). #1F3A5F and #1F3A5E differ by one in the blue channel (contrast between them is about 1.0).

PASS only if the reply does all of these:
1. Names the colours by role (for example brand primary, accent, surface or background, link or success), not by look such as navy or sunshine, and keeps every HEX value exactly as given.
2. Flags #1F3A5F and #1F3A5E as a near-duplicate pair, does not merge or round them silently, and asks which is intended (or keeps both and marks the second as legacy or a probable typo for the owner to decide).
3. Does not invent a role for a colour without saying it is a guess.
