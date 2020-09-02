'use strict';
import LoginDtO from "../dto/login.dto";
import User,{ IUser } from "../models/user.model";
import AuthTokenDto from "../dto/authToken.dto";
import GlobalObjects from "../globalObjects";
import JwtTokenStoredDataDto from "../dto/jwtTokenStoredData.dto";
import RedisConnect from "../../conf/redis.configurations";
import bcrypt from 'bcrypt';
import {Request , Response, NextFunction} from 'express';
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { GenericAuthenticationException } from "../exceptions/generic.exception";


export default class AuthController {
    constructor() {}


    public async login(req: Request, res: Response,next:NextFunction) {
        let _self = new AuthController();
        const loginData: LoginDtO = req.body;
        let user = await User.findOne({ email: loginData.email }).select({ "email": 1, "role": 1, "password": 1, "_id": 1 })?.populate({ path: "role", select: '-roleName -roleDescription -_id -__v', populate: { path: "permissions", select: '-permissionName -permissionDescription -_id -__v -allowedRoles' } });
        let isPasswordVerified:boolean = false;
        if (user) {
            isPasswordVerified = await bcrypt.compare(loginData.password, user.password);
            if (isPasswordVerified) {
                user.password = "";
                res.send(_self.createToken(user));
            }
        } 
        if(isPasswordVerified == false){
           next(new GenericAuthenticationException("Credentials are wrong"));
        }
    }


    private createToken(user: IUser): AuthTokenDto {
        const secret = GlobalObjects.app.get("jwt.secret-token");
        const expiresIn = 86400;
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