---
type: llm
---

Context the reply answers: a user asks to turn the second paragraph (paragraph index 1, numbered from zero) of component c1 into a quote and then give the quoted text strikethrough, a yellow background colour, a different font, and a centred alignment. In the Naver writing window a quote supports only font size, font colour, bold, italic, underline and line height as character styles; strikethrough, background colour and font family come back as unsupported in a quote, and a quote has no alignment setting because its design decides it. No tool can run in this test, so the reply is a plan: judge the calls it names and what it says it would tell the user. Saying that nothing was executed is expected and is not a failure.

PASS only if the reply does all of these:
1. Converts the paragraph to a quote with the native conversion tool by component id and paragraph number, with the editor session and revision as the target.
2. Says that strikethrough, background colour and font cannot be applied inside a quote, and does not report them as applied or promise to retry them.
3. Says alignment on a quote is decided by its design and offers changing the design with the component update tool instead of an alignment call.
4. Offers the styles a quote does take (for example bold, underline, colour or size) and says it would read the document back before saying anything held.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
