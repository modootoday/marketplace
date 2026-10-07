We need an API that validates a customer's uploaded dataset before import. Please recommend the implementation boundary and the checks still needed. Do not modify files or execute application workflows; reading available instruction documents is allowed. No application checkout is available, so use the supplied artifacts.

The upload validation must report all row errors without changing customer data, accept the documented semicolon-delimited format, and support up to 50 MB while keeping the API process below its existing 64 MB memory budget. Authentication supplies a tenant ID. The team proposes using the already published validateDataset function to avoid duplicating existing functionality.

Supplied artifacts:
- dataset-tools exports validateDataset(tenantId, csvText). Its implementation splits the entire string into lines, assumes comma delimiters, normalizes customer IDs by writing them to the tenant database, and throws on the first invalid row. Its tests cover small comma-delimited inputs and successful normalization writes.
- The existing admin route calls validateDataset for trusted internal maintenance uploads. The public package export and its built entry point are confirmed; this proves the function is consumable, not that it matches the new contract.
- ingest-parser exports parseRecords(stream, { delimiter }) as an async iterator. Its tests cover comma and semicolon inputs and quoted fields. It does not validate business rules or write to a database.
- A shared row-rules module exports inspectRow(row, customerLookup), returning an array of field errors without writes. Its tests cover invalid customer IDs and malformed amounts. There is no supplied evidence that the API can import this module through the built package or that customerLookup is read-only and tenant-scoped.
- The existing import worker composes parseRecords with inspectRow and then separately persists accepted records. It runs outside the API memory budget. No 50 MB API benchmark, upload route wiring, or tenant-isolation integration test is supplied.

Should the new upload API use the existing validator unchanged, adapt existing pieces, or add a new implementation? Explain which observations support the decision and which claims remain unverified.
