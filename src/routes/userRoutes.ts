
import express from 'express';

export default class UserRouter {
   
    constructor(router:express.Router){
        
        router.get("/hello2",(req:express.Request,res:express.Response)=>{
            res.send({"message":"hello2"});
        });
    }
}