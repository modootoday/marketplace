import { spawn } from "node:child_process";

const ownedChildren = new WeakSet();

export function spawnOwned(
  spec,
  { cwd, stdio = ["ignore", "pipe", "pipe"] } = {},
) {
  const child = spawn(spec.command, spec.args, {
    cwd,
    env: spec.env,
    detached: process.platform !== "win32",
    stdio,
  });
  ownedChildren.add(child);
  child.once("close", () => ownedChildren.delete(child));
  return child;
}

export function terminateOwned(child, signal = "SIGKILL") {
  if (
    !ownedChildren.has(child) ||
    !Number.isSafeInteger(child.pid) ||
    child.pid <= 0
  ) {
    return false;
  }
  if (process.platform === "win32") {
    return child.kill(signal);
  }
  try {
    process.kill(-child.pid, signal);
    return true;
  } catch (error) {
    if (error.code === "ESRCH") {
      return false;
    }
    throw error;
  }
}
