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
| script | `scripts/discover.mjs`    | every document-shaped file, with signals and no classification  |
| script | `scripts/derive.mjs --classified` | evidence for whatever the reading pass identified, layout or not |
| script | `scripts/derive.mjs`      | evidence for a migration: timeline, declared relations, implementation traces |
| script | `scripts/apply.mjs`       | writes the normalised copy from decisions, refusing unevidenced ones |
| skill  | `pile-migration`          | how to read a pile and decide, including judging whether work happened |

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

## Discover before you check

A checker that only sees documents already in the layout cannot see the pile it
exists to sort out. `discover.mjs` therefore assumes nothing — not a directory,
not a filename shape, not a frontmatter field — and reports every document-shaped
file in the repository with the signals a reader would want.

It classifies nothing. Whether a file is a proposal, a decision, a readme or a
meeting note is a reading judgement, and a heuristic deciding it here would be a
convention imposed on a repository that has not chosen one.

The difference is not small. On the reference repository the convention-bound
scan saw 1,517 documents; discovery found 9,029, most of them in directories the
convention never mentioned.

`check.mjs` and `graph.mjs` apply **after** adoption, to documents that are in
the layout. Running them on an unconverted repository is expected to report
almost everything, and that is not useful.

## The classification is the handoff

The reading pass writes one line per file to
`.spec/_work/classifications.jsonl`:

```json
{ "path": "notes/gateway-rewrite.md", "kind": "plan" }
{ "path": "README.md", "kind": "none" }
```

`derive.mjs` reads it when it exists and scans the layout when it does not, so
the same pipeline serves a repository that has adopted the convention and one
that has never heard of it. `kind: "none"` drops the file, which is the expected
answer for most of them.

A file the classification accepts is derived even when nothing about its name or
location would have qualified it. On the reference repository `sots/INDEX.md` is
a source of truth whose filename matches no configured shape; the scanner would
never have seen it, and the reading pass admits it in one line.

## Derive, decide, apply

Migrating an existing pile is five stages and the two that matter are not
scripts.

`derive.mjs` searches history in the window between a document's first and last
edit -- the only period it was demonstrably alive -- and widens past it only when
that comes back empty, saying so when it does. Beyond that it proves what
filenames, directories and git can prove: ids, kinds,
domains, creation and modification dates, rename lineage, relationships someone
already wrote down, and implementation traces — which paths a document names,
whether they still exist, whether they were touched after it was written, and
whether any commit cites it.

A reader then decides status, relationships and placement **by reading the
documents**, guided by the `pile-migration` skill.

`apply.mjs` writes the normalised copy and refuses any decision that records no
evidence, any status outside the vocabulary, and any supersede without a named
successor. It never modifies the source pile.

Measured on the reference repository's first migrated cluster: six documents,
bodies byte-identical to their originals, and three of the six statuses decided
against what the documents said about themselves -- their headers still read
"waiting" long after a roadmap's change register recorded them complete. Neither
the filenames, the frontmatter nor the file tree carried that; it came from
reading the register those documents cited.

The split exists so the boundary between what was proven and what was judged
stays visible in the output. A single script doing all three would produce a
normalised pile whose confident fields nobody can audit.

## History is part of the graph

A graph of documents can only report what documents say about each other. This
one also carries commits: a document names paths, history says who touched them
afterwards, and commit subjects sometimes cite the document by name.

`--view timeline --id <document>` draws that chain — the document, then every
commit since it was written that touched an area it named or cited it, in order.
It is the evidence for whether the work described actually happened, and it is
evidence rather than a verdict: a commit touching the area is not the plan being
carried out, and a plan can be completed under an entirely different name.

On the reference repository this adds 75,384 commit edges to 609 document edges,
which is the proportion to expect: documents say little about each other and
history says a great deal about them.

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

`check`, `cluster` and `graph` write nothing at all.

`derive` writes one dossier file under the work directory. `apply` writes the
normalised copies, and only with `--write`.

**Neither ever modifies the source pile.** During a migration the originals stay
exactly where they are, so the normalised copy can be thrown away and redone
without having lost anything.

## Verify

```
node scripts/check.mjs .
node scripts/cluster.mjs .
node scripts/cluster.mjs . --subject <name>
node scripts/graph.mjs . --findings
node scripts/graph.mjs . --view domains
node scripts/graph.mjs . --view neighborhood --id <document-id> --depth 2
node scripts/graph.mjs . --view timeline --id <document-id>
```

```
node scripts/discover.mjs .
node scripts/derive.mjs .                     # scans the layout
node scripts/derive.mjs . --classified <file> # or takes the reading pass output
node scripts/apply.mjs .            # plan only
node scripts/apply.mjs . --write
```

Prove it can fail: rename a document so its stem no longer matches its declared
id, and `check` must report it. Then hand `apply` a decision with no evidence
field and confirm it is refused rather than written.

Measured on the repository this was written in, at 1,517 documents and 466
chapters: 2,012 schema findings, 851 graph findings, and 1,611 subject clusters
of five or more documents — with two of the largest holding 223 and 212
documents between which almost no relationship was declared.

The derivation stage recovered a creation date for all 1,517, found 145 statuses
already inside a vocabulary and 156 written as free text, 195 documents with a
relationship declared somewhere, and implementation traces for 940: of those,
242 name paths that all still exist, 698 name at least one that does not, 738
had their area touched after they were written, and 42 are cited by a commit
subject. Every one of the 1,517 still needed reading.

## License

MIT
