const express=require("express");

const {UserModel}=require("../model/user.model");
const userRouter=express.Router();
const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken');

userRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        bcrypt.hash(password,6,async(err,hash_password)=>{
            if(err){
                console.log(err)
            }else{
                let user=new UserModel({name,email,password:hash_password});
                await user.save();
                res.status(201).send("registration sucessfull")
            }
        })
    } catch(err){
        res.send({"msg":err})
    }

    
});

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        let user=await UserModel.find({email});

        let hash=user[0].password;
        if(user.length>0){
            bcrypt.compare(password, hash,(err,result)=>{
                if(result){
                    const token=jwt.sign({userId:user[0]._id},"masai");
                    res.status(201).send("login sucessfull")
                }else{
                    res.send("Wrong input")
                }
            })
        }else{
            res.send("User not found")
        }
        
    } catch(err){
        res.send({"msg":err})
    }

    
});



module.exports={
    userRouter
}
