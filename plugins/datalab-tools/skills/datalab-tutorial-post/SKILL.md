---
name: datalab-tutorial-post
description: Write one beginner-friendly tutorial blog post in a problem, solution, practice structure with one analogy, inside a 12,000-character ceiling, and place it in the Naver editor when one is open. Use when the user asks for an easy explainer post, a beginner's guide, an explanation by analogy, or a hard concept in a friendly tone. Not for multi-chapter courses, minimum-length padding, self-assessment scores, badges, or quotes attributed to famous people.
metadata:
  tier: open
  level: L2
  domain: content-writing
  install: optional
  keywords: [tutorial post, beginner guide, explainer, analogy, blog writing, naver blog, datalab]
  requires:
    mcp: [datalab]
---

# Tutorial blog post

Before the draft, resolve incompatible requested extras: explain that one post has a 12,000-character ceiling and cannot meet a larger minimum; offer a series or a complete shorter post. Omit scored self-assessments and named-person quotations, explaining that learning was not measured and attribution was not verified. Supply unscored practice tasks and one analogy instead. Do not include refused extras later as examples.

Write **one** post that explains one concept so a beginner can follow it.

## Length: 12,000 characters is the ceiling

One draft is at most about 12,000 characters; that is this skill's drafting budget, and retrying does not authorize padding.
Complete problem, solution and practice inside it. A shorter post that is complete is done: do not pad it, and do not
rewrite "longer" (each rewrite is billed and gains nothing). When the user asks for a minimum above the ceiling (say
15,000 characters), say plainly that one post cannot reach it and offer a series instead.

Budget (references/structure-and-length.md): opening hook 200 to 400; problem 1,000 to 1,800 (visible problem, then
the real reason); solution 5,000 to 7,000 (core concept, one analogy, one case or generalised situation); practice
1,500 to 2,500 (one small task, two at most); close 300 to 500 (one-line recap, one next question). Over budget: trim
the solution first.

## Procedure

1. **Topic and reader**: what is explained and why this reader finds it hard, in one line. Unknown: ask.
2. **Open with an icebreaker** in a warm senior-colleague tone, polite but not stiff; vary the opening (confession,
   shared experience, surprising fact). references/tone-and-hooks.md.
3. **Problem, solution, practice** with the budget above.
4. **One analogy or case** (references/analogy-and-case-templates.md: role, journey or transformation analogy).
   Cases are never invented: verifiable facts or generalised situations ("a marketer...") only, no made-up percentages.
5. **Stuck points**: check real questions with `kin_question_demand` and facts with `web_read`; do not fill by guess.
6. **Placing it**: with an editor open, `outline_suggest` for structure, `write_draft` for the draft, then
   `editor_insert_draft` or `editor_place_draft`. No editor open: return the draft text; that is the normal path.

## When it needs several posts

A topic that is big by nature ("from zero to production") is not crammed into one post. Propose a series ("Part 1:
concept and basics, Part 2: applying it"); each part follows this procedure on its own.

## Not made, even on request (explain why and offer an alternative)

| Not made | Why |
| --- | --- |
| A rewrite to reach a minimum length | conflicts with the 12,000 ceiling and is billed every time |
| A multi-chapter course | this surface does not track progress across parts; propose a series |
| Outside-tool formatting (toggles, callouts, database import) | the output goes to the Naver editor |
| Badges, XP, progress bars, certificates | no state to track; it invents completion counts |
| Quotes attributed to a person | no way to verify the person said it |
| Self-assessment scores ("15-20 points: master") | dresses an uncountable thing as a number |
| Diagram syntax | not confirmed to render in the Naver editor; describe in text |

## Tools

Use the actual tools needed for the request directly when they are visible. Otherwise, send the original user intent to
`datalab_find_tools`, then use `datalab_call` only with tool names and argument schemas returned by discovery.
Do not invent tool names or arguments.
If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status.
Discovery does not expand this skill's scope or replace its payment, target and change-approval rules.
Only when discovery cannot find the required tools, work from supplied text or pasted tool output,
or provide a text-only plan within this skill's scope; state what could not be read or performed.

- `outline_suggest`: structure for the post when an editor is open.
- `write_draft`: write the draft text through the extension.
- `editor_insert_draft`, `editor_place_draft`: put the draft into the open Naver editor.
- `editor_open_window`: open an editor window when the user asks for it.
- `kin_question_demand`: real questions people ask about the concept.
- `web_read`: confirm a fact before stating it.
