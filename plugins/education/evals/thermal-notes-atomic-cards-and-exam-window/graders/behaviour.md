---
type: llm
---

Context the reply answers:

Create at most6 atomic recall cards from only these notes: L1 Heating increases particle motion. L2 Cooling decreases particle motion. L3 Heat moves from warmer objects to cooler objects. L4 Insulation slows heat transfer. L5 Temperature measures how hot an object is. L6 The example used a blue cup. L7 The notes were reviewed on Tuesday. L6/L7 are not examined. Cite each used line and its supporting words; do not leak the answer in the question, merge facts, duplicate one mechanism or add scientific facts. Prioritise mechanisms over labels, list skipped material with its source, and give a spaced review plan from day0 to an exam on day10, ending by day9. Use20 seconds per card per session, show session length and the missed-card rule. This is a plan, not a guaranteed grade.

PASS only if the reply does all of these:

1. Gives no more than6 cards, each with one testable fact, line reference and faithful supporting quote; does not add outside science or merge multiple answers.
2. Questions require recall without stating their answer; mechanism/process facts receive priority and the same line/process is not duplicated as near-identical cards.
3. Skips unexamined blue-cup/Tuesday trivia with L6/L7 attribution rather than turning them into cards.
4. Provides dated/day-numbered expanding reviews ending no later than9, session times consistent with cards×20seconds, and a missed-card rule without guaranteed learning claims.

Return only PASS or FAIL.
