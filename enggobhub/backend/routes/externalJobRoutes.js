import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { getIndeedJobs } from '../controllers/externalJobController.js';

const router = Router();

// GET /api/external-jobs/indeed?query=...&location=...&page=1
router.get('/indeed', authenticate, getIndeedJobs);

export default router;


