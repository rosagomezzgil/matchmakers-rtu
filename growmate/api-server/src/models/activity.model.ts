import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { Match } from "./match.model";

export type Difficulty = "easy" | "medium" | "hard";
export type Visibility = "public" | "private";
export type ActivityStatus = "active" | "cancelled" | "finished";

export interface IActivity extends Document {
  title: string;
  category: string;
  description?: string;
  date_time?: Date;
  location: string;
  difficulty?: Difficulty;
  capacity?: number;
  tags: string[];
  visibility: Visibility;
  fee_flag: boolean;
  status: ActivityStatus;
  organizer_id?: Types.ObjectId;
  participants: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    date_time: { type: Date },
    location: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "easy" },
    capacity: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    visibility: { type: String, enum: ["public", "private"], default: "public" },
    fee_flag: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "cancelled", "finished"], default: "active" },
    organizer_id: { type: Schema.Types.ObjectId, ref: "User" },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

ActivitySchema.index({ location: 1, category: 1, status: 1 });
ActivitySchema.index({ tags: 1 });

// Cascade delete matches when an activity is removed
ActivitySchema.pre("findOneAndDelete", async function (next) {
  const doc: any = await this.model.findOne(this.getFilter()).select("_id");
  if (doc?._id) {
    await Match.deleteMany({ activityId: doc._id });
  }
  next();
});

export const Activity: Model<IActivity> =
  mongoose.models.Activity || mongoose.model<IActivity>("Activity", ActivitySchema);

// ===== Model helpers =====
export async function getAllActivities() {
  return Activity.find({ status: "active", visibility: "public" }).sort({ createdAt: -1 });
}

export async function getActivityById(id: string) {
  return Activity.findById(id);
}

export async function getActivitiesByCategory(category: string) {
  return Activity.find({ category, status: "active", visibility: "public" }).sort({ createdAt: -1 });
}

export async function createActivity(data: Partial<IActivity>) {
  if (!data?.title || !data?.category || !data?.location) {
    throw new Error("Missing required fields: title, category, location");
  }
  const act = new Activity({
    title: data.title,
    category: data.category,
    description: data.description ?? "",
    date_time: data.date_time,
    location: data.location,
    difficulty: data.difficulty ?? "easy",
    capacity: data.capacity ?? 0,
    tags: Array.isArray(data.tags) ? data.tags : [],
    visibility: data.visibility ?? "public",
    fee_flag: !!data.fee_flag,
    status: data.status ?? "active",
    organizer_id: data.organizer_id,
  });
  return act.save();
}

/**
 * Activities the user hasn't acted on yet (no Match with this user).
 */
export async function getUnlikedActivities(userId: string, limit = 20) {
  const seen = await Match.find({ userId }).select("activityId -_id");
  const seenIds = seen.map((m) => m.activityId);
  const query: any = {
    status: "active",
    visibility: "public",
    ...(seenIds.length ? { _id: { $nin: seenIds } } : {}),
  };
  return Activity.find(query).limit(limit).sort({ createdAt: -1 });
}
