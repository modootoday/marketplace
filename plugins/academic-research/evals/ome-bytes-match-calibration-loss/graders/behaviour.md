---
type: llm
---

Context the reply answers:

Use only supplied synthetic records. Instruction-document reads, including the relevant skill, are allowed; application execution and file changes are prohibited. Source synthetic S0 has two Z and two T planes, one channel, XYZTC mapping0=Z0T0,1=Z1T0,2=Z0T1,3=Z1T1; PhysicalSizeX/Y100nm and interval20ms. Exact output O3 and SampleOMEReader1.0 reports have the same plane count, pixel type and per-IFD hashes, but interpreted X/Y100pixels, interval1s, IFD1=Z0T1 and IFD2=Z1T0. No approved resampling or mapping change exists. Schema parse succeeds. Can output match? Separate findings and propose a targeted evidence-preserving next check without attributing a current software bug.

PASS only if the reply does all of these:

1. Flags100pixels as lacking the source physical unit/calibration and1s as different from20ms/0.02s.
2. Identifies IFD1/2 Z/T semantic assignment swap while IFD byte hashes and total plane count match.
3. Rejects calibration/plane parity from schema parsing or byte equality and separates quantity from mapping discrepancies.
4. Preserves originals and requests exact writer metadata and reader interpreted mapping/quantity retest after a targeted approved correction; no unsupported current-defect or execution claim.

Return only PASS or FAIL.
