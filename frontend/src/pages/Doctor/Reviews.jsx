import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from 'lucide-react';

export default function Reviews() {
  const [reviews, setReviews] = useState([
  {
    id: 1,
    user: 'Jane Doe',
    comment: 'Excellent service! The staff was very friendly and professional.'
  },
  {
    id: 2,
    user: 'John Smith',
    comment: 'Quick appointment and helpful advice. Highly recommended.'
  },
  {
    id: 3,
    user: 'Emily Johnson',
    comment: 'The experience was okay, but the wait time was longer than expected.'
  },
  {
    id: 4,
    user: 'Michael Brown',
    comment: 'Very clean facility and attentive staff. Will come again.'
  },
  {
    id: 5,
    user: 'Sophia Lee',
    comment: 'Felt very comfortable and well cared for. Thank you!'
  }
]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

//   useEffect(() => {
//     setLoading(true);
//     axios.get('/api/reviews')
//       .then(res => setReviews(res.data))
//       .catch(() => setError('Failed to load reviews'))
//       .finally(() => setLoading(false));
//   }, []);

  if (loading) return <div className="flex justify-center items-center"><Loader className="animate-spin" /> Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      {reviews.map(r => (
        <div key={r.id} className="border-b pb-2">
          <p className="font-semibold">{r.user}</p>
          <p className="text-gray-600">"{r.comment}"</p>
          hello 
        </div>
      ))}
    </div>
  );
}