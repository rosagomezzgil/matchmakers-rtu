// src/services/recommend.service.ts
import { Types } from "mongoose";
import { Activity } from "../models/activity.model";
import { Match } from "../models/match.model";
import { User } from "../models/user.model";

/**
 * Recommandations:
 * - Exclut activités déjà vues (Match).
 * - Pondère préférences (catégorie + tags) > ville.
 * - Insensible à la casse pour catégorie/tags.
 * - Masque les champs de scoring dans la réponse.
 */
export async function getRecommendedActivities(userId: string, limit = 10) {
  const user = await User.findById(userId).lean();
  if (!user) return [];

  const seenDocs = await Match.find({ userId: new Types.ObjectId(userId) })
    .select("activityId -_id")
    .lean();
  const seenIds = seenDocs.map((d) => d.activityId);

  const prefs = Array.isArray(user?.preferences) ? user.preferences : [];
  const prefsLower = prefs.map((p) => String(p).toLowerCase());
  const hasPrefs = prefsLower.length > 0;

  const city = user?.city ?? "";

  const pipeline: any[] = [
    { $match: { status: "active", visibility: "public" } },
    ...(seenIds.length ? [{ $match: { _id: { $nin: seenIds } } }] : []),

    // Normalisation (lowercase) pour matching robuste
    {
      $addFields: {
        _cat_l: { $toLower: "$category" },
        _tags_l: {
          $map: { input: "$tags", as: "t", in: { $toLower: "$$t" } },
        },
      },
    },

    // Scores (prefs > city) + tiebreak aléatoire
    {
      $addFields: {
        score_prefs: hasPrefs
          ? {
              $add: [
                { $cond: [{ $in: ["$_cat_l", { $literal: prefsLower }] }, 1, 0] },
                {
                  $size: {
                    $setIntersection: ["$_tags_l", { $literal: prefsLower }],
                  },
                },
              ],
            }
          : 0,
        score_city: city ? { $cond: [{ $eq: ["$location", city] }, 1, 0] } : 0,
        rand: { $rand: {} },
      },
    },
    {
      $addFields: {
        score: {
          $add: [
            { $multiply: ["$score_prefs", 3] },
            { $multiply: ["$score_city", 2] },
          ],
        },
      },
    },

    { $sort: { score: -1, rand: 1 } },
    { $limit: limit },

    // Nettoyage des champs techniques
    { $project: { _cat_l: 0, _tags_l: 0, score: 0, score_prefs: 0, score_city: 0, rand: 0 } },
  ];

  return Activity.aggregate(pipeline);
}
