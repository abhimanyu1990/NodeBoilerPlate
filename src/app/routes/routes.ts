'use strict';

import express from "express";
import UserRouter from "./user.routes";
import BaseRoutes from "./base.routes";
import AuthRouter from "./auth.routes";
export default class Routes {
    
    constructor(app:express.Router,i18n:any){
        new BaseRoutes();
        new UserRouter(app);
        new AuthRouter(app);
        /*app.get("/hello",(req:any,res:any)=>{
            
            res.send(i18n.__("Good day"));
         });*/
    }

   
}