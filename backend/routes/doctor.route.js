import express from 'express';
import { createPrescription, sayHello } from "../controller/doctor.controller.js";

// import { createPrescription, sayHello } from '../controller/doctor.controller.js';

const router = express.Router();



router.get('/',sayHello);
router.post('/',createPrescription);

export default router;