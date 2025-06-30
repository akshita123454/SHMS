// components/inventory/UpdateOrDeleteItem.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image from '../../../public/inventory.jpeg'
import image2 from '../../../public/inven.jpg'

export default function UpdateOrDeleteItem() {
  const [searchId, setSearchId] = useState('');
  const [item, setItem] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/items/${searchId}`);
      setItem(res.data);
      setMessage('');
    } catch (err) {
      setItem(null);
      toast.error('Item not found!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/items/${searchId}`, item);
      toast.success('Item updated successfully!');
    } catch (err) {
      toast.error('Failed to update item');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/items/${searchId}`);
      setItem(null);
      setSearchId('');
      toast.success('Item deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete item');
    }
  };

  return (

    <div className="p-6 bg-gray-50 flex flex-col lg:flex-row items-start gap-8">
  
  {/* LEFT: form section */}
    <div className="flex-1">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Update or Delete Inventory Item</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-xl">
        <input
          type="text"
          placeholder="Enter Item ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border p-3 rounded w-full shadow-sm"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {item && (
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 space-y-4 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Item Name"
              value={item.name || ''}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <input
              name="batch"
              placeholder="Batch Number"
              value={item.batch || ''}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <input
              name="quantity"
              placeholder="Quantity"
              type="number"
              value={item.quantity || ''}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <input
              name="expiry"
              placeholder="Expiry Date"
              value={item.expiry ? item.expiry.substring(0, 10) : ''}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <input
              name="category"
              placeholder="Category"
              value={item.category || ''}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <textarea
            name="description"
            placeholder="Description"
            value={item.description || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full h-24"
          />

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Update Item
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete Item
            </button>
          </div>
        </motion.div>
      )}
    </div>

  {/* RIGHT: image */}
   <div className="w-80 h-140 border border-gray-300 rounded-xl overflow-hidden">
    <img
      src={image2}
      alt="Inventory"
      className="w-full h-full object-cover"
    />
  </div>

</div>
    
  );
}
