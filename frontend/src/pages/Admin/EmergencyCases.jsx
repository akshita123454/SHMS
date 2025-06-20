// src/pages/Admin/components/EmergencyCases.jsx
import React from "react";

const EmergencyCases = () => {
  const handleNewEmergency = () => {
    alert("New Emergency clicked!");
  };

  return (
    <section id="emergency" className="section">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Emergency Cases</h2>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          onClick={handleNewEmergency}
        >
          New Emergency
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="module-card bg-red-50 border-red-200">
          <h3 className="text-lg font-semibold mb-4 text-red-800">
            Active Emergencies
          </h3>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg border border-red-100">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Cardiac Emergency</span>
                <span className="status-badge status-critical">Critical</span>
              </div>
              <p className="text-sm text-gray-600">Patient: John Doe</p>
              <p className="text-sm text-gray-600">
                Location: Emergency Room 3
              </p>
              <p className="text-sm text-gray-600">Time: 10:30 AM</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-red-100">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Trauma Response</span>
                <span className="status-badge status-critical">Critical</span>
              </div>
              <p className="text-sm text-gray-600">Patient: Jane Smith</p>
              <p className="text-sm text-gray-600">Location: ICU Wing</p>
              <p className="text-sm text-gray-600">Time: 10:15 AM</p>
            </div>
          </div>
        </div>
        <div className="module-card">
          <h3 className="text-lg font-semibold mb-4">Available Resources</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>Emergency Rooms</span>
              <span className="font-semibold">2/5 Available</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>ICU Beds</span>
              <span className="font-semibold">3/8 Available</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>On-Call Staff</span>
              <span className="font-semibold">4 Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyCases;
