// src/pages/PrescriptionForm.jsx
import React, { useState } from "react";
import { createPrescription } from "../api/prescription";

const Doctor = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    diagnosis: "",
    medicines: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = {
        ...formData,
        medicines: formData.medicines.split(",").map(med => med.trim())
      };

      const result = await createPrescription(dataToSend);
      setMessage("Prescription submitted successfully!");
      setFormData({ patientName: "", doctorName: "", diagnosis: "", medicines: "" });
      console.log(result);
    } catch (error) {
      setMessage("Failed to submit prescription.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Create Prescription</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          value={formData.patientName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="doctorName"
          placeholder="Doctor Name"
          value={formData.doctorName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="diagnosis"
          placeholder="Diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="medicines"
          placeholder="Medicines (comma separated)"
          value={formData.medicines}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
};

export default Doctor;
