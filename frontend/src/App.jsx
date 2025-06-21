import "./App.css";
import DoctorPage from "./pages/Doctor/Doctor";
import AdminLayout from "./pages/Admin/Layouts/AdminLayout";
import ReceptionPage from "./pages/reception/ReceptionPage";
import PatientPage from "./pages/patient/components/PatientPage";
import EmergencyStaffPage from './pages/EmergencyStaff/EmergencyStaffPage';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupForm from "./pages/auth/SignupForm";
import LoginForm from "./pages/auth/LoginForm";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import UnauthorizedPage from "./pages/auth/UnauthorizedPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          <Route
            path="/doctor"
            element={
              <ProtectedRoute acceptedRoles={['doctor']}>
                <DoctorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reception"
            element={
              <ProtectedRoute acceptedRoles={['reception']}>
                <ReceptionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/emergency"
            element={
              <ProtectedRoute acceptedRoles={['emergency']}>
                <EmergencyStaffPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient"
            element={
              <ProtectedRoute acceptedRoles={['patient']}>
                <PatientPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute acceptedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <div className="text-center p-10 text-red-500 font-bold text-2xl">
                404 - Page Not Found
                <p>
                  Try going to{" "}
                  <a href="/admin" className="text-blue-500 underline">
                    Admin Dashboard
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

  
  // return (
  //   //NOTE: DONT REMOVE ANY ROUTE ANS IF YOU ARE WOKING ON ANY ROUTE ADD IN SIMILAR FASHION.

  //   <Router>
  //     <div className="min-h-screen bg-gray-100">
  //       <Routes>
  //         <Route path="/signup" element={<SignupForm />} />
  //         <Route path="/login" element={<LoginForm />} />
  //         <Route path="/doctor" element={<DoctorPage />} />
  //         <Route path="/reception" element={<ReceptionPage />} />
  //         <Route path="/emergency" element={<EmergencyStaffPage />} />
  //         <Route path="/patient" element={<PatientPage />} />

  //         {/* Fix this admin route not correct. */}
  //         <Route path="/admin/*" element={<AdminLayout />} />

  //         <Route
  //           path="*"
  //           element={
  //             <div className="text-center p-10 text-red-500 font-bold text-2xl">
  //               404 - Page Not Found
  //               <p>
  //                 Try going to{" "}
  //                 <a href="/admin" className="text-blue-500 underline">
  //                   Admin Dashboard
  //                 </a>{" "}
  //                 or{" "}
  //                 <a href="/doctor" className="text-blue-500 underline">
  //                   Doctor Dashboard
  //                 </a>
  //                 .
  //               </p>
  //             </div>
  //           }
  //         />
  //       </Routes>
  //     </div>
  //   </Router>
  // );
}

export default App;
