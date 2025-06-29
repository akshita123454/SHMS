// File: src/components/PrescriptionForm.jsx
import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { createPrescription } from '../../api/doctor/prescription';

export default function PrescriptionForm() {
  const initialMed = { drug: '', directions: '', qty: '', refills: '' };
  const payload = {
    patientId: '',
    patientName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    allergies: [],
    medication: [{ ...initialMed }],
    prescriberName: '',
    prescriberDate: '',
    prescriberPhone: '',
    prescriberReview: '',
  };

  const [form, setForm] = useState(payload);
  const [submitting, setSubmitting] = useState(false);

  // Generic change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Phone-only change
  const handlePhoneChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    setForm((f) => ({ ...f, [e.target.name]: raw }));
  };

  // Allergy checkbox
  const handleAllergy = (e) => {
    const { value, checked } = e.target;
    setForm((f) => ({
      ...f,
      allergies: checked
        ? [...f.allergies, value]
        : f.allergies.filter((a) => a !== value),
    }));
  };

  // Medication row change
  const handleMedChange = (idx, field, rawValue) => {
    // For qty/refills: force digits only
    const val =
      field === 'qty' || field === 'refills'
        ? rawValue.replace(/\D/g, '')
        : rawValue;
    setForm((f) => {
      const meds = [...f.medication];
      meds[idx] = { ...meds[idx], [field]: val };
      return { ...f, medication: meds };
    });
  };

  const addMedication = () => {
    setForm((f) => ({
      ...f,
      medication: [...f.medication, { ...initialMed }],
    }));
  };

  // Check validity of entire form
  const isFormValid = useMemo(() => {
    // required top‐level
    const needed = [
      form.patientId,
      form.patientName,
      form.dateOfBirth,
      form.gender,
      form.prescriberName,
      form.prescriberDate,
    ];
    if (needed.some((v) => !v.trim())) return false;

    // phone must be 10 digits (or empty)
    if (form.phone && form.phone.length !== 10) return false;
    if (form.prescriberPhone && form.prescriberPhone.length !== 10)
      return false;

    // each medication line filled
    for (let med of form.medication) {
      if (
        !med.drug.trim() ||
        !med.directions.trim() ||
        med.qty === '' ||
        med.refills === ''
      ) {
        return false;
      }
    }
    return true;
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitting(true);
    try {
      await createPrescription(form);
      toast.success('Prescription submitted successfully');
      setForm({ ...payload });
    } catch (err) {
      console.error(err);
      toast.error('Error submitting prescription');
    } finally {
      setSubmitting(false);
    }
  };

  const allergyOptions = [
    'Aspirin',
    'Codeine',
    'Penicillin',
    'Peanuts',
    'Sulfa',
    'Other',
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        PRESCRIPTION FORM
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Member Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Patient ID*</label>
            <input
              name="patientId"
              value={form.patientId}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="col-span-2">
            <label className="block font-medium">Patient Name*</label>
            <input
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Date of Birth*</label>
            <input
              name="dateOfBirth"
              type="date"
              value={form.dateOfBirth}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Gender*</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block font-medium">Phone Number</label>
            <input
              name="phone"
              type="tel"
              maxLength={10}
              value={form.phone}
              onChange={handlePhoneChange}
              placeholder="10 digits"
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="col-span-2">
            <label className="block font-medium mb-1">Allergies</label>
            <div className="flex flex-wrap gap-3">
              {allergyOptions.map((opt) => (
                <label key={opt} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    value={opt}
                    checked={form.allergies.includes(opt)}
                    onChange={handleAllergy}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Prescription Information */}
        <h3 className="text-xl font-semibold">Prescription Information</h3>
        {form.medication.map((m, i) => (
          <div key={i} className="grid grid-cols-4 gap-4 mb-2">
            <input
              placeholder="Drug & Strength*"
              value={m.drug}
              onChange={(e) => handleMedChange(i, 'drug', e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              placeholder="Directions*"
              value={m.directions}
              onChange={(e) => handleMedChange(i, 'directions', e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              placeholder="Qty*"
              type="number"
              min={0}
              value={m.qty}
              onChange={(e) => handleMedChange(i, 'qty', e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              placeholder="Refills*"
              type="number"
              min={0}
              value={m.refills}
              onChange={(e) => handleMedChange(i, 'refills', e.target.value)}
              className="border p-2 rounded"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addMedication}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          + Add Line
        </button>

        {/* Doctor's Information */}
        <h3 className="text-xl font-semibold mt-6">Doctor's Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Name*</label>
            <input
              name="prescriberName"
              value={form.prescriberName}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Date*</label>
            <input
              name="prescriberDate"
              type="date"
              value={form.prescriberDate}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Phone</label>
            <input
              name="prescriberPhone"
              type="tel"
              maxLength={10}
              value={form.prescriberPhone}
              onChange={handlePhoneChange}
              placeholder="10 digits"
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="col-span-2">
            <label className="block font-medium">Review</label>
            <textarea
              name="prescriberReview"
              value={form.prescriberReview}
              onChange={handleChange}
              className="w-full border p-2 rounded resize-none"
              rows={4}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || submitting}
          className={`w-full py-2 rounded transition ${
            isFormValid
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          {submitting ? 'Submitting...' : 'Submit Prescription'}
        </button>
      </form>
    </div>
  );
}
