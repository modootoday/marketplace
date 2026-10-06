import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
// Read only the current isolated HOME's transcript chunks, never operator conversations.
export function antigravityToolEvents(home) {
  const root = join(home, '.gemini', 'antigravity-cli', 'brain');
  const events = [];
  if (!existsSync(root)) return events;
  for (const conversation of readdirSync(root)) {
    const dir = join(root, conversation, '.system_generated', 'logs', 'chunks', 'transcript');
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir).filter(f => f.endsWith('.jsonl')).sort()) {
      for (const line of readFileSync(join(dir,file), 'utf8').split('\n')) {
        let step; try { step = JSON.parse(line); } catch { continue; }
        for (const call of step.tool_calls ?? []) {
          const args = Object.fromEntries(Object.entries(call.args ?? {}).map(([k,v]) => {
            try { return [k,JSON.parse(v)]; } catch { return [k,v]; }
          }));
          events.push({ type:'tool_use', tool_name:call.name, parameters:{...args, file_path:args.AbsolutePath ?? args.file_path ?? args.path}, tool_id:`${conversation}-${step.step_index}-${events.length}` });
        }
      }
    }
  }
  return events;
}
