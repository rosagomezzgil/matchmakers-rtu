import { Request, Response } from "express";
import { Match } from "../models/match.model";
import { Activity } from "../models/activity.model";

// /discover → obtiene actividades aleatorias
export const discover = async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.aggregate([{ $sample: { size: 5 } }]);
    res.json(activities);
  } catch {
    res.status(500).json({ error: "Error al obtener recomendaciones" });
  }
};

// /like/:activityId → registra un like
export const likeActivity = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body; // suponemos que viene en el body
    const { activityId } = req.params;

    const match = await Match.create({ userId, activityId, liked: true });
    res.status(201).json(match);
  } catch {
    res.status(400).json({ error: "No se pudo registrar el like" });
  }
};

// /matches → muestra todos los matches
export const getMatches = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const matches = await Match.find({ userId });
    res.json(matches);
  } catch {
    res.status(500).json({ error: "Error al obtener matches" });
  }
};
