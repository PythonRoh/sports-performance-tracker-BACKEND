import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// SIGN UP
export const signup = async (req, res) => {
  console.log("SIGNUP BODY:", req.body);
  console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);

  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (error) {
    console.error("SIGNUP ERROR :", error);
    res.status(500).json({
      message: "Signup failed",
      error: error.message,
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user: { id: user._id, name: user.name, email } });
  } catch (error) {
    console.error("LOGIN ERROR :", error);
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};
