import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import { Loader } from 'lucide-react';

export default function CalendarSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/events')
      .then(res => setEvents(res.data))
      .catch(() => setError('Failed to load calendar events'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center items-center"><Loader className="animate-spin" /> Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
}
