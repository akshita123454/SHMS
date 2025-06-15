 // src/pages/patient/components/AppointmentForm.jsx
import React from "react";

const AppointmentForm = () => {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        📅 Book Appointment
      </h2>
      <form className="space-y-4">
        {/* Doctor select */}
        <div>
          <label className="block text-sm font-medium">Choose Doctor</label>
          <select className="w-full border px-3 py-2 rounded">
            <option>Select Doctor</option>
            <option>Dr. Smith</option>
            <option>Dr. Johnson</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Preferred Date</label>
          <input
            type="date"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="button"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Book
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;


