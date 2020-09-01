'use strict';

import express from 'express';
import UserController from "../app/controllers/user.controller";
export default class UserRouter {
    constructor(router:express.Router, baseAPI:string){
        let userController = new UserController();
        router.get(baseAPI+"/user",userController.createUser());
    }
}