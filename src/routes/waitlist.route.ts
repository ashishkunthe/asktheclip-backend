import { Router } from "express";
import WaitList from "../models/waitlist";

const route = Router();

route.post("/", async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name)
    return res.json({ message: "email and name are required field" });
  try {
    const checkUserInList = await WaitList.findOne({ email: email });

    if (checkUserInList) {
      return res.json({ message: "You already in waitlist thankyou" });
    }

    await WaitList.create({
      name: name,
      email: email,
    });

    res.json({
      message: "Congrats! you are in waitlist, Will contact you soon ",
    });
  } catch (e) {
    console.log("error message please find here", e);
    res.status(500).json({
      message: "something went wrong!try again",
    });
  }
});

export default route;
