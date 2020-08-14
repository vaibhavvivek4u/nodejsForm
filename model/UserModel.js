const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    phone: Number,
    image: String,
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
