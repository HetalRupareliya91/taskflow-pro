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
