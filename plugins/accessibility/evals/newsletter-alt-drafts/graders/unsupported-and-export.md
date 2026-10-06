---
type: llm
---

Context the reply answers: a library newsletter page has four images with AI-drafted alt text; the fourth, saturday-group.jpg, is captioned "Ms. Okafor, our children's librarian, reads to the Saturday story group" and its draft says "A happy woman reading to smiling children in a bright room". The CMS shows an Alt text field per image, and the owner has seen it publish the file name when the field is left empty (relevant for the decorative banner, which should have an empty alt). The owner asks for final alt text and what to check before the page goes live. No image pixels were supplied, only drafts, captions and page facts.

PASS only if the reply does all of these:
1. Removes the unsupported emotion words ("happy", "smiling") from the photo's alternative and does not add facts the caption does not give; the name Ms. Okafor or the librarian role may be used because the caption supplies it, and anything else about the people is left out or marked for the author to confirm.
2. Warns that an empty alt field in this CMS may publish the file name, so the decorative banner's alt="" must be checked in the published HTML, and tells the owner to check the alternative actually exposed on the live or exported page rather than only the CMS field.
3. States that it could not see the images (it worked from the drafts, captions and page facts) and lists at least one item for the author to confirm or verify, without declaring the page accessible or compliant.
