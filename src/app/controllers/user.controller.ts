'use strict';


import * as express from "express";
import User, {IUser, Address, Gender} from "../models/user.model";
import * as bcrypt from 'bcrypt';
import LoginDtO from "../dto/login.dto";
import AuthTokenDto from "../dto/authToken.dto";
import * as jwt from 'jsonwebtoken';
import GlobalObjects from "../globalObjects";
import JwtTokenStoredDataDto from "../dto/jwtTokenStoredData.dto";
import RedisConnect from "../../conf/redis.configurations";
import * as mongoose from 'mongoose';

export default class UserController  {
    constructor(){}

    public async createUser(req:express.Request,res:express.Response){
            let addr = <Address>{
                street:"test",city:"new",postCode:"110074"
            };
            let password = "admin123";
            let hashPassword = await bcrypt.hash(password,10);
            let user = User.create({email:"abhimanyu.mailme@gmail.com",firstName:"Abhimanyu",password:hashPassword, lastName:"Singh",gender:Gender.male, address:addr});
            res.send({"message":"user"});

    }



    public async login(req:express.Request,res:express.Response){
            console.log(req.body);
            const loginData:LoginDtO = req.body;
            let user = await User.findOne({email:loginData.email}).select({"email":1,"role":1,"password":1,"_id":1})?.populate({path:"role",  select: '-roleName -roleDescription -_id -__v', populate:{path:"permissions", select: '-permissionName -permissionDescription -_id -__v -allowedRoles'}});
            if(user){
             let isPasswordVerified = await bcrypt.compare(loginData.password,user.password);
             if(isPasswordVerified){
                user.password = "";
                res.send(this.createToken(user));
             }
            }else{
                res.send("wrong credentials");
            }   
    }

    private createToken(user: IUser): AuthTokenDto{
        const secret = GlobalObjects.app.get("jwt.secret-token");
        const expiresIn = 86400;
        const expiry = Number.parseInt(GlobalObjects.app.get("jwt.expiryinseconds"));
        
        const dataStoredInToken :JwtTokenStoredDataDto = {
            _id: user._id,
            email: user.email,
          };
          
        let userDetail = {_id:mongoose.Schema.Types.ObjectId, email:"",role:{permissions:<string[]>[],roleValue:""}};
        let permissionsList:string[] = [];
        user.role?.permissions?.map((obj:any)=> (permissionsList.push(obj.permissionValue)));
        userDetail.role.roleValue=<string> user.role?.roleValue;
        userDetail.role.permissions = permissionsList;
        userDetail.email= user.email;
        userDetail._id = user._id;
        let token = jwt.sign(dataStoredInToken, secret, { expiresIn })
        console.log(userDetail);
        RedisConnect.client.SETEX(token,expiry,JSON.stringify(userDetail));
        return {
            expiry,
            email: userDetail.email,
            token: token
          }
    }
}