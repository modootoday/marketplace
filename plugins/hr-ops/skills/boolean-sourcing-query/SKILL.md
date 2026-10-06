---
name: boolean-sourcing-query
description: Build Boolean search strings for candidate sourcing from the job requirements the user states - the platform's operators, grouped synonyms and title variants, exclusions, a narrow and a broad variant, and a note on platform limits - while leaving out protected characteristics and their proxies. Use when someone needs a search string for LinkedIn or a similar people-search platform from a job description or hiring-manager requirements. Not for ranking, scoring or screening out candidates, profiling a named person, or deciding who to contact.
metadata:
  tier: open
  level: L2
  domain: hr-ops
  install: optional
  keywords: [Boolean search, sourcing, recruiting, candidate search, job requirements, search string]
  verified-runtimes: [claude-code]
---

# Boolean sourcing query

A search string only retrieves profiles that contain terms. It should come from what the job
requires, and it should never encode who a person is.

## Steps

1. Take the requirements the user states: role, must-have skills, acceptable alternatives,
   location if the job needs one, seniority signals, and explicit exclusions. Name the platform;
   if none is named, ask or state the assumption.
2. Split terms into groups: titles (with common variants), core skills (each with synonyms and
   spelled-out forms), and optional boosters. Join variants inside a group with OR, join groups
   with AND, put multi-word phrases in quotes, use uppercase operators, and use NOT only for
   exclusions the user stated.
3. Keep out protected characteristics and proxies. If a stated requirement is or stands in for
   age, gender, race, ethnicity, nationality or native language, religion, disability, family or
   marital status, pregnancy, or similar (examples: "digital native", "recent graduate" as an
   age stand-in, "native speaker", "young team", "no employment gaps", photo or name based
   terms), do not put it in the string. Say which terms were left out and why, and offer a
   job-related replacement when one exists (for example a working-proficiency requirement in
   a named language, or the specific tool experience the job needs).
4. Produce two variants: narrow (all must-haves, tight titles) and broad (fewer must-haves,
   wider titles and synonyms), each on one line, with balanced parentheses. Count the opening
   and closing parentheses before answering.
5. Note platform limits you cannot confirm from the user's input: string length, nesting depth,
   operator support and wildcard behaviour vary by platform and plan. Say to test the string in
   the platform and to check its current documentation; do not state exact limits as fact.
6. State what the string cannot do: it finds profiles containing terms, it does not judge fit.
   Reviewing and contacting people stays with the recruiter, and the search should be applied
   the same way to every candidate pool.

## Output

The assumptions line, the narrow string, the broad string, a short key for each group, the
terms left out with reasons, and the platform-limits note.
