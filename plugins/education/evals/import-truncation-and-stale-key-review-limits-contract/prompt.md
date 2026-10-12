---
description: Corrected positive authoring-import-fidelity-check coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [authoring-import-fidelity-check, coverage-20261012, corrected-fixture]
---

Compare supplied approved and imported course snapshots; make no edits and do not evaluate teaching quality. Approved title='Read the notes'; imported title='Read notes'. Approved body='Read notes before class.'; imported body='Read notes before'; tool body limit 17 characters including spaces. Approved question='What should you read?'; choices in order A='Notes' correct, B='Guess' incorrect, C='Skip' incorrect; feedback='Use the supplied notes.' Imported question is unchanged; choices in order B='Guess' marked correct, A='Notes' marked incorrect, with C absent; feedback='Proceed now.' Pair blocks, quote exact before/after differences, count approved/built body characters and the cut, identify dropped/reordered options and whether the correct flag follows the same answer text, rank the problems and state unexamined surfaces and owner acceptance.
