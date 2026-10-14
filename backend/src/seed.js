import { readdir } from 'node:fs/promises';

const modulesDir = new URL('./modules/', import.meta.url);

export async function seedAll() {
  let count = 0;
  let modules = [];
  try { modules = await readdir(modulesDir); } catch { return 0; }
  for (const name of modules) {
    const files = await readdir(new URL(`${name}/`, modulesDir));
    for (const file of files.filter((f) => f.endsWith('.seed.js'))) {
      const mod = await import(new URL(`${name}/${file}`, modulesDir));
      for (const fn of Object.values(mod)) if (typeof fn === 'function') count += fn();
    }
  }
  return count;
}
