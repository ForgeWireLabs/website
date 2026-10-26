import { rm } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const allowedTargets = new Map([
  ["production", "_site"],
  ["preview", "_preview"],
]);
const targetName = allowedTargets.get(process.argv[2]);

if (!targetName) {
  console.error("Choose exactly one output target: production or preview.");
  process.exit(1);
}

const projectRoot = path.resolve(process.cwd());
const outputPath = path.resolve(projectRoot, targetName);
if (path.dirname(outputPath) !== projectRoot || path.basename(outputPath) !== targetName) {
  console.error(`Refusing to remove an unexpected path: ${outputPath}`);
  process.exit(1);
}

await rm(outputPath, { recursive: true, force: true });
