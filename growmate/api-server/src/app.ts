import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import userRoutes from "./routes/user.routes";  // Asegúrate de que este import sea correcto
import matchRoutes from "./routes/match.routes";
import activityRoutes from "./routes/activity.routes";

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // or the appropriate origin
  credentials: true
}));

app.use(express.json());

// Asegúrate de montar las rutas correctamente
app.use("/api/user", userRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/match", matchRoutes);

const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI || "";

connectDB(uri).then(() => {
  app.listen(port, () => {
    console.log(`✅ API running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error("Mongo error", err);
  process.exit(1);
});
