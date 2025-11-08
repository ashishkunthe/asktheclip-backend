import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "server is live",
  });
});

const PORT = process.env.PORT as string;
const MongoDBURI = process.env.MongoDBURI as string;

app.listen(PORT, async () => {
  await mongoose.connect(MongoDBURI).then(() => {
    console.log("mongoDB connected");
  });
  console.log("server is live");
});
