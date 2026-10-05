# Evidence log example

Read this before writing the questions and the log. The case is invented and differs from the one a
user brings; copy the shape, not the content.

Report: a window air conditioner runs but blows warm air since a power cut; the user measured 118 V at the
outlet and thinks the compressor has failed.

Safety first: the user did not describe a hazardous test, so open the next-checks section with one line
that anything inside the casing, with refrigerant or at mains voltage is for a technician.

Questions, cheapest and most common first:

1. Is the mode on cool, and is the set temperature below the room temperature? (settings after a power cut)
2. Is the filter visibly clogged or the coil visibly iced? (looking only)
3. Does the fan run on high while the compressor hum is absent or present? (listening)
4. Does it behave the same after being off for some hours? (separates a reset or protection delay)
5. Did anything else on the same circuit trip or flicker? (supply)
6. Was it blowing cold before the power cut, and for how long has it been this way?

Log:

| Step | Symptom or test | Reading (unit) | Result | Conclusion limited to the result | Rules out | Still open |
|---|---|---|---|---|---|---|
| 1 | Outlet voltage measured by user | 118 V | Measured | Consistent with normal supply at that moment; conditions not stated | Nothing firm | Supply under load |
| 2 | Warm air since the power cut | none | Observed | Consistent with several causes | Nothing | Settings, protection delay, filter, refrigerant, compressor |

Hypotheses, not facts: "the compressor has failed". Hand to a technician: opening the casing, anything on
the refrigerant side, anything live.
