import { useState } from 'react';
import { toast } from 'react-toastify';
import { User, Stethoscope, Clipboard, FileText, TestTube, Calendar, Briefcase } from 'lucide-react';
import { createPrescription2 } from '../../api/prescription';

export default function PrescriptionForm() {
  const initialMed = { drug: '', directions: '', qty: '', refills: '' };
  const payload={
    // Member info
    patientId: '',
    patientName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    allergies: [],
    // Prescription meds
    medication: [ { ...initialMed } ],
    // Prescriber info
    prescriberName: '',
    prescriberDate: '',
    prescriberPhone: '',
    prescriberReview: ''
  }

  const [form, setForm] = useState(payload);

  const [submitting, setSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleAllergy = e => {
    const { value, checked } = e.target;
    setForm(f => ({
      ...f,
      allergies: checked
        ? [...f.allergies, value]
        : f.allergies.filter(a => a !== value)
    }));
  };

  const handleMedChange = (idx, field, value) => {
    setForm(f => {
      const meds = [ ...f.medication ];
      meds[idx] = { ...meds[idx], [field]: value };
      return { ...f, medication: meds };
    });
  };

  const addMedication = () => {
    setForm(f => ({ ...f, medication: [ ...f.medication, { ...initialMed } ] }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createPrescription(form);
      toast.success('Prescription submitted successfully');
      setForm(payload);
    } catch {
      toast.error('Error submitting prescription');
    } finally {
      setSubmitting(false);
    }
  };

  const allergyOptions = ['Aspirin','Codeine','Penicillin','Peanuts','Sulfa','Other'];

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        PRESCRIPTION FORM
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Member Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block">Patient ID</label>
            <input
              name="patientId"
              value={form.patientId}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="col-span-2">
            <label className="block">Patient Name</label>
            <input
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block">Date of Birth</label>
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
            <label className="block">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block">Phone Number</label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="col-span-2">
            <label className="block mb-1">Allergies</label>
            <div className="flex flex-wrap gap-3">
              {allergyOptions.map(opt => (
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
              placeholder="Drug & Strength"
              value={m.drug}
              onChange={e => handleMedChange(i, 'drug', e.target.value)}
              className="border p-2 rounded"
            />
            <input
              placeholder="Directions"
              value={m.directions}
              onChange={e => handleMedChange(i, 'directions', e.target.value)}
              className="border p-2 rounded"
            />
            <input
              placeholder="Qty"
              value={m.qty}
              onChange={e => handleMedChange(i, 'qty', e.target.value)}
              className="border p-2 rounded"
            />
            <input
              placeholder="Refills"
              value={m.refills}
              onChange={e => handleMedChange(i, 'refills', e.target.value)}
              className="border p-2 rounded"
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

        {/* Prescriber Information */}
        <h3 className="text-xl font-semibold mt-6">Doctor's Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block">Name</label>
            <input
              name="prescriberName"
              value={form.prescriberName}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block">Date</label>
            <input
              name="prescriberDate"
              type="date"
              value={form.prescriberDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block">Phone</label>
            <input
              name="prescriberPhone"
              value={form.prescriberPhone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="col-span-2">
            <label className="block">Review</label>
            <textarea
              name="prescriberSignature"
              value={form.prescriberReview}
              onChange={handleChange}
              className="w-full border p-2 rounded resize-none"
              rows={5}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {submitting ? 'Submitting...' : 'Submit Prescription'}
        </button>
      </form>
    </div>
  );
}







// import { useState } from 'react';
// import { toast } from 'react-toastify';
// import { createPrescription } from '../../api/doctor/prescription';

// import { User, Stethoscope, Clipboard, FileText, TestTube, Calendar, Briefcase } from 'lucide-react';

// export default function PrescriptionForm() {
//   const [form, setForm] = useState({
//     patientName: '',
//     doctorName: '',
//     diagnosis: '',
//     referral: '',
//     medication: '',
//     labTests: '',
//     notes: ''
//   });
//   const [submitting, setSubmitting] = useState(false);

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       await createPrescription(form);
//       toast.success('Prescription submitted successfully');
//       setForm({ patientName: '', doctorName: '', diagnosis: '', referral: '', medication: '', labTests: '', notes: '' });
//     } catch (err) {
//       toast.error('Error submitting prescription');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
//       <h2 className="text-2xl font-semibold mb-6">Prescription Form</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="flex items-center space-x-2">
//           <User />
//           <input
//             name="patientName"
//             value={form.patientName}
//             onChange={handleChange}
//             required
//             placeholder="Patient Name"
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="flex items-center space-x-2">
//           <Stethoscope />
//           <input
//             name="doctorName"
//             value={form.doctorName}
//             onChange={handleChange}
//             required
//             placeholder="Doctor Name"
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="flex items-center space-x-2">
//           <Clipboard />
//           <input
//             name="diagnosis"
//             value={form.diagnosis}
//             onChange={handleChange}
//             required
//             placeholder="Diagnosis"
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="flex items-center space-x-2">
//           <Briefcase />
//           <input
//             name="referral"
//             value={form.referral}
//             onChange={handleChange}
//             placeholder="Referral"
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="flex items-center space-x-2">
//           <FileText />
//           <textarea
//             name="medication"
//             value={form.medication}
//             onChange={handleChange}
//             required
//             placeholder="Medication Details"
//             className="w-full p-2 border rounded h-20"
//           />
//         </div>
//         <div className="flex items-center space-x-2">
//           <TestTube />
//           <textarea
//             name="labTests"
//             value={form.labTests}
//             onChange={handleChange}
//             placeholder="Lab Tests Prescribed"
//             className="w-full p-2 border rounded h-20"
//           />
//         </div>
//         <div className="flex items-center space-x-2">
//           <Calendar />
//           <textarea
//             name="notes"
//             value={form.notes}
//             onChange={handleChange}
//             placeholder="Additional Notes"
//             className="w-full p-2 border rounded h-16"
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={submitting}
//           className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//         >
//           {submitting ? 'Submitting...' : 'Submit Prescription'}
//         </button>
//       </form>
//     </div>
//   );
// }