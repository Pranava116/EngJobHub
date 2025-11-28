import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { getAiFilteredJobs, getIndeedJobs } from '../controllers/externalJobController.js';
import multerUpload from '../middleware/multerupload.js';

const router = Router();

const resumeUpload = (req, res, next) => {
  multerUpload.single('resume')(req, res, (err) => {
    if (err) {
      const isSizeError = err?.message?.toLowerCase().includes('file too large');
      const status = isSizeError ? 413 : 400;
      return res.status(status).json({
        message: err.message || 'Failed to process resume upload',
      });
    }
    next();
  });
};

router.get('/indeed', authenticate, getIndeedJobs);
router.post('/ai-filter', authenticate, resumeUpload, getAiFilteredJobs);

export default router;


