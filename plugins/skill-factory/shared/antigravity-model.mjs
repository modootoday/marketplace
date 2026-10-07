export function antigravityModel(
  model,
  effort,
  { explicitEffort = false } = {},
) {
  const preset = /^Gemini .+ \((Low|Medium|High|XHigh|Max)\)$/i
    .exec(model)?.[1]
    ?.toLowerCase();
  if (!preset) {
    return { effort, args: ["--effort", effort], fixedPreset: false };
  }
  if (explicitEffort && effort !== preset) {
    throw new Error(
      "The selected Gemini model fixes effort; use a matching effort or select a model without a preset",
    );
  }
  return { effort: preset, args: [], fixedPreset: true };
}
