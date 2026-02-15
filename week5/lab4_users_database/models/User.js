const mongoose = require("mongoose");

// Create User Schema with validation
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: [4, "Username must be at least 4 characters"],
    maxlength: [100, "Username must be at most 100 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  address: {
    street: {
      type: String,
      required: [true, "Street is required"],
      trim: true,
    },
    suite: {
      type: String,
      required: [true, "Suite is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      match: [/^[a-zA-Z ]+$/, "City must contain only alphabets and spaces"],
    },
    zipcode: {
      type: String,
      required: [true, "Zipcode is required"],
      trim: true,
      match: [/^\d{5}-\d{4}$/, "Zipcode must be in format DDDDD-DDDD (e.g. 12345-1234)"],
    },
    geo: {
      lat: {
        type: String,
        required: [true, "Latitude is required"],
      },
      lng: {
        type: String,
        required: [true, "Longitude is required"],
      },
    },
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    trim: true,
    match: [/^\d-\d{3}-\d{3}-\d{4}$/, "Phone must be in format D-DDD-DDD-DDDD (e.g. 1-123-123-1234)"],
  },
  website: {
    type: String,
    required: [true, "Website is required"],
    trim: true,
    match: [/^https?:\/\/.+/, "Website must be a valid URL starting with http:// or https://"],
  },
  company: {
    name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    catchPhrase: {
      type: String,
      required: [true, "Company catchPhrase is required"],
      trim: true,
    },
    bs: {
      type: String,
      required: [true, "Company bs is required"],
      trim: true,
    },
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
