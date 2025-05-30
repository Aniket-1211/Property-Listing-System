import jwt from 'jsonwebtoken'
import userModel from '../model/userModel.js';
const authMiddleware=async (req,res,next)=>{
    const token=req.cookies.token;
       // if token  is not present inside cookies
    if(!token){
       return res.status(401).send('You have been logged out.');
    }
        // verifying token 
    const {email,password,userId}=jwt.verify(token,'JWT_SECRET');

       // checking if user exist in db with email contained by token
    const user=await userModel.findOne({email});
    if(!user){
        return res.status(401).send('Invalid Token');
    }
    if(password!=user.password){
        return res.status(401).send('Invalid token');
    }

    
        // Adding logged in user ID in req for future reference 
    req.userId=userId;
    
    next();
}
export default authMiddleware;