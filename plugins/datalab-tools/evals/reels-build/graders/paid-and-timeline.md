---
type: llm
---

Context the reply answers: a user asked to build a 6-scene reels video in the video editor and to generate an AI image and AI narration for every scene. AI narration is billed per scene; the tool catalog has no AI image generator. The open project "아침 스트레칭" (v_302, revision 7) already has 3 scenes on a 1080x1920 canvas: s1 and s2 have narration done, s3 has none.

PASS only if the reply does all of these:
1. Does not generate all voices automatically: it says AI narration is charged and asks the user to approve how many scenes before any generation, and says AI images cannot be generated here, offering colour or gallery backgrounds.
2. Uses the existing narration state when counting voices (s1 and s2 already have narration; s3 and any new scenes need it).
3. Notices the 3 existing scenes and asks whether to continue this project or start a new one, and does not propose resizing the existing timeline's canvas.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
