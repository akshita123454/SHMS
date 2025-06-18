
export default function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-4 gap-6 mb-6">
        {[
          { icon: '👥', label: 'Patients', count: 120, color: 'text-blue-500' },
          { icon: '💬', label: 'Appointments', count: 42, color: 'text-green-500' },
          { icon: '⚕️', label: 'Surgeries', count: 15, color: 'text-red-500' },
          { icon: '⭐', label: 'Reviews', count: 58, color: 'text-yellow-500' }
        ].map((card, idx) => (
          <div key={idx} className="bg-gray-50 rounded-2xl shadow-md p-6 flex flex-col items-center hover:-translate-y-1 transition">
            <span className={card.color}>{card.icon}</span>
            <h3 className="text-2xl font-semibold mt-2">{card.count}</h3>
            <p className="text-gray-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-6 h-full">
        <div className="basis-2/5 border border-blue-200 shadow-md bg-white rounded-lg">
          <div className="border-b p-4">
            <h2 className="text-blue-600 text-lg">Upcoming Appointments</h2>
          </div>
          <div className="p-4 overflow-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-blue-500">
                  <th className="p-2">Name</th>
                  <th className="p-2">Diagnosis</th>
                  <th className="p-2">Date & Time</th>
                  <th className="p-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {/* Map dynamic data here */}
                <tr className="hover:bg-gray-50">
                  <td className="p-2">Emilia Fox</td>
                  <td className="p-2">Eczema</td>
                  <td className="p-2">June 29, 2023, 08:00</td>
                  <td className="p-2">First appointment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="basis-1/3 bg-white rounded-lg shadow-md border">
          <div className="border-b p-4"><h2 className="text-lg">Notifications</h2></div>
          <div className="p-4 text-gray-600 text-sm space-y-2">
            <p>You have 38 appointment requests.</p>
            <p>Your vacation request was denied.</p>
            <p>Tom Daley cancelled his appointment.</p>
            <p>Someone wants to become your patient.</p>
          </div>
        </div>
      </div>
    </>
  );
}

















// // File: src/components/Dashboard.jsx
// import React from 'react';

// export default function Dashboard() {
//   return (
//     <>
//       <div className="grid grid-cols-4 gap-6 mb-6">
//         {[
//           { icon: '👥', label: 'Patients', count: 120, color: 'text-blue-500' },
//           { icon: '💬', label: 'Appointments', count: 42, color: 'text-green-500' },
//           { icon: '⚕️', label: 'Surgeries', count: 15, color: 'text-red-500' },
//           { icon: '⭐', label: 'Reviews', count: 58, color: 'text-yellow-500' }
//         ].map((card, idx) => (
//           <div key={idx} className="bg-gray-50 rounded-2xl shadow-md p-6 flex flex-col items-center hover:-translate-y-1 transition">
//             <span className={card.color}>{card.icon}</span>
//             <h3 className="text-2xl font-semibold mt-2">{card.count}</h3>
//             <p className="text-gray-500 mt-1">{card.label}</p>
//           </div>
//         ))}
//       </div>
//       <div className="flex gap-6 h-full">
//         <div className="basis-2/5 border border-blue-200 shadow-md bg-white rounded-lg">
//           <div className="border-b p-4">
//             <h2 className="text-blue-600 text-lg">Upcoming Appointments</h2>
//           </div>
//           <div className="p-4 overflow-auto">
//             <table className="w-full text-left text-sm">
//               <thead>
//                 <tr className="text-blue-500">
//                   <th className="p-2">Name</th>
//                   <th className="p-2">Diagnosis</th>
//                   <th className="p-2">Date & Time</th>
//                   <th className="p-2">Notes</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {/* Map dynamic data here */}
//                 <tr className="hover:bg-gray-50">
//                   <td className="p-2">Emilia Fox</td>
//                   <td className="p-2">Eczema</td>
//                   <td className="p-2">June 29, 2023, 08:00</td>
//                   <td className="p-2">First appointment</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <div className="basis-1/3 border border-blue-200 shadow-md bg-white rounded-lg">
//           <div className="border-b p-4">
//             <h2 className="text-blue-600 text-lg">Schedule</h2>
//           </div>
//           <div className="p-4">
//             {/* Replace with FullCalendar or similar component */}
//             <div className="border border-blue-200 rounded-lg overflow-hidden">
//               <div className="grid grid-cols-7 bg-blue-50 text-blue-600 font-semibold text-center">
//                 {['Su','Mo','Tu','We','Th','Fr','Sa'].map(day => <div key={day}>{day}</div>)}
//               </div>
//               <div className="grid grid-cols-7 gap-px bg-blue-100">
//                 {Array.from({ length: 30 }, (_, i) => (
//                   <div key={i} className="py-2 rounded-lg hover:bg-blue-100 transition text-center border border-gray-200 bg-white">{i+1}</div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="basis-1/3 bg-white rounded-lg shadow-md border">
//           <div className="border-b p-4"><h2 className="text-lg">Notifications</h2></div>
//           <div className="p-4 text-gray-600 text-sm space-y-2">
//             <p>You have 38 appointment requests.</p>
//             <p>Your vacation request was denied.</p>
//             <p>Tom Daley cancelled his appointment.</p>
//             <p>Someone wants to become your patient.</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }