---
name: subject-continuity-reference-sheet-check
description: Check whether fictional or user-owned characters in AI-generated stills or video still match their approved reference sheet across shots and episodes - split fixed traits from per-episode state, compare every re-appearance to the original reference and never to the previous shot, label each as match, intended change, unintended drift or cannot judge with frame and timecode evidence, check characters in one shot stay distinct, and leave approval to the director. Use when a character's face, hair, outfit, props or build change between generated shots, outfits reset to the first state, or two characters blend. Not for identifying or profiling a real person from a face, or for generating the footage.
metadata:
  tier: open
  level: L3
  domain: video-production
  install: optional
  keywords: [character consistency, reference sheet, continuity, generated video, drift, storyboard, episodes]
---

# Subject continuity reference sheet check

Generated characters keep the face but drop the outfit, props or a mole, or take on a trait
of the other character in the shot. This skill compares re-appearances with the approved
reference sheet and sorts each change into intended or drift. It checks existing material and
does not generate images or video; regenerating is paid work on a tool of the user's choice.

## Scope guard

Only fictional characters and user-owned or user-supplied reference sheets. Never identify
a real person, say who a face resembles, or infer age, origin or identity from a face. If the
subject is a real person, stop and say the check compares only against a sheet the user
supplies and cannot say who someone is.

## Steps

1. Build the sheet first from what the user supplied (images or text). Two blocks per
   character: fixed traits (face shape, hair style and colour, build, height, marks such as
   a mole or glasses) and per-episode state (outfit, props, wounds, era, flashback or
   present). For each episode list the allowed state changes, for example a plot-driven
   outfit change. Write each allowed change in the sheet as "intended change, not drift" with
   its episode, and say that going back to the earlier state in that episode is a regression
   (unintended drift). If a trait is not on the sheet, mark it "not specified" and do not judge it.
2. Compare every re-appearance against the original approved reference, not the previous
   generated shot. A drift can be copied forward shot to shot, so the previous shot is a
   weak baseline. Never promote a new generation to be the reference; only the director
   replaces a reference.
3. Label each appearance: match, intended change (listed as allowed for that episode),
   unintended drift (a fixed trait changed, or a state differs from what that episode
   allows, including a return to an earlier outfit), or cannot judge (occlusion, blur,
   extreme angle, frame not seen). Give the evidence as file or shot id and timecode or
   frame, and name the exact trait, for example "ep2 shot 9: hair length, mole missing".
   A match also names the traits that were checked, never "none"; a cannot judge names what
   blocks it and does not list a shot nobody described.
   Judge only what the user described or showed; do not guess what an unseen frame contains.
4. For shots with several characters check each one is present, distinguishable and not
   blended with another in face, hair colour, outfit or build. A trait of character A on
   character B is drift on B and a blend finding.
5. Inside a clip, entry, occlusion, re-entry and fast motion are where drift starts. Sample
   frames around them against the reference, not only first and last frame. Occlusion and
   blur are cannot judge, not failures.
6. For each drift write one regeneration note: which shot, which trait to restore, and the
   reference to attach, and write the line "compared with the original reference sheet, not the
   previous shot; no regenerated shot becomes the reference". Do not state a measured accuracy or a match score; this is a
   human-review check and the director decides what is accepted.

## Output

The sheet (fixed traits, per-episode state, allowed changes), a table of shot, character,
label, trait, evidence, a regeneration list, and a closing line that approval stays with the
director.
