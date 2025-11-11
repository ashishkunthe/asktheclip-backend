import mongoose, { Schema } from "mongoose";

const transcriptModel = new Schema(
  {
    videoUrl: { type: String, required: true },
    transcript: [{ time: String, text: String }],
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Transcript = mongoose.model("Transcript", transcriptModel);

export default Transcript;
