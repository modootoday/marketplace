We need a delivery-retry status endpoint. Please recommend the smallest implementation plan from the supplied repository excerpt. Do not write code or execute repository commands; this read-only sandbox has no checkout. An engineer proposes building a retry counter and retry-status API in the web application because the frontend has no retry status display yet.

Required behavior: authenticated users can read the last failure reason and next retry time for their own delivery. Tenant isolation is mandatory. No new retry scheduler is requested.

Supplied evidence:
- packages/delivery-engine/src/retry-state.ts exports readRetryState(store, tenantId, deliveryId). Its return type contains lastFailure and nextRetryAt. Unit tests show cross-tenant reads return null.
- packages/delivery-engine/package.json exports only ./send and ./types. retry-state.ts is absent from the export map.
- services/dispatch/src/worker.ts imports readRetryState through a relative source path and uses it in the delivery retry loop.
- services/http/src/routes/deliveries.ts imports delivery-engine/send. It mounts POST /deliveries and GET /deliveries/:id; the latter returns state and createdAt only. Authentication middleware supplies request.tenantId.
- web/dashboard/src/deliveries.ts fetches GET /deliveries/:id and shows state. No lastFailure or nextRetryAt strings appear in this file.
- A grep for readRetryState in web/dashboard returned zero matches. Its control search for fetchDelivery returned one match at the known API call.
- The team says the HTTP service imports delivery-engine through its published package export map, but we have no integration test, built package listing, or production trace for that claim.

What should be reused, what change is actually missing, and what remains unverified before implementation?
