import { config } from "dotenv";
config({ override: true });

import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import userRoutes from "./routes/user.routes";

const app = express();

// ---- DIAGNÓSTICO: saber qué archivo se está ejecutando
console.log("Booting API from:", __filename);

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// ---- DIAGNÓSTICO: ruta para ver exactamente qué corre
app.get("/whoami", (_req, res) => {
  res.json({ file: __filename, cwd: process.cwd(), pid: process.pid });
});

// ---- HEALTH
app.get("/", (_req, res) => res.send("GrowMate API ✅ — prueba /api/health"));
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// ---- DIAGNÓSTICO: confirmar prefijo /api/user a nivel app
app.get("/api/user/ping", (_req, res) => res.json({ ok: true, where: "app" }));

// ---- MONTA LAS RUTAS DE USUARIO (signup/login)
app.use("/api/user", userRoutes);
// (opcional) si el front usa /api/auth también:
// app.use("/api/auth", userRoutes);

const port = Number(process.env.PORT) || 3000;
const uri = process.env.MONGO_URI || ""; // usamos tu variable MONGO_URI

connectDB(uri)
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ API running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Mongo error", err);
    process.exit(1);
  });

export default app;




/*
//import "dotenv/config";
import { config } from "dotenv";
config({ override: true }); // <— importante

import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import userRoutes from "./routes/user.routes";


const app = express();
//app.use(cors());
app.use(cors({
  origin: "http://localhost:5173", // Vite dev server
  credentials: true
}));

app.use(express.json());

// debug rápido para comprobar el .env
app.get("/api/debug/env", (_req, res) => {
  const uri = process.env.MONGO_URI || "";
  res.json({
    hasMongoUri: Boolean(uri),
    valueStartsWith: uri.slice(0, 14) // debería ser "mongodb+srv://"
  });
});

app.get("/", (_req, res) => res.send("GrowMate API ✅ — prueba /api/health"));
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));


// 🔐 MONTA LAS RUTAS DE USUARIO AQUÍ
app.use("/api/user", userRoutes);
// (opcional) si el front usa /api/auth, habilita también:
// app.use("/api/auth", userRoutes);

const port = Number(process.env.PORT) || 3000;
const uri = process.env.MONGO_URI || ""; // <- que no sea undefined

connectDB(uri)
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ API running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Mongo error", err);
    process.exit(1);
  });

export default app;
*/
