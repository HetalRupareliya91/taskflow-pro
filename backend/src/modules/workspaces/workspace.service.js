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
