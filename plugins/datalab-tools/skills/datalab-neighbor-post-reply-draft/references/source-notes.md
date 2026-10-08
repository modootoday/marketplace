# Source notes

## Demand and comparison boundary

The [V355 source snapshot](https://gist.githubusercontent.com/myso-kr/9ad8d5b84e02537553d4d669b8375b4a/raw/0eb6fc77229845315ddc550bc609974023b16bbd/creator_skill_targets.v355.jsonl) contains neighbor-post-reading-comment-draft.
The reviewed excerpts describe difficulty responding to an unfamiliar commercial post on 2021-06-23 and difficulty understanding technical posts and the time spent rereading on 2025-03-12.

The snapshot labels five problem messages across two dates.
Four adjacent messages on the latter date are one dated context, not four verified independent incidents.
The complete original chats were not available for independent review.
These are attributed historical demand excerpts, not prevalence, distinct-user counts or evidence that this skill improves replies.

This workflow explains an actual post and connects it to the user's genuine response.
Relationship-state lookup, aggregate news-comment activity, a business's customer-review response and a sourced research report have different inputs and outputs.
No posting or engagement benefit is claimed.

## Static tool boundary

Extension tool definitions were inspected on 2026-10-08.
Static registration in the extension's AIO and MCP catalog does not establish current connection, permission or successful execution.

The inspected web_read schema requires url and permits no additional properties.
It rejects non-Naver hosts and explicitly omits content after 8000 characters.
Read the actual response for failure and omission rather than treating a returned title as a complete read.
Use supplied authorized text when a host is unsupported or necessary content is missing.

No comment-entry or submission tool is needed by this skill.
A tool that can submit does not expand this text-drafting workflow.
