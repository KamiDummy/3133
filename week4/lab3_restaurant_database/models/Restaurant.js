const mongoose = require("mongoose");

// Define the schema - this tells Mongoose what structure our restaurant data should have
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Every restaurant MUST have a name
  },
  cuisine: {
    type: String,
    required: true, // Every restaurant MUST have a cuisine type
  },
  city: {
    type: String,
    required: true, // Every restaurant MUST have a city
  },
  restaurant_id: {
    type: String,
    required: true, // Every restaurant MUST have an ID
  },
  address: {
    // Address is an embedded object - these fields are optional because some restaurants don't have complete addresses
    building: String,
    street: String,
    zipcode: String,
  },
});

// Create the model from the schema
// First argument 'Restaurant' - Mongoose will look for a collection called 'restaurants' (lowercase, plural)
// Second argument is the schema we defined above
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// Export so other files can use this model
module.exports = Restaurant;
