---
description: What stock-photo-metadata-format-check should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [stock-photo-metadata-format-check]
---

Synthetic example. I need an upload CSV for a stock agency from my notes on five photos. The agency's rules, copied from its page: columns Filename, Title, Description, Keywords in that order; title at most 60 characters; description at most 150 characters; 8 to 25 keywords, single words only, lowercase, separated by commas inside the Keywords field, most important first; UTF-8.

The files and my notes:
- IMG_2201.jpg: old stone harbour wall with small fishing boats in thick morning fog over calm water near the village, soft grey light
- IMG_2201-2.jpg: same harbour, same fog, but a single red boat in the centre
- IMG_2210.jpg: a tall stone tower on a hill under a cloudy sky. I think it is the cathedral tower in Aldren, but I am not sure
- IMG_2212.jpg: close-up of a ripe red apple with water drops on a wooden table, studio light
- IMG_2214.jpg: no notes yet, I forgot to write anything

Keywords must be single words, not phrases like "fishing boat". Please produce the CSV.
