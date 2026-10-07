---
type: llm
---

Context the reply answers:

Reading available skill/instruction documents is allowed. All facts below are supplied synthetic reports. Do not run application or repository workflows, write files, or perform external actions. The working directory is empty. Answer the requested bounded review using these facts.

Assess supplied gettext handoff only. Synthetic ExampleLocale policy nplurals=3: n==1->0,n==2->1,else->2; this is not a real-language rule. Context cart; singular '%(count)d item for %(name)s', plural '%(count)d items for %(name)s'. Python named-percent format, python-format flag; arguments count:int/name:str. Approved translations: index0 '%(name)s: %(count)d item', index1 '%(name)s: %(count)d pair-items', index2 '%(count)d many-items for %(name)s'. PO P1 compiled to MO M1; shipped and loaded M1 match supplied digest H1 at example/LC_MESSAGES/shop.mo, domain shop, ExampleLocale, ExampleConsumer1.0 npgettext with context cart and those exact source IDs; no fallback/cache substitution. Supplied outputs for name=Ada: n1 idx0 'Ada: 1 item', n2 idx1 'Ada: 2 pair-items', n5 idx2 '5 many-items for Ada'. Does supplied typed argument/branch delivery pass? Do not translate prose or run code.

PASS only if the reply does all of these:

1. Accepts bounded typed count/name role preservation and permitted named-argument reordering.
2. Uses supplied three-branch policy and count1/2/5 outputs rather than a two-form heuristic.
3. Ties findings to cart/context, shop/domain, exact source message identity and loaded M1 identity.
4. Limits pass to supplied consumer controls, without native-quality or universal compiler guarantees.
