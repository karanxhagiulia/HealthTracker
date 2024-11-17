const express = require('express');
const router = express.Router();
const HealthMetrics = require('../models/healthMetrics');

// GET all health metrics
router.get('/healthmetrics/getall', async (req, res) => {
  try {
    const metrics = await HealthMetrics.find();
    res.status(200).json(metrics);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving all health metrics', error: err.message });
  }
});

// GET health metrics by ID
router.get('/healthmetrics/:id', async (req, res) => {
  try {
    const metric = await HealthMetrics.findById(req.params.id);
    if (!metric) return res.status(404).json({ message: 'Health metrics not found' });
    res.status(200).json(metric);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving health metrics by ID', error: err.message });
  }
});

// POST (add new health metrics or update existing by userProfileId)
router.post('/healthmetrics', async (req, res) => {
  const { userProfileId, weight, height, bloodPressure, heartRate } = req.body;
  try {
    const metrics = await HealthMetrics.findOneAndUpdate(
      { userProfileId }, // Filter by userProfileId
      { weight, height, bloodPressure, heartRate }, // Update fields
      { upsert: true, new: true } // Create if not exists, return updated doc
    );
    res.status(201).json(metrics);
  } catch (err) {
    res.status(500).json({ message: 'Error saving health metrics', error: err.message });
  }
});

// PATCH (update health metrics by ID)
router.patch('/healthmetrics/update/:id', async (req, res) => {
  try {
    const updatedMetric = await HealthMetrics.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return updated document
    );
    if (!updatedMetric) return res.status(404).json({ message: 'Health metrics not found' });
    res.status(200).json(updatedMetric);
  } catch (err) {
    res.status(400).json({ message: 'Error updating health metrics', error: err.message });
  }
});

// DELETE health metrics by ID
router.delete('/healthmetrics/delete/:id', async (req, res) => {
  try {
    const deletedMetric = await HealthMetrics.findByIdAndDelete(req.params.id);
    if (!deletedMetric) return res.status(404).json({ message: 'Health metrics not found' });
    res.status(200).json({ message: 'Health metrics deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting health metrics', error: err.message });
  }
});

module.exports = router;
