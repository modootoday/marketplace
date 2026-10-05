---
type: llm
---

Context the reply answers: a teacher asked for a 10x10 word search with five words (CAT, DOG, FISH, BIRD, FROG) and also a four-bar melody in 4/4 in C major as notation text, print-ready. Image generation is unreliable for puzzles and scores, so the reply should produce text or code and verify rule validity.

PASS only if the reply does all of these:
1. Gives the melody as notation text (for example ABC with M:4/4 and K:C, or note and duration lists) with exactly four bars, using only notes in C major, and not an image alone.
2. Shows a beat sum for each of the four bars, each equal to 4 beats, and the sums are correct for the durations written.
3. Gives the puzzle and the melody as text or code (a script, a grid and notation text), not as an image only, and says the final print or render form comes from the verified data.
4. States what was verified and what was not (for example that the melody is checked for rule validity, not for how it sounds, and reports any word or bar that failed or says none failed), without claiming a check it did not show.
