 
// models/bloodTest.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bloodTestSchema = new Schema({
  userProfileId: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  testDate: { type: Date, required: true },
  thyroidLevels: { type: Number },
  vitaminDLevels: { type: Number },
  vitaminBLevels: { type: Number },
  cholesterol: {
    total: { type: Number },
    hdl: { type: Number },
    ldl: { type: Number },
    triglycerides: { type: Number },
  },
  date: { type: Date, default: Date.now },
});

const BloodTest = mongoose.model('BloodTest', bloodTestSchema);

module.exports = BloodTest;
