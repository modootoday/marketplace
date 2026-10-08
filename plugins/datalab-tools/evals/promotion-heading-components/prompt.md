---
description: "Route an editor heading check without guessing conversion"
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-naver-workbench]
---

# Route an editor heading check without guessing conversion

I want to know whether my prominent "Packing checklist" line and pull quote are semantic headings, and whether the tool we found can turn them into headings. Give a next-call plan only; do not edit.

Supplied editor_read_document observations for intended browser B1/editor E1:
Page1 offset0,total2,nextOffset1,revision R8: component C1 returned type text, paragraph text "Packing checklist". The owner reports it is large and bold.
Page2 offset1,total2,nextOffset null,revision R8: component C2 returned type quotation, text "Keep the original copy". The owner reports it looks prominent.
These are the complete supplied pages for this target, not executed reads in this session.

The supplied specialist discovery result contains editor_read_document and editor_apply_styles; this list is not the complete set of known discovery adapters.
Known read-only adapters are datalab_find_tools, requiring only intent as a 1..256-character string with no additional properties, and datalab_list_tools, whose optional fields are toolset (1..64 characters), page (integer >=1) and pageSize (integer 1..20).
First preserve the original user intent in datalab_find_tools.
If a future discovery result is matched:false or its candidates are insufficient, datalab_list_tools can show toolset summaries without toolset, or page a toolset selected from the returned fallback.toolsets; do not invent a toolset or assume a conversion result.
These are supplied static discovery contracts, not tools executed in this session.
editor_read_document accepts optional integer offset>=0 and limit1..200.
editor_apply_styles accepts rules whose required fields are componentId, paragraphIndex, start, end and style; style supports fontFamily, fontSizeCode and bold, with no semantic-heading or component-conversion field returned.
Do not invent another endpoint or arguments. If another capability is needed, preserve my original intent when describing discovery. I have not authorized a mutation or SEO experiment.

Please identify what the observations establish, what remains unsupported and the next safe step. Reading available instruction documents is allowed. No network/application/tool execution or file edits; there is no application checkout.
