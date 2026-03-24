import { Router } from 'express';
import { 
  registerUser, 
  loginUser, 
  googleAuthController as googleAuth, 
  getMe, 
  logoutUser as logout 
} from '../controllers/auth.controller.js';
import { protect as authenticate } from '../middleware/auth.middleware.js';

const router = Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleAuth);

// Protected Routes
router.get('/me', authenticate, getMe);
router.post('/logout', authenticate, logout);

export default router;
