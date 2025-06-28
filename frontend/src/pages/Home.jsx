import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Stethoscope, UserPlus } from 'lucide-react';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">

      {/* Navbar */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-5xl font-bold text-blue-900">SHMS</h1>
          <nav className="space-x-6 text-sm md:text-base">
            <Link to="/patient" className="hover:text-blue-600 font-medium">Book Appointment</Link>
            <Link to="/emergency" className="hover:text-blue-600 font-medium">Emergency</Link>
            <Link to="/login" className="hover:text-blue-600 font-medium">Login</Link>
            <Link to="/signup" className="hover:text-blue-600 font-medium">Signup</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
  className="relative flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-blue-100 overflow-hidden"
  style={{
    backgroundImage: "url('/doc.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'overlay',
    backgroundColor: 'rgba(255,255,255,0.7)' // semi-transparent white overlay
  }}
>
  <div className="max-w-xl mb-10 md:mb-0 z-10">
    <h2 className="text-4xl font-bold mb-4 text-blue-900">Welcome to SHMS</h2>
    <p className="text-black mb-6">
      Smart Hospital Management System (SHMS) is designed to streamline hospital operations,
      enhance patient care, and provide seamless communication between departments.
    </p>
    <Link to="/patient">
      <button className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800">
        Book an Appointment
      </button>
    </Link>
  </div>
</section>



      {/* About Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-blue-900 mb-4">About SHMS</h3>
          <p className="text-gray-700">
            SHMS offers advanced features like emergency tracking, room allotment, digital prescriptions,
            doctor availability, and much more. It’s a one-stop solution to digitalize hospital services.
          </p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-4 rounded shadow text-center">
              <HeartPulse className="w-8 h-8 text-blue-900 mx-auto mb-2" />
              <h4 className="font-semibold">Emergency Handling</h4>
              <p className="text-sm mt-1 text-gray-600">Real-time ambulance and triage management</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow text-center">
              <Stethoscope className="w-8 h-8 text-blue-900 mx-auto mb-2" />
              <h4 className="font-semibold">Doctor Availability</h4>
              <p className="text-sm mt-1 text-gray-600">Instant scheduling and live tracking</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow text-center">
              <UserPlus className="w-8 h-8 text-blue-900 mx-auto mb-2" />
              <h4 className="font-semibold">Easy Registration</h4>
              <p className="text-sm mt-1 text-gray-600">Smooth onboarding for patients & staff</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gray-100 py-4 text-center text-sm text-gray-600 border-t">
        © {new Date().getFullYear()} SHMS - Smart Hospital Management System. All rights reserved.
      </footer>

    </div>
  );
}

