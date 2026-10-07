---
name: datalab-blog-widget
description: Build Naver blog sidebar widgets, profile and introduction sections, recent-post lists and category menus as HTML that Naver accepts (span, br, hr, img and a only, inline styles, 170px and 2,000 bytes for widgets). Use when the user asks for a Naver blog widget, a sidebar profile card, a visitor counter or category menu HTML. Not for working widgets with scripts, hover effects, or installing anything on the blog.
metadata:
  tier: open
  level: L3
  domain: blog-design
  install: optional
  keywords: [naver blog widget, sidebar html, profile card, category menu, blog skin, inline style, datalab]
  requires:
    mcp: [datalab]
  verified-runtimes: [codex-cli]
---

# Naver blog widget HTML

For the visitor counter, distinguish a measured count from a requested decorative number. If the user proposes
an arbitrary value such as 1,234, explain that it is not a visitor measurement and replace it with 0000 or an empty
replacement slot in the delivered HTML itself. Labelling 1,234 temporary or an example does not make it measured.
Explain that hover and increasing click counters cannot work because style tags, scripts, and event handlers are
stripped. Deliver the static widget with the replacement slot.

Produce an HTML fragment the user pastes into their own Naver blog sidebar or post. The paste-ready code block is the
deliverable.

## What this skill does not make

- **Working widgets.** Calculators, timers, weather, polls, click counters: Naver strips scripts and every event
  handler. Never ship a fake calculator with buttons that do nothing.
- **Hover effects.** Naver blocks the style tag and onmouseover, so there is no way to do it. Links get static styles.
  Say this plainly when hover is requested: the style tag, scripts and event handlers are all stripped, so a click
  counter that goes up cannot work either.
- **Publishing or installing.** The extension writes nothing to the blog skin; the user pastes it.
- **Scored validation reports.** Give a pass/fail checklist only.

## Types

1. Widget for the 170px fixed-width sidebar: profile card, recent posts, visitor counter, category menu, social links.
2. Profile or introduction section for a post body.
3. Post list, body or sidebar.
4. Category menu as a link list.

## Procedure

1. Confirm the type and its content. Ask first when ambiguous.
2. Follow the tag and byte rules below (source: references/naver-constraints.md).
3. Start from the closest template in references/templates.md; for a new type build a span-only structure.
4. **Number slots** (visitor count, views, post count):
   - If the user asked for real values, fetch them with `my_daily_brief`, `my_realtime` or `my_top_content` and put a
     small as-of date next to each. Say the widget is a frozen snapshot that never updates; regenerate to refresh.
   - Otherwise use an obviously fake placeholder such as `0000` with a note "replace with your real number". Never a
     plausible value like 1,234: pasted as-is it looks like a real statistic. This holds even when the user asks for a
     "reasonable-looking" number or the number is labelled as an example: write `0000` and explain.
5. Count the bytes (UTF-8: ASCII 1, Korean syllables commonly 3). Widget limit 2,000 bytes. Over: cut decoration first.
6. Deliver one HTML code block. Do not repeat the HTML in prose.
7. End with one line telling the user to paste it in Naver blog admin, decoration settings, widget maker (or the post
   editor's HTML mode), preview, then save.

## Hard rules

- Tags: only `span`, `br`, `hr`, `img`, `a`. Replace div with a block span, headings with styled spans, lists with
  "- " or bullet-prefixed block spans.
- Every link has `href` and `target="_top"`; missing or `_blank` breaks. Images have `src` and `alt`.
- Inline `style` attributes only: no style tag, no link tag, no class.
- No event handlers, no `javascript:`, no scripts, no `position:fixed`, no CSS expression or @import.
- Widget: width 170px, height up to 600px, at most 2,000 bytes. Body sections: `max-width:960px` only.
- Use plain text labels.
- If the user reports that a paste failed or was cut, trust the real Naver editor over these numbers.

## Tools

Use the actual tools needed for the request directly when they are visible. Otherwise, send the original user intent to
`datalab_find_tools`, then use `datalab_call` only with tool names and argument schemas returned by discovery.
Do not invent tool names or arguments.
If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status.
Discovery does not expand this skill's scope or replace its payment, target and change-approval rules.
Only when discovery cannot find the required tools, work from supplied text or pasted tool output,
or provide a text-only plan within this skill's scope; state what could not be read or performed.

- `my_daily_brief`: today's visitor and view numbers for a counter slot; only when the user wants real values.
- `my_realtime`: the current live counts; same condition.
- `my_top_content`: top posts for a recent or popular post list.

Only when discovery cannot find the required tools, use placeholders and say so; never invent numbers.
