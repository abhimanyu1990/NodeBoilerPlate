'use strict';

import express from 'express';
import UserController from "../controllers/user.controller";
import BaseRoutes from './base.routes';
export default class UserRouter extends BaseRoutes {
    constructor(router: express.Router) {
        super();
        let userController = new UserController();
        router.get(this.baseAPI + "/user", this.auth.verifyTokenAndPermission(["CREATE_USER"]), userController.createUser);

    }
}