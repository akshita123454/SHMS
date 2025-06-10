import express from 'express';
import { createPrescription2, getAllPrescriptions,  } from "../controller/doctor.controller.js";

const router = express.Router();

router.post('/prescriptions',createPrescription2);
router.get('/prescriptions',getAllPrescriptions);

export default router;













// router.get('/',sayHello);
// router.post('/',createPrescription);
// import { createPrescription, sayHello } from '../controller/doctor.controller.js';