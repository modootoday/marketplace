# spec-conformance

## What it does

Makes an existing pile of design documents navigable. It answers the question a
large document set stops being able to answer: **which document about this
subject is currently true?**

Checking schema and naming is how it gets there, not the point of it.

## Runtime support

| Runtime     | Supported | Measured on |
| ----------- | --------- | ----------- |
| Claude Code | yes       | 2.1.251     |
| Codex CLI   | yes       | 0.151.0     |
| Grok CLI    | yes       | 1.0.13      |
| Gemini CLI  | yes       | 0.57.0      |

The scripts are plain Node and run anywhere; the skills are the one surface all
four runtimes load. No hooks, so nothing depends on a runtime's hook contract.

## Install

```
claude plugin marketplace add modootoday/marketplace
claude plugin install spec-conformance@modootoday
```

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add spec-conformance@modootoday
```

```
grok plugin marketplace add modootoday/marketplace
grok plugin install spec-conformance --trust
```

Gemini CLI: clone and
`gemini extensions link <repo>/plugins/spec-conformance --consent`.

## What it registers

| Kind   | Name                      | Detail                                                        |
| ------ | ------------------------- | -------------------------------------------------------------- |
| skill  | `spec-layout`             | which layout rules are invariant and which are yours to set     |
| skill  | `document-normalization`  | how to normalise a pile without compressing or inventing        |
| script | `scripts/check.mjs`       | schema, naming, placement, and the page-to-code link            |
| script | `scripts/cluster.mjs`     | documents that share a subject, and what each group declares    |
| script | `scripts/graph.mjs`       | graph invariants and five scoped views                          |

## Document kinds

| Kind       | Filename                   | Notes                                          |
| ---------- | -------------------------- | ---------------------------------------------- |
| `decision` | `NNNN-slug.md`             | MADR filename and status vocabulary            |
| `plan`     | `YYYYMMDDHHMMSS-slug.md`   | may be a directory of chapters                 |
| `sot`      | `slug.sot.md`              | one domain level, closed vocabulary            |
| `page`     | `slug.page.md`             | requires `route` and `implements`              |

`page` earns its own kind because `implements` names a source file the checker
verifies. A screen that was deleted or renamed turns its document red on its
own, which is the only place in this plugin where documentation rot is caught by
a machine rather than noticed by a person.

## Four rules you cannot configure

An id is the filename stem; the kind is readable from the filename; a domain is
one level and the directory agrees with the field; two documents in one spec
root cannot share an id.

Everything else — root location, directory names, pluralisation, sharding,
vocabularies, review intervals — is configuration, because none of it affects
whether a link resolves.

## It groups; it does not pick

`cluster.mjs` shows which documents share a subject and what each group has
declared about itself. It never nominates a winner. Which document is current is
a judgement, and a tool that guesses produces an answer nobody checked.

## Failure mode

**fail-open, and nothing blocks.** Every script reports and exits zero. A
document set with findings is the normal starting state of any repository old
enough to need this, not a failure of the tool.

## Configuration and how to disable

Optional `spec-conformance.json` at the repository root:

```json
{
  "root": ".spec",
  "kinds": { "sot": { "dir": "sots", "idField": "id", "domain": ["architecture", "conventions"] } }
}
```

Set `"root": "."` when documents live at the top level, which is the shape a
pile arrives in before it is split per package. Disable the plugin the way your
runtime disables plugins; there is nothing to clean up.

## Data written

None. Every script reads.

## Verify

```
node scripts/check.mjs .
node scripts/cluster.mjs .
node scripts/cluster.mjs . --subject <name>
node scripts/graph.mjs . --findings
node scripts/graph.mjs . --view domains
node scripts/graph.mjs . --view neighborhood --id <document-id> --depth 2
```

Prove it can fail: rename a document so its stem no longer matches its declared
id, and `check` must report it.

Measured on the repository this was written in, at 1,517 documents and 466
chapters: 2,012 schema findings, 851 graph findings, and 1,611 subject clusters
of five or more documents — with two of the largest holding 223 and 212
documents between which almost no relationship was declared.

## License

MIT
