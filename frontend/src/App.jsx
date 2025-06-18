import "./App.css";
import DoctorPage from "./pages/Doctor/Doctor";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/hello" element={<Doctor />} />
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/test" element={<Test />} />
          {/* Add more routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;



// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Doctor from './pages/Doctor'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>


//       <Router>
//       <div className="min-h-screen bg-gray-100">
//         <Routes>
//           <Route path="/" element={<Doctor />} />
//           {/* Add more routes below if needed */}
//           {/* <Route path="/dashboard" element={<Dashboard />} /> */}
//         </Routes>
//       </div>
//     </Router>
//     </>
//   )
// }

// export default App
