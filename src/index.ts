import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// route imports
import waitlistRoute from "./routes/waitlist.route";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "server is live",
  });
});

app.use("/waitlist", waitlistRoute);

const PORT = process.env.PORT as string;
const MongoDBURI = process.env.MongoDBURI as string;

async function startServer() {
  try {
    await mongoose.connect(MongoDBURI).then(() => {
      console.log("mongoDB connected");
    });

    app.listen(PORT, () => {
      console.log("server is live");
    });
  } catch (error) {
    console.log("something went wrong", error);
    process.exit(1);
  }
}

startServer();
