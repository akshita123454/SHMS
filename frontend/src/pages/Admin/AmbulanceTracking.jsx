import React, { useEffect, useState } from "react";
import {
  fetchAmbulances,
  addAmbulance,
  updateAmbulance,
  deleteAmbulance,
} from "../../api/admin/ambulance.api.js";

const AmbulanceTracking = () => {
  const [ambulances, setAmbulances] = useState([]);
  const [formData, setFormData] = useState({
    vehicleNo: "",
    driver: "",
    status: "Available",
  });
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const loadAmbulances = async () => {
    try {
      const { data } = await fetchAmbulances();
      setAmbulances(data);
    } catch (err) {
      showToast("Failed to load ambulances");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAmbulance(editingId, formData);
        showToast("Ambulance updated");
      } else {
        await addAmbulance(formData);
        showToast("Ambulance added");
      }
      setFormData({
        vehicleNo: "",
        driver: "",
        status: "Available",
      });
      setEditingId(null);
      loadAmbulances();
    } catch (/** @type {any} */ err) {
      showToast(err?.response?.data?.message || "Error saving ambulance");
    }
  };

  const handleEdit = (amb) => {
    setFormData(amb);
    ({
      vehicleNo: amb.vehicleNo,
      driver: amb.driver,
      status: amb.status,
    });
    setEditingId(amb._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAmbulance(id);
      showToast("Ambulance deleted");
      loadAmbulances();
    } catch (/** @type {any} */ err) {
      showToast("Failed to delete ambulance");
    }
  };

  useEffect(() => {
    loadAmbulances();
  }, []);

  return (
    <section id="ambulance" className="section">
      <h2 className="text-xl font-semibold mb-4">Ambulances</h2>

      {toast && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
          {toast}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <div className="grid grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Vehicle No"
            value={formData.vehicleNo}
            onChange={(e) =>
              setFormData({ ...formData, vehicleNo: e.target.value })
            }
            className="input"
            required
          />
          <input
            type="text"
            placeholder="Driver Name"
            value={formData.driver}
            onChange={(e) =>
              setFormData({ ...formData, driver: e.target.value })
            }
            className="input"
            required
          />
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="input"
          >
            <option>Available</option>
            <option>On Route</option>
            <option>Maintenance</option>
          </select>
        </div>
        <button
          type="submit"
          className={`${
            editingId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 py-2 rounded-lg`}
        >
          {editingId ? "Update Ambulance" : "Add Ambulance"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setFormData({
                vehicleNo: "",
                driver: "",
                status: "Available",
              });
            }}
            className="ml-4 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="module-card">
        <h3 className="text-lg font-semibold mb-4">Ambulance Table</h3>
        <div className="table-container">
          <table className="w-full">
            <thead>
              <tr>
                <th>Vehicle No</th>
                <th>Driver</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ambulances.map((amb) => (
                <tr key={amb._id}>
                  <td>{amb.vehicleNo}</td>
                  <td>{amb.driver}</td>
                  <td>{amb.status}</td>
                  <td>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEdit(amb)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 ml-3"
                      onClick={() => handleDelete(amb._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AmbulanceTracking;
