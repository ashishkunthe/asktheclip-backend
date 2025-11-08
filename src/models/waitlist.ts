import mongoose, { Schema } from "mongoose";

const waitlistModel = new Schema({
  email: String,
  name: String,
});

const WaitList = mongoose.model("Waitlist", waitlistModel);

export default WaitList;
