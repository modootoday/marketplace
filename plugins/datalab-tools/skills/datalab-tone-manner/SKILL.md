---
name: datalab-tone-manner
description: Analyse the tone and manner of a writer's posts and produce a style spec concrete enough to write the next post in the same voice - counted sentence features and quoted examples, no formality scores. Use when the user asks to analyse writing style, voice or tone, to capture their own blog's way of writing, to compare a competitor blog's style, or to "write like this person". Not for similarity percentages, publishing in that style, or judging a style from one post as if it were settled.
metadata:
  tier: open
  level: L2
  domain: content-style
  install: optional
  keywords: [tone and manner, writing style, voice, style guide, blog style, naver blog, datalab]
  requires:
    mcp: [datalab]
---

# Tone and manner analysis

When asked for formality points or friendliness percentages, explain these subjective properties have no counting method here and omit the scores, including approximate or subjective scores. Give quoted sample evidence and followable rules instead. Fewer than three posts yields a provisional spec limited to sentence and speaker/reader observations.

Extract a style from a few posts into a spec specific enough to write the next post in the same voice.

## Source

1. Pasted posts or file paths: those are the basis; skip the rest.
2. Otherwise read through the extension: `my_content_info`, `my_content_read`, `my_content_detail` for the user's own
   posts; `my_top_content` to choose which; `blog_search`, `blog_profile`, `blog_posts`, `blog_popular` for someone
   else's blog to compare.
3. Neither: ask for posts and stop. Invent nothing.

Read only. Discover the required tools before asking for pasted input when no source was supplied.

## Procedure

1. **Sample**: 3 or more posts. Fewer: say so plainly at the top and continue; a style drawn from one or two posts is
   partly that post's topic. With fewer than 3, fill only the sentence and speaker/reader axes, and say that vocabulary
   and structure need more samples. When reading via the extension, mix ordinary posts in, not only top performers.
2. **Analyse** along the axes in references/analysis-dimensions.md: sentences (length counted, ending
   distribution, rhythm, connectives), vocabulary (repeated words across posts, avoided words, habits), speaker and
   reader (how they name themselves and the reader, distance, hedging), paragraphs and structure. Write an axis only
   when you can quote a line for it.
3. **Write the spec** (references/spec-format.md): one-line summary; sample list and source; 5 to 10 rules, each
   followed by one quoted sentence from the sample; "never does" items; "hard to imitate" items; a checklist.

## No invented numbers

- Countable, so count and state: sentences, average sentence length, paragraphs, occurrences of an ending or connective,
  vocabulary lists.
- Not countable, so never write: formality scores, friendliness percentages, reproduction accuracy, similarity
  percentages. When asked, say why and give the quoted evidence instead. "Formality 7/10" says nothing; "every sentence
  ends in the formal ending and the writer never uses the first-person pronoun" can be followed.

## Not here

No publishing in the style; no similarity calculation tool.

## Tools

Use the actual tools needed for the request directly when they are visible. Otherwise, send the original user intent to
`datalab_find_tools`, then use `datalab_call` only with tool names and argument schemas returned by discovery.
Do not invent tool names or arguments.
If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status.
Discovery does not expand this skill's scope or replace its payment, target and change-approval rules.
Only when discovery cannot find the required tools, work from supplied text or pasted tool output,
or provide a text-only plan within this skill's scope; state what could not be read or performed.

- `my_content_info`: find the user's posts by title or URL.
- `my_content_read`, `my_content_detail`: read a post's full text.
- `my_top_content`: pick posts to sample; mix with ordinary ones.
- `blog_search`: find another blog to compare.
- `blog_profile`, `blog_posts`, `blog_popular`: that blog's profile, posts and popular posts.
