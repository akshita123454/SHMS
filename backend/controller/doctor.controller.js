import Prescription_Schema from "../models/prescription.model.js"
import dotenv  from "dotenv";
dotenv.config();


export const createPrescription = async (req, res) => {
  try {
    const newPres = await Prescription_Schema.create(req.body);
    res.status(201).json(newPres);
  } catch (err) {
    console.error('Create Prescription Error:', err);
    res.status(500).json({ error: 'Failed to create prescription' });
  }
};

export const getAllPrescriptions = async (req, res) => {
  try {
    const list = await Prescription_Schema.find().sort({ createdAt: -1 });
    res.status(200).json(list);
  } catch (err) {
    console.error('Get Prescriptions Error:', err);
    res.status(500).json({ error: 'Failed to load prescriptions' });
  }
};












// import Prescription from "../models/prescription.model.js";
// export const sayHello = (req, res) => {
//   res.status(200).json({ message: "Hello from the API!" });
// };

// export const createPrescription = async (req, res) => {
//   try {
//     const { patientName, doctorName, diagnosis, medicines } = req.body;

//     const newPrescription = new Prescription({
//       patientName,
//       doctorName,
//       diagnosis,
//       medicines,
//     });

//     await newPrescription.save();
//     res.status(201).json({ message: "Prescription created", prescription: newPrescription });
//   } catch (error) {
//     console.error("Error creating prescription:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };



// main code from here .