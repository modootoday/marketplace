---
type: llm
---

Context the reply answers: a restaurant owner and a staff member (Jin) must change prices and add a weekly special without a developer. The generated site has menu.html with prices in the markup and an open /admin page with no login. The user asked for the redesigned editing path and how it will be tested.

PASS only if the reply does all of these:
1. Includes a test where a price is changed through the editing path as the editor and the change is confirmed on the public menu page.
2. Includes a test where a new weekly special is added and confirmed to appear in the right place with the layout intact, and a test for removing or unpublishing it.
3. Includes a test that a signed-out user (and a signed-in person without rights) is refused on /admin, both opening and submitting.
4. Ends with a short how-to the owner can follow (where to sign in, the frequent changes in one line each, how to check it worked), and says what was not run or verified.

Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
