import { asyncHandler } from '../../lib/http.js';
import * as service from './workspace.service.js';

export const list = asyncHandler(async (req, res) => {
  const data = service.listWorkspaces(req.query);
  res.json({ data, total: data.length });
});

export const getOne = asyncHandler(async (req, res) => {
  res.json({ data: service.getWorkspace(req.params.id) });
});

export const create = asyncHandler(async (req, res) => {
  res.status(201).json({ data: service.createWorkspace(req.body) });
});

export const update = asyncHandler(async (req, res) => {
  res.json({ data: service.updateWorkspace(req.params.id, req.body) });
});

export const remove = asyncHandler(async (req, res) => {
  service.removeWorkspace(req.params.id);
  res.status(204).end();
});

export const stats = asyncHandler(async (req, res) => {
  res.json({ data: service.statsWorkspaces() });
});
