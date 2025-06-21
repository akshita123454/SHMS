import express from 'express';
import { register, login } from '../controller/auth.controller.js';
import { protect, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);

// Example protected route
router.get('/admin-only', protect, authorizeRoles('admin'), (req, res) => {
  res.send('Welcome, Admin!');
});

export default router;
