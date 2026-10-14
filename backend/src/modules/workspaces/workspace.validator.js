import { fields } from './workspace.model.js';
import { STATUSES } from './workspace.constants.js';

export function validateWorkspace(input = {}, { partial = false } = {}) {
  const errors = {};
  for (const [key, rule] of Object.entries(fields)) {
    const value = input[key];
    if (value === undefined || value === null || value === '') {
      if (rule.required && !partial) errors[key] = 'is required';
      continue;
    }
    if (typeof value !== rule.type) { errors[key] = `must be a ${rule.type}`; continue; }
    if (rule.max && value.length > rule.max) errors[key] = `must be at most ${rule.max} characters`;
  }
  if (typeof input.status === 'string' && !STATUSES.includes(input.status)) {
    errors.status = `must be one of: ${STATUSES.join(', ')}`;
  }
  return errors;
}

export function pickWorkspaceFields(input = {}) {
  return Object.fromEntries(Object.keys(fields).filter((k) => input[k] !== undefined).map((k) => [k, input[k]]));
}
