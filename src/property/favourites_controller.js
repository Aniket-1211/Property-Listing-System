import userModel from "../model/userModel.js";
import { propertyModel } from "../model/propertyModel.js";
        // Adding properties to favourites
    // pass array of object ids in req.body as value of favourites key
export const addToFav=async(req,res)=>{
    try{
        const userId=req.userId;
        // const user=await userModel.findOne({_id:userId});
        const favourites=req.body.favourites;
        await userModel.updateOne(
            {_id:userId},
            { $addToSet: { favourites: {$each:favourites} } }
        );
        res.status(200).send('Properties added to favourities successfully');
    }catch(err){
        res.status(400).send(`Error ${err}`);
    }
}
    
        // Removing favourites properties
    // pass array of object ids in req.body as value of favourites key
export const removeFromFav=async (req,res)=>{
    try{
        const userId=req.userId;
        const favourites=req.body.favourites;
        await userModel.updateOne(
            {_id:userId},
            { $pullAll: { favourites:favourites } }
        );
        res.status(200).send('Properties removed from favourities successfully');
    }catch(err){
        res.status(400).send(`Error ${err}`);
    }
}
 
        // Retrieve all favourites property
export const getAllFav=async(req,res)=>{
    try{
        const userId=req.userId;
        // finding user with userId
        const user=await userModel.findOne({_id:userId});
        // console.log(user);
        const properties=await propertyModel.find( { propertyId: { $in :user.favourites } } );
        res.status(200).send(properties);
    }catch(err){
        res.status(400).send(`Error ${err}`);
    }
}

    // Delete all Favourite properties from DB
export const deleteFav=async(req,res)=>{
    try{
        const userId=req.userId;
        // finding user with userId
        const user=await userModel.findOne({_id:userId});
        await userModel.updateOne( { $unset : {favourites :"" } } );
        res.status(200).send('All properties removed from favourites');
    }catch(err){
        res.status(400).send(`Error ${err}`);
    }
}














