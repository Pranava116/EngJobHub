import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { applyForJob, getMyApplications, getJobApplications, updateApplicationStatus } from '../controllers/applicationController.js';

const router = Router();

router.post('/apply', authenticate, authorize('student'), applyForJob);

router.get('/my-applications', authenticate, authorize('student'), getMyApplications);

router.get('/job/:jobId', authenticate, authorize('hr'), getJobApplications);

router.patch('/:applicationId/status', authenticate, authorize('hr'), updateApplicationStatus);

export default router;