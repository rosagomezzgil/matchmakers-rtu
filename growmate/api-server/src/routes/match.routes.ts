// routes/match.routes.ts
import { Router } from "express";
import { like, dislike, unlike, likesOfUser, discover } from "../controllers/match.controller";


const r = Router();

r.get("/discover", discover);
r.get("/likes", likesOfUser);
r.post("/like", like);
r.post("/dislike", dislike);
r.post("/unlike", unlike);

export default r;