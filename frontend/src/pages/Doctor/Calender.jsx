import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from 'lucide-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function CalendarSection() {
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('/api/events')
      .then((res) => setEvents(res.data))
      .catch(() => setError('Failed to load calendar events'))
      .finally(() => setLoading(false)); 
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader className="animate-spin mr-2 text-gray-500" size={24} />
        <span className="text-gray-500">Loading calendar…</span>
      </div>
    );
  }
  if (error) {
    return <div className="text-red-500 p-6">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6" >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Calendar
      </h2>

      {/* removed overflow-hidden to avoid cutting components */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        {/* give it a fixed height so FullCalendar knows its bounds */}
        <div className="h-[500px]">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            headerToolbar={{ left:'prev,next today', center:'title', right:'dayGridMonth,dayGridWeek,dayGridDay' }}
            height="100%"
          />
        </div>
      </div>
    </div>
  );
}