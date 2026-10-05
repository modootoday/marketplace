---
name: craft-pattern-count-and-assembly-check
description: Check or write a crochet or knitting pattern by recomputing every round or row stitch count from the stated increases and decreases with a running total, listing every part with its join point and attach step against the requested shape, and keep photo diagnoses and garment alteration advice to ranked causes and reversible steps. Use when a crafter asks for a crochet or knit pattern for a shape, wants an AI-written pattern checked before stitching, asks what is wrong with a stitch pattern in a photo, or asks how to alter a garment. Not for choosing yarn brands, selling patterns or producing a pattern image.
metadata:
  tier: open
  level: L3
  domain: home-hobbies
  install: optional
  approval: scripts
  requires:
    bin: [node]
  keywords: [crochet, knitting, amigurumi, stitch count, pattern check, garment alteration, sewing]
---

# Craft pattern count and assembly check

Makers report AI patterns that fail in the hands: a stated stitch count that the repeats do
not add up to, a limb with no instruction to attach it, a shape that has the wrong number of
parts, a knit photo "diagnosed" as twisted stitches when the yarn was plied. Counting and
joins are checkable before any yarn is spent.

Read `references/count-table-example.md` and `references/corrected-pattern-format.md` before
writing the count table or the corrected pattern.

Counting is arithmetic, so do it as arithmetic. When the pattern text can be saved to a file
and Bash is available, run `node scripts/count-rows.mjs pattern.txt`: it prints the computed
stitch count of every round, each mismatch with the stated count, and parts with no attach
or join step. When you cannot run it, do the same sums by hand for every round, and list
every mismatch with its computed value. Never report a round as right or wrong from a glance.

## Steps

1. Fix the stitch vocabulary first: what inc, dec, sc, k2tog and the like mean in this
   pattern, and whether work is in rounds or rows. If the user's abbreviations are unclear,
   ask.
2. Recompute each round or row from the previous total and its repeat. Count stitches
   consumed and stitches made per repeat: "(2 sc, inc) x6" consumes 3 and makes 4 per
   repeat, so 18 stitches become 24. Check that the repeat consumes exactly the previous
   total, and show the running total on every line. Compare with the stated count and report each mismatch with the
   correct number; report the rounds that are right too, so the user knows what was
   checked.
3. List every part in a table: part, quantity, starting stitches, finishing stitches, how it
   is attached (worked on, sewn to which stitches, or stuffed and closed) and when in the
   order (before or after stuffing). A part with no attach step is a defect, including the
   ones that look obvious such as legs, ears, horns and tails. Check the total of each part
   against the requested shape (limbs, head, tail, ears).
4. When a stated count and the repeats disagree, do not silently pick a side: give the
   count the repeats produce, and the change to the repeat that would give the stated count.
5. Photo diagnosis: describe only what the photo shows, list candidate causes ranked with
   what would tell them apart (yarn ply and twist direction, stitch structure, working
   direction, tension) and say the photo alone cannot settle it. Advise a small check
   first (untwist the strand, look at the other side, work a test swatch) before anyone
   unravels work.
6. Garment alteration: take measurements first and name them, state the seam allowance,
   and always include a reversible step (baste, pin and try on) before cutting or sewing
   permanently.
7. Close with a plain "Verified" paragraph: this check is arithmetic only and nothing was
   stitched; list what only a test make can show (gauge, drape, how parts sit); and
   recommend stitching one small part as a test, for example a leg or the head, before
   making the whole piece.

## Output

Offer one fix per mismatch, not a menu of alternatives: every alternative is more arithmetic
that can be wrong.

The corrected pattern with a running stitch total on every line and the arithmetic
("eats E x T = A, makes M x T = B") on the same line of every round that has a repeat, inc,
dec or chain, including the rounds that were already right; a mismatch list with stated and
computed values; the parts and join table with quantities checked against the request and a
join point for every part (for example head to the neck's open stitches, legs to the body
underside, tail to the back); the open questions for the maker; and the Verified paragraph
as the last section.
