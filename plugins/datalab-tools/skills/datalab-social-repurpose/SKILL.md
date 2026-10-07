---
name: datalab-social-repurpose
description: Rewrite one long blog post as copy-ready promotional drafts for X, Threads, Instagram and LinkedIn, each fitted to that platform's length limit and tone, with counted characters and hashtags. Use when the user wants a published post or the draft in the editor turned into social media promotion copy. Not for engagement or reach predictions, best posting times, picking a winning version, or posting.
metadata:
  tier: open
  level: L2
  domain: copywriting
  install: optional
  keywords: [social media copy, repurpose blog post, x, threads, instagram caption, linkedin, datalab]
  requires:
    mcp: [datalab]
  verified-runtimes: [codex-cli]
---

# Social share drafts

Rewrite one blog post as copy for X, Threads, Instagram and LinkedIn, each fitted to its length and culture. The
deliverable is text the user copies and pastes.

## Source

1. Pasted post or a file path: that is the source; skip the rest.
2. Otherwise read it through the extension: `editor_read`, `editor_read_structure` for the unpublished draft open in
   the Naver editor; `my_content_read`, `my_content_detail` for a published post (needs a title or URL).
3. Neither: ask for the post and stop. Invent nothing.

This skill only reads. Discover the required tools before asking for pasted input when no source was supplied.

## Procedure

1. **Extract 2 to 4 key messages** first; the rest is detail you may drop.
2. **Platforms**: only the ones the user named. None named: all four. Others only on request, caption text only.
3. **Rewrite per platform** (references/platform-specs.md):
   - X: limit 280 characters, aim 240 to 280; key message first, link last; 1 to 3 hashtags; 0 to 2 emoji.
   - Threads: limit 500, aim 400 to 500; conversational, may end with a question; 3 to 5 hashtags.
   - Instagram caption: limit 2,200, but hook and key message complete within the first 125 characters; 10 to 15
     hashtags at the end; 3 to 5 emoji.
   - LinkedIn: limit 3,000, aim 1,300 to 1,500, hook within 140 characters; 3 to 5 hashtags; add no statistics the
     post does not contain.
   - Keep the original's speech level. Keep links that exist; if none, leave a "[link]" placeholder, never a fake URL.
4. **Output** per platform (references/output-format.md):

```
## {platform}
{caption}
Characters: N / limit M
Hashtags: #a #b #c
```

Separate platforms with `---`. A closing line per platform may explain the writing choice; that is not a forecast.

## No invented numbers

- Countable: characters, hashtags, emoji in the output. Count and state them.
- Not countable: expected engagement or reach, "this version will do better", best posting time. Never write them;
  when asked, say no data about this account or audience supports it.
- Two versions requested: explain only the style difference (question hook vs fact hook), no winner.

## Not here

No posting or scheduling tool; no image or video creation, captions only. If many platforms make the answer long,
offer fewer first or ask priority; do not pad with engagement tables.

## Tools

Use the actual tools needed for the request directly when they are visible. Otherwise, send the original user intent to
`datalab_find_tools`, then use `datalab_call` only with tool names and argument schemas returned by discovery.
Do not invent tool names or arguments.
If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status.
Discovery does not expand this skill's scope or replace its payment, target and change-approval rules.
Only when discovery cannot find the required tools, work from supplied text or pasted tool output,
or provide a text-only plan within this skill's scope; state what could not be read or performed.

- `editor_read`, `editor_read_structure`: read the unpublished draft open in the Naver editor.
- `my_content_read`, `my_content_detail`: read a published post identified by title or URL.
