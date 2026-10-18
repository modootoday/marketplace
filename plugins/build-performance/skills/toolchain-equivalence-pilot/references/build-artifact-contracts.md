# Build artifact contracts

Start from package exports and real consumers, not the build tool's success
message. Inventory entrypoints, module formats, declarations, exported subpaths,
assets and relevant metadata. Compare clean candidate output with the baseline;
old retained files must not fill candidate omissions.

For libraries, exercise declared ESM/CJS/type resolution as applicable, including
consumer imports from the packaged artifact. Compare declaration semantics and
content, not just counts. A byte-identical declaration set does not establish
that the tarball includes it or exports resolve to it.

For applications or applicable libraries, check SSR rendering, hydration/client
behavior and asset/CSS references using representative consumers. Use browser or
visual checks when the actual contract needs them; unit tests alone cannot prove
those boundaries. Compare old/new warnings rather than attributing all warnings
to the candidate.

Report output inventory and raw, compressed and shipped sizes separately where
relevant. Specify how compression was applied consistently. A smaller raw bundle
can compress worse; evaluate the user's delivery budget without inventing a
universal size threshold. Check published/package contents before broad adoption,
keeping unavailable environments and unrun consumers explicit.
