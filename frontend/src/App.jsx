import "./App.css";
import DoctorPage from "./pages/Doctor/Doctor";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/doctor" element={<DoctorPage />} />
          {/* <Route path="/hello" element={<Doctor />} /> */}
          {/* <Route path="/test" element={<Test />} /> */}
          {/* Add more routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;