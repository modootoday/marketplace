---
name: audio-mix-master
description: Correct spoken-audio noise, loudness and mixing with measured export verification. Use when the user requests cleanup, normalization or voice/music balance for an identified audio track or supplied measurements.
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

## Applicability

Enter only for requested audio cleanup, loudness correction or mixing. For format/codec/
bitrate-only conversion, stop this workflow, preserve the audio content and request only the
source needed for conversion. An encoder or audio filename alone does not justify processing.
Apply the procedures below only to the requested correction; missing measurements remain
pending rather than evidence of target compliance.

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

## Scene joins and rights evidence

Preserve the original source and create a separate output; actual sample or edit lengths remain unknown until inspected.

A defect reported within 5 ms does not establish that a 5 ms trim is safe or sufficient.
Select the edit location and length only after inspecting the waveform and spoken boundary;
without that inspection, leave the minimum safe trim/fade pending. If a hypothetical edit's
duration is supplied, assess its conditional timing impact without approving the edit itself.

Measure scene-level loudness/peaks as well as the finished mix; one whole-program average can hide audible jumps. Inspect and listen to suspect onset/end ticks before local fades or trims. Use the smallest change that removes the defect without damaging consonants, breaths or intentional silence; do not impose a blanket fade length. Record before/after audio identities and durations, and propagate timing changes to placements/alignment/captions. Remeasure the exported mix and listen through joins. For BGM, keep source/version/license/use conditions; free download does not mean attribution-free or unrestricted use. Treat numerical targets as destination-approved settings, not universal platform mandates.
