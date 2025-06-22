import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PatientPage from '../patient/components/PatientPage';
import DoctorPage from '../Doctor/Doctor';
import ReceptionPage from '../reception/ReceptionPage';
import EmergencyStaffPage from '../EmergencyStaff/EmergencyStaffPage';
import AdminLayout from '../Admin/Layouts/AdminLayout';

export default function DeveloperLayout() {
  return (
      <main>
        <Routes>
          <Route path="patient" element={<PatientPage />} />
          <Route path="doctor" element={<DoctorPage />} />
          <Route path="reception" element={<ReceptionPage />} />
          <Route path="emergency" element={<EmergencyStaffPage />} />
          <Route path="admin/*" element={<AdminLayout />} />
          <Route path="*" element={<p>Select a page from the sidebar.</p>} />
        </Routes>
      </main>
  );
}
