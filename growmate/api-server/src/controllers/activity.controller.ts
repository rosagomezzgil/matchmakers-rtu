import { Request, Response } from "express";
import { Activity } from "../models/activity.model";

// Obtener todas las actividades
export const getAllActivities = async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener las actividades" });
  }
};

// Obtener una actividad por id
export const getActivityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    if (!activity) return res.status(404).json({ error: "Actividad no encontrada" });
    res.json(activity);
  } catch {
    res.status(400).json({ error: "ID inválido" });
  }
};

// Añadir una nueva actividad
export const addActivity = async (req: Request, res: Response) => {
  try {
    const { title, description, category } = req.body;
    const newActivity = new Activity({ title, description, category });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch {
    res.status(400).json({ error: "No se pudo crear la actividad" });
  }
};
