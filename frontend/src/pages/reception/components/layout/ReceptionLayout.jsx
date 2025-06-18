// src/components/reception/layout/ReceptionLayout.jsx
import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';

export default function ReceptionLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-60 w-full min-h-screen bg-gray-100">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
