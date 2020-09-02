'use strict';

import express from 'express';
import UserController from "../controllers/user.controller";
import BaseRoutes from './base.routes';
import errorMiddleware from "../middleware/error.middleware";
export default class UserRouter extends BaseRoutes {
    constructor(router:express.Router){
        super();
        let userController = new UserController();
        router.get(this.baseAPI+"/user",this.auth.verifyTokenAndPermission(["CREATE_USER"]),userController.createUser);
        router.post(this.baseAPI+"/login", userController.login);
    }
}