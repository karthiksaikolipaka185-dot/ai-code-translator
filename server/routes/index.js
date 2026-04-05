import { Router } from 'express';
import authRoutes from './auth.routes.js';
import codeRoutes from './code.routes.js';
import historyRoutes from './history.routes.js';

const router = Router();

// Health Check
router.get('/health', (req, res) => {
  res.json({ success: true, message: 'Server is running', timestamp: new Date() });
});

// Mount all routes
router.use('/auth', authRoutes);
router.use('/code', codeRoutes);
router.use('/history', historyRoutes);

export default router;
