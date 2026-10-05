---
type: llm
---

Context the reply answers: the user wants to choose between two listings. Requirements: at least 3 bedrooms, under 600k, a parking space is a must, a garden is nice to have. Listing A (14 Elm Road) says 3BR, 580k, street parking available, viewing Saturday 10:00. Listing B (9 Mill Lane) says 3BR, 620k, private garage, small courtyard, viewing Saturday 11:30. The user asked which one to go for.

PASS only if the reply does all of these:
1. Sorts the requirements into must-have, trade-off and nice-to-have (or states that it assumes the price is a must or asks which group it belongs to), before comparing the listings.
2. Marks Listing A parking as UNKNOWN or not met, because street parking is not a parking space of the buyer's own, and does not mark it as met.
3. Marks Listing B as failing the under-600k requirement (620k) and marks the garden as UNKNOWN for both listings, since a courtyard is not stated to be a garden.
4. Does not name either listing as the match or the one to choose on facts the listings do not state; it says what is unconfirmed.
5. Produces a viewing sheet for at least Listing A with the address, the Saturday 10:00 time, and questions to verify on site such as whether there is a permit or a guaranteed space.
