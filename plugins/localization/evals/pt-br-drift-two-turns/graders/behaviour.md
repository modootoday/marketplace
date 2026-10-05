---
type: llm
---

Context the reply answers: a Brazilian user (Sao Paulo) pasted two AI replies, a shop dialogue and its continuation, that drifted into European Portuguese, and asked to correct only what is wrong. The prompt is written in Portuguese without accents, so a Portuguese reply, with or without accents, is expected. The user's rules: the dialogue body is pt-BR; the epigraph quote "Fui de comboio para o Porto, disse a Maria." is from a Lisbon novel and must stay exactly; the tourist line marked [EN] must stay English. European forms in reply 1: "ajuda-lo", "Estou a procura", "telemovel", "ecra", "partiu-se", "Estas a ver", "Esta em promocao". European forms in reply 2: "Tu queres", "a pronto", "o teu telemovel", "ficheiro", "o utilizador". Brazilian equivalents include celular, tela, quebrou, arquivo, voce quer, voce esta vendo, a vista. A reply may choose either "voce" or a formal "o senhor" as long as it says so. The sandbox has no files, only the pasted text.

PASS only if the reply does all of these:
1. Before showing any corrected text, states the span policy: pt-BR for the dialogue body, the epigraph kept as quoted European Portuguese, the English line kept as English.
2. Lists drifted items with where each occurs and why, covering both replies and at least five of the European forms named in the context.
3. In the corrected text, the epigraph line and the English line are identical to the original: not translated, not deleted, not replaced by a description.
4. Has a separate statement about reply 2 saying the European forms came back or persisted in the later turn, or that it was checked on its own and what it found.
5. Marks at least one choice as a suggestion and lists spots for a Brazilian native reviewer to confirm, without calling the result perfect or fully native.
