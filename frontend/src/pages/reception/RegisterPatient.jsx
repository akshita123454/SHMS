import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { registerPatient } from '../../api/reception/register';
import { UserPlus } from 'lucide-react';

export default function RegisterPatient() {
  const [form, setForm] = useState({
    // Personal
    firstName: '', middleName: '', lastName: '', dob: '', age: '', gender: '', maritalStatus: '', address: '', city: '', state: '', zip: '', nationality: '',
    // Contact
    email: '', phone: '', emergencyName: '', emergencyPhone: '', emergencyRelation: '',
    // Insurance
    insuranceProvider: '', plan: '', policyNumber: '', groupNumber: '', insuredName: '', insuredPhone: '', insuredDOB: '',
    // Lifestyle
    smoker: '', alcoholPerWeek: '', caffeinePerDay: '', recreationalDrugs: '',
    // Medical
    allergies: '', currentMedications: '', bloodGroup: '', conditions: ''
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
        firstName: '', middleName: '', lastName: '', dob: '', age: '', gender: '', maritalStatus: '', address: '', city: '', state: '', zip: '', nationality: '',
        email: '', phone: '', emergencyName: '', emergencyPhone: '', emergencyRelation: '',
        insuranceProvider: '', plan: '', policyNumber: '', groupNumber: '', insuredName: '', insuredPhone: '', insuredDOB: '',
        smoker: '', alcoholPerWeek: '', caffeinePerDay: '', recreationalDrugs: '',
        allergies: '', currentMedications: '', bloodGroup: '', conditions: ''
      });
    } catch {
      toast.error('Failed to register patient');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded shadow space-y-12">
      <h2 className="text-3xl font-bold flex items-center gap-2 text-blue-900">
        <UserPlus className="w-6 h-6" />
        Patient Registration Form
      </h2>

      {/* PERSONAL INFO */}
      <section>
        <h3 className="text-xl font-semibold border-b mb-4 pb-2">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="border p-2 rounded" />
          <input name="middleName" value={form.middleName} onChange={handleChange} placeholder="Middle Name" className="border p-2 rounded" />
          <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="border p-2 rounded" />
          <input name="dob" type="date" value={form.dob} onChange={handleChange} className="border p-2 rounded" />
          <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="Age" className="border p-2 rounded" />
          <select name="gender" value={form.gender} onChange={handleChange} className="border p-2 rounded">
            <option value="">Select Gender</option><option>Male</option><option>Female</option><option>Other</option>
          </select>
          <select name="maritalStatus" value={form.maritalStatus} onChange={handleChange} className="border p-2 rounded">
            <option value="">Marital Status</option><option>Single</option><option>Married</option>
          </select>
          <input name="nationality" value={form.nationality} onChange={handleChange} placeholder="Nationality" className="border p-2 rounded" />
          <input name="bloodGroup" value={form.bloodGroup} onChange={handleChange} placeholder="Blood Group" className="border p-2 rounded" />
          <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border p-2 rounded" />
          <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="border p-2 rounded" />
          <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="border p-2 rounded" />
          <input name="zip" value={form.zip} onChange={handleChange} placeholder="Zip Code" className="border p-2 rounded" />
        </div>
      </section>

      {/* CONTACT INFO */}
      <section>
        <h3 className="text-xl font-semibold border-b mb-4 pb-2">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="border p-2 rounded" />
        </div>
      </section>

      {/* EMERGENCY */}
      <section>
        <h3 className="text-xl font-semibold border-b mb-4 pb-2">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="emergencyName" value={form.emergencyName} onChange={handleChange} placeholder="Name" className="border p-2 rounded" />
          <input name="emergencyPhone" value={form.emergencyPhone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded" />
          <input name="emergencyRelation" value={form.emergencyRelation} onChange={handleChange} placeholder="Relation" className="border p-2 rounded" />
        </div>
      </section>

      {/* INSURANCE */}
      <section>
        <h3 className="text-xl font-semibold border-b mb-4 pb-2">Insurance Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="insuranceProvider" value={form.insuranceProvider} onChange={handleChange} placeholder="Insurance Company" className="border p-2 rounded" />
          <input name="plan" value={form.plan} onChange={handleChange} placeholder="Plan Name" className="border p-2 rounded" />
          <input name="policyNumber" value={form.policyNumber} onChange={handleChange} placeholder="Policy Number" className="border p-2 rounded" />
          <input name="groupNumber" value={form.groupNumber} onChange={handleChange} placeholder="Group Number" className="border p-2 rounded" />
          <input name="insuredName" value={form.insuredName} onChange={handleChange} placeholder="Insured Person's Name" className="border p-2 rounded" />
          <input name="insuredDOB" value={form.insuredDOB} onChange={handleChange} placeholder="Insured DOB" type="date" className="border p-2 rounded" />
          <input name="insuredPhone" value={form.insuredPhone} onChange={handleChange} placeholder="Insured Phone" className="border p-2 rounded" />
        </div>
      </section>

      {/* LIFESTYLE */}
      <section>
        <h3 className="text-xl font-semibold border-b mb-4 pb-2">Lifestyle Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select name="smoker" value={form.smoker} onChange={handleChange} className="border p-2 rounded">
            <option value="">Do you smoke?</option><option>Yes</option><option>No</option>
          </select>
          <input name="alcoholPerWeek" value={form.alcoholPerWeek} onChange={handleChange} placeholder="Alcohol (drinks/week)" className="border p-2 rounded" />
          <input name="caffeinePerDay" value={form.caffeinePerDay} onChange={handleChange} placeholder="Caffeine (cups/day)" className="border p-2 rounded" />
          <input name="recreationalDrugs" value={form.recreationalDrugs} onChange={handleChange} placeholder="Recreational Drugs?" className="border p-2 rounded" />
        </div>
      </section>

      {/* MEDICAL INFO */}
      <section>
        <h3 className="text-xl font-semibold border-b mb-4 pb-2">Medical History</h3>
        <div className="grid grid-cols-1 gap-4">
          <textarea name="currentMedications" value={form.currentMedications} onChange={handleChange} placeholder="Current Medications" className="border p-2 rounded" />
          <textarea name="allergies" value={form.allergies} onChange={handleChange} placeholder="Known Allergies" className="border p-2 rounded" />
          <textarea name="conditions" value={form.conditions} onChange={handleChange} placeholder="Past Conditions / Surgeries" className="border p-2 rounded" />
        </div>
      </section>

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full md:w-1/3 mx-auto block mt-6 px-6 py-3 bg-blue-700 text-white rounded hover:bg-blue-800"
      >
        {submitting ? 'Registering...' : 'Register'}
      </button>
    </div>
  );
}
