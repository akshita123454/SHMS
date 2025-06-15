import React, { useState } from "react";
import { Loader, ChevronDown } from "lucide-react";

export default function Reviews() {
  const [expandedId, setExpandedId] = useState(null);
  const [loading] = useState(false);
  const [error] = useState("");

  // Dummy data
  const reviews = [
    { id: 1, user: "Jane Doe", comment: "Excellent service! The staff was very friendly and professional." },
    { id: 2, user: "John Smith", comment: "Quick appointment and helpful advice. Highly recommended." },
    { id: 3, user: "Emily Johnson", comment: "The experience was okay, but the wait time was longer than expected." },
    { id: 4, user: "Michael Brown", comment: "Very clean facility and attentive staff. Will come again." },
    { id: 5, user: "Sophia Lee", comment: "Felt very comfortable and well cared for. Thank you!" }
  ];

  const toggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex justify-center w-full items-center">
        <Loader className="animate-spin text-gray-500" size={48} />
      </div>
    )
  }
  
  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }
  
 return (
  <div className="flex-1 p-6 bg-white/10">
    <h2 className="text-3xl font-semibold mb-6 text-gray-800">
      Patient Reviews
    </h2>
    <div className="w-full p-6 bg-white rounded-2xl shadow-md space-y-4">
      {reviews.map((r) => {
        const isOpen = r.id === expandedId;
        return (
          <div key={r.id}>
            {/* Header */}
            <button
              onClick={() => toggle(r.id)}
              className="flex w-full items-center justify-between p-4 bg-gray-100 rounded-lg shadow transition-all duration-500 ease-in-out transform hover:bg-gray-200 focus:outline-none"
            >
              <span className="font-semibold text-gray-900">
                 {r.user}
              </span>
              <ChevronDown
                 size={20}
                 className={`transition-transform duration-500 ease-in-out ${
                    isOpen ? "rotate-180" : "rotate-0"
                 } text-gray-500`}
              />
            </button>

            {/* Content */}
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                 isOpen ? "max-h-40 p-4 mt-2 bg-gray-50 rounded-lg shadow-inner" : "max-h-0 p-0"
               }`}
            >
              <p className="text-gray-700 font-light">
                 &ldquo;{r.comment}&rdquo;
              </p>
            </div>
          </div>
        )
      })}
    </div>
  </div>
);

}