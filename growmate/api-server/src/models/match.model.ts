import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { User } from "./user.model";
import { Activity } from "./activity.model";

export interface IMatch extends Document {
  userId: Types.ObjectId;
  activityId: Types.ObjectId;
  liked: boolean;
  matchDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MatchSchema = new Schema<IMatch>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    activityId: { type: Schema.Types.ObjectId, ref: "Activity", required: true },
    liked: { type: Boolean, default: true },
    matchDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Ensure single record per user/activity pair
MatchSchema.index({ userId: 1, activityId: 1 }, { unique: true });

// Cascade delete matches when a user is removed
User.schema.pre("findOneAndDelete", async function (next) {
  const doc: any = await this.model.findOne(this.getFilter()).select("_id");
  if (doc?._id) {
    await Match.deleteMany({ userId: doc._id });
  }
  next();
});

export const Match: Model<IMatch> = mongoose.models.Match || mongoose.model<IMatch>("Match", MatchSchema);

// ===== Model helpers =====
export async function addLike(userId: string, activityId: string, like: boolean = true) {
  return Match.findOneAndUpdate(
    { userId, activityId },
    { $set: { liked: like, matchDate: new Date() } },
    { upsert: true, new: true }
  );
}

export async function removeLike(userId: string, activityId: string) {
  return Match.findOneAndDelete({ userId, activityId });
}

export async function findUserLikes(userId: string) {
  return Match.find({ userId, liked: true }).populate("activityId");
}

/**
 * Activities matching the user's preferences (category or tags).
 * Excludes activities already interacted with by the user.
 */
export async function findMatches(userId: string) {
  const user = await User.findById(userId).lean();
  if (!user) return [];
  const prefs = user.preferences ?? [];

  const seen = await Match.find({ userId }).select("activityId -_id");
  const seenIds = seen.map((m) => m.activityId);

  const query: any = {
    status: "active",
    visibility: "public",
    ...(seenIds.length ? { _id: { $nin: seenIds } } : {}),
    ...(prefs.length
      ? { $or: [{ category: { $in: prefs } }, { tags: { $in: prefs } }] }
      : {}),
  };

  return Activity.find(query).limit(20);
}
