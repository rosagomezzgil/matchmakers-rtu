import { Request, Response } from "express";
import {
  getAllActivities, getActivityById, createActivity, getActivitiesByCategory, IActivity
} from "../models";

export async function list(req: Request, res: Response) {
  const { category } = req.query as { category?: string };
  const data = category ? await getActivitiesByCategory(category) : await getAllActivities();
  res.json(data);
}

export async function detail(req: Request, res: Response) {
  const doc = await getActivityById(req.params.id);
  if (!doc) return res.status(404).json({ ok: false, error: "not_found" });
  res.json(doc);
}

export async function add(req: Request, res: Response) {
  try {
    const doc = await createActivity(req.body as Partial<IActivity>);
    res.status(201).json({ ok: true, id: doc._id });
  } catch (e:any) {
    res.status(400).json({ ok: false, error: e.message });
  }
}
