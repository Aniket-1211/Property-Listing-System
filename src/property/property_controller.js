import {propertyModel} from '../model/propertyModel.js'
import mongoose from 'mongoose'
import userModel from '../model/userModel.js'
export const property_filter=async (req,res)=>{

}
    // Adding property into DB
export const addProperty=async (req,res)=>{
    let newProperty=new propertyModel({...req.body.property,createdBy:req.userId})
    try{
        await newProperty.save();
        res.status(200).send(`Property Added SuccessFully ${newProperty}`);
    }catch(err){
        res.status(401).send(`Property Not Added err->${err}`);
    }
}

   // Read property from DB
export const getProperty=async(req,res)=>{
    try{
        const userId=req.userId;
            // Retrieving all properties based on userId
        let properties=await propertyModel.find({createdBy:userId});
        // console.log(properties);
        res.status(200).send(properties);
    }catch(err){
        res.status(401).send(`Error Cannot Process Request->${err}`);
    }
}

   // Update property from DB
       // send propertyId in body
       //  send data to be updated inside body , ie. key->updatedData value:Object (title,price ... etc) 
export const updateProperty=async (req,res)=>{
    try{
        const userId=req.userId;
            // Retrieving all properties based on userId
        let properties=await propertyModel.find({createdBy:userId});

            // finding property based on propertId 
        const {propertyId,updatedData}=req.body;
        let property=properties.find(p=>p.propertyId==propertyId);
        if(!property){
            // If property with given id does not exist
            res.status(400).send(`Property with given id->${propertyId}does not exist `);
        }

        // Updating property based on propertyId
        await propertyModel.updateOne({propertyId},{$set:{...updatedData}})
        res.status(200).send('Propery updated successfully');
    }catch(err){
        res.status(400).send(`Error ${err}`);
    }
}


    // Deleting property from DB
        // Send propertyId in req.body
export const deletingProperty=async (req,res)=>{
    try{
        const userId=req.userId;
            // Retrieving all properties based on userId
        let properties=await propertyModel.find({createdBy:userId});
        
            // finding property based on propertId 
        const propertyId=req.body.propertyId;
        let property=properties.find(p=>p.propertyId==propertyId);
        if(!property){
            // If property with given id does not exist
            res.status(400).send(`Property with given id->${propertyId}does not exist `);
        }

        await propertyModel.deleteOne({propertyId})
        res.status(200).send(`Propery with propertyId->${propertyId} deleted successfully`);
    }catch(err){
        res.status(400).send(`Error ${err}`);
    }
}

    // Adding properties to favourites
// export const addToFav=async(req,res)=>{
//     try{
//         const userId=req.userId;
//         const user=await userModel.findOne({_id:userId});
//         const favourites=req.body.favourites;
//         await userModel.updateOne(
//             {_id:userId},
//             { $addToSet: { favourites: {$each:favourites} } }
//         );
//         res.status(200).send('Added to favourities successfully');
//     }catch(err){
//         res.status(400).send(`Error ${err}`);
//     }
// }