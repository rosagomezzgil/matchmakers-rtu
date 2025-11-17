import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  age?: number;
  city?: string;
  preferences: string[];
  bio?: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    age: { type: Number, min: 13, max: 120 },
    city: { type: String, default: "" },
    preferences: { type: [String], default: [] },
    bio: { type: String, default: "" },
    photo: { type: String, default: "" },
  },
  { timestamps: true }
);

// Useful indexes
UserSchema.index({ city: 1 });
UserSchema.index({ preferences: 1 });

// Password hashing
UserSchema.pre("save", async function (next) {
  const user = this as IUser;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

// ===== Model helpers =====
export async function createUser(data: Partial<IUser>) {
  if (!data?.email || !data?.password) {
    throw new Error("Missing required fields: email, password");
  }

  const normalizedEmail = data.email.trim().toLowerCase();
  const exists = await User.findOne({ email: normalizedEmail });
  if (exists) throw new Error("Email already registered");

  const derivedName =
    data.name?.trim() ||
    normalizedEmail.split("@")[0] ||
    "Growmate User";

  const user = new User({
    name: derivedName,
    email: normalizedEmail,
    password: data.password,
    age: data.age,
    city: data.city ?? "",
    preferences: Array.isArray(data.preferences) ? data.preferences : [],
    bio: data.bio ?? "",
    photo: data.photo ?? "",
  });
  return user.save();
}

export async function findUserByEmail(email: string) {
  return User.findOne({ email: email.trim().toLowerCase() });
}

export async function updatePreferences(userId: string, prefs: string[]) {
  return User.findByIdAndUpdate(userId, { $set: { preferences: prefs ?? [] } }, { new: true });
}

export async function getProfile(userId: string) {
  return User.findById(userId).select("name age city preferences bio photo createdAt updatedAt");
}
