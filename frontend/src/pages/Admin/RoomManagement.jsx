// src/pages/Admin/RoomManagement.jsx
import React, { useEffect, useState } from "react";
import {
  fetchRooms,
  addRoom,
  updateRoom,
  deleteRoom,
} from "../../api/admin/room.api.js";

const departments = [
  "ICU",
  "General Ward",
  "Emergency",
  "Surgery",
  "Maternity",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Radiology",
  "Dialysis",
  "ENT",
  "Dermatology",
  "OPD",
  "Isolation",
];

const roomTypes = ["Single", "Shared", "Deluxe", "Suite", "Isolation"];
const conditions = ["Good", "Damaged"];

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    roomNumber: "",
    department: departments[0],
    type: roomTypes[0],
    capacity: 1,
    condition: "Good",
  });
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const loadRooms = async () => {
    try {
      const { data } = await fetchRooms();
      setRooms(data);
    } catch (err) {
      showToast("Failed to load rooms");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateRoom(editingId, formData);
        showToast("Room updated");
      } else {
        await addRoom(formData);
        showToast("Room added");
      }
      setFormData({
        roomNumber: "",
        department: departments[0],
        type: roomTypes[0],
        capacity: 1,
        condition: "Good",
      });
      setEditingId(null);
      loadRooms();
    } catch (/** @type {any} */ err) {
      showToast(err?.response?.data?.message || "Error saving room");
    }
  };

  const handleEdit = (room) => {
    setFormData(room);
    setEditingId(room._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteRoom(id);
      showToast("Room deleted");
      loadRooms();
    } catch (/** @type {any} */ err) {
      showToast("Failed to delete room");
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <section id="rooms" className="section">
      <h2 className="text-xl font-semibold mb-4">Room Management</h2>

      {toast && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
          {toast}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <div className="grid grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Room Number"
            value={formData.roomNumber}
            onChange={(e) =>
              setFormData({ ...formData, roomNumber: e.target.value })
            }
            className="input"
            required
          />
          <select
            value={formData.department}
            onChange={(e) =>
              setFormData({ ...formData, department: e.target.value })
            }
            className="input"
          >
            {departments.map((dept) => (
              <option key={dept}>{dept}</option>
            ))}
          </select>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="input"
          >
            {roomTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={(e) =>
              setFormData({
                ...formData,
                capacity: parseInt(e.target.value),
              })
            }
            className="input"
            required
          />
          <select
            value={formData.condition}
            onChange={(e) =>
              setFormData({ ...formData, condition: e.target.value })
            }
            className="input"
          >
            {conditions.map((c) => (
              <option key={c}>{c}</option>
            ))}
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
          {editingId ? "Update Room" : "Add Room"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setFormData({
                roomNumber: "",
                department: departments[0],
                type: roomTypes[0],
                capacity: 1,
                condition: "Good",
              });
            }}
            className="ml-4 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="module-card">
        <h3 className="text-lg font-semibold mb-4">Room Table</h3>
        <div className="table-container">
          <table className="w-full">
            <thead>
              <tr>
                <th>Room No</th>
                <th>Department</th>
                <th>Type</th>
                <th>Capacity</th>
                <th>Condition</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room.roomNumber}</td>
                  <td>{room.department}</td>
                  <td>{room.type}</td>
                  <td>{room.capacity}</td>
                  <td>{room.condition}</td>
                  <td>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEdit(room)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 ml-3"
                      onClick={() => handleDelete(room._id)}
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

export default RoomManagement;
