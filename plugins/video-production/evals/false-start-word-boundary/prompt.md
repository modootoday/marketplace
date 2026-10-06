---
description: What talking-head-edit should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [talking-head-edit]
---

I have a 200-second talking-head clip (input.mp4, 1080p 30 fps, mono voice, no music). Here are `silencedetect` results at -35 dB, d=0.5:

```
silence_start: 12.40   silence_end: 14.10
silence_start: 55.00   silence_end: 55.60
silence_start: 131.80  silence_end: 133.90
```

And part of the transcript with word timings:
- [14.05-14.50] "Actually,"
- [14.50-16.80] "the main point is cost."
- [127.90-129.30] "So what we--"
- [129.60-131.40] "So what we are seeing"  (the first "So what we--" is a false start)
- [133.90-135.10] "is that prices fell."

Give me the ffmpeg approach and the exact keep segments so I can run it. Then I will upload to a platform with -14 LUFS and need subtitles.
