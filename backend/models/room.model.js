import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true },
    department: { type: String, required: true },
    capacity: { type: Number, required: true },
    type: { type: String, required: true },
    status: {
      type: String,
      enum: ["Available", "Occupied"],
      default: "Available",
    },
    occupied: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
