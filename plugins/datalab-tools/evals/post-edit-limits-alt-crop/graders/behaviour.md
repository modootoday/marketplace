---
type: llm
---

Context the reply answers: a user asks for alt text on three pictures in the writing window and for the second picture to be cropped square. In the Naver writing window no tool sets image alt text (the editor does not save it), and cropping or retouching a picture belongs to the separate photo editor window, not to the post tools. A caption can be written with a caption tool. No tool can run in this test, so the reply is a plan: judge what it says it would do and tell the user.

PASS only if the reply does all of these:
1. Says plainly that alt text cannot be set with these tools and does not claim to have set it or to set it through a workaround tool.
2. Says cropping is not available from the post editing tools and belongs to the photo editor, without calling an unrelated post tool to fake a crop.
3. Offers the caption tool as what can be done instead, for the pictures by component id from the read, and says the result would be read back.
4. Does not invent a tool name or parameter for alt text or cropping.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
