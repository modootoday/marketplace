// Snapshot estimates are deliberately model-specific; unknown models need explicit prices.
export const PRICES = {
  codex: {
    'gpt-5': [{ in: 1.25, out: 10, cached: 0.125 }],
    'gpt-5-codex': [{ in: 1.25, out: 10, cached: 0.125 }],
    'gpt-5-mini': [{ in: 0.25, out: 2, cached: 0.025 }],
  },
  grok: {
    'grok-4': [{ in: 3, out: 15, cached: 0.75 }],
    'grok-4-fast-reasoning': [{ in: 0.2, out: 0.5, cached: 0.05 }],
    'grok-4-fast-non-reasoning': [{ in: 0.2, out: 0.5, cached: 0.05 }],
  },
  gemini: {
    'gemini-3.8-flash': [
      { before: '2027-01-01', in: 0.75, out: 3.75, cached: 0.075 },
      { in: 1.5, out: 7.5, cached: 0.15 },
    ],
    'gemini-3.1-pro-preview': [{ in: 2, out: 12, cached: 0.2, longAbove: 200000, inLong: 4, outLong: 18, cachedLong: 0.4 }],
  },
};

PRICES.antigravity = {
  'gemini-3.8-flash': PRICES.gemini['gemini-3.8-flash'],
  'gemini-3.1-pro': PRICES.gemini['gemini-3.1-pro-preview'],
};

export function priceFor(runtime, model, opts, input = 0) {
  const today = new Date().toISOString().slice(0, 10);
  const priceModel = runtime === 'antigravity' ? (model ?? '').replace(/-(low|medium|high|xhigh|max)$/, '') : model;
  const row = (PRICES[runtime]?.[priceModel] ?? [])
    .find((p) => !p.before || today < p.before);
  const base = row?.longAbove !== undefined && input > row.longAbove
    ? { in: row.inLong, out: row.outLong, cached: row.cachedLong } : row;
  const incoming = opts.priceIn ?? base?.in;
  const outgoing = opts.priceOut ?? base?.out;
  if (incoming === undefined || outgoing === undefined) return null;
  return { in: incoming, out: outgoing, cached: opts.priceCached ?? (opts.priceIn !== undefined ? incoming : base?.cached ?? incoming) };
}

export function costOf(runtime, usage, opts, model) {
  const input = usage.input_tokens ?? 0;
  const p = priceFor(runtime, model, opts, input);
  if (!p) return null;
  const cached = Math.min(input, usage.cached_input_tokens ?? 0);
  return ((input - cached) * p.in + cached * p.cached + (usage.output_tokens ?? 0) * p.out) / 1e6;
}

export function pricesFor(runtime, opts) {
  const subject = priceFor(runtime, opts.model, opts);
  const judge = priceFor(runtime, opts.judgeModel, opts);
  if (!subject || !judge) return null;
  return { source: [opts.priceIn, opts.priceOut, opts.priceCached].some((p) => p !== undefined) ? 'flags plus snapshot table' : 'snapshot table', subject, judge };
}
