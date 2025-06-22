// src/pages/reception/Billing.jsx
import React, { useState } from 'react';
import { addBillingEntry, getAllBillingEntries } from '../../api/reception/billing';
import { FileText, Plus } from 'lucide-react';

export default function Billing() {
  const [billingData, setBillingData] = useState([
    { patient: 'John Doe', service: 'Consultation', amount: 50, status: 'Paid' },
    { patient: 'Jane Smith', service: 'X-Ray', amount: 100, status: 'Pending' },
  ]);

  const [newEntry, setNewEntry] = useState({
    patient: '',
    service: '',
    amount: '',
    status: 'Paid',
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    if (!newEntry.patient || !newEntry.service || !newEntry.amount) return;
    const newAmount = parseFloat(newEntry.amount);
    if (isNaN(newAmount) || newAmount <= 0) return;

    setBillingData([{ ...newEntry, amount: newAmount }, ...billingData]);
    setNewEntry({
      patient: '',
      service: '',
      amount: '',
      status: 'Paid',
    });
  };

  const filteredData = billingData.filter((item) =>
    item.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
      <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
          <FileText className="w-6 h-6 text-black" />
          Billing & Payments
        </h2>

        {/* Add Billing Entry Form */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <input
            type="text"
            name="patient"
            placeholder="Patient Name"
            value={newEntry.patient}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            name="service"
            placeholder="Service"
            value={newEntry.service}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={newEntry.amount}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <select
            name="status"
            value={newEntry.status}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-1" /> Add
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded w-full md:w-1/2"
          />
        </div>

        {/* Scrollable Billing Table */}
        <div className="overflow-y-auto max-h-96 border rounded">
          <table className="min-w-full text-left">
            <thead className="text-gray-700 font-semibold border-b bg-gray-100">
              <tr>
                <th className="px-4 py-2">Patient</th>
                <th className="px-4 py-2">Service</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((item, index) => (
                <tr key={index} className="bg-white">
                  <td className="px-4 py-3">{item.patient}</td>
                  <td className="px-4 py-3">{item.service}</td>
                  <td className="px-4 py-3">${item.amount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-sm px-3 py-1 rounded-full font-semibold ${
                        item.status === 'Paid'
                          ? 'bg-green-600 text-white'
                          : 'bg-yellow-400 text-black'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-3">
                    No billing records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    
  );
}
