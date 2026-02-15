const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /users - Insert a new user with validation
router.post("/users", async (req, res) => {
  try {
    // Create a new user from request body
    const newUser = new User(req.body);

    // Save to database (mongoose will run validation)
    const savedUser = await newUser.save();

    // Send back the saved user
    res.status(201).json(savedUser);
  } catch (error) {
    // If validation fails, send error messages
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
