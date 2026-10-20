---
name: datalab-post-seo-review
description: Review a Naver blog post for search-facing quality - title, keyword placement, length, structure, headings, answer-style sections and internal links - using the counts and flags the datalab.tools extension returns. Use when the user asks to check a post's SEO, improve the title for search, review the outline, or asks what to fix before publishing. Not for predicting rank or traffic, for diagnosing past traffic changes, or for writing the post itself.
metadata:
  tier: open
  level: L3
  domain: content-quality
  install: optional
  keywords: [seo review, scorecard, title, outline, internal links, faq, keyword density, naver blog, datalab]
  requires:
    mcp: [datalab]
---

# Post SEO review

Review from numbers the tools return, never from a feeling that the post "looks optimized". No tool here predicts
rank, clicks or traffic, and none of them says a post will place higher.

## Source of the post

- `seo_scorecard`, `title_optimize` and `internal_links` read the post that is open in the user's writing window.
  If the user pasted text instead and no writing window is open, do not call them as if they saw the pasted text.
  Review the pasted text by hand, count what you can count yourself (title length, keyword occurrences, headings),
  and label those counts as your own counting, not a tool result.
- Ask for the target keyword if it was not given. `seo_scorecard` accepts it as optional; without it, keyword
  fields cannot be judged, so say which checks were skipped.

## Order of calls

1. `seo_scorecard` first, before any rewriting advice. Quote its counts and flags as returned, with units.
   It measures things that can be counted: title length and keyword presence, body character count, keyword
   density, keyword in the first paragraph, sentence count, and a list of flags for items needing work. A flag is a
   threshold the tool applied, not proof that the item hurts; a clean scorecard does not mean the post will rank.
2. Add only what the question needs:
   - Title: `title_optimize` (five candidates with reasons).
   - Section structure: `outline_suggest` for a heading outline from a keyword.
   - Search, direct-answer and AI-citation layout: `seo_aeo_geo_spec`. Pass `patterns` only when a prior
     `serp_pattern_analyze` result exists; otherwise the spec is not grounded in real top posts, and say so.
   - Links to the user's own earlier posts: `internal_links`. If it finds no related post, it proposes none; report
     that rather than inventing links.
   - Doing the whole job in order (keyword, serp, structure, draft, apply): `write_pipeline_step`, one step at a
     time. Put in `findings` only values measured in earlier steps; omit it if there are none.
3. Report: **Measured** (scorecard counts and flags), **Suggested changes** (each tied to a flag or a returned
   candidate), **Not established** (anything about rank, clicks or competitors you have no number for).

## Tools that return a prompt, not an answer

`title_optimize`, `outline_suggest`, `seo_aeo_geo_spec`, `internal_links` and `write_pipeline_step` do not return a
finished result. Their descriptions say they return a prompt to run (`delegate.system` and `delegate.user`) and that
the model must run it itself. So:

- After the call, execute that prompt yourself and produce the five titles, the outline, the spec, the link
  suggestions or the step instructions. Do not show the user the raw prompt as if it were the answer, and do not stop
  after "the tool returned instructions".
- Your output from that prompt is generated text, not a measurement. Label it as a suggestion.
- Do not call the tool again to "get the real answer"; there is none.

## Which tools change the document

All seven tools in this skill are `read` tier: they run without asking and change nothing in the post. Applying
a suggestion is a separate step. For example the description of `title_optimize` says the chosen title is applied
with `editor_set_title`, which is a `write` tier tool and needs the user's confirmation each time (and asks again
when a title already exists). Offer the choice, wait for the user to pick, then apply; never apply a title or
body change just because a candidate was generated.

## Rules

- Quote figures as returned, with unit. Missing field is not zero. A skipped check is named.
- Keyword density and similar counts are descriptive. Do not tell the user a number is "ideal" unless the tool
  flagged it, and do not add your own target percentage.
- Do not claim a title or outline "will rank" or "will raise clicks"; say it was built to match the stated criteria.
- `qra_keywords` returns related popular-topic keywords in order of display. The rank is display order, not search
  volume; do not read size into it.

## Tools

Use the actual tools needed for the request directly when they are visible. Otherwise, send the original user intent to
`datalab_find_tools`, then use `datalab_call` only with tool names and argument schemas returned by discovery.
Do not invent tool names or arguments.
If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status.
Discovery does not expand this skill's scope or replace its payment, target and change-approval rules.
Only when discovery cannot find the required tools, work from supplied text or pasted tool output,
or provide a text-only plan within this skill's scope; state what could not be read or performed.

- `seo_scorecard`: counts and flags for the open post; optional `keyword`. Call first.
- `title_optimize`: five title candidates with reasons; returns a prompt to run.
- `outline_suggest`: H2/H3 outline for a keyword; returns a prompt to run.
- `seo_aeo_geo_spec`: SEO, direct-answer (AEO) and AI-citation (GEO) spec; returns a prompt to run; optional `patterns`.
- `internal_links`: related popular posts of the user's own blog as link suggestions; returns a prompt to run.
- `qra_keywords`: related popular-topic keywords in display order, not volume.
- `write_pipeline_step`: what to do in the current step of the keyword-to-draft procedure; returns a prompt to run.

Only when discovery cannot find the required tools, work only from the text the user pasted, say that the counts are
your own, and do not invent the rest.
