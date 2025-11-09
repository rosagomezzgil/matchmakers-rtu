import { Request, Response } from "express";
import { createUser, findUserByEmail, IUser } from "../models";

export async function signup(req: Request, res: Response) {
  try {
    const u = await createUser(req.body as Partial<IUser>);
    res.status(201).json({ ok: true, user: { id: u._id, email: u.email, name: u.name } });
  } catch (e:any) {
    res.status(400).json({ ok: false, error: e.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const u = await findUserByEmail(email);
    if (!u) return res.status(401).json({ ok: false, error: "invalid_credentials" });
    const ok = await u.comparePassword(password);
    if (!ok) return res.status(401).json({ ok: false, error: "invalid_credentials" });
    // JWT facultatif ici
    res.json({ ok: true, user: { id: u._id, email: u.email, name: u.name } });
  } catch (e:any) {
    res.status(400).json({ ok: false, error: e.message });
  }
}
