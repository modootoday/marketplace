import { lstatSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Installed plugin definitions must not start MCP servers behind the explicit --mcp selection.
export function stripPluginMcp(root, { hooks = false } = {}) {
  for (const name of readdirSync(root)) {
    const path = join(root, name);
    const st = lstatSync(path);
    if (st.isSymbolicLink()) continue;
    if (st.isDirectory() && (name === 'evals' || (name === 'hooks' && !hooks))) {
      rmSync(path, { recursive: true, force: true });
      continue;
    }
    if (name === '.mcp.json') { rmSync(path); continue; }
    if (st.isDirectory()) { stripPluginMcp(path, { hooks }); continue; }
    if (!['plugin.json', 'gemini-extension.json', 'mcp.json'].includes(name)) continue;
    let json;
    try { json = JSON.parse(readFileSync(path, 'utf8')); }
    catch { throw new Error('installed plugin manifest is not valid JSON'); }
    if (!json || typeof json !== 'object') continue;
    if ('mcpServers' in json || 'mcp_servers' in json || (!hooks && 'hooks' in json)) {
      delete json.mcpServers;
      delete json.mcp_servers;
      if (!hooks) delete json.hooks;
      writeFileSync(path, JSON.stringify(json, null, 2));
    }
  }
}
