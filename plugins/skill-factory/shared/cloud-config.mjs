import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';

export function adcPath(authFrom) {
  return resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS && !authFrom
    ? process.env.GOOGLE_APPLICATION_CREDENTIALS
    : join(authFrom ?? process.env.CLOUDSDK_CONFIG ?? join(homedir(), '.config', 'gcloud'), 'application_default_credentials.json'));
}

export function vertexConfig(opts = {}) {
  const configured = (key) => {
    try {
      const value = execFileSync('gcloud', ['config', 'get-value', key], {
        encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 5000,
        env: { ...process.env, CLOUDSDK_CORE_DISABLE_FILE_LOGGING: 'true' },
      }).trim();
      return value && value !== '(unset)' ? value : undefined;
    } catch { return undefined; }
  };
  const project = opts.project || process.env.GOOGLE_CLOUD_PROJECT || configured('core/project');
  const location = opts.location || process.env.GOOGLE_CLOUD_LOCATION || configured('ai/region');
  if (!project) throw new Error('Vertex project missing: use --project, GOOGLE_CLOUD_PROJECT, or gcloud core/project');
  if (!location) throw new Error('Vertex location missing: use --location, GOOGLE_CLOUD_LOCATION, or gcloud ai/region');
  if (!/^[\w-]+$/.test(project) || !/^[\w-]+$/.test(location)) throw new Error('invalid Vertex project/location');
  return { project, location };
}
