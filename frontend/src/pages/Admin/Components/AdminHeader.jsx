// src/pages/Admin/components/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false); // Renamed for clarity
  const [showAdminDropdown, setShowAdminDropdown] = useState(false); // State for Admin dropdown
  const navigate = useNavigate();
  const searchBoxRef = useRef(null); // Ref for the search box container
  const adminDropdownRef = useRef(null); // Ref for the Admin dropdown container

  // Define the list of searchable Admin pages and their corresponding paths
  const searchablePages = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Staff Management", path: "/admin/staff" },
    { name: "Inventory", path: "/admin/inventory" },
    { name: "Payroll", path: "admin/payroll" },
    { name: "Emergency Cases", path: "/admin/emergency" },
    { name: "Ambulance Tracking", path: "/admin/ambulance" },
    { name: "Room Mangement", path: "/admin/rooms" },
    // Add more Admin pages here as you create them
  ];

  // Effect to handle clicks outside to close search results AND admin dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setShowSearchResults(false);
      }
      if (
        adminDropdownRef.current &&
        !adminDropdownRef.current.contains(event.target)
      ) {
        setShowAdminDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const filtered = searchablePages.filter((page) =>
        page.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true); // Show results when there's a query
    } else {
      setSearchResults([]);
      setShowSearchResults(false); // Hide results if query is empty
    }
  };

  const handleSearchResultClick = (path) => {
    navigate(path);
    setSearchQuery(""); // Clear search query
    setSearchResults([]); // Clear search results
    setShowSearchResults(false); // Hide the results dropdown
  };

  const toggleAdminDropdown = () => {
    setShowAdminDropdown((prev) => !prev);
  };

  const handleAdminOptionClick = (option) => {
    // For now, we'll use alerts. You might want to navigate to specific
    // settings/edit pages or open modals for these in a real application.
    switch (option) {
      case "editPatients":
        alert("Editing Total Patients (Navigate to Patients Management)");
        // Example: navigate('/admin/settings/patients');
        break;
      case "editStaff":
        alert("Editing Total Staff (Navigate to Staff Management)");
        // Example: navigate('/admin/settings/staff');
        break;
      case "editAppointments":
        alert("Editing Daily Appointments (Navigate to Appointments)");
        // Example: navigate('/admin/settings/appointments');
        break;
      case "editCriticalCases":
        alert("Editing Critical Cases (Navigate to Emergency Cases)");
        // Example: navigate('/admin/settings/critical-cases');
        break;
      case "logout":
        alert("Logging out Admin..."); // Your existing logout logic
        // Example: perform actual logout, clear auth tokens, then navigate to login
        // navigate('/login');
        break;
      default:
        break;
    }
    setShowAdminDropdown(false); // Close dropdown after clicking an option
  };

  return (
    <header className="bg-white p-4 mb-8 flex items-center justify-between shadow-sm rounded-lg">
      <div className="relative flex items-center space-x-4" ref={searchBoxRef}>
        <input
          type="text"
          placeholder="Search modules..."
          className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 w-64"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() =>
            searchQuery.length > 0 &&
            setSearchResults(
              searchablePages.filter((page) =>
                page.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
            )
          } // Re-show results on focus if query exists
        />
        {showSearchResults && searchResults.length > 0 && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            {searchResults.map((result) => (
              <div
                key={result.path}
                className="p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                onClick={() => handleSearchResultClick(result.path)}
              >
                {result.name}
              </div>
            ))}
          </div>
        )}
        {showSearchResults &&
          searchResults.length === 0 &&
          searchQuery.length > 0 && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-3 text-gray-500">
              No results found.
            </div>
          )}
      </div>

      {/* Admin Profile and Dropdown */}
      <div className="relative" ref={adminDropdownRef}>
        <div
          className="admin-button flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          onClick={toggleAdminDropdown}
        >
          <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white">
            A
          </div>
          <span className="font-medium">Admin</span>
          {/* Optional: Add a dropdown arrow icon */}
          <svg
            className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${
              showAdminDropdown ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>

        {showAdminDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
            <div
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => handleAdminOptionClick("editPatients")}
            >
              Edit Total Patients
            </div>
            <div
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => handleAdminOptionClick("editStaff")}
            >
              Edit Total Staff
            </div>
            <div
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => handleAdminOptionClick("editAppointments")}
            >
              Edit Daily Appointments
            </div>
            <div
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => handleAdminOptionClick("editCriticalCases")}
            >
              Edit Critical Cases
            </div>
            <hr className="border-gray-200 my-1" />
            <div
              className="block px-4 py-3 text-red-600 hover:bg-red-50 cursor-pointer text-sm"
              onClick={() => handleAdminOptionClick("logout")}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
