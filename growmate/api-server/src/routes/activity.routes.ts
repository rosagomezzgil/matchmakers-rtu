import express from "express";
import { getAllActivities, getActivityById, addActivity } from "../controllers/activity.controller";

const router = express.Router();

router.get("/", getAllActivities);
router.get("/:id", getActivityById);
router.post("/add", addActivity);

export default router;  // Esto es necesario para poder importar este archivo correctamente
