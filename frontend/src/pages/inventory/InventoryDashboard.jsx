import { Package, Layers3, Warehouse, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: <Package size={28} />, label: "Total Items", count: 2300 },
  { icon: <Layers3 size={28} />, label: "Categories", count: 8 },
  { icon: <Warehouse size={28} />, label: "Available Stock", count: 1800 },
  { icon: <AlertCircle size={28} />, label: "Expired Items", count: 42 },
];

const lowStock = [
  { name: "Gauze Pads", category: "Surgical", quantity: 10 },
  { name: "ORS Sachet", category: "Rehydrants", quantity: 15 },
  { name: "Gloves", category: "Cleaning", quantity: 8 },
];

const notifications = [
  "15 items are about to expire this month.",
  "Low stock alert: Less than 10 units for 5 items.",
  "New order received for 20 infusion pumps.",
  "Inventory audit due next week.",
];

export default function InventoryDashboard() {
  return (
    <div className="p-6 space-y-8 min-h-screen bg-gray-50">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center"
          >
            <div className="text-blue-600">{stat.icon}</div>
            <h3 className="text-3xl font-bold mt-2">{stat.count}</h3>
            <p className="text-gray-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Low Stock Table */}
        <div className="col-span-2 bg-white rounded-xl shadow-md border border-gray-200">
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold text-blue-600">Low Stock Items</h2>
          </div>
          <div className="p-6 overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-blue-500 font-semibold">
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Category</th>
                  <th className="pb-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {lowStock.map((item, i) => (
                  <tr key={i} className="hover:bg-blue-50 transition">
                    <td className="py-2">{item.name}</td>
                    <td className="py-2">{item.category}</td>
                    <td className="py-2">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200">
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold text-blue-600">Notifications</h2>
          </div>
          <div className="p-6 space-y-3 text-gray-700 text-sm">
            {notifications.map((note, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                • {note}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
