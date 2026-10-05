---
description: Two ID lists differ by hidden spaces, case and hyphens. The reply must state the rules, reconcile counts and list merged keys.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [list-normalize-and-diff]
---

I need to know which registrations are in list A but not in list B, and clean list A for upload to the event system. Ids that differ only by case, a hyphen or stray spaces are the same registration; names are not to be assumed equal. Here are both lists (id | name | postal code).

List A (8 rows):
1. AB-0012 | Lee, Soo | 02841
2. AB-0013 followed by a trailing non-breaking space | Park, Min | 06130
3. AB-0014 | Choi, Ara | 04512
4. ab-0015 | Han, Yul | 03080
5. AB-0016 | Seo, Dan | 05510
6. AB-0017 | Kim, Jun | 01234
7. AB-0013 | Park, Min | 06130
8. AB-0018 | Oh, Bin | 07890

List B (7 rows):
1. AB-0012 | Lee, Soo | 02841
2. AB0013 | Park, Min | 06130
3. AB-0014 | Choi, Ara | 04512
4. AB-0015 | Han, Yul | 03080
5. AB-0019 | Jun Kim | 01234
6. AB-0016 | Seo, Dan | 05510
7. AB-0016 | Seo, Dan | 05510

Also give me the postal code and name for each A row joined into one "name - postal code" text column for the mail merge.
