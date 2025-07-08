import express from 'express';
import { getAllBillings, createBilling } from '../controllers/billings.controller.js';
const router = express.Router();

router.get('/', getAllBillings);
router.post('/', createBilling);

export default router;
