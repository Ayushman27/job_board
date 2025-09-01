import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { listMessages } from '../controllers/message.js';


const router = Router();
router.get('/', protect, listMessages);
export default router;