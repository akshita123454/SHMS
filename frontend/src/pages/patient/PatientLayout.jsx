import Sidebar from "./components/Sidebar";
import Header from "./components/Header"; 
import { Outlet } from "react-router-dom";

const PatientLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <Header /> 
        <Outlet />
      </div>
    </div>
  );
};

export default PatientLayout;