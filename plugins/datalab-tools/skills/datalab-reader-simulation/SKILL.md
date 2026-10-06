---
name: datalab-reader-simulation
description: Review a blog draft from the reader's side using the user's measured Naver blog reader data - build a profile from measured values only, then check the draft against the questions people actually ask about the topic. Use when the user asks for a reader simulation, to see a draft from the reader's point of view, or to check which expected questions a draft answers. Not for predicting how a post will perform, playing an invented persona, or rewriting the draft; the result is a thinking aid, not evidence of real reactions.
metadata:
  tier: open
  level: L3
  domain: content-review
  install: optional
  keywords: [reader simulation, blog draft review, audience profile, reader questions, naver blog, datalab]
  requires:
    mcp: [datalab]
---

# Reader simulation

Explain that the profile aggregates readers and is not a person. If gender/age data was not returned, say so once in prose and omit those profile rows. Decline named-persona roleplay and first-person reactions; do not provide them even as a hypothetical example. Proceed with the confirmed-question checklist and no performance forecast.

Build a profile from measured reader data, then check whether the draft answers the questions that really come up.
The output is a checklist, not a prediction or a score.

## Two stages

1. **Profile**: only what the tools say about this blog's readers.
2. **Comparison**: mark what the draft leaves unanswered, against questions people actually ask.

A profile-only request stops after stage 1. A comparison always passes through stage 1 first.

## Stage 1. Reader profile

Tools: `my_audience`, `my_content_audience` (when a post is named), `my_followers`, `my_revisit`, `my_dwell`,
`my_inflow`, `my_inflow_domain`, `my_device`, `my_country`. These aggregate people who actually read this blog.

Write only values the tools returned. If gender and age are not returned (unsupported, empty), drop that line entirely:
no "probably 20s to 30s", no "unknown" filler. A profile line that does not exist cannot be used in stage 2.

Not this blog's readers, never mixed into the profile: shopping keyword and category gender, age and device tools
(people who searched a keyword) and news comment demographics (people who commented on news).

## Stage 2. Run the draft past the reader

Source priority: pasted draft; open editor (`editor_read`, `editor_read_structure`); published post (`my_content_info`,
then `my_content_read`, `my_content_detail`). None: ask for it and stop.

Collect the questions and phrasings people actually use about the topic with `kin_question_demand`, `search_keywords`,
`autocomplete_keywords`. That is the only basis for "what readers want to know"; invent none.

- **Content**: for each confirmed question, mark answered / not answered / partly answered, citing the draft passage
  (or "no matching paragraph").
- **Form**: apply only general readability principles tied to a measured profile value, for example a high mobile share
  flags long unbroken paragraphs. Skip this branch when the profile has no device value.

Format: references/checklist-format.md.

## A simulation is not evidence

- Never speak as a reader in the first person ("I wonder about..."). Use third-person conditionals ("a question may
  remain about...").
- No invented personas with names, ages or jobs. The profile is an aggregate, not a person. Decline when asked and say
  why.
- No click, conversion or satisfaction predictions, and no "this post will do well".
- Do not call the result "reader reactions" or "validation"; call it a check of whether the draft answers confirmed
  questions.

## Not done here

No invented credentials to play an expert; no stereotypes from gender or age shares; no rewriting (mark what is
missing, the user fills it); no style analysis; no next-topic suggestions.

## Tools

- `my_audience`: reader gender and age as reported, when available.
- `my_content_audience`: the same for one named post.
- `my_followers`: follower count.
- `my_revisit`: returning-reader rate.
- `my_dwell`: average time on page.
- `my_inflow`, `my_inflow_domain`: where readers come from.
- `my_device`: mobile versus PC share; drives the form check.
- `my_country`: reader country.
- `my_content_info`, `my_content_read`, `my_content_detail`: find and read a published post.
- `editor_read`, `editor_read_structure`: read the draft open in the editor.
- `kin_question_demand`: real questions on the topic and their counts.
- `search_keywords`, `autocomplete_keywords`: real search phrasings on the topic.

When these tools are not available, use only the output the user pasted and drop every profile line it does not give.

