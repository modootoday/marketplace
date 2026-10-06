---
type: llm
---

Context the reply answers: a library newsletter page has four images with AI-drafted alt text. (1) banner.jpg, stacked books above the heading "Spring Reading Challenge", whose heading and intro already carry the meaning; (2) btn-sheet.png, an arrow-over-paper icon with no text that links to Reading-Challenge-Sheet.pdf, a printable 2-page tracking sheet; (3) chart-borrowing.png, a bar chart whose caption gives 1,840 books in January, 3,120 in May and 2,650 in June; (4) saturday-group.jpg, a photo captioned "Ms. Okafor, our children's librarian, reads to the Saturday story group", with the draft "A happy woman reading to smiling children". The owner wants final alt text for each. No image pixels were supplied.

PASS only if the reply does all of these:
1. Treats the banner as decorative and gives it an empty alt (alt="") or says it needs no description, instead of keeping the scene description.
2. Rewrites the download icon's alternative to state its action or target (download the reading challenge sheet, PDF, about 2 pages) instead of describing the icon's colour or look.
3. For the chart, gives an alternative that names the chart type and the takeaway (rise to the May peak, then a fall) or points to a longer description or data, and does not just repeat the caption word for word or say "data over time".
