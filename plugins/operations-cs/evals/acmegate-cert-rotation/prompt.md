---
description: What version-pinned-procedure-from-vendor-docs should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [version-pinned-procedure-from-vendor-docs]
---

Synthetic example, with a made-up product. I administer an AcmeGate load balancer appliance running version 4.2.7. Write me the steps to replace the TLS certificate on the virtual server "web-main", including how to confirm it worked. Below is all the documentation I could find.

AcmeGate 4.0 Admin Guide, "Replace a certificate" (applies to 4.0.x):
1. `acmegate cert install --file web.pem`
2. `acmegate svc reload web-main`

AcmeGate 4.2.0 Release Notes, "Changed commands":
- `cert install` is replaced by `cert import`; the `--file` flag is renamed `--bundle`.
- Imported certificates are staged and not used until activated: add `--activate`, or run `acmegate cert activate <name>`.

AcmeGate 4.2 Admin Guide, "Reload a virtual server" (applies to 4.2.x):
- `acmegate svc reload web-main --graceful` keeps open connections until they finish.
