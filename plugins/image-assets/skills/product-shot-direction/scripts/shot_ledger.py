#!/usr/bin/env python3
"""Append-only ledger of product shots, plus a fidelity check against the real product photo.

The ledger is a JSONL file of events; the current state of a shot is the fold of its events,
so an approval or rejection never overwrites what was recorded before it.
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import os
import shutil
import sys

STATUSES = ("candidate", "approved", "rejected")


def _now() -> str:
    return dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def _sha256(path: str) -> str:
    digest = hashlib.sha256()
    with open(path, "rb") as fh:
        for block in iter(lambda: fh.read(1 << 16), b""):
            digest.update(block)
    return digest.hexdigest()


def read_events(ledger: str) -> list[dict]:
    if not os.path.exists(ledger):
        return []
    with open(ledger, encoding="utf-8") as fh:
        return [json.loads(line) for line in fh if line.strip()]


def append_event(ledger: str, event: dict) -> None:
    with open(ledger, "a", encoding="utf-8") as fh:
        fh.write(json.dumps(event, ensure_ascii=False, sort_keys=True) + "\n")


def state(events: list[dict]) -> dict[str, dict]:
    shots: dict[str, dict] = {}
    for event in events:
        kind = event.get("event")
        if kind == "add":
            shots[event["id"]] = {**event, "status": "candidate", "history": []}
            continue
        shot = shots.get(event.get("id", ""))
        if shot is None:
            continue
        if kind == "status":
            shot["status"] = event["status"]
            shot["history"].append(event)
        if kind == "check":
            shot["check"] = event["result"]
    return shots


def next_id(shots: dict[str, dict]) -> str:
    return f"s-{len(shots) + 1:04d}"


def add(ledger: str, image: str, prompt: str, model: str, provider: str, **extra) -> dict:
    shots = state(read_events(ledger))
    parent = extra.get("parent")
    if parent and parent not in shots:
        raise SystemExit(f"unknown parent shot {parent}")
    for ref in extra.get("refs") or []:
        if ref not in shots and not os.path.exists(ref):
            raise SystemExit(f"reference {ref} is neither a shot id nor a file")
    event = {
        "event": "add",
        "id": next_id(shots),
        "at": _now(),
        "image": os.path.abspath(image),
        "sha256": _sha256(image),
        "prompt": prompt,
        "model": model,
        "provider": provider,
        **{k: v for k, v in extra.items() if v not in (None, [], "")},
    }
    append_event(ledger, event)
    return event


def set_status(ledger: str, shot_id: str, status: str, by: str, reason: str | None) -> dict:
    if status not in STATUSES:
        raise SystemExit(f"status must be one of {STATUSES}")
    shots = state(read_events(ledger))
    if shot_id not in shots:
        raise SystemExit(f"unknown shot {shot_id}")
    if status == "rejected" and not reason:
        raise SystemExit("a rejection needs a reason")
    if status == "approved" and _sha256(shots[shot_id]["image"]) != shots[shot_id]["sha256"]:
        raise SystemExit(f"{shot_id}: the image changed after it was recorded; add it again")
    event = {"event": "status", "id": shot_id, "status": status, "by": by, "at": _now()}
    if reason:
        event["reason"] = reason
    append_event(ledger, event)
    return event


def lineage(shots: dict[str, dict], shot_id: str) -> list[str]:
    chain = []
    current = shot_id
    while current:
        if current in chain or current not in shots:
            break
        chain.append(current)
        current = shots[current].get("parent")
    return chain


def export_approved(ledger: str, out_dir: str) -> list[dict]:
    shots = state(read_events(ledger))
    os.makedirs(out_dir, exist_ok=True)
    exported = []
    for shot in shots.values():
        if shot["status"] != "approved":
            continue
        name = f"{shot['id']}{os.path.splitext(shot['image'])[1]}"
        shutil.copyfile(shot["image"], os.path.join(out_dir, name))
        exported.append({k: shot.get(k) for k in ("id", "sha256", "prompt", "model", "provider", "seed", "parent", "license", "check")} | {"file": name})
    with open(os.path.join(out_dir, "manifest.json"), "w", encoding="utf-8") as fh:
        json.dump(exported, fh, ensure_ascii=False, indent=2)
    return exported


# Fidelity metrics. Pillow is optional so the ledger itself works without it.

def _srgb_to_lab(rgb: tuple[float, float, float]) -> tuple[float, float, float]:
    def linear(c: float) -> float:
        c /= 255.0
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

    r, g, b = (linear(c) for c in rgb)
    x = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047
    y = 0.2126 * r + 0.7152 * g + 0.0722 * b
    z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883

    def f(t: float) -> float:
        return t ** (1 / 3) if t > 0.008856 else 7.787 * t + 16 / 116

    fx, fy, fz = f(x), f(y), f(z)
    return 116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)


def delta_e(a: tuple[float, float, float], b: tuple[float, float, float]) -> float:
    la, lb = _srgb_to_lab(a), _srgb_to_lab(b)
    return sum((p - q) ** 2 for p, q in zip(la, lb)) ** 0.5


def _crop(image, box):
    if not box:
        return image
    x, y, w, h = box
    return image.crop((x, y, x + w, y + h))


def _mean_rgb(image) -> tuple[float, float, float]:
    pixels = list(image.convert("RGB").resize((64, 64)).getdata())
    n = len(pixels)
    return tuple(sum(p[i] for p in pixels) / n for i in range(3))


def dhash(image, size: int = 8) -> int:
    grey = image.convert("L").resize((size + 1, size))
    px = list(grey.getdata())
    bits = 0
    for row in range(size):
        for col in range(size):
            left = px[row * (size + 1) + col]
            right = px[row * (size + 1) + col + 1]
            bits = (bits << 1) | (1 if left > right else 0)
    return bits


def check(reference: str, candidate: str, ref_box=None, cand_box=None) -> dict:
    try:
        from PIL import Image
    except ImportError as exc:
        raise SystemExit("check needs Pillow (pip install Pillow)") from exc
    ref = _crop(Image.open(reference), ref_box)
    cand = _crop(Image.open(candidate), cand_box)
    cand = cand.resize(ref.size)
    distance = bin(dhash(ref) ^ dhash(cand)).count("1")
    return {
        "mean_delta_e": round(delta_e(_mean_rgb(ref), _mean_rgb(cand)), 2),
        "dhash_distance": distance,
        "dhash_bits": 64,
        "note": "numbers flag drift; the visual checklist (logo, label text, colour, proportions, parts) decides",
    }


def _box(text: str | None):
    if not text:
        return None
    parts = [int(p) for p in text.split(",")]
    if len(parts) != 4:
        raise SystemExit("a box is x,y,w,h")
    return tuple(parts)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ledger", default="shots.jsonl")
    sub = parser.add_subparsers(dest="cmd", required=True)

    p = sub.add_parser("add")
    p.add_argument("image")
    p.add_argument("--prompt", required=True)
    p.add_argument("--model", required=True)
    p.add_argument("--provider", required=True)
    p.add_argument("--seed")
    p.add_argument("--size")
    p.add_argument("--parent")
    p.add_argument("--refs", help="comma-separated shot ids or reference file paths")
    p.add_argument("--brief")
    p.add_argument("--license", help="the model's terms for the output")

    for name in ("approve", "reject"):
        p = sub.add_parser(name)
        p.add_argument("id")
        p.add_argument("--by", required=True)
        p.add_argument("--reason")

    p = sub.add_parser("list")
    p.add_argument("--status", choices=STATUSES)

    p = sub.add_parser("lineage")
    p.add_argument("id")

    p = sub.add_parser("export-approved")
    p.add_argument("out_dir")

    p = sub.add_parser("check")
    p.add_argument("reference")
    p.add_argument("candidate")
    p.add_argument("--ref-box")
    p.add_argument("--cand-box")
    p.add_argument("--id", help="record the result on this shot")

    args = parser.parse_args(argv)
    out = sys.stdout
    if args.cmd == "add":
        refs = [r for r in (args.refs or "").split(",") if r]
        event = add(args.ledger, args.image, args.prompt, args.model, args.provider, seed=args.seed,
                    size=args.size, parent=args.parent, refs=refs, brief=args.brief, license=args.license)
        out.write(event["id"] + "\n")
        return 0
    if args.cmd in ("approve", "reject"):
        status = "approved" if args.cmd == "approve" else "rejected"
        set_status(args.ledger, args.id, status, args.by, args.reason)
        return 0
    shots = state(read_events(args.ledger))
    if args.cmd == "list":
        for shot in shots.values():
            if args.status and shot["status"] != args.status:
                continue
            out.write(f"{shot['id']}\t{shot['status']}\t{shot['model']}\t{shot.get('parent') or '-'}\t{shot['prompt'][:60]}\n")
        return 0
    if args.cmd == "lineage":
        out.write(" <- ".join(lineage(shots, args.id)) + "\n")
        return 0
    if args.cmd == "export-approved":
        exported = export_approved(args.ledger, args.out_dir)
        out.write(f"{len(exported)} approved shots exported\n")
        return 0
    result = check(args.reference, args.candidate, _box(args.ref_box), _box(args.cand_box))
    if args.id:
        if args.id not in shots:
            raise SystemExit(f"unknown shot {args.id}")
        append_event(args.ledger, {"event": "check", "id": args.id, "at": _now(), "result": result})
    out.write(json.dumps(result, ensure_ascii=False) + "\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
