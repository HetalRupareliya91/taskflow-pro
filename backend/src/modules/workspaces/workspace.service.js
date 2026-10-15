import { store } from '../../lib/store.js';
import { notFound, badRequest } from '../../lib/http.js';
import { TABLE, DEFAULT_STATUS } from './workspace.constants.js';
import { validateWorkspace, pickWorkspaceFields } from './workspace.validator.js';

export function listWorkspaces({ status, q } = {}) {
  let rows = store.all(TABLE);
  if (status) rows = rows.filter((r) => r.status === status);
  if (q) {
    const needle = String(q).toLowerCase();
    rows = rows.filter((r) => `${r.title} ${r.description ?? ''}`.toLowerCase().includes(needle));
  }
  return rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getWorkspace(id) {
  const row = store.get(TABLE, id);
  if (!row) throw notFound('Workspace');
  return row;
}

export function createWorkspace(input) {
  const errors = validateWorkspace(input);
  if (Object.keys(errors).length) throw badRequest(errors);
  return store.insert(TABLE, { status: DEFAULT_STATUS, ...pickWorkspaceFields(input) });
}

export function updateWorkspace(id, input) {
  getWorkspace(id);
  const errors = validateWorkspace(input, { partial: true });
  if (Object.keys(errors).length) throw badRequest(errors);
  return store.update(TABLE, id, pickWorkspaceFields(input));
}

export function removeWorkspace(id) {
  getWorkspace(id);
  store.remove(TABLE, id);
}
