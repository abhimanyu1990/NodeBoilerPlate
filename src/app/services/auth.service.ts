import User, { IUser } from "../models/user.model";
import AuthTokenDto from "../dto/authToken.dto";
import GlobalObjects from "../globalObjects";
import JwtTokenStoredDataDto from "../dto/jwtTokenStoredData.dto";
import RedisConnect from "../../conf/redis.configurations";
import jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';
import { GenericAuthenticationException } from "../exceptions/generic.exception";
import { NextFunction } from "express";
import bcrypt from 'bcrypt';
import LoginDtO from "../dto/login.dto";

export default class AuthService {
    constructor(){}

   public async findUserAndVerifyPassword( loginData: LoginDtO, next:NextFunction){
       
    let user = await User.findOne({ email: loginData.email }).select({ "email": 1, "role": 1, "password": 1, "_id": 1 })?.populate({ path: "role", select: '-roleName -roleDescription -_id -__v', populate: { path: "permissions", select: '-permissionName -permissionDescription -_id -__v -allowedRoles' } });
    let isPasswordVerified:boolean = false;
    if (user) {
        isPasswordVerified = await bcrypt.compare(loginData.password, user.password);
        if (isPasswordVerified) {
            user.password = "";
            return this.createToken(user);
        }
    } 
    if(isPasswordVerified == false){
       next(new GenericAuthenticationException("Credentials are wrong"));
    }
   }


   private createToken(user: IUser): AuthTokenDto {
        const expiresIn = 86400;
        const secret = GlobalObjects.app.get("jwt.secret-token");
        const expiry = Number.parseInt(GlobalObjects.app.get("jwt.expiryinseconds"));
        const dataStoredInToken: JwtTokenStoredDataDto = {
            _id: user._id,
            email: user.email,
        };
        let userDetail = { _id: mongoose.Schema.Types.ObjectId, email: "", role: { permissions: <string[]>[], roleValue: "" } };
        let permissionsList: string[] = [];
        user.role?.permissions?.map((obj: any) => (permissionsList.push(obj.permissionValue)));
        userDetail.role.roleValue = <string>user.role?.roleValue;
        userDetail.role.permissions = permissionsList;
        userDetail.email = user.email;
        userDetail._id = user._id;
        let token = jwt.sign(dataStoredInToken, secret, { expiresIn })
        console.log(userDetail);
        RedisConnect.client.SETEX(token, expiry, JSON.stringify(userDetail));
        return {
            expiry,
            email: userDetail.email,
            token: token
        }
    }
}