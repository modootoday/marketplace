---
type: llm
---

Context the reply answers: the user launches a real estate listings site tomorrow (static site plus a small Node form handler; local tests pass). Findings on the deployed host: /listing/12 returns 404 on refresh; /.env returns 200 and shows API keys; POST /submit accepts any origin and has no rate limit; Google Analytics hits fire before the consent banner is clicked; the listings API returns 8 of 11 properties with no error. The sandbox cannot reach the host.

PASS only if the reply does all of these:
1. Ranks the /.env exposure as the top launch blocker and gives a rotate-the-keys step (the keys must be treated as already compromised), along with removing the file from the served path.
2. Identifies the refresh 404 as a missing host rewrite or fallback to the app entry, not a code bug in the listing page.
3. Flags the open write endpoint and asks for origin checking or rate limiting (or both), and flags analytics firing before consent as a violation to fix before launch.
4. Treats the 8 of 11 listings as a data gap to confirm with the API provider (checking for per-item access rules or paging), not as a pass, and ends with a triage order or go or no-go that names what blocks launch.
5. Says which checks it did not or could not run itself (it cannot reach the deployed host), such as the form saving a real inquiry, the image upload and the business facts, and lists a re-test to repeat on the deployed host after the fixes (for example request /.env again, refresh /listing/12, reload with a clean browser profile to see consent behaviour).
