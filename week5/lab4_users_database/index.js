const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/UserRoutes");

const app = express();
const PORT = 8081;

// Parse JSON request body
app.use(express.json());

// MongoDB connection string
const DB_CONNECTION =
  "mongodb+srv://kroshinci_db_user:byAViykYBBBsgP3m@cluster0.qbpahzc.mongodb.net/lab4?appName=Cluster0";

// Use user routes
app.use(userRouter);

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);

  // Connect to MongoDB
  mongoose
    .connect(DB_CONNECTION)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB: " + error);
    });
});
