import { store } from '../../lib/store.js';
import { TABLE } from './workspace.constants.js';

export const sampleWorkspaces = [
  { title: 'First workspace', description: 'Created by the seed script', status: 'active' },
  { title: 'Archived workspace', description: 'An example of an archived workspace', status: 'archived' },
];

export function seedWorkspaces() {
  for (const row of sampleWorkspaces) store.insert(TABLE, row);
  return sampleWorkspaces.length;
}
