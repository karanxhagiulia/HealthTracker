const express = require('express');
const router = express.Router();
const UserProfile = require('../models/userProfile'); // Path to the Userprofile model

// GET all user profiles
router.get('/userprofile/getall', async (req, res) => {
  console.log('GET /userprofile/getall hit');
  try {
    const profiles = await UserProfile.find(); // Fetch all profiles from MongoDB
    console.log(profiles); // Log the profiles to see if they are being fetched
    res.status(200).json(profiles); // Return profiles as JSON
  } catch (error) {
    console.error('Error fetching profiles:', error); // Log the error details
    res.status(500).json({ error: 'Error fetching profiles' }); // Send a detailed error response
  }
});


// GET a user profile by ID
router.get('/userprofile/:id', async (req, res) => {
  console.log(`GET /userprofile/${req.params.id} hit`);
  try {
    const profile = await UserProfile.findById(req.params.id); // Find profile by ID
    if (!profile) return res.status(404).json({ error: 'Profile not found' }); // Profile not found
    res.status(200).json(profile); // Return the profile as JSON
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' }); // Handle errors
  }
});

// POST (create a new user profile)
router.post('/userprofile/add', async (req, res) => {
  console.log('POST /userprofile/add hit');
  try {
    const newProfile = new UserProfile(req.body); // Create new profile using the request body
    await newProfile.save(); // Save the new profile to the database
    res.status(201).json(newProfile); // Return the newly created profile
  } catch (error) {
    res.status(400).json({ error: 'Error creating profile' }); // Handle errors
  }
});

// PUT/PATCH (update an existing user profile by ID)
router.patch('/userprofile/update/:id', async (req, res) => {
  console.log(`PATCH /userprofile/update/${req.params.id} hit`);
  try {
    const updatedProfile = await UserProfile.findByIdAndUpdate(
      req.params.id, // Find profile by ID
      req.body, // The updated data
      { new: true } // Return the updated profile
    );
    if (!updatedProfile) return res.status(404).json({ error: 'Profile not found' }); // Profile not found
    res.status(200).json(updatedProfile); // Return the updated profile
  } catch (error) {
    res.status(400).json({ error: 'Error updating profile' }); // Handle errors
  }
});

// DELETE (delete a user profile by ID)
router.delete('/userprofile/delete/:id', async (req, res) => {
  console.log(`DELETE /userprofile/delete/${req.params.id} hit`);
  try {
    const deletedProfile = await UserProfile.findByIdAndDelete(req.params.id); // Delete profile by ID
    if (!deletedProfile) return res.status(404).json({ error: 'Profile not found' }); // Profile not found
    res.status(200).json({ message: 'Profile deleted' }); // Return success message
  } catch (error) {
    res.status(500).json({ error: 'Error deleting profile' }); // Handle errors
  }
});

module.exports = router; // Export the router
