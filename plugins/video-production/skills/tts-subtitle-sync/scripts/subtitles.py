#!/usr/bin/env python3
"""Build subtitles and motion cues from spoken timings, shown in display text.

Inputs: a pairs file (display text and how it is spoken, in order) and a timings file
(per-character or per-word times from TTS alignment, ASR or a forced aligner).
Outputs: SRT, WebVTT and a JSON cue list with frame numbers.
"""

from __future__ import annotations

import argparse
import difflib
import json
import re
import sys
import unicodedata

SENTENCE_END = re.compile(r"[.?!。？！…]$")


def normalise(text: str) -> str:
    """Characters that carry sound, for matching spoken text with timings."""
    return "".join(ch for ch in unicodedata.normalize("NFC", text) if ch.isalnum())


def char_times(timings: dict) -> list[tuple[str, float, float]]:
    """Expand word or character timings into per-character times."""
    out = []
    for item in timings["items"]:
        chars = normalise(item["text"])
        if not chars:
            continue
        step = (item["end"] - item["start"]) / len(chars)
        for i, ch in enumerate(chars):
            out.append((ch, item["start"] + i * step, item["start"] + (i + 1) * step))
    return out


def align(spoken: str, timed: list[tuple[str, float, float]]) -> list[tuple[float, float]]:
    """Time for every sounding character of the spoken text.

    The timings may come from ASR, which can mis-hear, so the two character streams are aligned
    and characters with no match take times interpolated from their matched neighbours.
    """
    target = normalise(spoken)
    source = "".join(c for c, _, _ in timed)
    times: list[tuple[float, float] | None] = [None] * len(target)
    matcher = difflib.SequenceMatcher(a=target, b=source, autojunk=False)
    for block in matcher.get_matching_blocks():
        for k in range(block.size):
            _, start, end = timed[block.b + k]
            times[block.a + k] = (start, end)
    known = [i for i, t in enumerate(times) if t is not None]
    if not known:
        raise SystemExit("no character of the script matched the timings")
    for i, t in enumerate(times):
        if t is not None:
            continue
        before = max((k for k in known if k < i), default=None)
        after = min((k for k in known if k > i), default=None)
        if before is None:
            times[i] = (times[after][0], times[after][0])
            continue
        if after is None:
            times[i] = (times[before][1], times[before][1])
            continue
        span_start, span_end = times[before][1], times[after][0]
        frac = (i - before) / (after - before)
        point = span_start + (span_end - span_start) * frac
        times[i] = (point, point)
    return times  # type: ignore[return-value]


def units(pairs: list[dict], times: list[tuple[float, float]]) -> list[dict]:
    """Display units with times: one per eojeol when display equals spoken, else the whole pair."""
    out = []
    cursor = 0
    for pair in pairs:
        display, spoken = pair["display"], pair["spoken"]
        if normalise(display) == normalise(spoken):
            pieces = [(w, w) for w in display.split()]
        else:
            pieces = [(display.strip(), spoken)]
        for shown, said in pieces:
            n = len(normalise(said))
            if n == 0:
                continue
            span = times[cursor:cursor + n]
            cursor += n
            if len(span) < n:
                raise SystemExit("pairs and timings disagree on the spoken text length")
            out.append({"text": shown, "start": span[0][0], "end": span[-1][1]})
    if cursor != len(times):
        raise SystemExit("pairs and timings disagree on the spoken text length")
    return out


def layout(text_units: list[dict], max_chars: int, max_lines: int, max_gap: float,
           min_duration: float) -> list[dict]:
    """Group units into cues of at most max_lines lines, breaking only between units."""
    cues: list[dict] = []
    lines: list[str] = []
    current: list[dict] = []

    def flush():
        if current:
            cues.append({"lines": lines.copy(), "start": current[0]["start"], "end": current[-1]["end"]})
        lines.clear()
        current.clear()

    for unit in text_units:
        word = unit["text"]
        if current and unit["start"] - current[-1]["end"] > max_gap:
            flush()
        if not lines:
            lines.append(word)
        elif len(lines[-1]) + 1 + len(word) <= max_chars:
            lines[-1] = f"{lines[-1]} {word}"
        elif len(lines) < max_lines:
            lines.append(word)
        else:
            flush()
            lines.append(word)
        current.append(unit)
        if SENTENCE_END.search(word):
            flush()
    flush()
    for i, cue in enumerate(cues):
        limit = cues[i + 1]["start"] if i + 1 < len(cues) else None
        if cue["end"] - cue["start"] < min_duration:
            wanted = cue["start"] + min_duration
            cue["end"] = min(wanted, limit) if limit is not None else wanted
    return cues


def _stamp(seconds: float, sep: str) -> str:
    ms = int(round(seconds * 1000))
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d}{sep}{ms:03d}"


def to_srt(cues: list[dict]) -> str:
    blocks = []
    for i, cue in enumerate(cues, 1):
        blocks.append(f"{i}\n{_stamp(cue['start'], ',')} --> {_stamp(cue['end'], ',')}\n" + "\n".join(cue["lines"]))
    return "\n\n".join(blocks) + "\n"


def to_vtt(cues: list[dict]) -> str:
    body = [f"{_stamp(c['start'], '.')} --> {_stamp(c['end'], '.')}\n" + "\n".join(c["lines"]) for c in cues]
    return "WEBVTT\n\n" + "\n\n".join(body) + "\n"


def to_cue_json(cues: list[dict], fps: int) -> list[dict]:
    return [
        {
            "id": f"c{i:03d}",
            "text": "\n".join(c["lines"]),
            "start": round(c["start"], 3),
            "end": round(c["end"], 3),
            "startFrame": int(round(c["start"] * fps)),
            "endFrame": int(round(c["end"] * fps)),
        }
        for i, c in enumerate(cues, 1)
    ]


def build(pairs: list[dict], timings: dict, max_chars: int = 18, max_lines: int = 2,
          max_gap: float = 0.6, min_duration: float = 0.8) -> list[dict]:
    spoken = " ".join(p["spoken"] for p in pairs)
    times = align(spoken, char_times(timings))
    return layout(units(pairs, times), max_chars, max_lines, max_gap, min_duration)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pairs", help="JSON list of {display, spoken} in order")
    parser.add_argument("timings", help='JSON {"unit": "char"|"word", "items": [{text, start, end}]}')
    parser.add_argument("--out", default="subtitles", help="output path without extension")
    parser.add_argument("--fps", type=int, default=30)
    parser.add_argument("--max-chars", type=int, default=18)
    parser.add_argument("--max-lines", type=int, default=2)
    parser.add_argument("--max-gap", type=float, default=0.6)
    parser.add_argument("--min-duration", type=float, default=0.8)
    args = parser.parse_args(argv)
    pairs = json.load(open(args.pairs, encoding="utf-8"))
    timings = json.load(open(args.timings, encoding="utf-8"))
    cues = build(pairs, timings, args.max_chars, args.max_lines, args.max_gap, args.min_duration)
    with open(f"{args.out}.srt", "w", encoding="utf-8") as fh:
        fh.write(to_srt(cues))
    with open(f"{args.out}.vtt", "w", encoding="utf-8") as fh:
        fh.write(to_vtt(cues))
    with open(f"{args.out}.cues.json", "w", encoding="utf-8") as fh:
        json.dump(to_cue_json(cues, args.fps), fh, ensure_ascii=False, indent=2)
    sys.stdout.write(f"{len(cues)} cues -> {args.out}.srt, .vtt, .cues.json\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
