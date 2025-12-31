import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todo.js";

dotenv.config();

const app = express();

// ✅ CORS (works for localhost + vercel)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://todo-vercel-mu.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

// 🔥 CONNECT DB ON DEMAND (SAFE FOR SERVERLESS)
connectDB();

// 🔥 EXPORT APP (NO app.listen)
export default app;
