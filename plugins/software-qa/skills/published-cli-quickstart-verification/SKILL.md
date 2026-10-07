---
name: published-cli-quickstart-verification
description: Verify that CLI onboarding commands identify the available package, version and executable without workspace or PATH masking. Use when reviewing a public CLI quickstart, a scoped package has a different binary name, or local success may not reproduce for users. Not for publishing releases, upgrading dependencies, selecting application starters or changing authentication.
metadata:
  tier: open
  level: L3
  domain: software-qa
  install: optional
  requires:
    bin: [npm]
  keywords: [CLI quickstart, published package, executable, npm exec, bin map, clean smoke test, version pinning]
  verified-runtimes: [codex-cli]
---

# Verify a published CLI quickstart

Compare the documented package identity, version selector, executable, and
arguments with the artifact users can obtain. A repository name is not a package
name; a package name is not necessarily its binary name. Inspect the relevant
manifest, published metadata or archive listing, and intended version. Local
source metadata alone does not establish that the public artifact exists or
contains the executable target.

For npm, separate package selection from binary invocation when inference is
ambiguous or there are multiple binaries:

```sh
npm exec --package=@vendor/example-cli@1.2.3 -- example --version
```

Replace example identities and arguments with verified project values. Do not
infer a usable executable from installation success. For a global-install
quickstart, show installation and the manifest's binary as separate steps.
Respect the user's package manager and version policy. See the
[npm exec contract](https://docs.npmjs.com/cli/v11/commands/npm-exec/).

## Establish user-visible provenance

Record package-manager/runtime versions and where the executed binary resolves.
Workspace node_modules, scripts, symlinks, inherited global PATH entries, and
caches can mask a missing or outdated public artifact. An empty directory alone
does not eliminate those sources. Use an appropriately isolated external smoke
test or explicit provenance checks, not a universal installation recipe.

When execution is authorized, check the selected published version and executable
target, run harmless version/help commands, and capture exit status and output.
Separate metadata/archive verification from startup and from a real workflow.
Do not publish, upgrade, log in, or mutate production to validate a quickstart.

If evidence is missing, pair each unresolved claim with its next check: verify
the selected version, bin map and executable target against registry/archive
evidence; then establish resolved executable provenance with a harmless help or
startup smoke test, separate from a real workflow. Provide copyable proposed
commands and label checks planned or executed. Unknown status alone is not a
verification plan; fixture success is not a successful public install.

## Report

State the stale command, supported correction, package/version/bin evidence,
executed binary provenance, and smoke-test status. Distinguish a confirmed
documentation mismatch from unverified publication or runtime availability.
