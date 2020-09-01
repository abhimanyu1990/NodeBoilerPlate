'use strict';

import express from 'express';
import UserController from "../app/controllers/user.controller";
import AuthMiddleware from "../middleware/authenticationAndAuthorizations";
export default class UserRouter {
    constructor(router:express.Router, baseAPI:string){
        let authFunc = new AuthMiddleware();
        let userController = new UserController();
        router.get(baseAPI+"/user",authFunc.authMiddleware(),userController.createUser());
        router.post(baseAPI+"/login", userController.login());
    }
}