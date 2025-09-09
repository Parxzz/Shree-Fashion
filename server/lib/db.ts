import fs from "fs";
import path from "path";

const dataDir = path.resolve(process.cwd(), "server", "data");

function ensureDir() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
}

export function readJSON<T>(file: string, fallback: T): T {
  ensureDir();
  const p = path.join(dataDir, file);
  try {
    if (!fs.existsSync(p)) return fallback;
    const raw = fs.readFileSync(p, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON<T>(file: string, data: T) {
  ensureDir();
  const p = path.join(dataDir, file);
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
}
