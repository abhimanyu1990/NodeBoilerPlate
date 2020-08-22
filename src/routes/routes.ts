import express from "express";
import UserRouter from "./userRoutes";
export default class Routes {
  
    constructor(app:express.Router){
        
        new UserRouter(app);
        app.get("/hello",(req:any,res:any)=>{
            res.send({"message":"hello"});
        });
    }

   
}