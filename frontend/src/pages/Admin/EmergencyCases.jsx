// src/pages/admin/EmergencyCases.jsx
import React, { useEffect, useState } from "react";
import {
  fetchEmergencies,
  addEmergency,
  updateEmergency,
  deleteEmergency,
} from "../../api/admin/emergency.api.js";

const EmergencyCases = () => {
  const [emergencies, setEmergencies] = useState([]);
  const [formData, setFormData] = useState({
    type: "",
    patientName: "",
    location: "",
    time: "",
    status: "Critical", // default changed to match backend
  });
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const loadEmergencies = async () => {
    try {
      const { data } = await fetchEmergencies();
      setEmergencies(data);
    } catch (err) {
      showToast("Failed to load emergencies");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        time:
          formData.time ||
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
      };
      if (editingId) {
        await updateEmergency(editingId, dataToSend);
        showToast("Emergency updated");
      } else {
        await addEmergency(dataToSend);
        showToast("Emergency added");
      }
      setFormData({
        type: "",
        patientName: "",
        location: "",
        time: "",
        status: "Critical", // reset default
      });
      setEditingId(null);
      loadEmergencies();
    } catch (err) {
      showToast("Error saving emergency");
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmergency(id);
      showToast("Emergency deleted");
      loadEmergencies();
    } catch (err) {
      showToast("Failed to delete emergency");
    }
  };

  useEffect(() => {
    loadEmergencies();
  }, []);

  return (
    <section id="emergency" className="section">
      <h2 className="text-xl font-semibold mb-4">Emergency Case Management</h2>

      {toast && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
          {toast}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <div className="grid grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="input"
            required
          />
          <input
            type="text"
            placeholder="Patient Name"
            value={formData.patientName}
            onChange={(e) =>
              setFormData({ ...formData, patientName: e.target.value })
            }
            className="input"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="input"
            required
          />
          <input
            type="text"
            placeholder="Time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="input"
          />
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="input"
          >
            <option value="Mild">Mild</option>
            <option value="Severe">Severe</option>
            <option value="Critical">Critical</option>
            <option value="Resolved">Resolved</option>
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
          {editingId ? "Update Emergency" : "Add Emergency"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setFormData({
                type: "",
                patientName: "",
                location: "",
                time: "",
                status: "Critical",
              });
            }}
            className="ml-4 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="module-card">
        <div className="table-container">
          <table className="w-full">
            <thead>
              <tr>
                <th>Type</th>
                <th>Patient</th>
                <th>Location</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {emergencies.map((item) => (
                <tr key={item._id}>
                  <td>{item.type}</td>
                  <td>{item.patientName}</td>
                  <td>{item.location}</td>
                  <td>{item.time}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        item.status === "Critical"
                          ? "status-critical"
                          : item.status === "Severe"
                          ? "status-warning"
                          : item.status === "Mild"
                          ? "status-active"
                          : "status-pending"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 ml-3"
                      onClick={() => handleDelete(item._id)}
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

export default EmergencyCases;
