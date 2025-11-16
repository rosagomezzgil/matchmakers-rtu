import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import dotenv from "dotenv";

import userRoutes from "./routes/user.routes";  // Asegúrate de que este import sea correcto
import matchRoutes from "./routes/match.routes";
import activityRoutes from "./routes/activity.routes";

dotenv.config();

const app = express();

app.get('/api/ping', (req, res) => {
  res.json({ ok: true, msg: "pong" });
});


app.use(cors({
  origin: "http://localhost:5173", // or the appropriate origin
  credentials: true
}));

app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));


// Asegúrate de montar las rutas correctamente
app.use("/api/user", userRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/match", matchRoutes);
app.get("/", (_req, res) => {
  res.json({ ok: true, name: "Growmate API", routes: ["/health","/api/user","/api/activity","/api/match"] });
});

// 404
app.use((req, res) => {
  res.status(404).json({ ok: false, error: "not_found", path: req.path });
});

// Error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ ok: false, error: "internal_error" });
});

const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI || "";

console.log("🔍 MONGO_URI =", JSON.stringify(uri));
connectDB(uri).then(() => {
  app.listen(port, () => {
    console.log(`✅ API running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error("Mongo error", err);
  process.exit(1);
});

app.get('/api/ping', (req, res) => {
  res.json({ ok: true, msg: "pong" });
});

