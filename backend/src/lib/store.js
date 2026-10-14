import { randomUUID } from 'node:crypto';

const tables = new Map();

function table(name) {
  if (!tables.has(name)) tables.set(name, new Map());
  return tables.get(name);
}

export const store = {
  all: (name) => [...table(name).values()],
  get: (name, id) => table(name).get(id) ?? null,
  insert(name, data) {
    const now = new Date().toISOString();
    const row = { id: randomUUID(), ...data, createdAt: now, updatedAt: now };
    table(name).set(row.id, row);
    return row;
  },
  update(name, id, data) {
    const row = table(name).get(id);
    if (!row) return null;
    const next = { ...row, ...data, id, updatedAt: new Date().toISOString() };
    table(name).set(id, next);
    return next;
  },
  remove: (name, id) => table(name).delete(id),
  reset: () => tables.clear(),
};
