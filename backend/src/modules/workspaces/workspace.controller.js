import { asyncHandler } from '../../lib/http.js';
import * as service from './workspace.service.js';

export const list = asyncHandler(async (req, res) => {
  const data = service.listWorkspaces(req.query);
  res.json({ data, total: data.length });
});
