const express=require("express");
const cors=require("cors");
const { userRouter } = require("./routes/user.routes");
const { taskRouter } = require("./routes/task.routes");
const { connection } = require("./config/database");
require("dotenv").config();

const PORT=process.env.PORT || 8081
const app=express();
app.use(cors())
app.use(express.json());




app.use("/user",userRouter);
app.use("/task",taskRouter)

app.get("/",(req,res)=>{
    res.send("home page ...")
})


app.listen(PORT,async()=>{
    try {
        await connection;
        console.log("server is running.");
   } catch (error) {
        console.log('error: ', error);
   }
})