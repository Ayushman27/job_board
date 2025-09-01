import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { applyToJob, listApplicantsForJob, myApplications } from '../controllers/application.js';
import { upload } from '../middleware/upload.js';


const router = Router();
router.post('/:jobId', protect, authorize('candidate'), upload.single('resume'), applyToJob);
router.get('/mine', protect, authorize('candidate'), myApplications);
router.get('/:jobId/applicants', protect, authorize('employer', 'admin'), listApplicantsForJob);
export default router;