// ============================================
// FULL STACK DEVELOPMENT II - LAB 03
// MongoDB + Mongoose + Express REST API
// Restaurant Database Application
// ============================================

// 1. Import required packages
const express = require("express"); // Web framework for building REST APIs
const mongoose = require("mongoose"); // ODM (Object Data Modeling) library for MongoDB

// 2. Create Express application instance
const app = express();

// 3. Middleware - tells Express to automatically parse incoming JSON in request bodies
// Without this, you couldn't receive JSON data from POST/PUT requests
app.use(express.json());

// 4. MongoDB Atlas connection string
// IMPORTANT: Replace <db_password> with your actual password
// The connection string includes:
// - Username: kroshinci_db_user
// - Cluster URL: cluster0.qbpahzc.mongodb.net
// - Database name: db_lab3
const DB_CONNECTION_STRING =
  "mongodb+srv://kroshinci_db_user:byAViykYBBBsgP3m@cluster0.qbpahzc.mongodb.net/db_lab3?appName=Cluster0";

// 5. Connect to MongoDB using Mongoose
// This is asynchronous - it returns a Promise
// .then() runs if connection succeeds
// .catch() runs if connection fails
mongoose
  .connect(DB_CONNECTION_STRING)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((error) => console.log("❌ Error connecting to MongoDB:", error));

// 6. Import and use restaurant routes
// All routes defined in restaurantRoutes.js will be prefixed with '/restaurants'
// Example: router.get('/') in restaurantRoutes becomes http://localhost:3000/restaurants/
const restaurantRoutes = require("./routes/restaurantRoutes");
app.use("/restaurants", restaurantRoutes);

// 7. Start the server
// The server listens on port 3000 for incoming HTTP requests
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 API Endpoints:`);
  console.log(`   - GET http://localhost:${PORT}/restaurants`);
  console.log(`   - GET http://localhost:${PORT}/restaurants?sortBy=ASC`);
  console.log(`   - GET http://localhost:${PORT}/restaurants?sortBy=DESC`);
  console.log(`   - GET http://localhost:${PORT}/restaurants/cuisine/Japanese`);
  console.log(`   - GET http://localhost:${PORT}/restaurants/Delicatessen`);
});
