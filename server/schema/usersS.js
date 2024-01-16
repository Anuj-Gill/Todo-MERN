const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  hash: String,
  salt: String,
  gender: String,
});

module.exports = mongoose.model("user", UserSchema);