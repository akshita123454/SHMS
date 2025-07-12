import React, { useState } from 'react';
import { registerTriageCase } from '../../api/emergency/triage';
import { useNavigate } from 'react-router-dom';

export default function Triage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    insuranceProvider: '',
    severity: '',
    notes: '',
    ambulanceNeeded: 'no', // default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerTriageCase(formData);
      alert("Triage case registered!");
      if (formData.ambulanceNeeded === 'yes') {
        setSection('ambulance');
      }
    } catch (error) {
      alert("Error registering case");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Triage Registration</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="patientName" onChange={handleChange} className="p-2 border rounded" placeholder="Patient Name" required />
        <input name="age" type="number" onChange={handleChange} className="p-2 border rounded" placeholder="Age" required />
        <select name="gender" onChange={handleChange} className="p-2 border rounded" required>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input name="phone" onChange={handleChange} className="p-2 border rounded" placeholder="Phone Number" required />
        <input name="address" onChange={handleChange} className="p-2 border rounded col-span-2" placeholder="Address" required />
        <input name="insuranceProvider" onChange={handleChange} className="p-2 border rounded" placeholder="Insurance Provider" />
        <select name="severity" onChange={handleChange} className="p-2 border rounded" required>
          <option value="">Select Severity</option>
          <option value="critical">Critical</option>
          <option value="severe">Severe</option>
          <option value="mild">Mild</option>
        </select>
        <textarea name="notes" onChange={handleChange} className="p-2 border rounded col-span-2" placeholder="Notes" rows="3" />

        {/* ✅ Ambulance Option */}
        <div className="col-span-2">
          <label className="block font-medium mb-1">Need Ambulance Service?</label>
          <select name="ambulanceNeeded" value={formData.ambulanceNeeded} onChange={handleChange} className="border p-2 rounded w-full md:w-1/2">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <div className="col-span-2 text-right">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Register Case
          </button>
        </div>
      </form>
    </div>
  );
}
