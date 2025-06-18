// src/components/reception/Header.jsx
import React from 'react';

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">Welcome</h1>
      <div className="text-gray-600 text-sm">{new Date().toDateString()}</div>
    </header>
  );
}
