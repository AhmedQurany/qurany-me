import fs from "node:fs";
import path from "node:path";

// Optional media (videos, logos, licensed fonts) lives in /public. Components
// check at build time so a missing file falls back cleanly instead of 404ing.
export function hasPublic(file: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", file.replace(/^\//, "")));
}

export function findPublic(base: string, exts: string[]): string | null {
  for (const ext of exts) {
    if (hasPublic(`${base}.${ext}`)) return `${base}.${ext}`;
  }
  return null;
}
