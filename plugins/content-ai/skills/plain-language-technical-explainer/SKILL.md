---
name: plain-language-technical-explainer
description: Turn a technical problem, outage or design issue into a note a non-technical executive, owner or homeowner can act on - impact, cause, action and next date stated separately in plain words, numbers, responsibility and assumptions kept exactly as the source gives them, overstated certainty and minimized risk flagged, and one decision the reader must make. Use when someone must explain an incident, outage, design issue or technical constraint to a reader who is not technical. Not for public status page updates (operations-cs status-incident-comms), the internal postmortem, or marketing copy.
metadata:
  tier: open
  level: L2
  domain: content-writing
  install: optional
  keywords: [plain language, executive update, outage explanation, non-technical reader, incident summary, owner briefing]
  verified-runtimes: [claude-code]
---

# Plain-language technical explainer

Explaining a technical problem to someone who cannot check it fails in two
directions: jargon the reader skims past, and "simplifying" that rounds a number,
drops an assumption or sounds more certain than the evidence. The note must be
easier to read and no different in meaning from the source.

Based on two first-person reports (IT operations, civil engineering) of rewriting
technical content for non-technical readers; treat it as a checklist, not a standard.

## Steps

1. List the facts exactly as supplied: numbers with units and periods, who is
   responsible for what, dates, assumptions, and what is not yet known. Do not add a
   cause, a deadline, a cost or an owner that the source does not give.
2. Name the reader and what they decide. If the decision is not in the source, state
   the one decision the facts imply and mark it as a proposal for the sender to confirm.
3. Write four labelled parts, each short and in everyday words:
   - **Impact**: who or what was affected, how many, how long, and what was not
     affected (for example that no data was lost, if the source says so).
   - **Cause**: one plain sentence. If the cause is unconfirmed, say it is the current
     understanding and who confirms it.
   - **Action**: what has been done and what will be done, by whom, by when.
   - **Next date**: when the reader will hear more, or the date of the next step.
4. Explain each unavoidable technical term once, inside the note at its first use, in a
   clause, or replace it with what it does ("a full disk" becomes "one server ran out
   of storage space", "the payment queue" becomes "the line that passes orders to the
   payment step"). Treat queue, node, server, alert, cache, latency, API, UTC and
   similar words as jargon for this reader: explain or replace each one. An explanation
   that appears only in your check list does not count.
5. Keep numbers unchanged. Do not round, convert, or turn a count into "many". Keep the
   source's time zone, or say which one the times are in.
6. Review each sentence for certainty. Flag and fix wording that claims more than the
   source (guaranteed, fully resolved, cannot happen again) or less (minor, just a
   glitch, only affected a few) when the numbers do not say so.
7. End with the decision the reader must make and by when.

## Output

1. The note, four labelled parts and the decision line, under 200 words unless asked.
2. A short check list: numbers kept (list them), assumptions carried, terms explained,
   sentences changed because they overstated or minimized, and anything not in the
   source that you left out.
3. Open questions for the sender: missing owner, missing date, unconfirmed cause.

Stop and hand to a person when the note would state legal, safety or financial
liability, a refund or compensation, or a structural or safety conclusion about a
building: those need a qualified person's sign-off, and the note says what was not
verified.
