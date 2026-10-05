# Corrected pattern format: arithmetic on every repeat round

Read this before writing the corrected pattern. A corrected pattern that shows only the new
count in brackets is incomplete: the maker cannot see why the number is right, and a reviewer
cannot tell a checked round from a copied one.

## Rules

1. Every round or row that has a repeat, an inc, a dec or a chain carries its arithmetic on
   the same line, wrong or right: "eats E x T = A, makes M x T = B". Do this for rounds that
   were already correct too. Only plain "sc around" rows may show just the running total.
2. Every line ends with the running total in brackets, and a stated count that was wrong is
   marked with the old value: "(24, was 28)".
3. Per repeat, E is stitches consumed (sc 1, inc 1, dec 2) and M is stitches made (sc 1,
   inc 2, dec 1). E x T must equal the previous total.
4. A chain of N worked from the 2nd chain from the hook gives N - 1. To get a wanted count
   of W, chain W + 1.
5. After the corrected parts, give the mismatch list: where, stated, computed, one fix.

## Worked example (a different pattern: a three-part octopus)

Input rows, as an AI wrote them:

```
HEAD
R1: 6 sc in MR (6)
R2: inc x6 (12)
R3: (sc, inc) x6 (18)
R4: (3 sc, inc) x6 (30)
R5-R8: sc around (24)
R9: (2 sc, dec) x6 (18)
Stuff and close.
ARM (make 8)
Ch 13, sc in 2nd ch from hook and in each ch across (13)
```

Corrected, with arithmetic on each repeat round:

```
HEAD
R1: 6 sc in MR (6)
R2: inc x6: eats 1 x 6 = 6, makes 2 x 6 = 12 (12)
R3: (sc, inc) x6: eats 2 x 6 = 12, makes 3 x 6 = 18 (18)
R4: (3 sc, inc) x6: eats 4 x 6 = 24, makes 5 x 6 = 30, but R3 left 18 (wrong)
```

The R4 repeat eats 24 stitches and R3 only made 18, so the repeat is wrong, not the count:
the repeat that eats 18 is (2 sc, inc) x6, which makes 4 x 6 = 24.

```
R4: (2 sc, inc) x6: eats 3 x 6 = 18, makes 4 x 6 = 24 (24, was 30)
R5-R8: sc around: eats 24, makes 24 (24)
R9: (2 sc, dec) x6: eats 4 x 6 = 24, makes 3 x 6 = 18 (18)
ARM (make 8)
Ch 14, sc in 2nd ch from hook and in each ch across: 14 - 1 = 13 (13)
```

Mismatch list for that input: R4 stated 30, computed 24 (change the repeat to (2 sc, inc));
arm chain 13 gives 12, not 13 (chain 14). R2, R3, R5-R8 and R9 were right and are listed as
checked. Missing: the head has no closing step count after "Stuff and close" (6 dec), and the
8 arms have no attach step (sew the open end of each to the underside of the head).

## Script

`node scripts/count-rows.mjs pattern.txt` prints exactly these lines for a pasted pattern
and ends with an issue list. Section headers are lines in capitals, optionally with
"(make N)". When you cannot run it, produce the same lines by hand.
