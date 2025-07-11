// src/pages/patient/components/Header.jsx
import React from "react";

const Header = ({ date }) => {
  const today = date || new Date();

  return (
// <<<<<<< superman
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold"></h1>
      <button className="bg-cyan-100 text-cyan-700 px-4 py-1 rounded-full text-sm font-medium">
        Today:
      </button>
{/* 
     <div className="flex justify-between items-center mb-6 relative">
       <h1 className="text-2xl font-semibold">Welcome, Patient</h1>
       <div className="bg-cyan-100 text-cyan-700 px-4 py-1 rounded-full text-sm font-medium shadow-sm">
         {today.toDateString()}
       </div>
*/}
    </div>
  );
};

export default Header;

