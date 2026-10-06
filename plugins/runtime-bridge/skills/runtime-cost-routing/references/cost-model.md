# Comparable job accounting

Use measured tokens for the same job. Record total input `I`, cached subset `K`, output `O`,
billable reasoning treatment, tool fees `T`, number of launches and independent verification.
If cache-write, storage, search or other billing differs by route, add those terms separately.
For rates per million tokens:

```text
fresh = I - K
cost = fresh*input_rate/1e6 + K*cache_read_rate/1e6 + O*output_rate/1e6 + T
```

Hypothetical measured job: I=120,000, K=100,000, O=8,000; rates 3, 0.3, 12 dollars per million,
tools=0.04 dollars. Fresh=20,000; cost=0.06+0.03+0.096+0.04=0.226 dollars. This is an example,
not a current vendor quote. A cache miss changes input cost to 0.36 dollars and total to 0.496.

Do not include the cached subset again at full input price. Report incremental included-route
cash separately from amortized subscription cost, renewal price, remaining allowance, reset,
post-job reserve and latency. An already-paid subscription's zero incremental cash does not make
it eligible when the job crosses its reserve floor.

The saved route record includes count provenance, price source/as-of date, all computed terms,
the selected route, uncertainties, numerical cap and enforcement mechanism. A timeout, prompt
budget, usage estimate, monthly alert or reported session dollars does not guarantee a spend cap.
Native caps may stop only before the next request; disclose that boundary. For strict paid caps,
reserve each request's maximum possible charge at a gateway before starting it, including tool
and output ceilings, and reject it if the reservation would exceed the remaining job cap.
