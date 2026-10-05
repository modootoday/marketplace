---
type: llm
---

Context the reply answers: a creator of a fictional two-character web series gave a reference sheet and frame notes (no images). Sheet: Mina has a short black bob, a mole under her left eye, a red school blazer in ep1 and ep2 and a grey hoodie in ep3 after a plot change; Joon is tall with round glasses, a short grey crop and a green parka in all episodes. Notes: ep1 shot 4 Mina matches; ep2 shot 9 Mina's bob is shoulder length and the mole is missing; ep3 shot 2 Mina wears the red blazer again; ep3 shot 6 Joon has no glasses and his grey crop has become Mina's short black bob.

PASS only if the reply does all of these:
1. Separates fixed traits (face and hair, mole, glasses, build) from per-episode state (outfit) in a sheet or list before judging shots.
2. Treats the ep3 grey hoodie as an intended change and the ep3 shot 2 red blazer as an unintended regression of state to the ep1-2 outfit, not as a match.
3. Labels ep1 shot 4 as a match.
4. Does not label any shot drift or match without naming the trait it rests on.
