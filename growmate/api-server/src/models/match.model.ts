import mongoose, { Schema, Document } from "mongoose";

export interface IMatch extends Document {
  userId: string;
  activityId: string;
  liked: boolean;
}

const MatchSchema = new Schema<IMatch>({
  userId: { type: String, required: true },
  activityId: { type: String, required: true },
  liked: { type: Boolean, default: false }
}, { versionKey: false });

export const Match = mongoose.model<IMatch>("Match", MatchSchema);
