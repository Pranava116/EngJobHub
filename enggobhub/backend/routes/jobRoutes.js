import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { createJob, deleteJob, myJobs } from '../controllers/jobController.js'; 

const router = Router();

router.get('/my', authenticate, authorize('hr'), myJobs);
router.post('/', authenticate, authorize('hr'), createJob);
router.delete('/:id', authenticate, authorize('hr'), deleteJob);

export default router;
