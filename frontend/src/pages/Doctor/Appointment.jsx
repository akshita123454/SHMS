import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from 'lucide-react';

// Simple Card components (no external dependency)
function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-white rounded-lg shadow border border-gray-200 ${className}`}
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

  // Uncomment when connected to API
  // useEffect(() => {
  //   setLoading(true);
  //   axios.get('/api/appointments')
  //     .then(res => setAppointments(res.data))
  //     .catch(() => setError('Failed to load appointments'))
  //     .finally(() => setLoading(false));  
  // }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-full">
      <Loader className="animate-spin" />
      <span className="ml-2">Loading appointments...</span>
    </div>
  );
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  const formatDate = iso => new Date(iso).toLocaleString(undefined, {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
  });

  // Filter and sort appointments
  const filtered = appointments
    .filter(a => a.patientName.toLowerCase().includes(searchTerm.toLowerCase()));
  const sorted = filtered.slice().sort((a, b) => {
    const diff = new Date(a.dateTime) - new Date(b.dateTime);
    return sortOrder === 'asc' ? diff : -diff;
  });

  return (
    <div className="bg-gray-50 rounded-lg shadow border border-gray-200 p-4 flex gap-4 h-full">
      {/* Sidebar list */}
      <div className="w-1/3 overflow-y-auto pr-4 border-r border-gray-200">
        <div className="px-2">
          <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full mb-2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
          />
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
          >
            <option value="asc">Sort by Date: Ascending</option>
            <option value="desc">Sort by Date: Descending</option>
          </select>
        </div>
        <div className="space-y-3">
          {sorted.map(a => (
            <Card
              key={a.id}
              onClick={() => setSelected(a)}
              className={`cursor-pointer transition-shadow duration-200 ease-in-out hover:shadow-lg p-2 ${
                selected?.id === a.id ? 'ring ring-indigo-300 border-indigo-300' : 'border-transparent'
              }`}>
              <CardContent>
                <p className="font-semibold mb-2">{a.patientName}</p>
                <p className="text-sm text-gray-600">{formatDate(a.dateTime)}</p>
              </CardContent>
            </Card>
          ))}
          {sorted.length === 0 && (
            <p className="text-gray-500 px-2">No appointments found.</p>
          )}
        </div>
      </div>

      {/* Detail panel */}
      <div className="w-2/3 p-4">
        {selected ? (
          <Card className="h-full">
            <CardContent>
              <h3 className="text-2xl font-bold mb-4">{selected.patientName}</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Date & Time:</strong> {formatDate(selected.dateTime)}</p>
                <p><strong>Phone:</strong> {selected.phone}</p>
                <p><strong>Email:</strong> {selected.email}</p>
                <p><strong>Notes:</strong> {selected.notes}</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            <span>Select an appointment to view details</span>
          </div>
        )}
      </div>
    </div>
  );
}
