import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function signup(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "Missing fields" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = jwt.sign({ sub: user._id, email }, process.env.JWT_SECRET!, { expiresIn: "7d" });
    res.status(201).json({ token, user: { _id: user._id, name: user.name, email: user.email }});
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Signup failed" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ sub: user._id, email }, process.env.JWT_SECRET!, { expiresIn: "7d" });
    res.json({ token, user: { _id: user._id, name: user.name, email: user.email }});
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Login failed" });
  }
}
