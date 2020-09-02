import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import RedisConnect from "../../conf/redis.configurations";
import { GenericNotFoundException, GenericAuthenticationException, GenericForbiddenException, GenericBadRequestException } from "../exceptions/generic.exception";
import GlobalObjects from "../globalObjects";


export default class AuthMiddleware {
    constructor() { }

    public verifyTokenAndPermission(allowedPermissions?: string[]) {
        return async (request: Request, response: Response, next: NextFunction) => {
            const authToken = <string>request.headers.authorization;
            const secret = GlobalObjects.app.get("jwt.secret-token");
            jwt.verify(authToken, secret, async (err: any, jwtObject: any) => {
                if (err) {
                    next(new GenericAuthenticationException("Authorization token is invalid"));
                } else {
                    const userDetail: any = await RedisConnect.client.get(authToken, (err, userObj) => {
                        this.matchJwtToken(jwtObject, authToken, userObj, err, next,allowedPermissions);
                    });
                }
            });
        }
    }


    private matchJwtToken(jwtObject: any, authToken: string, userObj: any, err: any, next: NextFunction,allowedPermissions?:string[]) {
        if (userObj != null && err == null) {
            let userDetail: any = JSON.parse(userObj);
            if (userDetail.email == jwtObject.email) {
                RedisConnect.client.expire(authToken, 3600);
                this.checkAllowedPermission(userDetail, next, allowedPermissions);
            }
        } else {
            next(new GenericAuthenticationException("Authorization token is invalid"));
        }
    }


    private checkAllowedPermission(userDetail: any, next: NextFunction, allowedPermissions?: string[]) {
        if (allowedPermissions && allowedPermissions.length > 0) {
            const intersection: string[] = userDetail?.role?.permissions.filter((element: string) => allowedPermissions.includes(element));
            if (intersection.length > 0) {
                next();
            }else{
            next(new GenericForbiddenException("Authroization failed"));
            }
        } else {
            next();
        }
    }

}



