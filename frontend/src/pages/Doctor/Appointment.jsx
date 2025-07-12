import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from 'lucide-react';

// Basic card structure
function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

function CardContent({ children, className = '' }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export default function Appointments() {
  const [appointments, setAppointments] = useState([
    { id: 1, patientName: 'Alice Harper', dateTime: '2025-06-10T14:00:00Z', phone: '123-123-1234', email: 'alice.harper@example.com', notes: 'General health check-up and vaccines renewal' },
    { id: 2, patientName: 'Bob Johnson', dateTime: '2025-06-11T09:30:00Z', phone: '555-555-5555', email: 'bob.johnson@example.com', notes: 'Follow-up for diabetes medication and lifestyle modifications' },
    { id: 3, patientName: 'Charlie Rogers', dateTime: '2025-06-11T11:15:00Z', phone: '984-984-9844', email: 'charlie.rogers@example.com', notes: 'Blood pressure follow-up, medication adjustment if necessary' },
    { id: 4, patientName: 'Diana Patel', dateTime: '2025-06-12T10:45:00Z', phone: '220-220-2200', email: 'diana.patel@example.com', notes: 'Consultation for persistent back pain and muscle stiffness' },
    { id: 5, patientName: 'Ethan Kim', dateTime: '2025-06-13T09:30:00Z', phone: '888-888-8888', email: 'ethan.kim@example.com', notes: 'Discussion about cholesterol medication and diet plan' },
    { id: 6, patientName: 'Fiona Lopez', dateTime: '2025-06-13T15:20:00Z', phone: '666-666-6666', email: 'fiona.lopez@example.com', notes: 'General health check-up and vaccines renewal' },
    { id: 7, patientName: 'George Peterson', dateTime: '2025-06-14T09:00:00Z', phone: '777-777-7777', email: 'george.peterson@example.com', notes: 'Consultation for persistent headaches and lifestyle factors' },
    { id: 8, patientName: 'Hannah Scott', dateTime: '2025-06-14T14:30:00Z', phone: '555-123-7890', email: 'hannah.scott@example.com', notes: 'Follow-up for asthma medication and symptoms control' }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const formatDate = iso =>
    new Date(iso).toLocaleString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

  const filtered = appointments.filter(a =>
    a.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = filtered.slice().sort((a, b) => {
    const diff = new Date(a.dateTime) - new Date(b.dateTime);
    return sortOrder === 'asc' ? diff : -diff;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader className="animate-spin" />
        <span className="ml-2">Loading appointments...</span>
      </div>
    );
  }

  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-200 flex gap-6 h-[80vh]">
      {/* Sidebar */}
      <div className="w-1/3 overflow-y-auto pr-4 border-r border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Appointments</h2>
        <input
          type="text"
          placeholder="Search by patient..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="asc">Date: Ascending</option>
          <option value="desc">Date: Descending</option>
        </select>

        <div className="space-y-3">
          {sorted.map(a => (
            <Card
              key={a.id}
              onClick={() => setSelected(a)}
              className={`cursor-pointer transition duration-150 hover:shadow-lg p-2 ${
                selected?.id === a.id
                  ? 'border-indigo-500 ring-2 ring-indigo-300'
                  : 'border-gray-200'
              }`}
            >
              <CardContent>
                <p className="font-semibold text-indigo-600 mb-1">
                  {a.patientName}
                </p>
                <p className="text-sm text-gray-600">
                  {formatDate(a.dateTime)}
                </p>
              </CardContent>
            </Card>
          ))}
          {sorted.length === 0 && (
            <p className="text-gray-500 px-2">No appointments found.</p>
          )}
        </div>
      </div>

      {/* Detail Panel */}
      <div className="w-2/3 h-full">
        {selected ? (
          <Card className="h-full">
            <CardContent>
              <h3 className="text-3xl font-semibold text-indigo-700 mb-6">
                {selected.patientName}
              </h3>
              <div className="space-y-4 text-gray-700 text-base">
                <p>
                  <span className="font-semibold">Date & Time:</span>{' '}
                  {formatDate(selected.dateTime)}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {selected.phone}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {selected.email}
                </p>
                <p>
                  <span className="font-semibold">Notes:</span>{' '}
                  {selected.notes}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-lg">
            Select an appointment to view details.
          </div>
        )}
      </div>
    </div>
  );
}
