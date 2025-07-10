
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header"; 
// import { Outlet } from "react-router-dom";

// const PatientLayout = () => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 p-4">
//         <Header /> 
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default PatientLayout;

import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const PatientLayout = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (now.toDateString() !== date.toDateString()) {
        setDate(now);
      }
    }, 60 * 1000); // check every 1 minute

    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <Header date={date} />
        <Outlet context={{ date, setDate }} />
      </div>
    </div>
  );
};

export default PatientLayout;




