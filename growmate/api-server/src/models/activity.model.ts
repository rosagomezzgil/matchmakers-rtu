import mongoose, { Schema, Document } from "mongoose";

export interface IActivity extends Document {
  title: string;
  description?: string;
  category?: string;
  createdAt: Date;
}

const ActivitySchema = new Schema<IActivity>({
  title: { type: String, required: true },
  description: String,
  category: String,
  createdAt: { type: Date, default: Date.now }
}, { versionKey: false });

export const Activity = mongoose.model<IActivity>("Activity", ActivitySchema);
