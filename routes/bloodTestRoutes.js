const express = require('express');
const router = express.Router();
const BloodTest = require('../models/bloodTest');

// GET all blood test data
router.get('/bloodtest/getall', async (req, res) => {
  try {
    const bloodTests = await BloodTest.find();
    res.status(200).json(bloodTests);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving all blood test data', error: err.message });
  }
});

// GET blood test data by ID
router.get('/bloodtest/:id', async (req, res) => {
  try {
    const bloodTest = await BloodTest.findById(req.params.id);
    if (!bloodTest) return res.status(404).json({ message: 'Blood test data not found' });
    res.status(200).json(bloodTest);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving blood test data by ID', error: err.message });
  }
});

// POST (add or update blood test data by email)
router.post('/bloodtest', async (req, res) => {
  const { email, thyroid, vitaminD, vitaminB, cholesterol } = req.body;
  try {
    const bloodTest = await BloodTest.findOneAndUpdate(
      { email }, // Filter by email
      { thyroid, vitaminD, vitaminB, cholesterol }, // Update fields
      { upsert: true, new: true } // Create if not exists, return updated doc
    );
    res.status(201).json(bloodTest);
  } catch (err) {
    res.status(500).json({ message: 'Error saving blood test data', error: err.message });
  }
});

// PUT/PATCH (update blood test data by ID)
router.patch('/bloodtest/update/:id', async (req, res) => {
  try {
    const updatedBloodTest = await BloodTest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return updated document
    );
    if (!updatedBloodTest) return res.status(404).json({ message: 'Blood test data not found' });
    res.status(200).json(updatedBloodTest);
  } catch (err) {
    res.status(400).json({ message: 'Error updating blood test data', error: err.message });
  }
});

// DELETE blood test data by ID
router.delete('/bloodtest/delete/:id', async (req, res) => {
  try {
    const deletedBloodTest = await BloodTest.findByIdAndDelete(req.params.id);
    if (!deletedBloodTest) return res.status(404).json({ message: 'Blood test data not found' });
    res.status(200).json({ message: 'Blood test data deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting blood test data', error: err.message });
  }
});

module.exports = router;
