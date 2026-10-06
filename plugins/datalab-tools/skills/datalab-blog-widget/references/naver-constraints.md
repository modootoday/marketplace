# Naver blog HTML constraints

These are the bundled editor constraints, not a guarantee about future platform behavior. Trust an actual paste failure over this reference.

- Tags: span, br, hr, img, a only. No div, p, heading, list, table, form, input, button, iframe, script, style, or link tags.
- Links require href and target="_top". Images require src and alt.
- Sidebar widgets: 170px wide, up to 600px high, at most 2,000 UTF-8 bytes. Body sections: max-width:960px.
- Styles must be inline. No class, event handlers, javascript scheme, CSS expression, import, fixed positioning, or nested links.
- Use display:block spans for blocks and paragraphs; styled spans for headings; hyphen-prefixed spans for lists; styled links for buttons. No dynamic behavior.
- Save bytes with short colors, zero without a unit, combined margin/padding, and font shorthand. Trim shadows and decoration first.
- ASCII costs one UTF-8 byte; Korean syllables commonly cost three. Count encoded bytes, not characters. Use plain text labels.
