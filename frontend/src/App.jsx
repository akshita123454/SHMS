import "./App.css";
import DoctorPage from "./pages/Doctor/Doctor";
import AdminLayout from "./pages/Admin/Layouts/AdminLayout";
import ReceptionPage from "./pages/reception/ReceptionPage";
import PatientPage from "./pages/patient/components/PatientPage";
import EmergencyStaffPage from './pages/EmergencyStaff/EmergencyStaffPage';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    //NOTE: DONT REMOVE ANY ROUTE ANS IF YOU ARE WOKING ON ANY ROUTE ADD IN SIMILAR FASHION.

    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/reception" element={<ReceptionPage />} />
          <Route path="/emergency" element={<EmergencyStaffPage />} />
          <Route path="/patient" element={<PatientPage />} />
          <Route path="/admin/*" element={<AdminLayout />} />

          <Route
            path="*"
            element={
              <div className="text-center p-10 text-red-500 font-bold text-2xl">
                404 - Page Not Found
                <p>
                  Try going to{" "}
                  <a href="/admin" className="text-blue-500 underline">
                    Admin Dashbo
                  </a>{" "}
                  or{" "}
                  <a href="/doctor" className="text-blue-500 underline">
                    Doctor Dashboard
                  </a>
                  .
                </p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
