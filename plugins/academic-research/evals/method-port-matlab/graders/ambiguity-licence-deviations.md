---
type: llm
---

Context the reply answers: a user wants a Python port of a published scoring method for an MIT-licensed pipeline. The method text is "scores are z-normalized per cohort, then smoothed with a Gaussian kernel (sigma = 2) and thresholded at the 95th percentile". The authors' repo has one MATLAB script and a LICENSE file saying GPL-3.0. Table 2 lists 0.83 for sample A. The port is to MATLAB-to-Python.

PASS only if the reply does all of these:
1. Names at least three genuine ambiguities or default differences in the method or the MATLAB-to-Python port, such as per-cohort versus global z-scoring, sample versus population standard deviation (MATLAB and NumPy defaults differ), kernel truncation or edge handling in the smoothing, and how the 95th percentile is interpolated (MATLAB and NumPy defaults differ).
2. Provides a deviation table or list (item, paper or MATLAB behaviour, the port's choice, effect) rather than prose assurances.
3. Notes the repo's GPL-3.0 licence and that it may be incompatible with the MIT-licensed pipeline if code is copied or translated from the MATLAB script, and records or asks for the repo version or commit.
