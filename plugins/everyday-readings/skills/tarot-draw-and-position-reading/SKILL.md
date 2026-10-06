---
name: tarot-draw-and-position-reading
description: Read a tarot spread so that each card is tied to its named position and to the user's question, with the draw recorded first as a table of position, card and orientation, and with the draw coming only from the user's own physical draw or from a random method shown step by step, never from cards picked to fit the topic. Links adjacent cards, keeps the user's own card associations ahead of generic text, and frames the reading as reflection. Use when someone asks for a spread such as past, present, future or a celtic cross to be read, or asks to be dealt cards. Not for numerology, birth chart or pillar arithmetic (divination-calculation-fidelity), predictions, or advice on health, money, legal or relationship decisions.
metadata:
  tier: open
  level: L2
  domain: everyday-readings
  install: optional
  keywords: [tarot, spread, card positions, draw record, reversed cards, reflection]
  verified-runtimes: [codex-cli, gemini-cli, grok-cli, antigravity]
---

# Tarot draw and position reading

Chat tarot tends to go wrong in two ways: it explains each card on its own and loses the
spread, and when asked to draw it chooses cards that suit the topic. Fix the draw and the
positions first; the reading comes second and stays modest.

## Steps

1. **Name the spread and its positions.** Use the spread and position names the user gave
   (for example Past, Present, Next). If they named a spread but no positions, state the
   positions you assume and say they are an assumption. Ask for the question if none was given.
2. **Record the draw before reading it.** Write a table: position number, position name, card,
   orientation (upright or reversed). Copy the user's cards exactly, including any card they
   gave only by name; do not add, swap or drop a card, and do not label an orientation the
   user did not state (leave it as given and read it upright, saying so once). Say where the
   draw came from: "your physical draw".
3. **If the user wants to be dealt cards**, do not choose cards. A model has no shuffled deck,
   so say so and offer one of two ways: the user draws physically and pastes the cards, or a
   random draw whose method is shown, for example numbers from a source the user supplies or a
   script run in the shell, mapped to the 78-card list with the mapping printed. Record the
   method with the draw. Never present picked cards as drawn.
4. **Read each card through its position, then through the question.** One short paragraph per
   card: what the card traditionally signifies, what that means for this position (a card in
   the Past place speaks of what led here, not of what comes), and how it bears on the question
   in the user's own words. Treat a reversed card as the user's tradition does; if they did not
   say, state the convention you use. Use the user's own associations for a card when they gave
   them.
5. **Link adjacent cards.** Name at least one relation between neighbouring positions
   (continuation, contrast, tension) from the cards actually drawn, and say what the spread
   as a whole shows about the question.
6. **Frame it.** Say this is a reading for reflection, not a prediction. Do not tell the user
   what to decide; if they want a verdict on a choice, hand it back as two or three questions
   they can think through. Put those questions only in a closing list, two or three in total, and
   put none inside the per-card paragraphs. Give no advice about health, money, legal matters or
   relationships. Do not suggest conversations to have or steps to take.

## Output

Spread and positions, the draw table with its source, one reading per card tied to position and
question, the links between positions, and the reflection-only statement.
