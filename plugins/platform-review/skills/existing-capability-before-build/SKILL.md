---
name: existing-capability-before-build
description: Map a requested feature to existing implementation and actual wiring before planning a duplicate. Use when adding functionality, choosing reuse versus new code, or a missing UI or search result is taken as evidence that a capability does not exist. Not for validating a supplied code-review finding or redesigning a working feature without a requested gap.
metadata:
  tier: open
  level: L3
  domain: platform-review
  install: optional
  keywords: [existing capability, reuse, implementation planning, wiring, package exports, duplicate implementation]
  verified-runtimes: [codex-cli]
---

# Existing capability before build

Distinguish a missing capability from a capability that exists but is not exposed at the requested boundary. Start from the requested behavior and constraints, rather than a proposed new module.

## Trace the capability

- Search for the behavior, its data fields, related names, and likely owners across relevant libraries, services, configuration, and consumers. A missing frontend reference says little about a backend capability. Check a known reference to establish what a negative search actually covers.
- Read promising implementations and their tests. Record the behavior they support and the constraints they assume; a similarly named function is not enough to establish a match.
- Trace a real caller toward the requested entry point: package exports and build output, dependency resolution, routes or handler registries, middleware, configuration, and the UI or external consumer. A private source import used by one service does not prove another service can use the published package.
- Separate source observations, exercised behavior, and unknown runtime facts. Tests of a helper do not establish that an authenticated route passes the right tenant or identity. Do not claim live or built reachability from source text alone.

## Choose the smallest change

Classify each requirement as already implemented and reachable, implemented but unwired, needing an extension, or unsupported by the evidence. Prefer reusing the owning implementation and adding the missing public interface or wiring. Propose a new implementation only for the uncovered behavior or when a concrete constraint makes reuse unsuitable.

When evidence is unavailable, state the specific check needed rather than inferring absence. Continue the supported planning work; ask for missing information only when it changes the implementation decision. Preserve the user's requested product and scope.

## Report

Show requirement, existing owner and evidence, current caller or exposure, remaining gap, and proposed change. List targeted checks for the changed boundary, including package/build resolution and consumer integration where relevant. Identify what was inspected or run and what remains unverified. Keep the report proportional to the feature.
