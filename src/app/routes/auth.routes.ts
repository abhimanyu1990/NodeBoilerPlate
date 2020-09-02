import express from 'express';
import AuthController from "../controllers/auth.controller";
import BaseRoutes from './base.routes';
import LogInDto from '../dto/login.dto';
import validationMiddleware from '../middleware/validation.middleware';
export default class AuthRouter extends BaseRoutes {
    constructor(router:express.Router){
        super();
        const authController = new AuthController();
        router.post(this.baseAPI+"/login", validationMiddleware(LogInDto),authController.login);
    }
}