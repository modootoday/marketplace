---
name: datalab-pumasi
description: Check Naver blog pumasi (reciprocal engagement) targets with the user's real account - whether a post was liked, neighbour status, who reacted or commented - and, only when the user explicitly asks, open the comment box or neighbour window and fill in the text the user approved, or cancel a mutual-neighbour request the user already sent. Use when the user asks whether they liked someone's post, what their neighbour status is, who reacted to a post, or asks to prepare a comment or a mutual-neighbour request or to cancel one. Not for pressing like, for posting a comment or sending a request (the last click stays with the user), or for judging what another blogger intends.
metadata:
  tier: open
  level: L2
  domain: blog-community
  install: optional
  keywords: [naver blog, pumasi, likes, neighbours, blog community, engagement check, comment, neighbour request, datalab]
  requires:
    mcp: [datalab]
  verified-runtimes: [codex-cli]
---

# Pumasi status check and confirmed actions

Default to reading state. Keep confirmed facts apart from suggested next steps. A comment or a neighbour request can
be prepared in the browser as a separate step the user asked for, with the exact text the user approved; the user
presses the final button.

When a request combines liking, neighbour requests and comments: no tool presses like, and this skill does not post
or send, so those parts are always the user's own clicks in the browser. Say which parts were done and which were not.

## Procedure

1. Identify the target post or blog. If several candidates fit, ask; never pick one.
2. Like state: `pumasi_like_state`. Neighbour relation and request readiness: `pumasi_neighbor_state`.
3. Only when a list of people is needed: `pumasi_reactors` or `pumasi_commenters`.
4. Write three sections: **Confirmed state**, **Could not confirm**, **Suggestions**.
5. Acting (comment, neighbour request, cancel): only after the user asked for that action. Order, tiers and what to
   confirm: [comment and neighbour actions](references/comment-and-neighbour.md).

## Rules

- Every pumasi tool in this skill, including the four state tools, is tier write or destructive in the catalog, not
  read. Each needs a Naver blog tab for the target post: the user's own open tab (`tab_open` or `tab_focus`) or one
  the tool opens itself. Expect the host to ask. The four state tools change nothing on Naver.
- `pumasi_comment_open` and `pumasi_neighbor_open` only open the input box or window and leave nothing behind.
- `pumasi_comment_draft` and `pumasi_neighbor_draft` (destructive) put the supplied text in as-is, without editing it.
  Always call them with `submit` false: they stop after filling and the user presses the final button themselves. This
  skill never posts a real comment or sends a real request, even when asked to; say that the last click is the user's.
- `pumasi_neighbor_cancel` (destructive) cancels a request the user already sent, only after `pumasi_neighbor_open`
  shows the in-progress confirmation window. Verify afterwards with `pumasi_neighbor_state`.
- A comment or request text the user did not approve is written in the answer only, never put into the browser.
- A missing, failed or timed-out response is "could not confirm", never "not liked", "not sent" or "none". If timing
  matters, check the state again.
- Do not invent the other person's intent or relationship (for example "they ignore you" from a non-mutual state).
  `alreadyNeighbor: false` in a reactor list means Naver did not say, not "not a neighbour".

## State in the reply

When a request combines a comment, a neighbour request and a like, the reply itself must say: no tool can press like,
so the user does it in the browser; the exact comment and request text is shown first for the user's approval; the
order is open the box or window, then fill the text, with the neighbour state checked before the request; filling and
cancelling are destructive-tier actions the user confirms each time; nothing is posted or sent by this skill, the last
click is the user's; and nothing is claimed about how the other blogger will react.

## Tools

Use the actual tools needed for the request directly when they are visible. Otherwise, send the original user intent to
`datalab_find_tools`, then use `datalab_call` only with tool names and argument schemas returned by discovery.
Do not invent tool names or arguments.
If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status.
Discovery does not expand this skill's scope or replace its payment, target and change-approval rules.
Only when discovery cannot find the required tools, work from supplied text or pasted tool output,
or provide a text-only plan within this skill's scope; state what could not be read or performed.

- `pumasi_like_state`: which reaction, if any, the user's account left on a post.
- `pumasi_neighbor_state`: group fullness, already neighbour, request pending, Naver refusal; before any request.
- `pumasi_reactors`, `pumasi_commenters`: blog ids of people who reacted or commented, newest first; only when asked.
- `pumasi_comment_open`, `pumasi_neighbor_open`: open the comment box or neighbour window (write); submit nothing.
- `pumasi_comment_draft`, `pumasi_neighbor_draft`: fill the user's exact text with `submit` false (destructive tier); never send.
- `pumasi_neighbor_cancel`: cancel a pending request (destructive).

Only when discovery cannot find the required tools, use only the output the user pasted and do not invent the rest.
