import express from 'express';
import { createPrescription, getAllPrescriptions,  } from "../controller/doctor.controller.js";

const router = express.Router();

router.post('/prescriptions',createPrescription);
router.get('/prescriptions',getAllPrescriptions);

export default router;













// router.get('/',sayHello);
// router.post('/',createPrescription);
// import { createPrescription, sayHello } from '../controller/doctor.controller.js';