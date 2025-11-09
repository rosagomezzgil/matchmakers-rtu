import { Request, Response } from "express";
import { addLike, removeLike, findUserLikes } from "../models";
import { getRecommendedActivities } from "../services/recommend.service";

function userIdFrom(req: Request) {
  // provisoire: support sans auth, accepte ?userId=...
  return (req as any).user?.id || (req.query.userId as string) || (req.body.userId as string);
}

export async function like(req: Request, res: Response) {
  try {
    const userId = userIdFrom(req);
    const { activityId, liked = true } = req.body as { activityId: string; liked?: boolean };
    if (!userId || !activityId) return res.status(400).json({ ok:false, error:"missing_ids" });
    const m = await addLike(userId, activityId, liked);
    res.json({ ok: true, match: m });
  } catch (e:any) {
    res.status(400).json({ ok:false, error: e.message });
  }
}

export async function dislike(req: Request, res: Response) {
  req.body.liked = false;
  return like(req, res);
}

export async function unlike(req: Request, res: Response) {
  try {
    const userId = userIdFrom(req);
    const { activityId } = req.body as { activityId: string };
    if (!userId || !activityId) return res.status(400).json({ ok:false, error:"missing_ids" });
    await removeLike(userId, activityId);
    res.json({ ok: true });
  } catch (e:any) {
    res.status(400).json({ ok:false, error: e.message });
  }
}

export async function likesOfUser(req: Request, res: Response) {
  const userId = userIdFrom(req);
  if (!userId) return res.status(400).json({ ok:false, error:"missing_userId" });
  const rows = await findUserLikes(userId);
  res.json(rows);
}

export async function discover(req: Request, res: Response) {
  const userId = userIdFrom(req);
  const limit = Number(req.query.limit ?? 10);
  if (!userId) return res.status(400).json({ ok:false, error:"missing_userId" });
  const items = await getRecommendedActivities(userId, limit);
  res.json(items);
}
