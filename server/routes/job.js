import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { listJobs, getJob, createJob, updateJob, removeJob } from '../controllers/job.js';


const router = Router();
router.get('/', listJobs);
router.get('/:id', getJob);
router.post('/', protect, authorize('employer', 'admin'), createJob);
router.put('/:id', protect, authorize('employer', 'admin'), updateJob);
router.delete('/:id', protect, authorize('employer', 'admin'), removeJob);
export default router;