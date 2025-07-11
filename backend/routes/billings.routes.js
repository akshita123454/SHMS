import express from 'express';
import {
  addBillingEntry,
  getAllBillingEntries,
} from '../controller/billings.controller.js';

const router = express.Router();

router.get('/', getAllBillingEntries);
router.post('/', addBillingEntry);

export default router;
