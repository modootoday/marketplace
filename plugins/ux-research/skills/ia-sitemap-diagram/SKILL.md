---
name: ia-sitemap-diagram
description: Draft an information architecture sitemap from a project description by deriving every node from a stated user task, limiting depth to a stated maximum with each level labelled, emitting text-based diagram source (Mermaid) that can be checked, listing which tasks and features map to which nodes, and ending with the open questions the description could not answer. Use when someone gives a project or feature list and wants a first sitemap or IA diagram. Not for visual design or wireframes, for validating a structure with users, or for writing content.
metadata:
  tier: open
  level: L2
  domain: ux-research
  install: optional
  keywords: [information architecture, sitemap, mermaid, navigation structure, user tasks, IA diagram]
---

# IA sitemap diagram

A first-draft structure from what the description says. It is a hypothesis to test with users,
not a validated architecture.

## Steps

1. List the user tasks the description implies, one line each, in the description's own words, and
   name which feature each belongs to. A feature with no user task is listed as "no task stated"
   and not given a node until the user supplies one.
2. Pick a depth limit: the user's, else three levels. The root counts as level 1, so three levels
   means root, sections, pages. Label the levels (for example level 1 root, level 2 sections, level 3
   pages). Anything deeper is folded into its parent and noted, and the reply always says what was folded (or "nothing folded") and the deepest level used.
3. Derive nodes from tasks: group tasks that share a goal, name each node by the task or object in
   user words, and give each node at most about seven children. Do not add nodes for content,
   pages or features the description does not mention.
4. Emit the diagram as Mermaid `flowchart TD` source in a code block. Node ids are short and unique,
   labels are quoted, and every node has a parent except the root. Check the source before replying:
   no duplicate ids, no orphan, depth within the limit, every task mapped.
5. Add a table: task, node, level. Every task appears once.
6. List open questions: ambiguous features, terms with two readings, user groups, anything missing
   that would change the structure. State that the draft is untested with users and ask for the
   decisions that would settle each question.

## Output

Task list, level labels, Mermaid source, the task-to-node table, open questions.
