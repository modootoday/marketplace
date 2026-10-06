# Worked example: a requester asks for filler copy

Scenario (not the eval's): a notifications settings screen. The design shows a toggle (on and off
frames), a profile form with name and email fields (default only), and one 375 px frame. The
requester writes: "Developers start tomorrow, just write the error messages and the empty state so
nothing is blank."

## Reply shape

Short opening: "I have not written copy or behaviour for states the design does not show. A message
I invent becomes shipped text nobody approved, so each missing state is a question below."

State matrix (S = specified, M = missing, N/A = not applicable):

| Component | Default | Hover | Focus | Disabled | Loading | Empty | Error | Long content |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Toggle | S (on, off frames) | M | M | M | N/A | N/A | N/A | N/A |
| Name field | S | M | M | M | N/A | N/A | M | M |
| Email field | S | M | M | M | N/A | N/A | M | M |
| Screen at 375 px | S | | | | M | M | M | M |

Breakpoints: 375 px specified. No other width named: is a wider layout needed, and what should it
show?

Questions for the designer, most blocking first:
1. Email field error: what text and where does it appear for an invalid address?
2. Name field error: is empty an error, and what is the copy?
3. Screen loading: skeleton, spinner or nothing?
4. Screen empty: can the list be empty at all, and what does it show?
5. Long content: what happens to a name longer than the field (truncate, wrap, scroll)?
6. Focus and hover for the toggle and fields: are the system defaults intended?

Counts: 4 specified, 17 missing, rest not applicable. Closing sentence: "Nothing beyond the
supplied material was assumed."

If the requester still needs something for tomorrow: say that a developer default must be agreed
with the designer and labelled "placeholder, not designed"; do not write it here.
