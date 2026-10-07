import { spawn } from "node:child_process";

if (process.argv[2] === "leaf") {
  console.log(JSON.stringify({ descendant: process.pid }));
  setInterval(() => {}, 1000);
} else {
  const child = spawn(process.execPath, [import.meta.filename, "leaf"], {
    stdio: ["ignore", "inherit", "inherit"],
  });
  child.on("error", () => process.exit(1));
  if (process.argv[2] === "exit-parent") {
    child.on("spawn", () => process.exit(0));
  } else {
    setInterval(() => {}, 1000);
  }
}
