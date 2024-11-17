 
// models/healthMetrics.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const healthMetricsSchema = new Schema({
  userProfileId: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  weight: { type: Number, required: true }, // Weight in kilograms
  height: { type: Number, required: true }, // Height in centimeters
  bloodPressure: { 
    systolic: { type: Number, required: true },
    diastolic: { type: Number, required: true }
  },
  heartRate: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const HealthMetrics = mongoose.model('HealthMetrics', healthMetricsSchema);

module.exports = HealthMetrics;
