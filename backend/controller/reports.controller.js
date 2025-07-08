// import Staff from "../models/staff.model.js";
import { Ambulance } from "../models/ambulance.model.js";
import Room from "../models/room.model.js";
import User from "../models/user.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalStaff = await User.countDocuments();
    const totalAmbulances = await Ambulance.countDocuments();
    const totalRooms = await Room.countDocuments();
    const availableRooms = await Room.countDocuments({ status: "Available" });
    const occupiedRooms = await Room.countDocuments({ status: "Occupied" });

    res.json({
      totalStaff,
      totalAmbulances,
      totalRooms,
      availableRooms,
      occupiedRooms,
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};
