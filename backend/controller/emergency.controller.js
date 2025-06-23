import { Triage, RoomAllotment, Ambulance, Notification } from "../models/emergency.models.js";

// Create a new triage case
//POST /triage
export const createTriageCase = async (req, res) => {
  try {
    const triage = new Triage(req.body);
    await triage.save();
    res.status(201).json({ message: "Triage case saved successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to save triage case" });
  }
};

// GET /triage
export const getAllTriageCases = async (req, res) => {
  try {
    const cases = await Triage.find();
    res.status(200).json(cases);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch triage cases" });
  }
};

// Create a room allotment
export const createRoomAllotment = async (req, res) => {
  try {
    const room = new RoomAllotment(req.body);
    await room.save();
    res.status(201).json({ message: "Room allotted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to allot room" });
  }
};

export const getAllRoomAllotments = async (req, res) => {
  try {
    const rooms = await RoomAllotment.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch room allotments" });
  }
};

// GET /emergency/ambulance
export const getAllAmbulances = async (req, res) => {
  try {
    const ambulances = await Ambulance.find({});
    res.status(200).json(ambulances);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ambulances" });
  }
};

// Fetch notifications
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};
