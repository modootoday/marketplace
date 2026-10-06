# Isolation table example

Synthetic setup: TV (Brand A) eARC port 2, soundbar (Brand B) HDMI eARC port, console (Brand C) into TV port 1. Symptom: bar loses sound each time the TV sleeps.

Chain: Console -> HDMI -> TV port 1; TV port 2 (eARC) -> HDMI -> Bar eARC port. Audio return on the TV-bar link; control (CEC) on the same link.

| Step | One change | Expected if this is the cause | Record |
| --- | --- | --- | --- |
| 0 | None: wake the TV from sleep three times | Silence reproduces each time; baseline | how many of three |
| 1 | Swap only the TV-bar cable for a certified Ultra High Speed one | Silence stops after sleep | pass or fail, three tries |
| 2 | Turn CEC off on the bar only | Sound stays but power no longer follows, so the fault is control | sound after sleep, power behaviour |
| 3 | Restore CEC; turn the TV's eARC option to Auto (the menu name is in the TV manual, to be confirmed) | Sound returns after sleep | result |
| 4 | Unplug the console from the TV | Silence stops, so the console is involved | result |

Facts to read from the manufacturers' pages, unverified here: which TV port is eARC, whether the bar supports standby passthrough, current firmware notes.

Room measurement check: confirm the calibration file matches the microphone serial; run the sweep twice at the listening seat and once 30 cm to the side; if the two seat runs differ by several dB at the same frequencies, fix the setup (mic stand, background noise, levels) before reading peaks and dips.
