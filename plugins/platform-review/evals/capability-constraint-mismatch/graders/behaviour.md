---
type: llm
---

Context the reply answers: The requested tenant-authenticated upload API must accept semicolon-delimited datasets, report all row errors, perform no customer-data writes, and handle 50 MB under a 64 MB API memory budget. The already consumable validateDataset loads/splits the whole text, assumes commas, writes normalized customer IDs, and throws at the first invalid row; its tests cover small comma input and writes. A shared streaming parseRecords accepts a delimiter and has semicolon/quoted-field tests. A shared pure inspectRow returns all field errors; its built API import availability and read-only tenant-scoped customerLookup are unverified. An import worker composes those pieces then persists separately, outside the API budget. No upload route wiring, 50 MB API benchmark, or tenant-isolation integration test is supplied. This is read-only planning.

PASS only if the reply does all of these:
1. Rejects unchanged validateDataset for the specific side-effect, delimiter, first-error, and whole-input memory mismatches; does not confuse confirmed public availability with contract compatibility.
2. Proposes adapting the existing streaming parser and row-rule logic into a read-only validation boundary instead of duplicating the parser/rules or invoking the import worker's persistence path. Accounts for reporting all row errors and semicolon parsing.
3. Identifies inspectRow's built-package availability and a read-only tenant-scoped customerLookup as unresolved prerequisites, and places tenant identity/authorization at the actual upload-consumer boundary rather than assuming the worker or helper tests prove API isolation.
4. Requires checking bounded memory for the actual API path, including accumulated errors or response buffering, using representative 50 MB inputs. Does not claim streaming alone or the worker's success proves compliance with the 64 MB API budget, and does not pretend missing benchmarks or integration tests were run.

FAIL if any item is missing.
