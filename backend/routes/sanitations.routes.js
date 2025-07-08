import express from 'express';
import { getAllSanitations, createSanitation } from '../controllers/sanitations.controller.js';
const router = express.Router();

router.get('/', getAllSanitations);
router.post('/', createSanitation);

export default router;
