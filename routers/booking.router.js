const express=require("express");

const {bookingModel}=require("../model/booking.model");
const {FlightModel}=require("../model/flight.model");
const {UserModel}=require("../model/user.model");
const bookingRouter=express.Router();
const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken');

bookingRouter.post("/booking",async(req,res)=>{
    const {user,flight}=req.body;
    try{
       
                let booking=new bookingModel({user,flight});
                await booking.save();
                res.status(201).send("booking sucessfull")
        
    } catch(err){
        res.send({"msg":err})
    }

    
});

bookingRouter.get("/dashbord",async(req,res)=>{
    let obj={};
    try{
        const booking=await bookingModel.find();
         let user= await UserModel.find({_id:booking.user});
         let flight=await FlightModel.find({_id:booking.flight});
         obj.data=[user,flight]
        res.status(200).send(obj)
        
    } catch(err){
        res.send({"msg":err})
    }

    
});

bookingRouter.patch("/dashbord/:id",async(req,res)=>{
    const payload=req.body;
    const id=req.params.id;
   
    c
    try{
        await bookingModel.findByIdAndUpdate({_id:id},payload);
        res.status(204).send("updated");
        
    } catch(err){
        res.send({"msg":err})
    }

    
});

bookingRouter.delete("/dashbord/:id",async(req,res)=>{
   
    const id=req.params.id;
    const flight= await bookingModel.findOne({_id:id})
    
    try{
        await bookingModel.findByIdAndDelete({_id:id});
        res.status(202).send("deleted");
        
    } catch(err){
        res.send({"msg":err})
    }

    
});

module.exports={
    bookingRouter
}
