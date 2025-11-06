import express from "express";
import { discover, likeActivity, getMatches } from "../controllers/match.controller";

const router = express.Router();

router.get("/discover", discover);
router.post("/like/:activityId", likeActivity);
router.get("/matches", getMatches);

export default router;  // Esto es necesario para poder importar este archivo correctamente
