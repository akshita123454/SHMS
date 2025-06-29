import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

import Medicines from './categories/Medicines';
import SurgicalEquipment from './categories/SurgicalEquipment';
import Rehydrants from './categories/Rehydrants';
import Machinery from './categories/Machinery';
import CleaningEquipment from './categories/CleaningEquipments';
import Stretchers from './categories/Stretchers';
import CarryingEquipment from './categories/CarryingEquipment';
import ElectronicDevices from './categories/ElectronicsDevices';

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
  const SelectedComponent = selected
    ? categories.find((c) => c.key === selected).component
    : null;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold  mb-6 border-b pb-2">Item Categories</h2>

      {!selected && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          {categories.map((cat) => (
            <motion.div
              key={cat.key}
              onClick={() => setSelected(cat.key)}
              className="cursor-pointer bg-white rounded-xl border border-blue-100 shadow-md hover:shadow-lg hover:border-blue-400 
                        px-6 py-10 text-center transition-all h-32 flex items-center justify-center"
              whileHover={{ scale: 1.03 }}
            >
              <p className="font-semibold text-lg text-gray-700">{cat.label}</p>
            </motion.div>
          ))}
        </div>

      )}

      {SelectedComponent && (
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 min-h-[60vh] border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={() => setSelected(null)}
            className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Categories
          </button>

          <SelectedComponent />
        </motion.div>
      )}

      {!SelectedComponent && (
        <div className="text-center mt-8 text-gray-500 text-sm">
          Please select a category to view its inventory.
        </div>
      )}
    </div>
  );
}
