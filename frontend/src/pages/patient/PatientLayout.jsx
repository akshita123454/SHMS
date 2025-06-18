// // src/components/reception/layout/ReceptionLayout.jsx
// // import React from 'react';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';

// export default function ReceptionLayout({ children }) {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="ml-60 w-full min-h-screen bg-gray-100">
//         <Header />
//         <main className="p-6">{children}</main>
//       </div>
//     </div>
//   );
// }


import { Outlet } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function PatientLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-60 w-full min-h-screen bg-gray-100">
        <Header />
        {/* 👇 This is where the nested routes will render */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
