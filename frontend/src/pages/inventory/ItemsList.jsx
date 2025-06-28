// components/inventory/ItemsList.jsx
import React, { useState } from 'react';
import Medicines from './categories/Medicines';
import SurgicalEquipment from './categories/SurgicalEquipment';
import Rehydrants from './categories/Rehydrants';
import Machinery from './categories/Machinery';
import CleaningEquipment from './categories/CleaningEquipments';
import Stretchers from './categories/Stretchers';
import CarryingEquipment from './categories/CarryingEquipment';
import ElectronicDevices from './categories/ElectronicsDevices';
import { motion } from 'framer-motion';

const categories = [
  { key: 'medicines', label: 'Medicines', component: Medicines },
  { key: 'surgical', label: 'Surgical Equipment', component: SurgicalEquipment },
  { key: 'rehydrants', label: 'Rehydrants', component: Rehydrants },
  { key: 'machinery', label: 'Machinery', component: Machinery },
  { key: 'cleaning', label: 'Cleaning Equipment', component: CleaningEquipment },
  { key: 'stretchers', label: 'Stretchers & Carriers', component: Stretchers },
  { key: 'carrying', label: 'Other Carrying Equipment', component: CarryingEquipment },
  { key: 'electronics', label: 'Electronic Devices', component: ElectronicDevices },
];

export default function ItemsList() {
  const [selected, setSelected] = useState(null);
  const SelectedComponent = selected ? categories.find(c => c.key === selected).component : null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Item Categories</h2>

      {!selected && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {categories.map(cat => (
            <motion.div
              key={cat.key}
              onClick={() => setSelected(cat.key)}
              className="cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-xl p-8 text-center border hover:border-blue-500 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-semibold text-xl text-gray-800">{cat.label}</p>
            </motion.div>
          ))}
        </div>
      )}

      {SelectedComponent && (
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 min-h-[60vh]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={() => setSelected(null)}
            className="mb-4 text-blue-600 underline hover:text-blue-800"
          >
            ← Back to Categories
          </button>
          <SelectedComponent />
        </motion.div>
      )}

      {!SelectedComponent && (
        <p className="text-gray-500">Select a category above to view details.</p>
      )}
    </div>
  );
}
