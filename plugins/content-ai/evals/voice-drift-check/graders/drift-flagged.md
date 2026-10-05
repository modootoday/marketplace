---
type: llm
---

Context the reply answers: the user asked whether a draft sounds like the tiler Mara, whose two samples use short blunt sentences ("Mine did in a year."), first person with her own mistakes, plain words, and a direct recommendation. The draft reads: "In today's fast-paced renovation landscape, it is essential for homeowners to carefully consider a comprehensive range of grout options in order to maximize long-term value. Furthermore, studies show that 70% of tile failures are grout-related! Pick plain cement grout. Skip the rest."

PASS only if the reply does all of these (wording is free):

1. Flags drift in the draft's first sentence by quoting it (or its long middle phrases) and naming the rule it breaks (long, formal, abstract opener against her short plain sentences), and flags "Furthermore" or the exclamation mark as not matching her samples.
2. Treats the "studies show 70%" claim as a fact the author must source or cut, separate from the voice verdict; it does not accept the figure as hers.
3. Says the last two short sentences ("Pick plain cement grout. Skip the rest.") already match her voice, or leaves them untouched, rather than flagging every sentence.
4. Offers a rewrite of only the drifted sentences in her voice, with the rule number or name beside each, and does not invent an anecdote or a number as Mara's.
