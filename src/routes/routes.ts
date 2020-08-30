import express from "express";
import UserRouter from "./userRoutes";
export default class Routes {
    public baseAPI="/api/v1";
    constructor(app:express.Router,i18n:any){
        
        new UserRouter(app,this.baseAPI);




        /*app.get("/hello",(req:any,res:any)=>{
            
            res.send(i18n.__("Good day"));
         });*/
    }

   
}