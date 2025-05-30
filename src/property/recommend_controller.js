import userModel from "../model/userModel.js";
import { propertyModel } from "../model/propertyModel.js";
    // LoggedIn user want to recommend property another user
    // send recipient email and property in req.body
export const recommendProperty=async (req,res)=>{
    try{
        const userId=req.userId;
        let {email,propertyId}=req.body;

        // check if property with given id exist 
        const property=await propertyModel.findOne({propertyId});
        if(!property){
            return res.status(200).send(`Property with given propertyId : ${propertyId} does not exist . Please check again`)
        }

        // check if recipient with given email exist
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(200).send(`User with email : ${email} does not exist . Please check again`)
        }

        await userModel.updateOne(
            {email},
            { $push :{ recommended :propertyId}}
        )
        res.status(400).send(`Property with given propertyId ${propertyId} is recommend to ${email}`);    
    }catch(err){
        res.status(400).send(err);
    }
}