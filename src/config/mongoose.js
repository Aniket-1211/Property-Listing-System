   // Mongo Cloud Configuration 

import mongoose from "mongoose";

const url = "mongodb+srv://aniket66patel:YdHZbzndBd35RWDD@property.gdrbh2r.mongodb.net/?retryWrites=true&w=majority&appName=Property";

 const  connectMongo=()=>{
    mongoose.connect(url).
    then(()=>{
      console.log("Mongo Cloud connected successfully");
    }).
    catch(err=>console.log("Mongo Cloud not connected err->"+err));
}
export default connectMongo;