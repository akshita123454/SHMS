const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  appointments: [{
    doctor: String,
    date: Date,
    status: String
  }],
  notifications: [{
    message: String,
    status: String
  }],
  medicalHistory: [{
    date: Date,
    condition: String,
    treatment: String
  }],
  reports: [{
    name: String,
    url: String
  }],
  messages: [{
    sender: String,
    message: String,
    date: Date
  }]
});

module.exports = mongoose.model('Patient', patientSchema);
