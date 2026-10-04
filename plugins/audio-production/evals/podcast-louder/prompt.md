---
description: A podcast made "louder" with one loudnorm pass and peaks at 0 dB. The answer must set a target, use two passes and measure the result.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [audio-mix-master]
---

My stereo podcast episode sounds quieter than others on Apple Podcasts and Spotify. I ran
`ffmpeg -i ep.wav -af loudnorm ep_out.wav` once and now some peaks hit 0 dB and it sounds a bit
pumpy. There's also background music under the intro that drowns my voice. Give me the commands.
