---
name: optimization-portability-review
description: Review whether a build optimization preserves behavior across CI, process resource limits and declared workspace layouts. Use when a locally successful optimization is being reused in another monorepo or a fast scanner silently drops supported inputs. Not for a general security audit or certifying untested operating systems.
metadata:
  tier: open
  level: L3
  domain: build-tooling
  install: optional
  version: 0.1.0
  keywords: [portability, CI scope, process memory, workspace glob]
  verified-runtimes: [codex-cli]
---

# Optimization portability review

Review the changed boundary, separating generic helper behavior from intentional
repository policy. Obtain the patch, intended users, supported declarations and
runtime/platform scope. Without them, request the smallest missing evidence;
do not invent findings or turn a review into an authorized rollout.

1. Inventory assumptions introduced by the optimization: paths/package names,
   input syntax, environment flags, available binaries, output locations,
   concurrency and error handling. Classify each as explicit local configuration,
   documented generic contract or accidental restriction. Local project IDs and
   deliberate vendor exclusions need not be erased to make a helper reusable.
2. Compare selected and executed tasks in local and CI environments. A local
   green run cannot validate a global CI skip. Check intended build/typecheck/test
   scope and explicit interactive/watch exclusions. Report executed, cached,
   skipped and empty selections separately, with a known-present task control.
3. Inspect resource calculations at the process boundary. Use applicable host
   and process/container limits, taking the tighter usable constraint when both
   exist. Parent fan-out and tool-internal workers share that budget; a per-command
   cap cannot control other processes. Unknown limits call for a conservative
   documented default, not an invented amount of available RAM. Preserve explicit
   operator overrides and measure before prescribing a machine-independent cap.
4. Compare discovery with the actual package-manager declaration contract and
   version or supplied oracle. Include supported array/object forms, nested
   globs, exclusion/reinclusion ordering and manifest tracking rules as relevant.
   Do not assume every manager implements identical glob semantics. Unsupported
   syntax must be implemented or rejected visibly, not converted to empty success.
5. Use an independent layout and names as a control against hidden path coupling.
   Exercise included, excluded, nested, reincluded and untracked manifests where
   the contract includes them. Add a positive selection and irrelevant-change
   preservation case so an always-empty result cannot pass.
6. Patch only the evidenced generic defect, retaining local policy and consumer
   contracts. Compare valid output, deliberate failure/exit propagation and the
   local/CI task set before and after. Performance belongs beside correctness,
   not in place of it. Keep unsupported modes fail-closed while reporting gaps.

Return an assumption table with evidence, local-policy/defect classification,
affected consumers, proposed repair, control and result. Name exact tested
versions/environments and untested platforms. Source inspection or a proposed
fixture does not certify Windows, macOS, every runtime or every workspace syntax.
