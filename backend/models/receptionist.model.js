const mongoose = require("mongoose");

const ReceptionistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  shift: { type: String, enum: ["Morning", "Evening", "Night"], required: true },
  contact: String,
  email: String
});

module.exports = mongoose.model("Receptionist", ReceptionistSchema);

