const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialization: { type: String, required: true },
  experienceYears: { type: Number, default: 0 },
  clinicAddress: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
