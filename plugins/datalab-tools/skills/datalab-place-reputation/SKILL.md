---
name: datalab-place-reputation
description: Check the user's own Naver Place listing - reviews, review sentiment, replies waiting, bookings, live waiting and coupons - and separate confirmed facts, priorities and reply drafts. Use when the user asks for a review analysis of their store, a reputation check, or which reviews to answer first. Not for inventing an overall reputation score, posting replies, or guessing customers' motives.
metadata:
  tier: open
  level: L3
  domain: local-business
  install: optional
  keywords: [naver place, store reviews, reputation, review replies, booking, local business, datalab]
  requires:
    mcp: [datalab]
  verified-runtimes: [codex-cli]
---

# Place reputation check

Keep the returned rating in its original scale. A normalized rating is not the requested overall reputation
assessment: do not substitute a 100-point conversion or an illustrative score. Mark overall reputation as not
calculated and report the supplied rating, review count, and sentiment sample separately. Do not assume an unstated
maximum rating. Identify the branch from place_info in the analysis. For reply drafts, use a plain greeting rather
than repeating store/branch branding unless the user specifically requests that branding. Label replies as drafts,
say they were not posted, and say the owner must post them.

Read the store's state and review facts; propose operating priorities and reply drafts as separate parts.

## Procedure

1. `place_info` to identify the store. If the user has several stores and did not name one, ask; never pick one.
2. `place_reviews`, `place_review_stats`, `place_owner_review_stats`, `place_owner_reviews_sentiment`,
   `place_blog_reviews`: record the period and sample size beside every figure.
3. When operations matter, only the matching status: `place_reply_queue`, `place_booking`, `place_realtime_wait`,
   `place_coupons`.
4. Write three sections: **Confirmed facts**, **Check first** (priorities, for example unanswered negative reviews by
   age), **Reply drafts**.

## Rules

- No overall reputation score beyond the aggregates the tools provide. When asked for one, say why and point to the
  real figures (rating, counts, sentiment shares with sample size).
- A sentiment split describes the reviews analysed, not what all customers think.
- Reply drafts live in the answer only. Never say they were posted; the user posts them.
- Do not invent a customer's motive or visit situation that the review does not state.

## Tools

Use the actual tools needed for the request directly when they are visible. Otherwise, send the original user intent to
`datalab_find_tools`, then use `datalab_call` only with tool names and argument schemas returned by discovery.
Do not invent tool names or arguments.
If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status.
Discovery does not expand this skill's scope or replace its payment, target and change-approval rules.
Only when discovery cannot find the required tools, work from supplied text or pasted tool output,
or provide a text-only plan within this skill's scope; state what could not be read or performed.

- `place_info`: identify the store and its details first.
- `place_reviews`: the review texts.
- `place_review_stats`: rating and review counts.
- `place_owner_review_stats`: owner-side review statistics, including reply counts.
- `place_owner_reviews_sentiment`: sentiment split of reviews, with the sample it covers.
- `place_blog_reviews`: blog reviews that mention the store.
- `place_reply_queue`: reviews waiting for an owner reply; for reply priority.
- `place_booking`: bookings status; only for booking questions.
- `place_realtime_wait`: live waiting list; only for waiting questions.
- `place_coupons`: active coupons; only for coupon questions.

Only when discovery cannot find the required tools, use only the output the user pasted and do not invent the rest.
