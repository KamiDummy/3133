const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

// ============================================
// ENDPOINT 1 & 3 COMBINED: GET all restaurants (with optional sorting)
// URL: http://localhost:3000/restaurants (gets all with all columns)
// URL: http://localhost:3000/restaurants?sortBy=ASC (sorted ascending)
// URL: http://localhost:3000/restaurants?sortBy=DESC (sorted descending)
// Method: GET
// ============================================
router.get("/", async (req, res) => {
  try {
    // Check if there's a sortBy query parameter
    const sortOrder = req.query.sortBy;

    // If sortBy exists, return sorted results with selected columns
    if (sortOrder) {
      // ENDPOINT 3: Sorting logic
      const sortValue = sortOrder === "ASC" ? 1 : -1;

      const restaurants = await Restaurant.find()
        .select("cuisine name city restaurant_id") // Only these columns
        .sort({ restaurant_id: sortValue }); // Sort by restaurant_id

      return res.json(restaurants);
    }

    // ENDPOINT 1: No sortBy parameter, return all restaurants with all columns
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============================================
// ENDPOINT 2: GET restaurants by cuisine type
// URL: http://localhost:3000/restaurants/cuisine/Japanese
// URL: http://localhost:3000/restaurants/cuisine/Bakery
// Method: GET
// Returns: All restaurants matching the cuisine type
// ============================================
router.get("/cuisine/:cuisineName", async (req, res) => {
  try {
    // req.params.cuisineName captures the value from the URL
    // Example: /cuisine/Japanese → cuisineName = "Japanese"
    const cuisineName = req.params.cuisineName;

    // Find restaurants where the cuisine field matches the cuisineName
    // { cuisine: cuisineName } is the filter/query object
    const restaurants = await Restaurant.find({ cuisine: cuisineName });

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============================================
// ENDPOINT 4: GET Delicatessen restaurants NOT in Brooklyn
// URL: http://localhost:3000/restaurants/Delicatessen
// Method: GET
// Returns: Delicatessen restaurants where city is NOT Brooklyn
// Selected columns: cuisines, name, city (but exclude _id)
// Sorted by: name in ascending order
// ============================================
router.get("/Delicatessen", async (req, res) => {
  try {
    // Find restaurants where:
    // - cuisine equals "Delicatessen" AND
    // - city is NOT equal to "Brooklyn"
    const restaurants = await Restaurant.find({
      cuisine: "Delicatessen",
      city: { $ne: "Brooklyn" }, // $ne = "not equal" operator in MongoDB
    })
      .select("cuisine name city -_id") // Select these fields, exclude _id with the minus sign
      .sort({ name: 1 }); // Sort by name ascending (1 = ASC)

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export the router so server.js can use it
module.exports = router;
