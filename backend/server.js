// server.js

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
 
import ambulanceRoutes from "./routes/ambulance.route.js";
import payrollRoutes from "./routes/payroll.route.js";
import roomRoutes from "./routes/room.route.js";
import reportsRoute from "./routes/reports.route.js";

import appointmentRoutes from './routes/appointments.routes.js';
import billingRoutes from './routes/billings.routes.js';
import newdoctorRoutes from './routes/doctors.routes.js';
import newpatientRoutes from './routes/patients.routes.js';
import newroomRoutes from './routes/rooms.routes.js';
import sanitationRoutes from './routes/sanitations.routes.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// CORS Setup
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to SHMS backend!");
});

// Main routes
app.use("/api/patients", patientRoutes);
app.use("/doctor", doctorRoute);

// Emergency
app.use("/emergency", emergencyRoutesA);         // Ayush
app.use("/api/emergency", emergencyRoutesA);     // Akshita

// Admin & Staff
app.use("/api/staff", staffRoutes);
app.use("/api/inventory", inventoryRoutes);      
    
app.use("/api/ambulances", ambulanceRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/reports", reportsRoute);

// Auth
app.use("/api/auth", authRoute);

app.use('/api/appointments', appointmentRoutes);
app.use('/api/billings', billingRoutes);
app.use('/api/doctors', newdoctorRoutes);
app.use('/api/patients', newpatientRoutes);
app.use('/api/rooms', newroomRoutes);
app.use('/api/sanitations', sanitationRoutes);



// Connect DB and Start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`✅ Server is running at port ${port}`);
  });
});
