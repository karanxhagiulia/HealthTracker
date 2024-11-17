 
// models/userProfile.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the user profile
const userProfileSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  birthDate: { type: Date, required: true },
});

// Create the model from the schema
const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
