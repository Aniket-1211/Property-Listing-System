import express from 'express';
import bcrypt from 'bcrypt';
import userModel from '../model/userModel.js';
import jwt from 'jsonwebtoken'
import emailSender from './node_mailer.js';
export const signUp=async (req,res)=>{
    let {name,email,password}=req.body;

       // Hashing password using bcrypt
    const saltRounds = 10;
    password=await bcrypt.hash(password, saltRounds);

    const newUser=new userModel({name,email,password});
    // console.log(newUser)
    try{
        await newUser.save();

           // Sending welcome message to user 
        emailSender(email,"Welcome to Property 420 Service","Please verify email");
        res.status(201).send("Your have signed up successfully");
    }catch(err){
        res.status(400).send(`Error : ${err.message}`);
    }
}

export const signIn=async (req,res)=>{
    let {email,password}=req.body;
       // checking if user exist in db 
    let user=await userModel.findOne({email});
    if(!user){
        return res.status(400).send('User not found');
    }

       // comparing password 
    const checkPassword=await bcrypt.compare(password,user.password);
    if(checkPassword){
            // creating JWT token
        const token=jwt.sign({email,password:user.password,userId:user.id},'JWT_SECRET',{expiresIn:'1h'});
            // placing token inside cookie
        res.cookie('token',token);
        
        return res.status(200).send('Successfull Login');
    } 
       // if user gives invalid credentials
    res.status(200).send('Invalid Credentials');
}

export const signout=(req,res)=>{
    res.clearCookie('token');
    res.status(200).send('Signed out successful');
}
