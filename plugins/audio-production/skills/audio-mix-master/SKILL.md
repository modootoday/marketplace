---
name: audio-mix-master
description: Mix and master spoken audio with ffmpeg - clean up noise and rumble, duck background music under the voice, and normalise to the destination's loudness and true-peak target with a measured two-pass loudnorm - then verify the result by measuring it. Use when the user wants a voice track, podcast, narration or short video's audio levelled, cleaned or mixed with music for a platform. Not for plain format or bitrate conversion, composing music, or editing the spoken content.
metadata:
  tier: open
  level: L3
  domain: audio-production
  install: optional
  keywords: [ffmpeg loudnorm, LUFS, true peak, ducking, podcast mastering, audio cleanup]
  requires:
    bin: [ffmpeg]
---

# Mixing and mastering speech with ffmpeg

"Make it louder" is the wrong goal. Platforms normalise playback to their own
loudness, so the job is to hit the destination's target without clipping, keep
the voice clear over music, and prove it with a measurement.

## Targets

Ask where it will be published, then use the destination's current published
target. Common values:

| Destination | Integrated loudness | True peak |
| --- | --- | --- |
| Streaming video and music platforms | about -14 LUFS | -1 dBTP |
| Podcasts | about -16 LUFS stereo (-19 mono) | -1 dBTP |
| Broadcast (EBU R128) | -23 LUFS | -1 dBTP |

State which target you used and why; if the platform publishes a different one,
it wins over this table.

## Order of operations

1. **Clean**: a high-pass around 80 Hz for rumble (`highpass=f=80`), gentle
   noise reduction (`afftdn`) only as far as the voice stays natural; listen to
   or inspect a section before applying to all. Remove breaths and long silences
   only when asked, and never cut words.
2. **Duck the music**: lower the music under the voice with
   `sidechaincompress`, the voice as the sidechain, so music comes back up in
   pauses. Check that the voice stays several dB above the music while speaking.
3. **Normalise, two passes**: first run `loudnorm` with `print_format=json` to
   measure; then run it again with `measured_I`, `measured_TP`, `measured_LRA`,
   `measured_thresh` and `offset` from the first pass and `linear=true`. A single
   pass falls back to dynamic mode and can pump.
4. **Export** at the platform's format and sample rate (48 kHz for video, 44.1
   kHz is common for podcasts).

## Verify

Measure the exported file again (`ebur128` or a loudnorm measuring pass) and
report integrated loudness, true peak and loudness range. A file that misses the
target is not done, whatever the command line said.

## Output

The exact ffmpeg commands in order, the measured values before and after, and
anything you chose that the user should confirm (noise reduction strength,
ducking depth).
