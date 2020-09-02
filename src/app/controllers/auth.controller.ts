'use strict';
import LoginDtO from "../dto/login.dto";
import {Request , Response, NextFunction} from 'express';
import AuthService from "../services/auth.service";


export default class AuthController {
    constructor() {}


    public async login(req: Request, res: Response,next:NextFunction) {
        let authService = new AuthService();
        const loginData: LoginDtO = req.body;
        let authObj:any = await authService.findUserAndVerifyPassword(loginData,next);
        res.send(authObj);
    }


    public async register(req: Request, res: Response,next:NextFunction){
        let authService = new AuthService();
        //TODO
    }

    public async forgotPassword(req: Request, res: Response,next:NextFunction){
        let authService = new AuthService();
        //TODO
    }

    public async resetPassword(req: Request, res: Response,next:NextFunction){
        let authService = new AuthService();
        //TODO
    }

}