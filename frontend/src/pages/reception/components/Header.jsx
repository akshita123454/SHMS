// src/components/reception/Header.jsx
import React from 'react';

export default function Header() {
  return (
    <header className="flex justify-end items-center bg-white p-4 shadow-md">
      <div className="flex items-center"></div>
      <h1 className="text-xl justify font-semibold text-gray-800"></h1>
      <div className="flex text-gray-600 text-sm">{new Date().toDateString()}</div>
    </header>
  );
}
