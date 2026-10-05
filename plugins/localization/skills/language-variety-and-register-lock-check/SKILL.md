---
name: language-variety-and-register-lock-check
description: Check generated text against a language policy the user set - regional variety (Brazilian vs European Portuguese, a spoken Arabic dialect vs the standard form), speech level (Korean haeyo vs banmal, formal vs informal address) and the foreign-language lines a character is meant to speak - span by span and turn by turn, listing every drift by line with its reason and fixing only the drift. Use when a reply drifted out of the requested dialect, variety or politeness level, mixed speech levels, slipped in unrequested foreign words, replaced a requested foreign line with a description, or the user has to repeat the instruction on later turns. Not for checking translation fidelity against a source text or for producing the first draft.
metadata:
  tier: open
  level: L3
  domain: localization
  install: optional
  keywords: [language variety, dialect, register, speech level, pt-BR, Arabic dialect, Korean speech level, code-switching]
---

# Language variety and register lock check

Users report the same failure in several languages: a Brazilian user gets European
Portuguese words, a Levantine Arabic conversation slides back to the standard form on the
next turn, a Korean answer mixes banmal and polite endings, a requested foreign-language line
is replaced by a description of it, or an unrequested foreign word appears. Each one costs
the user a repeated instruction. This skill checks text against a stated policy, it does not
translate.

## Steps

1. Write the span policy first, before any edit, as a short list the user can correct:
   - body: the variety or dialect and the speech level (for example pt-BR with "voce";
     Levantine colloquial; Korean haeyo)
   - quotes, titles and proper nouns: kept exactly as given, in their own variety
   - intended foreign spans: which speaker says which language, kept in that language
   - what is allowed to stay: loanwords, code, brand names, technical terms
   If the user did not give one of these, infer it from the request, say that you inferred
   it, and ask only when two readings would change the output.
2. Check every sentence of the text against the policy, one line at a time. Report each drift
   with its location (turn and line), the form found, the form the policy wants, and a
   one-line reason. Typical drifts: vocabulary or spelling from another variety, a standard
   form where a dialect was asked, pronoun or ending that changes the politeness level,
   a stray word from a language that was not requested.
3. Never "fix" what the policy protects: a quoted original line, a proper noun, code, a
   loanword the variety really uses, or a foreign-language line a character is meant to
   speak. Do not translate such a line into the body language and never replace it with a
   description such as "(speaks English)".
4. Check each later turn of the conversation on its own, not only the first reply, and say
   whether drift came back: a lock that held in turn one often lapses by turn three. If a
   turn is not in the text you were given, say it is unchecked.
5. Fix only the drifted words. Keep meaning, facts, numbers and length. Do not add regional
   slang the user never used.
6. Mark every form you are not sure belongs to the variety (dialect words, regional
   spelling, honorific choices) as a suggestion, and list those spots for a native
   reviewer from that region. Do not declare the text "native" or "correct".

## Output

The policy list, a drift table (turn and line, found, wanted, reason), the corrected text with
protected spans unchanged, the per-turn regression result, and the native-reviewer list.
