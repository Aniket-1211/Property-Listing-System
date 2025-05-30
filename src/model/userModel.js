import mongoose from "mongoose";

   // Creating user schema 
const userSchema=new mongoose.Schema({
   name:String,
   email:String,
   password:String,
   favourites:[String],
   recommended:[String]
})
   // Creating user model
const userModel=mongoose.model('User',userSchema);
export default userModel;