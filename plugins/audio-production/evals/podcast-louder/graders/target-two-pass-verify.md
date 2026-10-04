---
type: llm
---

PASS only if all four hold:
1. It names a loudness target appropriate for a stereo podcast (around -16 LUFS integrated) and a
   true-peak ceiling (around -1 dBTP), set explicitly in loudnorm (I and TP).
2. It uses two-pass loudnorm: a measuring pass with print_format=json, then a second pass with the
   measured values and linear=true, explaining that one pass caused the pumping.
3. It ducks the intro music under the voice (for example sidechaincompress with the voice as the
   sidechain) or otherwise lowers the music while the voice speaks.
4. It verifies the output by measuring it again (ebur128 or a measuring loudnorm pass).

FAIL if any of the four is missing.
