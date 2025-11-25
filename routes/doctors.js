const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const User = require('../models/User');

// Get all doctors with user info
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('user', 'name email');
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get single doctor by id
router.get('/:id', async (req, res) => {
  try {
    const doc = await Doctor.findById(req.params.id).populate('user', 'name email');
    if (!doc) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
