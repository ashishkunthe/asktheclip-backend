import mongoose, { Schema } from "mongoose";

const userModel = new Schema({
  email: String,
  name: String,
});

const User = mongoose.model("User", userModel);
