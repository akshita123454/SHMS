import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

import patientRoutes from "./routes/patientRoutes.js";
import doctorRoute from "./routes/doctor.route.js";
import authRoute from "./routes/auth.route.js";
import emergencyRoutesA from "./routes/emergencyA.route.js"; 

import staffRoutes from "./routes/staff.route.js";
import inventoryRoutes from "./routes/inventory.route.js";
import emergencyRoutes from "./routes/emergency.route.js";
import ambulanceRoutes from "./routes/ambulance.route.js";
import payrollRoutes from "./routes/payroll.route.js";
import reportRoutes from "./routes/report.route.js";


const app = express();

const port = process.env.PORT || 3000;

dotenv.config();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Welcome to SHMS backend!");
});

// Apis
app.use("/doctor", doctorRoute);
app.use("/api/patients", patientRoutes);


// this route is for ayush Emergency Page.
app.use("/emergency", emergencyRoutesA); 

// emergency route for Akshita
app.use("/emergencyAkshita",emergencyRoutes)

// All Admin Router
app.use("/api/staff", staffRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/emergencies", emergencyRoutes);
app.use("/api/ambulances", ambulanceRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/reports", reportRoutes);

// Auth Routes
app.use("/api/auth", authRoute);

app.listen(port, () => {
  connectDB();
  console.log(` Server is running at port ${port}`);
});
