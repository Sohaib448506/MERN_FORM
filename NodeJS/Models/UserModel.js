const mongoose = require("mongoose");
const signUpUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },

  password: { type: String, required: true },
  picture: { type: Buffer },
});

//Classes, Objects
const User = mongoose.model("User", signUpUserSchema);

module.exports = User;
