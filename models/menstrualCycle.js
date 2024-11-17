 
// models/menstrualCycle.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menstrualCycleSchema = new Schema({
  userProfileId: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  lastPeriodDate: { type: Date, required: true },
  cycleLength: { type: Number, required: true }, // Cycle length in days
  periodDuration: { type: Number, required: true }, // Duration in days
  date: { type: Date, default: Date.now },
});

const MenstrualCycle = mongoose.model('MenstrualCycle', menstrualCycleSchema);

module.exports = MenstrualCycle;
