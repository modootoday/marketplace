---
name: gettext-catalog-runtime-contract-check
description: Compare gettext PO/MO message identity, typed format arguments and plural selection with supplied consumer rendering controls. Use when compilation succeeds but localized runtime output or branch delivery is uncertain. Not for prose translation, XLIFF merge reconstruction or literal format-string identity enforcement.
metadata:
  tier: open
  level: L3
  domain: localization
  install: optional
  keywords: [gettext, po, mo, plural, format, localization]
  verified-runtimes: [codex-cli]
---

# Gettext catalog runtime contract check

Compilation and readable translations do not establish that the intended runtime consumes the intended catalog or preserves its argument roles.

Record context, singular/plural message IDs, consumer API, domain/locale and source argument names/types. Identify formatting dialect and relevant catalog flags/checking scope before interpreting a successful build. Named argument reordering is legitimate. Compatible directive aliases are not inherently compiler bugs; literal identity is only a requirement when the approved contract explicitly makes it one. Separate type compatibility from semantic role, unintended literal characters and output differences.

Read the approved plural policy and catalog header/branch indexes together. Select representative boundary counts for each required branch and compare supplied consumer outputs. Do not substitute n!=1 for an unfamiliar plural rule. A branch may legitimately omit or alter an argument under its approved consumer contract; do not impose identical raw placeholder sets indiscriminately. Never evaluate an untrusted header as arbitrary code.

Tie source PO, compiled/shipped MO and actual loaded consumer catalog to exact identities. Record lookup context/domain/language/path, relevant cache/fallback observations and named runtime/version. A successful compile or screenshot of a different catalog cannot establish current delivery. Missing-key exceptions under an exact supplied callsite are direct findings; an unobserved plural branch remains unverified rather than invented as a crash.

Return a context/message/branch ledger, typed argument findings, supplied rendered controls and compiler-versus-consumer evidence gaps. Request missing dialect/flags, header, MO identity or callsite/count outputs precisely. Propose changes without editing or rerunning a consumer unless authorized. Do not characterize compatible formatting as a universal strict-identity violation or certify native translation quality.

[Django translation](https://docs.djangoproject.com/en/6.0/topics/i18n/translation/) documents named formatting and plural handling. [Python gettext](https://docs.python.org/3/library/gettext.html) documents compiled catalog loading and context/plural lookup. Version-specific actual controls establish the bounded handoff; historical reports do not prove current compiler defects.
