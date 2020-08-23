import express from "express";
import UserRouter from "./userRoutes";
export default class Routes {
  
    constructor(app:express.Router,i18n:any){
        
        new UserRouter(app);
        app.get("/hello",(req:any,res:any)=>{
            
            res.send(i18n.__("Good day"));
    });
    }

   
}