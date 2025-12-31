import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todo.js";

dotenv.config();

const app = express();

// ✅ Allow local dev + deployed frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://todo-vercel-valf.vercel.app"
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

connectDB();

export default app; // NO app.listen() for Vercel serverless
