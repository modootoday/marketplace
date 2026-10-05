---
type: llm
---

Context the reply answers: the user asked three times for an editable layered PSD of a banner and received failing links. The last file banner.psd is reported by the `file` command as PNG image data 1200 x 628 RGBA, 212 KB, so it is a flat PNG with a .psd name. The user also needs a 2:1 linked logo placed on all 120 artboards, centred, scaled to fit inside a margin of 8 percent of the shorter side on every side; the script found 112 artboards. Reported placements: id 14 (1080 x 1920) logo 907 x 454 at (86, 733); id 15 (1920 x 1080) logo 1747 x 873 at (86, 103); id 16 (1000 x 1000) logo 840 x 500 at (80, 250). The expected size for id 16 is 840 x 420 at (80, 290). The assistant cannot open files or run anything.

PASS only if the reply does all of these:
1. Says banner.psd is not an editable layered PSD because it is a flat PNG under a PSD name, and that it has no layers or live text, and does not accept it.
2. Says the artboard count of 112 does not match the 120 the user stated and that the 8 missing artboards must be found before any result is accepted, and that the script should run on a copy.
3. Marks artboard id 16 as failing because the logo ratio is 840:500 (1.68) instead of 2:1, with the expected 840 x 420, and gives ids 14 and 15 as passing on ratio and margin.
4. Reports results per artboard id with measured numbers rather than as one overall verdict.
5. Does not declare either deliverable done; it names what stays unverified (layer list, linked state, remaining artboards) and what to run to check it.
