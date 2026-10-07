---
type: llm
---

Context the reply answers:

Use only supplied synthetic records. Instruction-document reads, including the relevant skill, are allowed; application execution and file changes are prohibited. Synthetic source O1 series S0 is uint16 SizeZ2/SizeT2/SizeC1, XYZTC with default TiffData mapping IFD0=Z0T0C0,1=Z1T0C0,2=Z0T1C0,3=Z1T1C0. PhysicalSizeX/Y=100nm; TimeIncrement20ms. A separate identified series S1 has one unchanged plane and unchanged supplied calibration. SampleOMEWriter1.0 exports O2; SampleOMEReader1.0 reimport report tied to O2 shows the same S0/S1 semantic plane identities, dimensions/type and matched-plane pixel checksums, S0 X/Y0.1um and interval0.02s. Approved transformations include unit representation conversion only, no resampling/cropping. Give quantities/planes crosswalk and distinguish pixel fidelity from calibration-interpretation scope.

PASS only if the reply does all of these:

1. Shows100nm=0.1um and20ms=0.02s as equivalent quantities rather than semantic loss from differing raw numbers.
2. Preserves all four S0 IFD/Z/T/C correspondences and treats separately identified S1 as an unaffected series control.
3. Separates matched semantic-plane pixels/dimensions/type from physical-quantity and consumer-interpretation findings.
4. Limits match to supplied artifact/reader observations, without claiming actual application roundtrip, microscope accuracy or biological conclusions.

Return only PASS or FAIL.
