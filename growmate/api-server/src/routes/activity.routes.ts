// routes/activity.routes.ts
import { Router } from "express";
import { list, detail, add } from "../controllers/activity.controller";


const r = Router();

r.get("/", list);
r.get("/:id", detail);
r.post("/add", add);

export default r;