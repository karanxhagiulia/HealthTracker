// Import required modules
const express = require('express');
const mongoose = require('mongoose'); // Use mongoose instead of MongoClient
const cors = require('cors');

// Import route files
const userProfileRoutes = require('./routes/userProfileRoutes');
const healthMetricsRoutes = require('./routes/healthMetricsRoutes');
const bloodTestRoutes = require('./routes/bloodTestRoutes');
const menstrualCycleRoutes = require('./routes/menstrualCycleRoutes');

// Initialize the app calling the express fnction
const app = express();

// Middleware
app.use(cors()); // Allow requests from different origins
app.use(express.json()); // To parse incoming JSON data

// Test route to verify routing works
app.get('/api/test', (req, res) => {
  res.send('Test route working!');
});

// Use the routes
app.use('/api', userProfileRoutes);
app.use('/api', healthMetricsRoutes);
app.use('/api', bloodTestRoutes);
app.use('/api', menstrualCycleRoutes);

// MongoDB connection string
const mongoURI = "mongodb+srv://karanxhagiulia:pIqzQlgtYcXnt0nA@cluster0.znov9.mongodb.net/HealthTracker?retryWrites=true&w=majority";

// Mongoose connection options with increased timeouts as I had issues with this
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,  // 30 seconds to connect
  socketTimeoutMS: 45000,           // 45 seconds for socket connection
};

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, options)
  .then(() => { //starts the server once the connection is successful
    console.log("Successfully connected to MongoDB Atlas");

    // Start the server after successful connection
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => { // logs any errors encountered while trying to connect
    console.error("Error connecting to MongoDB Atlas:", error);
  });

module.exports = mongoose; // Export mongoose connection if needed in routes
