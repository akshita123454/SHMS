// components/inventory/AddItemForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const initialFormState = {
  name: '',
  description: '',
  quantity: '',
  batch: '',
  expiry: '',
  category: '',
};

const categories = [
  'Medicines',
  'Surgical Equipment',
  'Rehydrants',
  'Machinery',
  'Cleaning Equipment',
  'Stretchers & Carriers',
  'Other Carrying Equipment',
  'Electronic Devices',
];

export default function AddItemForm() {
  const [form, setForm] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        description: form.description,
        quantity: Number(form.quantity),
        batch: form.batch,
        expiryDate: form.expiry,
        category: form.category,
      };

      // ✅ API CALL
      await axios.post('http://localhost:3000/api/_inventory/add-item', payload);


      setSubmitted(true);
      setForm(initialFormState);
    } catch (err) {
      console.error('Failed to submit:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Inventory Item</h2>
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Item Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <input
            name="batch"
            placeholder="Batch Number"
            value={form.batch}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <input
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            type="number"
            required
            className="border p-2 rounded w-full"
          />
          <input
            name="expiry"
            placeholder="Expiry Date (YYYY-MM-DD)"
            value={form.expiry}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        <textarea
          name="description"
          placeholder="Item Description"
          value={form.description}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full h-24"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        >
          <option value="" disabled>Select Category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Item
        </button>
        {submitted && <p className="text-green-600 mt-2">Item added successfully!</p>}
      </motion.form>
    </div>
  );
}
