// src/db.ts
import mongoose from "mongoose";

export const connectDB = async (uri: string) => {
  if (!uri) throw new Error("MONGO_URI no definido");
  // evita conectar dos veces si hay hot-reload
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(uri);
  console.log("✅ MongoDB connected");
};
