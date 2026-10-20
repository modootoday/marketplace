---
type: llm
---

Context the reply answers: a user asks to replace the second picture (component i2) with a local file and keep its place and centred alignment. There is no replace tool. The working recipe is: insert the new picture, move it to the old picture's position, copy the old alignment and display mode onto it, then delete the old picture. Deleting is destructive and needs its own confirmation, and each picture insert asks the user to confirm. No tool can run in this test, so the reply is a plan: judge the calls it names and their order.

PASS only if the reply does all of these:
1. Inserts the new picture first with the image insert tool using the local path, and says the user confirms that insert, instead of deleting i2 first.
2. Moves the new picture next to i2's position with the component move tool and sets alignment and display mode to match i2 with the image layout tool.
3. Deletes i2 last with the delete tool by its component id, calls it a destructive step with its own confirmation, and reads the document before and after to check the order and that the caption question is handled (the old caption is not carried over unless set again).
4. Does not claim there is a single replace tool and does not delete before the new picture is confirmed in the document.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
