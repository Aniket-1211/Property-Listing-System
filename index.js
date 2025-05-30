import express from "express";
import connectMongo from './src/config/mongoose.js'
import { signIn, signUp,signout } from "./src/authentication/auth_controller.js";
import insertProvidedDataIntoDB from "./src/model/propertyModel.js";
import authMiddleware from "./src/middlewares/auth_middleware.js";
import cookieParser from "cookie-parser";
import {addProperty, getProperty, updateProperty, deletingProperty } from "./src/property/property_controller.js";
import { propertyFilter } from "./src/property/property_filer_controller.js";
import {addToFav, removeFromFav ,getAllFav, deleteFav} from "./src/property/favourites_controller.js";
import { recommendProperty } from "./src/property/recommend_controller.js";

const app=express();
const port=3000;
app.use(express.json());
app.use(cookieParser());

app.post('/user/signup',signUp);
app.post('/user/signin',signIn);
app.get('/user/signout',signout)


;
app.get('/',authMiddleware,(req,res)=>{
    res.send("Hello World");
});

// app.get('/filter',filter);
// app.get('filter',property_filter);
app.post('/property/add',authMiddleware,addProperty);
app.get('/property/getCreatedByMe',authMiddleware,getProperty);
app.post('/property/updateProperty',authMiddleware,updateProperty);
app.delete('/property/delete',authMiddleware,deletingProperty)

app.post('/property/filter',propertyFilter); 

app.post('/property/favourites/add',authMiddleware,addToFav);
app.post('/property/favourites/remove',authMiddleware,removeFromFav);
app.get('/property/favourites/getAll',authMiddleware,getAllFav);
app.delete('/property/favourites/delete',authMiddleware,deleteFav);

app.post('/property/recommend',authMiddleware,recommendProperty)
app.listen(port,async ()=>{
    console.log(`Listening to port ${port}`);

    // Connecting MongoCloud
    await connectMongo();

    // inserting provided data into DB
    // await insertProvidedDataIntoDB();
})


app.get("/user/signIn",(req,res)=>{
    res.send("User")
})


