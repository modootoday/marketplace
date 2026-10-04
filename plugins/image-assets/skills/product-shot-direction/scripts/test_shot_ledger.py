import json
import os
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import shot_ledger as sl  # noqa: E402

try:
    from PIL import Image, ImageDraw
except ImportError:
    Image = None


def write_png(path, colour, mark=None):
    image = Image.new("RGB", (64, 64), colour)
    if mark:
        ImageDraw.Draw(image).rectangle(mark, fill=(255, 255, 255))
    image.save(path)


@unittest.skipIf(Image is None, "Pillow not installed")
class LedgerTest(unittest.TestCase):
    def setUp(self):
        self.dir = tempfile.mkdtemp()
        self.ledger = os.path.join(self.dir, "shots.jsonl")
        self.a = os.path.join(self.dir, "a.png")
        self.b = os.path.join(self.dir, "b.png")
        write_png(self.a, (200, 30, 30))
        write_png(self.b, (30, 30, 200))

    def test_add_assigns_sequential_ids_and_records_hash(self):
        first = sl.add(self.ledger, self.a, "bottle on marble", "m", "p")
        second = sl.add(self.ledger, self.b, "bottle on wood", "m", "p", parent=first["id"])
        self.assertEqual((first["id"], second["id"]), ("s-0001", "s-0002"))
        self.assertEqual(len(first["sha256"]), 64)

    def test_status_changes_are_appended_not_overwritten(self):
        shot = sl.add(self.ledger, self.a, "p", "m", "p")
        sl.set_status(self.ledger, shot["id"], "rejected", "kim", "label text warped")
        sl.set_status(self.ledger, shot["id"], "approved", "lee", None)
        events = sl.read_events(self.ledger)
        self.assertEqual([e["event"] for e in events], ["add", "status", "status"])
        self.assertEqual(sl.state(events)[shot["id"]]["status"], "approved")

    def test_rejection_requires_a_reason(self):
        shot = sl.add(self.ledger, self.a, "p", "m", "p")
        with self.assertRaises(SystemExit):
            sl.set_status(self.ledger, shot["id"], "rejected", "kim", None)

    def test_approval_refuses_an_image_changed_after_recording(self):
        shot = sl.add(self.ledger, self.a, "p", "m", "p")
        write_png(self.a, (0, 255, 0))
        with self.assertRaises(SystemExit):
            sl.set_status(self.ledger, shot["id"], "approved", "kim", None)

    def test_unknown_parent_is_refused(self):
        with self.assertRaises(SystemExit):
            sl.add(self.ledger, self.a, "p", "m", "p", parent="s-0099")

    def test_lineage_walks_parents(self):
        a = sl.add(self.ledger, self.a, "p", "m", "p")
        b = sl.add(self.ledger, self.b, "p", "m", "p", parent=a["id"])
        c = sl.add(self.ledger, self.a, "p", "m", "p", parent=b["id"])
        shots = sl.state(sl.read_events(self.ledger))
        self.assertEqual(sl.lineage(shots, c["id"]), ["s-0003", "s-0002", "s-0001"])

    def test_export_copies_only_approved_with_manifest(self):
        a = sl.add(self.ledger, self.a, "p", "m", "p", license="commercial use allowed")
        sl.add(self.ledger, self.b, "p", "m", "p")
        sl.set_status(self.ledger, a["id"], "approved", "kim", None)
        out = os.path.join(self.dir, "out")
        exported = sl.export_approved(self.ledger, out)
        self.assertEqual([e["id"] for e in exported], ["s-0001"])
        manifest = json.load(open(os.path.join(out, "manifest.json"), encoding="utf-8"))
        self.assertEqual(manifest[0]["license"], "commercial use allowed")
        self.assertTrue(os.path.exists(os.path.join(out, "s-0001.png")))

    def test_check_scores_identical_images_as_zero_and_different_ones_higher(self):
        same = sl.check(self.a, self.a)
        other = sl.check(self.a, self.b)
        self.assertEqual((same["mean_delta_e"], same["dhash_distance"]), (0.0, 0))
        self.assertGreater(other["mean_delta_e"], 50)

    def test_check_sees_a_changed_label_inside_the_product_box(self):
        plain = os.path.join(self.dir, "plain.png")
        marked = os.path.join(self.dir, "marked.png")
        write_png(plain, (90, 90, 90), mark=(10, 10, 30, 50))
        write_png(marked, (90, 90, 90), mark=(34, 10, 54, 50))
        self.assertGreater(sl.check(plain, marked)["dhash_distance"], 0)

    def test_cli_records_a_check_on_a_shot(self):
        shot = sl.add(self.ledger, self.b, "p", "m", "p")
        sl.main(["--ledger", self.ledger, "check", self.a, self.b, "--id", shot["id"]])
        state = sl.state(sl.read_events(self.ledger))
        self.assertIn("mean_delta_e", state[shot["id"]]["check"])


class DeltaETest(unittest.TestCase):
    def test_white_and_black_differ_by_full_lightness(self):
        self.assertAlmostEqual(sl.delta_e((255, 255, 255), (0, 0, 0)), 100, delta=0.5)


if __name__ == "__main__":
    unittest.main()
