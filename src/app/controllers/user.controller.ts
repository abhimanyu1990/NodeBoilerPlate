'use strict';


import * as express from "express";
import User, {IUser, Address, Gender} from "../models/user.model";
import * as bcrypt from 'bcrypt';



export default class UserController  {
    constructor(){
        
    }

    public async createUser(req:express.Request,res:express.Response){
            let addr = <Address>{
                street:"test",city:"new",postCode:"110074"
            };
            let password = "admin123";
            let hashPassword = await bcrypt.hash(password,10);
            let user = User.create({email:"abhimanyu.mailme@gmail.com",firstName:"Abhimanyu",password:hashPassword, lastName:"Singh",gender:Gender.male, address:addr});
            res.send({"message":"user"});
    }
}