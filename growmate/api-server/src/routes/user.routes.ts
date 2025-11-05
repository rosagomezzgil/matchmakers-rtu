/*
import { Router } from "express";
import { signup, login } from "../controllers/user.controller";

const r = Router();
r.post("/signup", signup);
r.post("/login", login);

export default r;

*/


import { Router } from "express";
import { signup, login } from "../controllers/user.controller";

const r = Router();

// PING DEL ROUTER (debug temporal)
r.get("/ping", (_req, res) => res.json({ router: true }));

r.post("/signup", signup);
r.post("/login", login);

export default r;
