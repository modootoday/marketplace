#!/usr/bin/env python3
"""Forced alignment of speech audio to its known script with a CTC model, on CPU.

Writes timings JSON for subtitles.py, with a per-character confidence so a word the model does
not know (often a loanword or a name) can be flagged instead of trusted.
Needs: torch, torchaudio, transformers, soundfile. The default model is Apache-2.0.
"""

from __future__ import annotations

import argparse
import json
import math
import sys

DEFAULT_MODEL = "kresnik/wav2vec2-large-xlsr-korean"


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("audio", help="WAV or FLAC file")
    parser.add_argument("script", help="text file with exactly what is spoken (spoken form)")
    parser.add_argument("--out", default="timings.json")
    parser.add_argument("--model", default=DEFAULT_MODEL)
    parser.add_argument("--min-confidence", type=float, default=0.5)
    args = parser.parse_args(argv)

    import soundfile as sf
    import torch
    import torchaudio
    from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor

    processor = Wav2Vec2Processor.from_pretrained(args.model)
    model = Wav2Vec2ForCTC.from_pretrained(args.model).eval()
    vocab = processor.tokenizer.get_vocab()
    blank = processor.tokenizer.pad_token_id

    spoken = open(args.script, encoding="utf-8").read()
    chars = [c for c in spoken if c.isalnum()]
    unknown = sorted({c for c in chars if c not in vocab})
    if unknown:
        raise SystemExit(f"characters the model cannot align: {''.join(unknown)}; write them in spoken Korean")

    audio, sr = sf.read(args.audio, dtype="float32")
    if audio.ndim > 1:
        audio = audio.mean(axis=1)
    wave = torchaudio.functional.resample(torch.from_numpy(audio), sr, 16000)
    inputs = processor(wave.numpy(), sampling_rate=16000, return_tensors="pt").input_values
    with torch.inference_mode():
        log_probs = torch.log_softmax(model(inputs).logits, dim=-1)
    targets = torch.tensor([[vocab[c] for c in chars]], dtype=torch.int32)
    alignment, scores = torchaudio.functional.forced_align(log_probs, targets, blank=blank)
    # merge_tokens defaults to blank id 0; this model's blank is its pad token.
    spans = torchaudio.functional.merge_tokens(alignment[0], scores[0].exp(), blank=blank)
    if len(spans) != len(chars):
        raise SystemExit(f"aligned {len(spans)} characters for {len(chars)} in the script")
    frame_s = wave.shape[0] / 16000 / log_probs.shape[1]
    items = [
        {"text": c, "start": round(s.start * frame_s, 3), "end": round(s.end * frame_s, 3),
         "confidence": round(float(s.score), 3)}
        for c, s in zip(chars, spans)
    ]

    words, cursor, flagged = [], 0, []
    for word in spoken.split():
        n = sum(ch.isalnum() for ch in word)
        if n == 0:
            continue
        part = items[cursor:cursor + n]
        cursor += n
        mean = math.fsum(i["confidence"] for i in part) / n
        if mean < args.min_confidence:
            flagged.append({"word": word, "start": part[0]["start"], "confidence": round(mean, 3)})
        words.append(word)
    with open(args.out, "w", encoding="utf-8") as fh:
        json.dump({"unit": "char", "model": args.model, "items": items, "low_confidence": flagged}, fh, ensure_ascii=False, indent=1)
    sys.stdout.write(f"{len(items)} characters aligned -> {args.out}; {len(flagged)} low-confidence words\n")
    for f in flagged:
        sys.stdout.write(f"  check {f['word']} at {f['start']} s (confidence {f['confidence']})\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
