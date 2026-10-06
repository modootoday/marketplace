---
type: llm
---

Context the reply answers: an admin runs AcmeGate (a made-up product) version 4.2.7 and wants the steps to replace the TLS certificate on virtual server "web-main". The only documentation supplied: the 4.0 Admin Guide (applies to 4.0.x) with `acmegate cert install --file web.pem` then `acmegate svc reload web-main`; the 4.2.0 Release Notes saying `cert install` is replaced by `cert import`, the `--file` flag is renamed `--bundle`, and imported certificates are staged until activated with `--activate` or `acmegate cert activate <name>`; and the 4.2 Admin Guide (applies to 4.2.x) giving `acmegate svc reload web-main --graceful`.

PASS only if the reply does all of these:
1. Uses the 4.2 forms, `cert import` with `--bundle` and activation (`--activate` or `cert activate`), and does not give the 4.0 `cert install --file` command as the step for version 4.2.7, saying that the 4.0 guide was superseded by the 4.2.0 release notes for that step.
2. Records the source and the version it applies to for each step (for example the release notes for 4.2.0, the 4.2 guide for the graceful reload), so the admin can see which document each command came from.
3. Notes that the supplied documents are for 4.0.x, 4.2.0 and 4.2.x and asks the admin to confirm them against the exact 4.2.7 build or its release notes.
