import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  name: String,
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true }
}, { versionKey: false });

export const User = mongoose.model<IUser>("User", UserSchema);
