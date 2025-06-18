// src/pages/Admin/components/AmbulanceTracking.jsx
import React from "react";

const AmbulanceTracking = () => {
  const ambulanceData = [
    {
      id: 1,
      vehicleNo: "AMB-001",
      driver: "John Smith",
      status: "Available",
      location: "Hospital",
      eta: "-",
    },
    {
      id: 2,
      vehicleNo: "AMB-002",
      driver: "Emma Davis",
      status: "On Route",
      location: "Downtown",
      eta: "10 mins",
    },
    {
      id: 3,
      vehicleNo: "AMB-003",
      driver: "Robert Green",
      status: "Available",
      location: "Hospital",
      eta: "-",
    },
    {
      id: 4,
      vehicleNo: "AMB-004",
      driver: "Alice Brown",
      status: "Maintenance",
      location: "Garage",
      eta: "N/A",
    },
  ];

  const handleDispatchAmbulance = () => {
    alert("Dispatch Ambulance clicked!");
  };

  return (
    <section id="ambulance" className="section">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Ambulance Tracking</h2>
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
          onClick={handleDispatchAmbulance}
        >
          Dispatch Ambulance
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="module-card col-span-2">
          <h3 className="text-lg font-semibold mb-4">Active Ambulances</h3>
          <div className="table-container">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Vehicle No.</th>
                  <th>Driver</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th>ETA</th>
                </tr>
              </thead>
              <tbody>
                {ambulanceData.map((ambulance) => (
                  <tr key={ambulance.id}>
                    <td>{ambulance.vehicleNo}</td>
                    <td>{ambulance.driver}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          ambulance.status === "Available"
                            ? "status-active"
                            : ambulance.status === "On Route"
                            ? "status-pending"
                            : "status-critical"
                        }`}
                      >
                        {ambulance.status}
                      </span>
                    </td>
                    <td>{ambulance.location}</td>
                    <td>{ambulance.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="module-card">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">5</div>
              <div className="text-green-800">Available</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">2</div>
              <div className="text-yellow-800">On Route</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">1</div>
              <div className="text-red-800">Maintenance</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmbulanceTracking;
