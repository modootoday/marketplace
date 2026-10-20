---
name: datalab-research-brief
description: Write a research brief that cites only pages actually opened and read, never search result titles or snippets, with each fact linked to the page title and URL and no reliability scores. Use when the user asks to research a topic ("research this and sum it up with sources"), wants a sourced report, or hands over search results and page reads to turn into a brief, including when some pages could not be opened or were cut. Not for scoring source credibility, percent relevance figures, or claims about pages nobody read.
metadata:
  tier: open
  level: L3
  domain: research
  install: optional
  keywords: [research brief, sourced report, citations, web research, fact check, naver search, datalab]
  requires:
    mcp: [datalab]
  verified-runtimes: [codex-cli]
---

# Research brief

When reliability percentages are requested, explain both parts in the final reply: no tool or method here measured
source reliability, so percentages would invent numbers; instead, citations to pages actually read let the reader
check the evidence behind each claim. Giving links without explaining their role leaves the requested replacement
unclear. Citations establish traceability, not a measured credibility percentage. Check every qualifier as well as
every number: do not add a country, location, industry, or causal explanation absent from the read text. Keep
snippets and unread pages under Not confirmed.

Write a brief from pages that were actually opened and read. Search finds candidates; only reading grounds a citation.

## Before starting

1. Is the topic clear? If vague, ask once what the user wants to know.
2. Sources the user gave (URLs, pasted text): read Naver URLs first with `web_read`. Pasted text counts as read.
   A URL outside naver.com cannot be opened by this tool (see "What web_read can read").
3. No search or read tools visible: use discovery first. Only if it finds none, say the web cannot be checked from here and proceed with pasted material.

## Citation rules

- Never write a sentence from a search result title or snippet. A results list says "this exists", not what it says.
- Cite only sentences present in a page opened with `web_read` (or pasted page text), each with that page's title and
  URL.
- Say nothing about candidates you did not read: no "it appears that". Unread means absent from the findings; list it
  only under "Not confirmed" as unread.
- You may count how many read pages confirm a fact ("confirmed on two pages"). No reliability, accuracy, relevance or
  similarity scores or percentages; if asked, say why there are none.

## What web_read can read

- Naver pages only: a host ending in naver.com (blog, cafe and similar). Any other address comes back `ok: false` with
  `non-naver-host`; trying again gives the same answer. A wiki, an agency site or a news site outside Naver stays
  unread: list it under Not confirmed, or ask the user to paste the text. Do not cite it from its search snippet.
- The result carries `title`, `description`, `wordCount` and `content`. `content` is cut at 8,000 characters and then
  ends with `…(생략)`. Cite only what is inside the returned `content`. Where the cut marker appears, say the rest of
  that page was not read; a long page (`wordCount` far above what the content holds) is partly read, not fully read.
- `fetch-failed` may be temporary and is worth one retry; `bad-url` needs a corrected address.
- In the reply, name each page that was cut or could not be opened, and invite the user to paste the text of any page
  that matters; pasted text counts as read.

## Procedure

1. **Find candidates** with the fitting search (`search_news` for news, `search_blog` for first-hand experience,
   `search_web` otherwise) or `run_research` for one topic end to end. A run_research summary is not "read" until each
   source is opened.
2. **Read** the candidates worth citing with `web_read`. Match the number to the topic size; do not settle a broad
   topic from one or two pages. Do not open excessive pages or the same URL twice.
3. **Demand (optional)**: `kin_question_demand` gives one countable number of questions; use it as is, never as a score.
4. **Write** in this shape:

```
# {topic} research
## One-line summary
## Confirmed
1. {fact}: [{page title}]({URL})
2. {fact}: [{title}]({URL}) and [{title}]({URL}) (confirmed on two pages)
## Not confirmed
- {asked but not found in the read pages, or candidates not read}
## Demand (if checked)
- KnowledgeiN questions: N
```

## When search fails

Simplify the query once and retry. Still nothing: say no checkable material was found. Do not fill gaps or keep
relaxing conditions automatically.

## Not here

No site-restricted operators or language weighting; no credibility score tool or domain grade table (judgement comes
from reading); no relevance, timeliness or verification percentages.

## Check before sending

Every sentence in Confirmed has a read source; no scores or percentages; unread candidates are absent from Confirmed.

## Tools

Use the actual tools needed for the request directly when they are visible. Otherwise, send the original user intent to
`datalab_find_tools`, then use `datalab_call` only with tool names and argument schemas returned by discovery.
Do not invent tool names or arguments.
If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status.
Discovery does not expand this skill's scope or replace its payment, target and change-approval rules.
Only when discovery cannot find the required tools, work from supplied text or pasted tool output,
or provide a text-only plan within this skill's scope; state what could not be read or performed.

- `search_web`, `search_news`, `search_blog`: find candidates; their titles and snippets are not read content.
- `web_read`: open a Naver page (first 8,000 characters of its text); the only basis for a citation.
- `run_research`: candidates and a summary for one topic; still read each source before citing.
- `kin_question_demand`: a count of related questions; one number, not a score.

Only when discovery cannot find the required tools, treat pasted page text as read and pasted result lists as unread candidates.
