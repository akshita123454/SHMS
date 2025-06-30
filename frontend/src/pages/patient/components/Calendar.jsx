// src/pages/patient/components/Calender.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4"> Your Calendar</h2>
      <div className="bg-white rounded-lg shadow p-4 inline-block">
        <Calendar onChange={setDate} value={date} />
      </div>
      <p className="mt-4 text-gray-600">Selected date: <strong>{date.toDateString()}</strong></p>
    </div>
  );
};

export default MyCalendar;

