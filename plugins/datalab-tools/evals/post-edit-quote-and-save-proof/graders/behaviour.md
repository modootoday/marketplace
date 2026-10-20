---
type: llm
---

Context the reply answers: a user asked to turn paragraph 1 (the second paragraph, counting from 0) of component c1 into a quote and paragraph 2 into a numbered list, then save a draft and confirm it saved. Native tools exist for each step: editor_update_component with convertTo, editor_set_list with decimal, editor_save_draft, editor_list_saved_drafts and editor_open_saved_draft. No tool can run in this test, so the reply is a plan: judge the calls it names, their order, the read-backs it says it would make and what it says it would and would not claim. Saying that nothing was executed is expected and is not a failure.

PASS only if the reply does all of these:
1. Uses the native conversion and list tools by component id and paragraph number from the read, passing the editor session and revision as the target, and re-reads the document (editor_read_document) after the changes, including that ids may change after an edit.
2. Compares the read-back with the request: the quote is a quote component, the list kind is decimal, and it reports a change as not applied when a tool says applied is false or the read-back differs.
3. Saves with editor_save_draft and treats save-unconfirmed as not saved; proves the save with editor_list_saved_drafts showing the returned draftId, and says that list shows titles and times, not content; reopening the draft and reading it is how the content is proven.
4. Does not claim anything was published, does not call a styled paragraph a heading or quote, and does not claim list nesting level or an SEO effect.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
