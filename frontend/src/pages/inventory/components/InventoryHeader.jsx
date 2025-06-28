import { Calendar as CalIcon } from 'lucide-react';

export default function InventoryHeader({ doctorName }) {
  return (
    <header className="flex justify-end items-center bg-white p-4 shadow-md">
      <div className="flex items-center">
        <img src="https://via.placeholder.com/40" alt="Avatar" className="rounded-full mr-3" />
        <span className="font-medium mr-1">{doctorName}</span>
        <CalIcon />
      </div>
    </header>
  );
}