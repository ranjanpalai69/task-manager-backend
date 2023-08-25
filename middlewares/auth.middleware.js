require("dotenv").config();
const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{
    try {
        let token = req.headers.authorization;
        if(token){
            token=token.split(" ")[1];
            const user=jwt.verify(token,process.env.SECRET_KEY);
            req.userId=user.id;
        }else{
            res.status(401).json({message:"user is not authorized"})
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message:"user is not authorized",error});
    }
}

module.exports={auth}