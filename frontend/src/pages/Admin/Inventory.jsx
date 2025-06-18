// src/pages/Admin/components/Inventory.jsx
import React from "react";

const Inventory = () => {
  const inventoryData = [
    {
      id: 1,
      name: "Disposable Masks",
      quantity: 500,
      unit: "pcs",
      status: "In Stock",
      expiryDate: "2025-12-31",
    },
    {
      id: 2,
      name: "Hand Sanitizer",
      quantity: 50,
      unit: "bottles",
      status: "Low Stock",
      expiryDate: "2025-06-30",
    },
    {
      id: 3,
      name: "Sterile Gloves",
      quantity: 200,
      unit: "pairs",
      status: "In Stock",
      expiryDate: "2026-01-15",
    },
    {
      id: 4,
      name: "Painkillers (Paracetamol)",
      quantity: 15,
      unit: "boxes",
      status: "Low Stock",
      expiryDate: "2024-10-20",
    },
    {
      id: 5,
      name: "IV Fluid Bags",
      quantity: 120,
      unit: "bags",
      status: "In Stock",
      expiryDate: "2025-09-01",
    },
  ];

  const handleAddItem = () => {
    alert("Add new inventory item clicked!");
  };

  return (
    <section id="inventory" className="section">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Inventory Management</h2>
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
          onClick={handleAddItem}
        >
          Add Item
        </button>
      </div>
      <div className="module-card">
        <div className="table-container">
          <table className="w-full">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Status</th>
                <th>Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        item.status === "In Stock"
                          ? "status-active"
                          : "status-pending"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{item.expiryDate}</td>
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
