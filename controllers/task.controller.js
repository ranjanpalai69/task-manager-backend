const Task = require("../models/task.model")

// get users all task according to user id 
const getTasks=async(req,res)=>{
    try{
     const tasks=await Task.find({userId:req.userId});
     res.status(200).json(tasks);
    }catch(error){
    console.log(error);
    res.status(500).json({message:"something went wrong",error}) 
    }
}

// get particular task by task id 
const getTaskById = async (req, res) => {
    const id = req.params.id;
    try {
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json(task);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to retrieve task", error: error });
    }
  };

//   create a new task 
const createTask=async(req,res)=>{
    const {title,description,status}=req.body;
    try{
      const existingTask=await Task.findOne({title,description,userId:req.userId});
      if(existingTask){
         return res.status(400).json({message:"Task already exists"})
      }
      const task=new Task({title,description,status,userId:req.userId});
      await task.save();
      res.status(201).json({message:"Task saved successfully",data:task});
    }catch(error){
     console.log(error);
     res.status(500).json({message:"Failed to add task",error:error});
    }
}

// update a particular task 
const updateTask=async(req,res)=>{
   const id=req.params.id;
   const {title,description,status}=req.body;
   const newTask={
    title,description,status,userId:req.userId
   }
   try {
    await Task.findByIdAndUpdate(id, newTask,{new:true});
    res.status(200).json({message:"Task updated successfully",data:{...newTask,_id:id}});
   } catch (error) {
    console.log(error);
    res.status(500).json({message:"failed to update task",error:error});
   }
}

// delete the particular task 
const deleteTask=async(req,res)=>{
    const id=req.params.id;
    try {
        const task = await Task.findByIdAndRemove(id);
        res.status(202).json({message:"task deleted",data:task});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"failed to delete task",error:error});
    }
 }


module.exports ={getTasks,createTask,updateTask,deleteTask,getTaskById}