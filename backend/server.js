import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoute from "./routes/doctor.route.js";
import authRoute from "./routes/auth.route.js"

import staffRoutes from "./routes/staff.route.js";
import inventoryRoutes from "./routes/inventory.route.js";
import emergencyRoutes from "./routes/emergency.route.js";
import ambulanceRoutes from "./routes/ambulance.route.js";
import payrollRoutes from "./routes/payroll.route.js";
import reportRoutes from "./routes/report.route.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();


app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Welcome to SHMS backend!");
});

// api
app.use("/doctor", doctorRoute);
app.use("/api/patients", patientRoutes);

//Mount admin routes
app.use("/api/staff", staffRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/emergencies", emergencyRoutes);
app.use("/api/ambulances", ambulanceRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/reports", reportRoutes);

app.use("/api/auth", authRoute);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running at the port ${port}`);
});
