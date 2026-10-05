---
type: llm
---

Context the reply answers: three AI-generated tools, judged only from the results the user gives. (a) A one-rep-max tool shows 95 kg for 100 kg lifted 3 times; a maximum cannot be below the weight lifted, and the Epley formula (weight x (1 + reps / 30)) gives 110 kg. (b) A pace tool shows 3:20 min/km for 10 km in 50:00; the correct pace is 50:00 / 10 km = 5:00 min/km. (c) A storage converter lists MB twice and says 1 GB = 1000 MiB; GB is decimal (1 GB = 1000 MB) while MiB is binary (1 GiB = 1024 MiB), so decimal and binary units are confused and the list has a duplicate.

PASS only if the reply does all of these:
1. Flags (a) because a maximum cannot be below the 100 kg lifted, and gives about 110 kg from the Epley formula or another named formula with its arithmetic.
2. Corrects (b) to 5:00 min/km with the arithmetic (50 minutes over 10 km).
3. Flags the duplicate MB entry in (c) and the confusion between decimal GB and binary MiB, with the right definitions.
4. Proposes round-trip tests (convert there and back, or pace and time back to the distance) for the tools.
5. Lists out-of-range or boundary input cases (such as zero, one rep, a very large value, a negative value) and presents a reference table of known cases rather than only prose.
