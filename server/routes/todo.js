import express from "express";
import Todo from "../models/Todo.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Get all todos for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new todo
router.post("/", protect, async (req, res) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
      userId: req.userId,
    });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete todo
router.delete("/:id", protect, async (req, res) => {
  try {
    await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
