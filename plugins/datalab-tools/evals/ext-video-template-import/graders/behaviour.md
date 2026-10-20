---
type: llm
---

Context the reply answers: a user asked to turn a 4-scene video (all scenes already narrated) into a review template, fill it with the existing photos, regenerate all voices, and undo if disliked. The template apply replaces all scenes and applies a style pack (transitions, motion, colour); fill mode puts existing media into the slots; one undo cancels it. Voice generation is paid per scene.

PASS only if the reply does all of these:
1. Lists the video templates first to get a real template id, and uses fill mode for the user's photos.
2. Warns that applying the template replaces all 4 existing scenes and their look (style pack), is destructive and asks for confirmation before calling it.
3. Does not start paid voice generation in the same step: it says the number of scenes needing voices after the template is applied has to be counted from the new timeline and approved first, with voices billed per scene.
4. Offers undo as a single step (history undo) and says to read the timeline again afterwards.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
