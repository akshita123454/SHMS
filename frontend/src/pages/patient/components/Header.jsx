// src/pages/patient/components/Header.jsx
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">Welcome, Patient</h1>
      <button className="bg-cyan-100 text-cyan-700 px-4 py-1 rounded-full text-sm font-medium">
        Today:
      </button>
    </div>
  );
};

export default Header;
