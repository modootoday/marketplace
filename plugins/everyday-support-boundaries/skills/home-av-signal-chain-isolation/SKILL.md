---
name: home-av-signal-chain-isolation
description: Isolate a home audio-video fault such as a soundbar that loses eARC or ARC sound when the TV sleeps, or a first room measurement that looks wrong - ask for models, firmware, ports and the real wiring, draw the chain, change one thing per step with the expected result for each, separate audio transport from control (CEC) problems, and for room measurement check microphone calibration, position and repeat runs before reading the graph. Use when a user keeps resetting a TV, player or soundbar, or doubts a speaker measurement. Not for generating settings from a photo, applying one user's workaround to every product, or electrical repair.
metadata:
  tier: open
  level: L2
  domain: home-av
  install: optional
  keywords: [eARC, ARC, HDMI-CEC, soundbar, TV, signal chain, room measurement, isolation test, troubleshooting]
  verified-runtimes: [claude-code]
---

# Home AV signal chain isolation

Resetting everything at once destroys the evidence. The method is the same as any fault
isolation: know the real chain, change one thing, say what should happen, record what did.

## Steps

1. Ask first for what you do not have: model and firmware of each device, which port on each
   device (the eARC or ARC labelled HDMI port, not just any), the cables used, and what the
   symptom is exactly (silence, dropouts, wrong format, power not following). Do not invent
   a model's behaviour; say that model-specific facts come from each manufacturer's manual
   or support page, name which page to read for which device, and mark any such fact you
   cannot confirm as unverified.
2. Draw the actual chain as text (source, TV, soundbar with port and cable on each link) and
   note which link carries audio return (eARC or ARC) and which carries control (CEC).
3. Write a numbered test table: one change per row, and for each row the expected result
   if that change is the cause and what to record. Typical single changes: swap the cable
   with a known high-speed or certified one, move the bar to the labelled port, disable one
   control feature at a time (CEC, then the sleep or standby behaviour), update one device's
   firmware, run the chain without the console. Never change two items in one row.
4. Treat audio (does sound arrive) and control (does power or volume follow) as separate
   questions with separate rows.
5. For a room measurement: before reading the graph confirm the microphone and its
   calibration file are the right ones, record the position and height, repeat the run at
   the same place and at one nearby place, and compare. A curve that changes a lot between
   identical runs is a setup problem, not a room finding. Do not give EQ values from a
   photo or a single run.
6. Say what remains unknown, and do not present another user's workaround as a fix for this
   setup; list it, if at all, as one more single-change test.

## Output

The questions you still need answered, the chain drawing, the numbered one-change table
(change, expected result, record), and the unverified items. Read
`references/isolation-table.md` for a worked table.
