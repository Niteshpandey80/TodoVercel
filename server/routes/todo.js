import express from 'express'
import Todo from '../models/Todo.js'
import {protect} from "../middleware/auth.js"

const router = express.Router();
router.get('/' , protect , async(req,res)=>{
    try {
        const todos = await Todo.find({user:req.userId});
        res.json(todos);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
router.post("/" , protect , async(req,res)=>{
    try {
        const todo = await Todo.create({
            text:req.body.text , 
            user:req.userId
        })
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});
router.delete('/:id' , protect , async(req,res)=>{
    try {
        await Todo.findOneAndDelete({
            _id:req.params.id,
            user:req.userId
        })
        res.json({message:"Todo deleted"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
export default router;