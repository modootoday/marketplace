---
name: dbt-model-refactor-and-docs
description: Split a large warehouse or dbt model into staging and intermediate models without changing its output, explain a model's upstream and downstream path from compiled SQL and lineage, and bring model and column descriptions in line with the real selected columns. Use when someone wants to decompose a long SQL model, onboard onto a new model's dependencies, or update schema.yml descriptions after a change. Not for proving a converted or rewritten query equals the original at scale (use sql-migration-equivalence-check) or designing a new warehouse from scratch.
metadata:
  tier: open
  level: L3
  domain: data-engineering
  install: optional
  keywords: [dbt, model refactor, lineage, schema.yml, column documentation, staging models]
---

# Warehouse model refactor and docs

Three first-person reports describe the same chores: breaking a complex model into small
steps, keeping description files current, and understanding a new model's dependencies.
The model names are not evidence; the compiled SQL and the lineage graph are.

## Steps

1. Read the compiled SQL and the dependency graph (`ref` and `source` calls), not the model
   names. List every CTE with its inputs, its output columns and any rename or cast.
2. For a split: propose the new models by layer (staging for one-to-one source cleanup,
   intermediate for joins and logic, the final model for the output shape), name the inputs
   and outputs of each, and show the lineage as old graph and new graph. Keep every output
   column of the original, in name, type and meaning. A rename inside a CTE (for example
   `amt` to `gross_amount`) stays where it was unless the user asks to move it.
3. Prove the split equals the original with a check and do not skip it: row counts, distinct
   key counts, sums of each numeric column and a two-way key anti-join between the original
   model and the final split model, run on the same data. Seed one difference to show the
   check catches it.
4. For descriptions: build the column list from the actual final `select`, then compare it
   with `schema.yml`. Report three lists: documented but absent (stale), present but
   undocumented, and renamed. Write a description only from what the code shows (source
   column, formula, filter); mark any meaning not visible in the code as INFERRED or "needs
   owner", never as fact.
5. For lineage onboarding: state upstream sources, each transformation step, and downstream
   consumers visible in the project; say which consumers are outside the project and
   unverified.
   If the SQL body is not available, still deliver the proposal from the description given,
   labelled as based on the description and not on the code, and list what to confirm once
   the code is read; do not stop at a request for files.
6. Do not write "the build passed" or "tests pass" unless `dbt build` or the equivalent was
   run and its output seen. Otherwise give the exact commands to run and what a clean result
   looks like.

## Output

New model list with lineage, the equivalence check queries, the column documentation table
(column, description, source, INFERRED flag), the three drift lists, and what was not run.
