export function normalizeGrokUsage(usage) {
  const cached = usage?.cache_read_input_tokens ?? 0;
  return {
    input_tokens:
      (usage?.input_tokens ?? 0) +
      cached +
      (usage?.cache_creation_input_tokens ?? 0),
    cached_input_tokens: cached,
    output_tokens: usage?.output_tokens ?? 0,
    reasoning_output_tokens: usage?.reasoning_tokens ?? 0,
  };
}
