---
name: training-data-format-contract-check
description: Check and convert fine-tuning data against the target trainer or provider schema before any upload or training run - name the schema first, validate role, field name and content type per row, serialise code, newlines and non-ASCII text as one JSON record, reload with the real loader and compare row counts, check tool-call turns and ids, and report rejected rows by line number. Use when a fine-tuning JSONL is refused at upload, loads with fake or corrupted rows, or tool-calling chat data raises a type error in the chat template. Not for running the training job, choosing hyperparameters or evaluating the trained model.
metadata:
  tier: open
  level: L3
  domain: ml-data
  install: optional
  keywords: [fine-tuning, JSONL, chat template, message content, tool calling, schema validation, data loader]
  verified-runtimes: [claude-code]
---

# Training data format contract check

A file can be valid JSON on every line and still be refused, because the trainer or provider
expects another shape. Converting without naming that shape produces data that uploads and
then trains on corrupted or fake rows. This skill checks data before training. It does not train.

## Steps

1. Name the target first: the trainer or provider, its data format (chat messages, prompt and
   completion, tool-calling chat), and the schema source (its docs page or the chat template
   you were given). If the target is not stated, ask for it. Do not guess a provider's schema
   from memory; say which parts you are assuming and what to confirm.
2. Write the contract as a short table before touching data: allowed roles, required fields,
   content type per field (string, or list of typed parts), maximum or minimum turns, and
   what the template does with a system message.
3. Check every row against the contract: role, field name, content type (string versus object
   or list), empty content, role order. Do not sample and extrapolate. Count rows by
   outcome: valid, convertible, rejected.
4. Convert explicitly and say how. An object or list content becomes a string by one named rule
   (for example join the text parts with a blank line, or serialise as a JSON string). Say what
   is lost by the rule. If a row has no safe conversion, reject it.
5. Serialise each example as exactly one JSON record on one line, with code, newlines, tabs,
   backslashes and non-ASCII text escaped by the JSON writer, not by hand. Write UTF-8 without
   a byte order mark unless the target says otherwise. Never go through a CSV or line-split step.
6. Prove it by reload: read the output with the same loader the trainer uses (or a
   JSON-lines reader if the real one is not available), then compare the row count to the
   input, and compare one sample containing code and one containing non-ASCII text
   byte for byte with the source. A count that differs means rows were split or lost.
7. For tool-calling data check, per conversation: the tool definitions parse against the
   schema the template expects; each assistant call carries the arguments in the expected type
   (object versus JSON string); every tool result has an id matching an earlier call; no result
   comes before its call; call and result roles are what the template accepts.
8. Report rejected rows by line number with the reason. Never drop or rewrite a row silently,
   and never repair meaning (such as guessing a missing field). Ask the data owner.

## Output

The contract table, counts (input, valid, converted, rejected), the conversion rule and what it
loses, the reload check result, the rejected-line list, and what is still unverified against the
real trainer. State that no training was run and that a template or upload dry run on a small
slice is the next check.
