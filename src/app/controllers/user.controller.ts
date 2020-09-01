'use strict';

import * as express from "express";
import User, {Address, Gender} from "../models/user.model";
export default class UserController {

    constructor(){ }
    public createUser(){
        return (req:express.Request,res:express.Response)=>{
            let addr = <Address>{
                street:"test",city:"new",postCode:"110074"
            };
            let user = User.create({email:"abhimanyu.mailme191@gmail.com",firstName:"Abhimanyu",lastName:"Singh",gender:Gender.male, address:addr});
            res.send({"message":"user"});
        } 
    }
}