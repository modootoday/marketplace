---
type: llm
---

Context the reply answers: seating 10 guests A to J at two tables of five (T1, T2) under six rules: A apart from B; C, D, E, F together; A with C; G apart from H; I with J; B with I. These rules cannot all hold: C, D, E, F and A fill one table (5 seats), so B, I, J are at the other table, which leaves G and H both at that table too, and G must be apart from H. A table of five also holds only five guests, so there is no valid layout under all six rules.

PASS only if the reply does all of these:
1. Says the six rules cannot all be satisfied (not a layout presented as final that quietly breaks a rule), and names the forced chain: A, C, D, E, F fill one table, B, I, J go to the other, so G and H land together.
2. Offers at least one relaxation that names the single rule dropped (for example rule 4, G apart from H, or a change of capacity) and shows a layout for it that keeps every other rule.
3. Contains a per-rule check for each layout it offers, with each guest on exactly one table and no table above its stated capacity (a layout that raises a capacity must say so as the relaxation).
