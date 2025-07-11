import express from 'express';
import { register, login, registerPatient, loginPatient } from '../controller/auth.controller.js';
import { protect, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', register);
router.post('/signupPatient',registerPatient);
router.post('/login', login);
router.post('/loginPatient',loginPatient);

// Example protected route
router.get('/admin-only', protect, authorizeRoles('admin'), (req, res) => {
  res.send('Welcome, Admin!');
});

export default router;
