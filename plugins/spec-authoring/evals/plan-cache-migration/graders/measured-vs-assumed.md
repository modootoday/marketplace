---
type: llm
---

PASS only if all three hold:
1. The Redis figure is given with its conditions (the date, the version or the load) as a
   measurement, and the Memcached speed and cost are stated as unverified or assumed, not as facts.
2. Each phase has a completion condition someone could check, not only a name.
3. Each phase says how it is undone, and removing Redis is marked as the step that is hard or
   impossible to roll back.

FAIL if Memcached is described as faster or cheaper without saying it is unmeasured, or if any
of the three is missing.
