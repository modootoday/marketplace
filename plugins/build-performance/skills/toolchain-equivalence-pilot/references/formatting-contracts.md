# Formatting contracts

Compare the same effective files, parser choices, ignore rules and configuration
overrides. Count selected, ignored, unsupported, processed and changed files for
both tools. Preserve existing width and manifest sorting policy rather than
turning the trial into an unrelated reformat.

For changed source, compare parsed semantics and comments independently. AST
normalization may discard license text, pragmas, lint/type directives or bundler
annotations. Preserve their content and placement where placement affects
meaning. Do not rewrite valid comments to accommodate the replacement.

Check JSON/manifest values and any required key order, Markdown/code fences and
relevant CSS/config syntax. Byte differences need classification, not automatic
acceptance or rejection. Keep unknown syntax outside adoption until understood.

Verify check-only exit status on both conforming and deliberately nonconforming
owned fixtures, writing behavior on copies, repeat idempotence, nested overrides
and the actual staged hook or editor command. Time that integration separately
from a large file-processing pilot. Keep the old command/config rollback until
the consumer contract passes.
