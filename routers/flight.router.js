const express=require("express");

const {FlightModel}=require("../model/flight.model");
const FlightRouter=express.Router();
const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken');

FlightRouter.get("/flights",async(req,res)=>{
    
    try{
        const flight=await FlightModel.find();
        res.status(200).send(flight)
    } catch(err){
        res.send({"msg":err})
    }

    
});
FlightRouter.get("/flights/:id",async(req,res)=>{
    
    const id=req.params.id;
    
    try{
        const flight=await FlightModel.findOne({_id:id});
        res.status(200).send(flight)
    } catch(err){
        res.send({"msg":err})
    }

    
});

FlightRouter.post("/flights",async(req,res)=>{
    const payload=req.body;
    try{
        const flight=new FlightModel(payload)
        await flight.save();
        res.status(201).send(flight)
        
    } catch(err){
        res.send({"msg":err})
    }

    
});

FlightRouter.patch("/flights/:id",async(req,res)=>{
    const payload=req.body;
    const id=req.params.id;
   
    c
    try{
        await FlightModel.findByIdAndUpdate({_id:id},payload);
        res.status(204).send("updated");
        
    } catch(err){
        res.send({"msg":err})
    }

    
});


FlightRouter.delete("/flights/:id",async(req,res)=>{
   
    const id=req.params.id;
    const flight= await FlightModel.findOne({_id:id})
    
    try{
        await FlightModel.findByIdAndDelete({_id:id});
        res.status(202).send("deleted");
        
    } catch(err){
        res.send({"msg":err})
    }

    
});


module.exports={
    FlightRouter
}
