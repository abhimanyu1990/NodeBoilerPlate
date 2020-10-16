'use strict';

import express from 'express';
import UserController from "../controllers/user.controller";
import BaseRoutes from './base.routes';
export default class UserRouter extends BaseRoutes {
    constructor(router: express.Router) {
        super();
        let userController = new UserController();

        // a route definition where verifyTokenAndPermission middleware is checking authority whether user have "CREATE_USER" permission or not
        router.get(this.baseAPI + "/user", this.auth.verifyTokenAndPermission(["CREATE_USER"]), userController.createUser);

    }
}