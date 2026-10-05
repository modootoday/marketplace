---
type: llm
---

PASS only if the review makes both points:
1. Refunds are issued with POST /v1/orders/:id/refund (an orders resource, amount in
   attributes, omitted for a full refund), not a /refunds resource, so this call fails.
2. The checkout quantity must be sent as checkout_data.variant_quantities with snake_case keys
   (variant_id, quantity); the camelCase variantQuantities is ignored, so a multi-seat buyer
   is charged for one.

FAIL if either is missing.
