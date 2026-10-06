---
name: freight-classification-lookup
description: Prepare a provisional freight class or tariff classification for an unusual shipment by naming the classification system and edition, collecting commodity description, dimensions, weight and packaging, computing density, applying the density table the user supplies, and stating that the official schedule entry and a licensed broker or carrier decide. Use when a shipper or buyer needs a candidate freight class or classification evidence for a shipment. Not for filing a classification, customs declarations, duty advice, or inventing item numbers.
metadata:
  tier: open
  level: L2
  domain: procurement
  install: optional
  keywords: [freight class, density, classification, shipment, commodity description, provisional]
  verified-runtimes: [claude-code]
---

# Freight classification lookup

A freight class comes from the official classification schedule entry for the commodity, and from
density only where the entry or the schedule's rules say so. A guess presented as a class costs
reclassification fees later. This skill gets the user to a provisional class and an evidence list.

## Steps

1. Name the system (for example the North American less-than-truckload class system, or the
   Harmonized System for tariff codes) and the edition. If the user does not know the edition, ask
   which one the carrier uses and say the answer can differ between editions.
2. Collect what the lookup needs: precise commodity description (what it is, material, use),
   packaging (pallet, crate, loose), piece count, dimensions per handling unit and weight per unit.
   Ask for what is missing instead of assuming.
3. Compute density: handling-unit volume in cubic feet (length times width times height in inches,
   divided by 1,728), weight divided by volume. Use the dimensions of the whole handling unit
   including pallet and overhang. Show the arithmetic and the unit.
4. Apply a density table only if the user pasted one, or says which edition's table to use. Find
   the band that contains the computed density (a band "5 to under 6" holds 5.7, not the next one
   up), then state the class once. Check the band before writing; the reply must not show a first
   class and then a correction. Give the class the band implies and the reasoning. If the commodity has its own schedule entry, that
   entry controls, so say the density result is a fallback.
5. Cite the schedule entry only if the user supplied it. Never write an item number, heading or
   tariff code from memory; say "item entry not located" and list the description terms to search
   for in the official schedule.
6. Mark the result provisional. The official schedule, the carrier's own tariff and a licensed
   broker decide the class; give the user the evidence package (description, dimensions, weight,
   density, packaging) to take to them.

## Output

Edition and system, density arithmetic, candidate class with reasoning, what is missing, the
provisional label, and who confirms it.
