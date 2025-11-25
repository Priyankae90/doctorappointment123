const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');

// create appointment (patient)
router.post('/', auth, async (req, res) => {
  try {
    const { doctorId, date, reason } = req.body;
    // only patient role should create (but allow admins)
    if (req.user.role === 'doctor') {
      return res.status(403).json({ message: 'Doctors cannot create patient appointments' });
    }
    const appt = new Appointment({
      patient: req.user.id,
      doctor: doctorId,
      date,
      reason
    });
    await appt.save();
    res.json(appt);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// get appointments for logged-in user (patient or doctor)
router.get('/', auth, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'patient') query.patient = req.user.id;
    else if (req.user.role === 'doctor') query.doctor = req.user.id;
    else query = {}; // admin sees all

    const appts = await Appointment.find(query)
      .populate('patient', 'name email')
      .populate('doctor', 'name email')
      .sort({ date: 1 });

    res.json(appts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// doctor or patient can update status
router.put('/:id/status', auth, async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });

    // authorization: either doctor assigned or patient who booked or admin
    if (req.user.id !== String(appt.patient) && req.user.id !== String(appt.doctor) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { status } = req.body;
    appt.status = status;
    await appt.save();
    res.json(appt);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
