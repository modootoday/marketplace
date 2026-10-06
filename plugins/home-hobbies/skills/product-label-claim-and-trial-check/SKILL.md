---
name: product-label-claim-and-trial-check
description: Answer a question about a cosmetic or household product's ingredients or layering compatibility from the label text the user pastes, not from the product name, separating what the user observed from what is inference, pointing to an ingredient reference the user can check, and proposing a small trial instead of a verdict. Use when someone asks whether two products work together, why a product pills or balls up, or what is in a product, and gives a name or photo description. Not for medical or skin-condition advice, safety or allergy guarantees, or efficacy claims.
metadata:
  tier: open
  level: L2
  domain: home-hobbies
  install: optional
  keywords: [product label, ingredients, layering, pilling, patch trial, cosmetics, label check]
---

# Product label claim and trial check

Formulations change between versions and markets, so the name is not the ingredient list. Work
from the text on the pack in the user's hands.

## Steps

1. **Ask for the label.** If the user gave only a name, ask them to paste the ingredient list
   and the size or version text from the pack, for each product involved, and say in the reply
   that both are wanted, copied from the pack in hand (name the words "version or size text").
   A maker page or database is a cross-check in step 4, never a substitute for the user's own
   pack. Do not recall an ingredient list from memory and present it as the label.
2. **Compare to what is pasted.** List the ingredients the user gave, in order, and use only
   those. Where the user states a claim from the product page, mark it as the maker's claim.
3. **Separate observation from inference.** Observed: what the user reports (balls up, takes
   long to dry, order, amounts). Inference: a possible reason from the label, such as film
   formers or silicones layered over water-based products, marked with the words "hypothesis"
   and "the label alone cannot confirm this" (amount, wait time and rubbing never show on a
   label). Do not head the section "unconfirmed until we see the labels": a label can
   support the guess, only the trial can test it.
4. **Source.** Name an ingredient reference the user can check themselves, such as a public
   ingredient database or the maker's own page for that version, and say the user should
   confirm the list against it. Do not cite a source you cannot name.
5. **Small trial.** Suggest changing one thing at a time on a small area: fewer drops, longer
   wait between layers, swapping order, one product alone, noting each result. Say what result
   would count as the hypothesis holding.
6. **Limits.** Do not say a product works, is suitable for anyone's skin, or is safe. For a
   reaction, pain or a medical condition, point to a pharmacist or doctor.

## Output

Label text received (or the request for it), observation versus inference, source to check,
the trial steps with what to record, and a one-line statement of what could not be verified.
