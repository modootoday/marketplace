---
type: llm
---

Context the reply answers: a user wants a Python port of a published scoring method for an MIT-licensed pipeline. The only method text is "scores are z-normalized per cohort, then smoothed with a Gaussian kernel (sigma = 2) and thresholded at the 95th percentile". The authors' repo has one MATLAB script, a LICENSE file saying GPL-3.0, and the sample A input CSV. Table 2 lists a score of 0.83 for sample A. The user asks for the port to be written now.

PASS only if the reply does all of these:
1. Starts with a numbered checklist of the method's steps and parameters (z-normalisation per cohort, Gaussian kernel with sigma 2, 95th percentile threshold) before or alongside any code, rather than going straight to code.
2. Makes reproducing Table 2's sample A = 0.83 on the repo's sample A input a gate: asks to run or reproduce it (against the MATLAB script and/or the port) before the port is adapted into the pipeline or called equivalent.
3. Says the port is unverified until that number is reproduced, and does not claim the code matches the paper.
