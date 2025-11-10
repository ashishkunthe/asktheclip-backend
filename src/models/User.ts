import mongoose, { Schema } from "mongoose";

const userModel = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    videoUploaded: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userModel);

export default User;
