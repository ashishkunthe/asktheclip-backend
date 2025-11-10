import { Router } from "express";
import { z } from "zod";
import User from "../models/User";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const route = Router();

route.post("/signup", async (req, res) => {
  const signupSchema = z.object({
    name: z.string().min(2, "Name should be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const validated = signupSchema.safeParse(req.body);

  if (!validated.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: validated.error,
    });
  }

  const { email, password, name } = validated.data;
  try {
    const checkEmail = await User.findOne({ email: email });

    if (checkEmail) {
      return res.json({
        message: "You are already registered signin pls",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email,
      password: passwordHash,
      name: name,
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string
    );

    res.json({ message: "You registered now", token: token });
  } catch (error) {
    console.log("something went wrong", error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

export default route;
