---
type: llm
---

Context the reply answers: a photographer wants an upload CSV for a stock agency. Rules: columns Filename, Title, Description, Keywords in that order; title at most 60 characters; description at most 150 characters; 8 to 25 keywords, single words only, lowercase, comma-separated inside the Keywords field, most important first; UTF-8. Five files: IMG_2201.jpg and IMG_2201-2.jpg (two similar harbour fog photos, the second with a single red boat), IMG_2210.jpg (stone tower, location unsure), IMG_2212.jpg (red apple with water drops), and IMG_2214.jpg which has no notes at all. The reply cannot view the photos.

PASS only if the reply does all of these:
1. Produces CSV text with the header Filename,Title,Description,Keywords in that order, in which every non-empty Keywords field (and any title or description containing a comma) is wrapped in double quotes so the commas do not split the row, so every row has exactly four fields.
2. Keeps IMG_2201.jpg and IMG_2201-2.jpg as separate rows with their own distinct text (the red boat only on the second), and gives IMG_2214.jpg no invented title or keywords: it is listed as missing notes, left blank or held out of the CSV until the photographer supplies them.
3. Shows its checks with numbers: title and description lengths against 60 and 150 characters and keyword counts against 8 to 25, and every title is at most 60 characters (the long harbour note is shortened).
