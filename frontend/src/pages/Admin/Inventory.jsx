import React, { useEffect, useState } from "react";
import {
  fetchInventory,
  addInventory,
  updateInventory,
  deleteInventory,
} from "../../api/admin/inventory.api.js";

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    quantity: 0,
    unit: "pcs",
    status: "In Stock",
    expiryDate: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const loadInventory = async () => {
    try {
      const { data } = await fetchInventory();
      setInventoryData(data);
    } catch (err) {
      showToast("Failed to load inventory");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateInventory(editingId, formData);
        showToast("Item updated");
      } else {
        await addInventory(formData);
        showToast("Item added");
      }
      setFormData({
        name: "",
        quantity: 0,
        unit: "pcs",
        status: "In Stock",
        expiryDate: "",
      });
      setEditingId(null);
      loadInventory();
    } catch (err) {
      showToast("Error saving item");
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteInventory(id);
      showToast("Item deleted");
      loadInventory();
    } catch (err) {
      showToast("Failed to delete item");
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  return (
    <section id="inventory" className="section">
      <h2 className="text-xl font-semibold mb-4">Inventory Management</h2>

      {toast && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
          {toast}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <div className="grid grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Item Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: parseInt(e.target.value) })
            }
            className="input"
          />
          <input
            type="text"
            placeholder="Unit"
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            className="input"
          />
          <input
            type="date"
            value={formData.expiryDate}
            onChange={(e) =>
              setFormData({ ...formData, expiryDate: e.target.value })
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
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Expired</option>
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
          {editingId ? "Update Item" : "Add Item"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setFormData({
                name: "",
                quantity: 0,
                unit: "pcs",
                status: "In Stock",
                expiryDate: "",
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
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Status</th>
                <th>Expiry Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        item.status === "In Stock"
                          ? "status-active"
                          : item.status === "Low Stock"
                          ? "status-warning"
                          : "status-critical"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{item.expiryDate?.split("T")[0]}</td>
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

export default Inventory;
