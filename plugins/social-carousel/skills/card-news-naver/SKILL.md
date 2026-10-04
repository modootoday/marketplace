---
name: card-news-naver
description: Make Korean card news for Naver blog posts and Naver channels - square or portrait cards with large Korean headlines that wrap at word boundaries, one message per card, readable at phone size, the post text around the cards for search, and alt text. Use when the user wants Korean card news (a series of text-led square images) for a Naver blog or a Korean social channel. Not for English carousels or video thumbnails.
metadata:
  tier: open
  level: L3
  domain: content-writing
  install: optional
  keywords: [card news, Naver blog images, Korean typography, carousel images, alt text]
  locales: [ko]
---

# Card news for Naver

Card news is read on a phone, card by card, inside a blog post that also has to
be found in search. So the cards carry the message and the post text carries the
search.

## Cards

- One message per card: a headline of a few words and at most two short lines.
- Korean typography: break lines at word boundaries (never mid-word), keep
  particles with their nouns, avoid a single word alone on the last line.
- Size: square (1080x1080) or portrait (1080x1350), the same for every card; text
  inside a safe margin.
- Contrast and size readable on a phone; a font licensed for this use.
- First card: the promise of the series; last card: the summary or one action.

## The post around the cards

Naver reads the post text, not the text inside images. Write the post's title and
opening for the search intent (see naver-blog-seo when installed), repeat each
card's message as text under it, and add alt text for each image.

## Check

Look at every card at phone size, check the line breaks, and read the post
without the images: it should still make sense. Examples of line breaking are in
`references/linebreaks.ko.md`.
