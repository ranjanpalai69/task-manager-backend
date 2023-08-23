const express=require("express");
const { auth } = require("../middlewares/auth.middleware");
const { getTasks, createTask, updateTask, deleteTask, getTaskById } = require("../controllers/task.controller");

const taskRouter=express.Router();


taskRouter.get("/",auth,getTasks);

taskRouter.get("/:id",auth,getTaskById);

taskRouter.post("/create",auth,createTask)

taskRouter.put("/:id",auth,updateTask);

taskRouter.delete("/:id",auth,deleteTask);


module.exports ={taskRouter}