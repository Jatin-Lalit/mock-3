const express=require("express");



const {connect}=require("./db")
const app=express();
const{userRouter}=require("./routers/user.router")

const{FlightRouter}=require("./routers/flight.router")

const{bookingRouter}=require("./routers/booking.router")
app.use(express.json());

app.use("/api",userRouter)
app.use("/api",FlightRouter)
app.use("/api",bookingRouter)

app.listen(6787,async()=>{
    try{
        await connect
        
        console.log("connected to DB")
    }catch(err){

        console.log(err)
    }
    console.log("Server is Up!")
})