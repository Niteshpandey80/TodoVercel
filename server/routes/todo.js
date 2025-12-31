import express from 'express';
import Todo from '../models/Todo.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET all todos for logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id });  // ✅ use req.user._id
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new todo
router.post('/', protect, async (req, res) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
      userId: req.user._id  // ✅ use req.user._id
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE todo
router.delete('/:id', protect, async (req, res) => {
  try {
    await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id  // ✅ use req.user._id
    });
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
