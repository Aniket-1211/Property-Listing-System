import mongoose, { Schema } from "mongoose";
import {data} from '../config/data.js'

    // Creating schema for property
const propertySchema=new mongoose.Schema({
    propertyId:{ type:String , required:true},
    title:{ type:String ,required:true},
    type:{ type:String ,required:true},
    price:{ type:Number ,required:true},
    state:{ type:String ,required:true},
    city:{ type:String ,required:true},
    areaSqFt:{ type:Number ,required:true},
    bedrooms:{ type:Number ,required:true},
    bathrooms:{ type:Number ,required:true},
    amenities:{ type:[String] ,required:true},
    furnished:{ type:String ,required:true},
    availableFrom:{ type:Date , required:true},
    listedBy:{ type:String ,required:true},
    tags:{ type:[String] ,required:true},
    colorTheme:{ type:String ,required:true},
    rating:{ type:Number ,required:true},
    isVerified:{ type:String ,required:true},
    listingType:{ type:String , enum:['rent','sale'], required:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId,default:null}
})

   // updating imported data like amenities and tags into string array
// const updatedData=data.map((p)=>{
//     return {
//         ...p,
//         propetyId:p.id,
//         amenities:p.amenities.split('|'),
//         tags:p.tags.split('|'),
//     }
// })

   // creating property model
export const propertyModel=mongoose.model('Property',propertySchema);

  // Function to insert provided data into db
const insertProvidedDataIntoDB=async()=>{
       // updating imported data like amenities and tags into string array
    const updatedData=data.map((p)=>{
        return {
            ...p,
            propertyId:p.id,
            amenities:p.amenities.split('|'),
            tags:p.tags.split('|'),
        }
    })
    // console.log(updatedData[0]);
    for(let i=0;i<updatedData.length;i++){
        const p1=new propertyModel({...updatedData[i]});
        await p1.save();
    }
    // console.log(updatedData[0])

}
export default insertProvidedDataIntoDB;







