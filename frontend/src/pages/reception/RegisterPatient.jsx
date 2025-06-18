// src/pages/reception/RegisterPatient.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { registerPatient } from '../../api/reception/register';
import ReceptionLayout from './components/layout/ReceptionLayout';
import { UserPlus } from 'lucide-react';

export default function RegisterPatient() {
  const [form, setForm] = useState({
    fullName: '',
    age: '',
    gender: '',
    contactNumber: '',
    address: '',
    email: '',
    insuranceProvider: ''
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await registerPatient(form);
      toast.success('Patient registered successfully');
      setForm({
        fullName: '',
        age: '',
        gender: '',
        contactNumber: '',
        address: '',
        email: '',
        insuranceProvider: ''
      });
    } catch {
      toast.error('Failed to register patient');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ReceptionLayout>
      <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
        <UserPlus className="w-6 h-6" />
        Register New Patient
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
          className="border p-2 rounded"
          required
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          type="text"
          name="contactNumber"
          value={form.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="border p-2 rounded col-span-2"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="insuranceProvider"
          value={form.insuranceProvider}
          onChange={handleChange}
          placeholder="Insurance Provider"
          className="border p-2 rounded"
        />
      </form>

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={submitting}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {submitting ? 'Registering...' : 'Register'}
      </button>
    </ReceptionLayout>
  );
}
