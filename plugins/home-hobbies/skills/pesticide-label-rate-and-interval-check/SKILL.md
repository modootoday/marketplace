---
name: pesticide-label-rate-and-interval-check
description: Plan a garden or farm chemical application only from the product label text the user pastes - quote the rate line and crop listing, convert the rate to the user's area and sprayer volume in code with units shown, give the pre-harvest interval, the re-entry interval, the maximum applications and the minimum days between them, check the planned spray and harvest dates against them, allow a tank mix only where the label says so, and mark anything the label does not cover as not on the label, to be asked of the manufacturer or a local extension office. Use when a grower pastes a pesticide, herbicide or fungicide label and asks how much to mix, when to spray or harvest, or whether to combine products. Not for choosing a product, for off-label or mixed uses the label does not state, or pest and plant identification (plant-photo-id-confidence-gate).
metadata:
  tier: open
  level: L3
  domain: home-hobbies
  install: optional
  keywords: [pesticide label, application rate, pre-harvest interval, re-entry interval, tank mix, sprayer, unit conversion]
  verified-runtimes: [codex-cli, gemini-cli, grok-cli]
---

# Pesticide label rate and interval check

The label is the legal instruction, and a model that answers from memory gets the mix, the
timing or the tank combination wrong. Read only the label the user pasted; where it is silent,
say so.

## Steps

1. **Get the label.** If no label text is pasted, ask for it (rate, crops, intervals,
   mixing and restrictions) and give no figures. Do not recall a rate from memory.
2. **Quote it.** Copy the rate line, the crop listing, the pre-harvest interval (PHI) per crop,
   the re-entry interval (REI), the maximum number of applications, the minimum days between
   them, any water volume range and any mixing statement, in the label's own words and units.
3. **Crop check.** For each crop the user plans to treat, say whether it is on the label. A crop
   that is not listed is "not on the label": do not extend the rate to it.
4. **Convert the rate in code.** Convert the user's area to the label's unit (square metres
   times 10.7639 for square feet, and so on) and compute product per area, then per sprayer
   volume, writing every step as one line with the unit on every number (for example
   `3 m x 1.5 m = 4.5 m2; 4.5 m2 x 10.7639 sq ft/m2 = 48.4 sq ft`), and both label and metric units if the user works in
   metric. Use a short `node -e` expression when a shell is available. If the label gives the
   rate per area and a water range, state the product amount for the area first, then the
   water range, and mix only what the area needs.
5. **Intervals against the plan.** Count days from the planned spray to the planned harvest
   and compare with the PHI for that crop, writing the count out ("Monday to Wednesday evening
   is 2 days, the PHI is 3 days"); compare repeat sprays with the minimum interval and
   the maximum count; give the REI as the time before anyone re-enters. Say plainly when the
   plan breaks one of them and give the earliest date that does not.
6. **Tank mixes.** Allow a mix only if the label states it. If the label forbids a partner,
   quote it. If the label does not mention the partner product, mark it "not on the label" and
   send the question to the manufacturer or an extension office; do not judge it from memory.
7. **Close with limits**: product choice, resistance, weather and local rules are not
   covered; follow protective equipment statements on the label; contact poison control for
   any exposure.

## Output

The quoted label lines, a crop table (on label or not), the rate conversion with units, the
interval check against the plan with dates, the tank-mix finding, and the list of items not on
the label.
