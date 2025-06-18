import React, { useState } from 'react';
import ReceptionLayout from './components/layout/ReceptionLayout';
import { FileText } from 'lucide-react';

export default function Billing() {
  const billingData = [
    { patient: 'John Doe', service: 'Consultation', amount: '$50', status: 'Paid' },
    { patient: 'Jane Smith', service: 'X-Ray', amount: '$100', status: 'Pending' },
  ];

  return (
    <ReceptionLayout>
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
          <FileText className="w-6 h-6 text-black" />
          Billing & Payments
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="text-gray-700 font-semibold border-b">
              <tr>
                <th className="px-4 py-2">Patient</th>
                <th className="px-4 py-2">Service</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {billingData.map((item, index) => (
                <tr key={index} className="bg-white">
                  <td className="px-4 py-3">{item.patient}</td>
                  <td className="px-4 py-3">{item.service}</td>
                  <td className="px-4 py-3">{item.amount}</td>
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
            </tbody>
          </table>
        </div>
      </div>
    </ReceptionLayout>
  );
}
