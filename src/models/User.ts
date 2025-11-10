import mongoose, { Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  videoUploaded: number;
}

const userModel = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    googleId: { type: String, required: false },
    videoUploaded: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userModel);

export default User;
