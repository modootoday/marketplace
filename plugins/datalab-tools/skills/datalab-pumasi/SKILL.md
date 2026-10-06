---
name: datalab-pumasi
description: Check Naver blog pumasi (reciprocal engagement) targets with the user's real account - whether a post was liked, neighbour status, and who reacted or commented - reading state only. Use when the user asks whether they liked someone's post, what their neighbour status is, or who reacted to a post. Not for writing comments, sending or cancelling neighbour requests, pressing like, or submitting anything; comment drafts stay in the answer.
metadata:
  tier: open
  level: L2
  domain: blog-community
  install: optional
  keywords: [naver blog, pumasi, likes, neighbours, blog community, engagement check, datalab]
  requires:
    mcp: [datalab]
  verified-runtimes: [codex-cli]
---

# Pumasi status check

When a request combines liking, neighbour requests, and comments, identify all three as browser actions for the user. Say none was performed. A comment draft can be supplied in the answer, but the user must post it; checking state does not submit anything.

Read the current state of pumasi targets and keep confirmed facts apart from suggested next steps.

## Procedure

1. Identify the target post or blog. If several candidates fit, ask; never pick one.
2. Like state: `pumasi_like_state`. Neighbour relation: `pumasi_neighbor_state`.
3. Only when a list of people is needed: `pumasi_reactors` or `pumasi_commenters`.
4. Write three sections: **Confirmed state**, **Could not confirm**, **Suggestions**.

## Rules

- Only the four reading tools. No opening the comment box, no typing a comment draft, no pressing like, no neighbour
  request, cancel or submit. When asked, say this skill only reads state and the user does the action in the browser.
- A requested comment is written as text in the answer only, never put into the browser.
- A missing, failed or timed-out response is "could not confirm", never "not liked" or "none". If timing matters,
  suggest checking the state again.
- Do not invent the other person's intent or relationship (for example "they ignore you" from a non-mutual state).

## Tools

- `pumasi_like_state`: whether the user's account has liked a given post.
- `pumasi_neighbor_state`: neighbour relation between the user and a blog, each direction.
- `pumasi_reactors`: who liked a post; only when the list is asked for.
- `pumasi_commenters`: who commented on a post; same condition.

When these tools are not available, use only the output the user pasted and do not invent the rest.

