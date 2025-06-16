import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientLayout from "./pages/patient/PatientLayout";
function App() {
  return (
    <Router>
      <Routes>
     
        <Route path="/patientLayout" element={<PatientLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
