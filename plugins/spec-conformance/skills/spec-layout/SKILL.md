---
name: spec-layout
description: Where design documents live, what they are named, and which of those rules can be changed. Use when adding a document kind, placing a new document, or deciding whether a naming rule is worth a migration.
---

# Laying out a document set

## Four rules you do not get to change

1. **An id is the filename stem.** A wikilink resolves by name, so an id that
   differs from its filename resolves in your own tooling and nowhere else — not
   in an editor, not in a repository preview, not in anything a newcomer opens.
2. **The kind is readable from the filename.** A reader scanning a directory and
   a tool parsing it must agree without opening anything. Frontmatter stays
   authoritative; a disagreement is a finding, not a tie-break.
3. **A domain is one level, and the directory agrees with the field.** Deriving
   the domain from the path instead would mean moving a file changes what the
   document is about.
4. **Two documents in one spec root cannot share an id.** A duplicate leaves the
   tool choosing where a link goes.

## Everything else is configuration

Root location, directory names, whether they are plural, time sharding, the
domain vocabulary, review intervals. None of it affects whether a link resolves,
so none of it is worth a migration on its own.

That distinction matters when someone proposes a rename. Ask what breaks if it
is not done. If the answer is "nothing, it would just be tidier", it is a
default, and defaults apply to new projects rather than to existing piles.

## One spec root per package

Documents live beside the code they govern. A single root for a whole repository
becomes the flat pile that made the documents unnavigable in the first place.

Ids are unique **within** a root, and a link resolves in its own root first and
the repository second. That is how two packages can both hold a document called
`overview` without either needing a prefix — and prefixes are exactly what you
must avoid, because packages move.

## Do not put the domain in the id

A document gets re-classified; a family does not. Put the family prefix in the
id and leave the domain to a field, or every re-classification breaks every link
that pointed at the document.

## Where not to put any of this

Not under a directory your host publishes. A common static-site setup serves a
`docs/` folder, and some hosts serve it publicly even when the repository is
private. Design documents carry operational detail; a directory that turns into
a website is the wrong home for them.

No location protects content in a public repository. What a non-published
location prevents is **serving** — becoming a site, getting indexed, being
readable without the repository. That is worth having, and it is not the same as
being safe.

## Documents made of parts

A long document may be a directory of chapters rather than one file. The
directory is the document and carries the id; the chapters are its parts and do
not. Otherwise every document with an `overview` chapter collides with every
other one.
