import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import subtitles as st  # noqa: E402

# The builder is language-neutral: a space-separated word stands for an eojeol.
PAIRS = [
    {"display": "Open daily from", "spoken": "Open daily from"},
    {"display": "7am", "spoken": "seven a m"},
    {"display": "to 10:30pm.", "spoken": "to ten thirty p m."},
]


def char_timings(text, start=0.0, step=0.1, pause_after=None):
    items, t = [], start
    for i, ch in enumerate(st.normalise(text)):
        items.append({"text": ch, "start": round(t, 3), "end": round(t + step, 3)})
        t += step
        if pause_after is not None and i == pause_after:
            t += 1.0
    return {"unit": "char", "items": items}


def word_timings(words, step=0.5):
    return {"unit": "word", "items": [{"text": w, "start": i * step, "end": (i + 1) * step} for i, w in enumerate(words)]}


def spoken_of(pairs):
    return " ".join(p["spoken"] for p in pairs)


class AlignTest(unittest.TestCase):
    def test_character_timings_map_one_to_one(self):
        spoken = spoken_of(PAIRS)
        times = st.align(spoken, st.char_times(char_timings(spoken)))
        self.assertEqual(len(times), len(st.normalise(spoken)))
        self.assertAlmostEqual(times[0][0], 0.0)

    def test_word_timings_are_spread_over_their_characters(self):
        timed = st.char_times(word_timings(["ab", "c"]))
        self.assertEqual([c for c, _, _ in timed], ["a", "b", "c"])
        self.assertAlmostEqual(timed[1][1], 0.25)

    def test_asr_misheard_characters_are_interpolated_not_dropped(self):
        spoken = "seven a m we open"
        heard = word_timings(["seven", "am", "we", "opn"])
        times = st.align(spoken, st.char_times(heard))
        self.assertEqual(len(times), len(st.normalise(spoken)))
        self.assertTrue(all(b >= a for a, b in times))

    def test_no_match_at_all_is_refused(self):
        with self.assertRaises(SystemExit):
            st.align("abc", st.char_times(word_timings(["xyz"])))


class UnitTest(unittest.TestCase):
    def setUp(self):
        spoken = spoken_of(PAIRS)
        self.units = st.units(PAIRS, st.align(spoken, st.char_times(char_timings(spoken))))

    def test_display_text_is_shown_where_spoken_text_differs(self):
        texts = [u["text"] for u in self.units]
        self.assertIn("7am", texts)
        self.assertNotIn("seven", " ".join(texts))

    def test_identical_pairs_split_into_words(self):
        self.assertEqual([u["text"] for u in self.units[:3]], ["Open", "daily", "from"])

    def test_times_follow_the_spoken_length(self):
        seven = next(u for u in self.units if u["text"] == "7am")
        self.assertAlmostEqual(seven["end"] - seven["start"], 0.7, places=3)

    def test_mismatched_pairs_and_timings_are_refused(self):
        with self.assertRaises(SystemExit):
            st.units(PAIRS + [{"display": "extra", "spoken": "extra"}], [(0.0, 0.1)] * 5)


class LayoutTest(unittest.TestCase):
    WORDS = "alpha bravo charlie delta echo foxtrot golf hotel".split()

    def test_lines_break_only_between_units(self):
        text_units = [{"text": w, "start": i, "end": i + 0.5} for i, w in enumerate(self.WORDS)]
        cues = st.layout(text_units, max_chars=13, max_lines=2, max_gap=5, min_duration=0)
        for cue in cues:
            for line in cue["lines"]:
                self.assertTrue(all(w in self.WORDS for w in line.split()))
                self.assertLessEqual(len(line), 13)
            self.assertLessEqual(len(cue["lines"]), 2)

    def test_sentence_end_closes_a_cue(self):
        pairs = PAIRS + [{"display": "Thank you.", "spoken": "Thank you."}]
        cues = st.build(pairs, char_timings(spoken_of(pairs)))
        self.assertEqual(cues[-1]["lines"], ["Thank you."])

    def test_a_long_pause_starts_a_new_cue(self):
        pause_at = len(st.normalise("Open daily from")) - 1
        cues = st.build(PAIRS, char_timings(spoken_of(PAIRS), pause_after=pause_at))
        self.assertEqual(cues[0]["lines"], ["Open daily from"])

    def test_short_cues_are_extended_without_overlapping_the_next(self):
        text_units = [{"text": "Yes.", "start": 0.0, "end": 0.2}, {"text": "Sure.", "start": 0.5, "end": 1.5}]
        cues = st.layout(text_units, 18, 2, 5, min_duration=0.8)
        self.assertEqual(cues[0]["end"], 0.5)


class OutputTest(unittest.TestCase):
    def test_srt_vtt_and_frames(self):
        cues = [{"lines": ["Open daily from", "7am"], "start": 1.2345, "end": 3.5}]
        self.assertIn("00:00:01,234 --> 00:00:03,500", st.to_srt(cues))
        self.assertTrue(st.to_vtt(cues).startswith("WEBVTT\n\n00:00:01.234"))
        cue = st.to_cue_json(cues, fps=30)[0]
        self.assertEqual((cue["startFrame"], cue["endFrame"]), (37, 105))


if __name__ == "__main__":
    unittest.main()
