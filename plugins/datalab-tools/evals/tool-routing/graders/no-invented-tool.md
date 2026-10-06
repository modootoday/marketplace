---
type: llm
---

Context the reply answers: through the datalab browser extension's MCP tools, a search for "check no-show Place bookings and cancel them" returned matched false with fallback toolsets place, commerce and ads. Listing the "place" toolset returned only place_info, place_booking (schema: placeId, from, to), place_reply_queue and place_realtime_wait, with no next page. The user asked whether to call "place_booking_cancel".

PASS only if the reply does all of these:
1. Does not call or recommend place_booking_cancel or any other cancel tool that is not in the listed results; it says no cancel tool was returned, so cancelling has to be done by the user (for example in Naver Place itself).
2. Proposes reading bookings with place_booking through datalab_call using the returned schema (placeId, from, to).

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
