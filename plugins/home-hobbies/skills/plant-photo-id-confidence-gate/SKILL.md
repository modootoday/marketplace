---
name: plant-photo-id-confidence-gate
description: Handle a request to identify a plant, pest or plant disease from a photo or a description of one by listing only the visible features, ranking two or more candidates with the feature that supports and the feature that argues against each, always naming the dangerous lookalikes for the family (for example poison hemlock against wild carrot, parsley or other umbellifers), asking for the extra photos that would settle it, and sending any edibility or toxicity question to a poison control centre or a local extension service without ever calling the plant safe or edible. Use when a grower or walker asks what a plant, bug or leaf problem is from a picture or description. Not for foraging approval, pet, livestock or medical advice, or garden planning (garden-plan-constraint-check).
metadata:
  tier: open
  level: L3
  domain: home-hobbies
  install: optional
  keywords: [plant identification, photo, lookalike, poison hemlock, umbellifer, toxic plant, extension service]
  verified-runtimes: [codex-cli]
---

# Plant photo ID confidence gate

A photo identification is a guess from a few features, and a wrong guess about an edible or a
poisonous plant can hurt someone. Rank candidates, show the doubt, and hand the safety question
to people who can hold the plant.

## Steps

1. **Features seen, and only those.** List what the photo or description shows: habit and
   height, stem (hollow, hairy, smooth, marked), leaf shape and arrangement, flower or seed
   head, habitat, and scale. Mark any feature not visible as "not shown". Do not add a feature
   to make a candidate fit.
2. **Two or more candidates.** For each give the feature that supports it and the feature that
   argues against it, and a rough confidence word (likely, possible, unlikely) with the reason.
3. **Name the dangerous lookalikes** for the plant family, even when the user's candidate looks
   fine. For the carrot family: poison hemlock (smooth hollow stems with purple blotches),
   water hemlock, wild carrot (hairy stems, a dark floret in the umbel), parsley and
   others; for other families name the toxic ones that resemble it.
4. **Never settle a doubtful feature in the user's favour.** If a feature that matches a toxic
   candidate is present, treat that candidate as live, whatever else the user has decided.
5. **Ask for what would settle it**: stem close-up and cut section, leaf underside, flower or
   seed head, base or root, a hand or ruler for scale, and the whole plant. A pest or leaf
   problem: both leaf surfaces, the pattern on the plant, and the pest at scale.
6. **Safety route.** Say clearly that the reply cannot call the plant safe or edible, and send
   any question about eating, touching or giving the plant to anyone to a poison control
   centre or a local extension office or botanist. If someone has already eaten it, say to
   contact poison control or emergency services now.
7. **Say what could not be verified**, in these words or close to them: "a photo or a
   description is not the plant in hand", and name the features you could not see.

## Output

Visible features, a candidate table (candidate, supports, against, confidence), dangerous
lookalikes, the photos to take, and the safety referral.
