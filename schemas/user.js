const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true, // validator
    unique: true, // validator
    lowercase: true, // option
  },
  phone_number: {
    type: String,
    unique: true,
  },
  is_active: Boolean,
  salary: Number,
});

module.exports = mongoose.model("User", UserSchema);
