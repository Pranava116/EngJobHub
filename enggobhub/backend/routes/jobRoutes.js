import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { createJob, listJobs } from '../controllers/jobController.js';
import { validateJobBody } from '../middleware/jobs.js';

const router = Router();

router.get('/', listJobs);

router.post('/', authenticate, authorize('hr'), validateJobBody, createJob);

export default router;


