import Prescription from "../models/prescription.model.js";
import dotenv  from "dotenv";
dotenv.config();

export const sayHello = (req, res) => {
  res.status(200).json({ message: "Hello from the API!" });
};

export const createPrescription = async (req, res) => {
  try {
    const { patientName, doctorName, diagnosis, medicines } = req.body;

    const newPrescription = new Prescription({
      patientName,
      doctorName,
      diagnosis,
      medicines,
    });

    await newPrescription.save();
    res.status(201).json({ message: "Prescription created", prescription: newPrescription });
  } catch (error) {
    console.error("Error creating prescription:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
