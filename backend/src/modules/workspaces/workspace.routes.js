import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { register } from '../../routes/registry.js';
import * as controller from './workspace.controller.js';

const router = Router();
router.use(auth);

router.get('/stats/summary', (req, res, next) => controller.stats(req, res, next));
router.get('/', controller.list);
router.get('/:id', controller.getOne);

register('workspaces', router);
export default router;
