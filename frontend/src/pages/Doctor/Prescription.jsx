
// File: src/components/PrescriptionForm.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { User, Stethoscope, Clipboard, FileText, TestTube, Calendar, Briefcase } from 'lucide-react';
import { createPrescription2 } from '../../api/prescription';

export default function PrescriptionForm() {
  const [form, setForm] = useState({
    patientName: '',
    doctorName: '',
    diagnosis: '',
    referral: '',
    medication: '',
    labTests: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createPrescription2(form);
      toast.success('Prescription submitted successfully');
      setForm({ patientName: '', doctorName: '', diagnosis: '', referral: '', medication: '', labTests: '', notes: '' });
    } catch (err) {
      toast.error('Error submitting prescription');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Prescription Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2">
          <User />
          <input
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            required
            placeholder="Patient Name"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Stethoscope />
          <input
            name="doctorName"
            value={form.doctorName}
            onChange={handleChange}
            required
            placeholder="Doctor Name"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Clipboard />
          <input
            name="diagnosis"
            value={form.diagnosis}
            onChange={handleChange}
            required
            placeholder="Diagnosis"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Briefcase />
          <input
            name="referral"
            value={form.referral}
            onChange={handleChange}
            placeholder="Referral"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FileText />
          <textarea
            name="medication"
            value={form.medication}
            onChange={handleChange}
            required
            placeholder="Medication Details"
            className="w-full p-2 border rounded h-20"
          />
        </div>
        <div className="flex items-center space-x-2">
          <TestTube />
          <textarea
            name="labTests"
            value={form.labTests}
            onChange={handleChange}
            placeholder="Lab Tests Prescribed"
            className="w-full p-2 border rounded h-20"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Calendar />
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Additional Notes"
            className="w-full p-2 border rounded h-16"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {submitting ? 'Submitting...' : 'Submit Prescription'}
        </button>
      </form>
    </div>
  );
}













// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// export default function PrescriptionForm() {
//   const [form, setForm] = useState({ patientId: '', medication: '', dosage: '', notes: '' });
//   const [submitting, setSubmitting] = useState(false);

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       await axios.post('/api/prescriptions', form);
//       toast.success('Prescription created successfully');
//       setForm({ patientId: '', medication: '', dosage: '', notes: '' });
//     } catch {
//       toast.error('Failed to create prescription');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
//       <h2 className="text-xl font-semibold mb-4">New Prescription</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input name="patientId" value={form.patientId} onChange={handleChange} required placeholder="Patient ID" className="w-full p-2 border rounded" />
//         <input name="medication" value={form.medication} onChange={handleChange} required placeholder="Medication" className="w-full p-2 border rounded" />
//         <input name="dosage" value={form.dosage} onChange={handleChange} required placeholder="Dosage" className="w-full p-2 border rounded" />
//         <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="w-full p-2 border rounded" />
//         <button type="submit" disabled={submitting} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
//           {submitting ? 'Submitting...' : 'Submit'}
//         </button>
//       </form>
//     </div>
//   );
// }