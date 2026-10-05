---
name: public-release-leak-audit
description: Audit what a repository, npm package or docs site will expose before it goes public - a census of internal paths, hostnames, private identifiers, non-English or internal comments, and auth or billing internals across published tarballs, READMEs, sourcemap sourcesContent and docs, plus the license, commit author identity and repository name - with the deny list of internal terms kept private and outside the published tree. Use before making a repository public, publishing a package, mirroring source to a public repo, or opening a docs site. Not for secret scanning of a private repo's history alone or for a general security review.
metadata:
  tier: open
  level: L3
  domain: platform-review
  install: optional
  keywords: [public release, open source, leak audit, npm publish, sourcemap, sourcesContent, deny list, internal hostnames]
---

# Public release leak audit

What leaks is rarely a secret a scanner knows the shape of. It is an internal
path in a sourcemap, a staging hostname in a README, a comment in another
language that explains a billing shortcut, or a commit author email. Scanners
for keys miss all of these. The audit is a census of what the published
artifact actually contains, not of the source tree you think you publish.

## 1. Audit the artifact, not the repo

List every surface that will be public and get the exact bytes each one ships:

| Surface | How to get what ships |
| --- | --- |
| npm package | `npm pack --dry-run` for the file list, then `npm pack` and unpack the tarball |
| sourcemaps in it | every `*.map`; read `sourcesContent`, which embeds the original source text, and `sources`, which carries original paths |
| bundled JS | search the built files, not the TS source: bundlers inline constants and env defaults |
| READMEs and docs | the rendered site output and every README the package or repo carries, including nested ones |
| repository | the tree at the commit to be published, and its full history if history goes public too |

A `files` field or `.npmignore` is a claim; the unpacked tarball is the measurement.

## 2. The census

Search every surface for each category and record hits as file, line, category:

1. **Internal paths**: home directories, workspace roots, monorepo-internal
   package paths, CI runner paths.
2. **Hostnames and URLs**: internal, staging, admin and ops hosts, private
   registries, IPs, internal dashboards.
3. **Private identifiers**: internal project codes, decision record ids,
   customer or partner names, people's names and emails.
4. **Comments**: non-English comments (count characters per file; a public
   package should read in one language) and comments that describe internals
   such as "temporary bypass" or "billing hack".
5. **Auth and billing exposure**: admin routes, role names, token formats,
   price ids, webhook paths, feature flags that unlock paid features.
6. **Secrets**: run a secret scanner too, but treat it as one category, not the audit.

## 3. Keep the deny list private

The list of internal terms you search for is itself a map of your internals.
Keep it in a private location, pass it to the checker at run time, and never
commit it to the repository being published. Lines that must legitimately
mention a term are marked as allowed at that line, not by weakening the list.

## 4. Repository-level checks

- **License**: a LICENSE file whose terms match the package metadata, and
  third-party code you include is compatible with it.
- **Commit identity**: authors and committers in the history that goes public.
  Personal or internal emails there are permanent once pushed; rewrite before the
  first public push or publish a squashed history.
- **Repository and package names**: the public name does not reveal an internal
  codename, customer or unreleased product.

## 5. Fix at the source, then re-measure

Fix a hit where it originates (strip `sourcesContent` or ship no maps, move a
comment to an internal doc, replace a host with a placeholder), rebuild, and run
the census again on the new artifact. Report per surface: what was scanned (file
counts), hits by category before and after, and what was accepted on purpose.
A clean result needs a control: plant one known term and confirm the search
finds it.
