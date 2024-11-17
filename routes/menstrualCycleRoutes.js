const express = require('express');
const router = express.Router();
const MenstrualCycle = require('../models/menstrualCycle');

// Get menstrual cycle data by user email
router.get('/menstrualcycle', async (req, res) => {
  try {
    const cycle = await MenstrualCycle.findOne({ email: req.query.email });
    if (!cycle) return res.status(404).json({ message: 'Menstrual cycle data not found' });
    res.json(cycle);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving menstrual cycle data' });
  }
});

// Add/update menstrual cycle data
router.post('/menstrualcycle', async (req, res) => {
  const { email, cycleStartDate, cycleLength, lastPeriodDate } = req.body;
  try {
    const cycle = await MenstrualCycle.findOneAndUpdate(
      { email },
      { cycleStartDate, cycleLength, lastPeriodDate },
      { upsert: true, new: true }
    );
    res.json(cycle);
  } catch (err) {
    res.status(500).json({ message: 'Error saving menstrual cycle data' });
  }
});

module.exports = router;
