---
name: garden-plan-constraint-check
description: Plan a garden bed or small farm from measured site facts and check the plan against them - one site brief (dimensions, sun hours, soil pH and texture, last and first frost, water test with units and method), bed layout checked for row count, spacing and area used and left over, a sowing and harvest calendar built from the stated frost dates and variety days with the source of each interval, and plant suggestions checked against light, soil and native range with guesses marked. Use when a grower gives bed size, sun, soil, frost dates or a water test and asks for a layout, calendar, plant list or what to confirm. Not for pest or disease diagnosis, or for guaranteeing yields.
metadata:
  tier: open
  level: L3
  domain: land-growing
  install: optional
  keywords: [garden plan, bed layout, frost dates, plant spacing, soil ph, water test]
---

# Garden plan constraint check

Growers paste site facts into a chat and get plans that quietly ignore them: too many plants
for the bed, a harvest after the first frost, acid lovers on alkaline clay. This skill keeps one
site brief and checks every suggestion against it. The grower, who can see the site, confirms
measurements and local suitability; the skill states what it could not verify.

## Steps

1. Write the site brief once and reuse it: dimensions, sun hours, soil pH and texture, last and
   first frost dates, water test values with units and the test method (or "method not stated").
   Mark anything missing as unknown instead of filling it in.
2. Layout. For each crop compute plants per row or per bed from the stated spacing and the bed
   length and width (plants = floor(length / spacing), per row, and rows from the width). Give
   area used and area left over, and note that a spacing is a number the grower supplied or a
   general rule you are quoting.
3. Light. Compare sun hours with each crop's need: fruiting crops such as tomatoes generally
   want about 6 to 8 hours, leafy crops and shade lovers tolerate less. Call 5 hours marginal
   for fruiting crops and fine for leafy crops, and say what that means for placement or crop choice.
4. Calendar. Start from the stated last frost for outdoor transplanting and count the variety's
   days to harvest from the transplant date; stop at the stated first frost. If the harvest
   date falls after first frost, say so and suggest an earlier variety, a start indoors or
   protection, as options to confirm. Cite where each interval came from (variety data given,
   or a general figure to check against the seed packet).
5. Soil and water. Treat pH and texture as constraints: do not recommend plants that need the
   opposite (acid-loving plants at pH 7.8, for example), and mention amendments only as
   something to test and confirm. Report water values with their units; if the method or lab is
   missing, say the values cannot be compared with guideline ranges until it is known.
6. Plant suggestions (including native plants): check light, soil and native range against the
   brief and label each as fits, does not fit, or guess. Local native range and invasiveness
   need a local source.
7. End with the confirm list for the grower: measurements, frost dates for the exact location,
   seed packet intervals, local suitability, and the water test method.

## Output

The site brief, a layout table (crop, spacing, plants, area used, area left), a calendar
(sow or transplant, harvest end, against the frost window), a fit table, and the confirm list.
