---
name: clinical-note-fact-preserving-structuring
description: Reorganise a clinician's own brief session notes or stated goals into a required progress-note or treatment-plan template (SOAP, DAP, goals and interventions) by placing each fragment in a field, marking empty fields NOT DOCUMENTED, and ending with a list of every phrase that is the model's wording or inference. Use when a clinician or practice admin pastes short notes plus a template and wants a draft record. Not for diagnosis, risk assessment, billing codes, treatment advice or summarising a record for someone else.
metadata:
  tier: open
  level: L3
  domain: healthcare-admin
  install: optional
  keywords: [progress note, SOAP, DAP, treatment plan, documentation, template, clinician notes]
---

# Clinical note fact-preserving structuring

The clinician wrote the facts. This skill only moves them into the fields of a template. It adds
no observation, finding, diagnosis, risk rating, code, intervention or follow-up, because a
record that carries the model's guesses reads as the clinician's judgement.

## Steps

1. Split the notes into fragments, one per stated fact (a symptom, a duration, an intervention done in
   session, an agreement). Keep the clinician's words; shorten only by deleting filler.
2. Place each fragment in exactly one template field. A fragment fits where its meaning puts it,
   not where the field usually collects things: what the client reports goes to the subjective
   field, what the clinician did in session to the intervention field, what was agreed for next
   time to the plan field.
3. A field with no source fragment is written `NOT DOCUMENTED`. Typical empty fields: objective
   observations (unless the notes state one), mental status, risk, assessment or impression,
   progress rating, next appointment. Never fill them with a plausible sentence, and never write
   "no risk identified", "mood stable" or similar: absence from the notes is not a negative finding.
4. Do not turn a gap into content: do not infer a cause ("anxiety due to work stress" when the
   notes only say both), a diagnosis, a severity, a frequency, a duration or a number the notes
   did not state. A scale or measurable wording is added only when the clinician asked for it, and
   then the clinician's own target is restated, not invented.
5. For treatment-plan paperwork, keep the clinician-chosen goals and interventions as written in
   meaning. Restructure into measurable form only on request, and mark the added measure as a
   proposal.
6. End with a check list: "Wording that is mine, delete or confirm". List every phrase in the draft
   that is not a near-verbatim restatement of a note fragment (a joined clause, a normalised term,
   a heading label) and every template field left NOT DOCUMENTED. If there are none, say so.
7. State what you could not verify: you have only the pasted notes, not the session or the chart,
   and the clinician signs the record.

## Output

The filled template with each field labelled, then the "Wording that is mine" list, then one line
that the draft is for the clinician to edit and sign. No advice about the client.
