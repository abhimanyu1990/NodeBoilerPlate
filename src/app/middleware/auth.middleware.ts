import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import RedisConnect from "../../conf/redis.configurations";
import {GenericNotFoundException , GenericAuthenticationException, GenericForbiddenException, GenericBadRequestException} from "../exceptions/generic.exception";
import GlobalObjects from "../globalObjects";


export default class AuthMiddleware {
    constructor() { }

    public verifyTokenAndPermission(allowedPermissions?: string[]) {
        return async (request: Request, response: Response, next: NextFunction) => {
        
            const authToken = <string>request.headers.authorization;
            const secret = GlobalObjects.app.get("jwt.secret-token");
            
            jwt.verify(authToken, secret, async (err: any, jwtObject: any) => {
                console.log(jwtObject);
                if(err){
                   next( new GenericAuthenticationException("authorization token is expired"));
                }else{
                const userDetail: any = await RedisConnect.client.get(authToken, (err, value) => {
                    if (value != null && err == null) {
                        let userDetail: any = JSON.parse(value);
                        if (userDetail.email == jwtObject.email) {
                            RedisConnect.client.expire(authToken, 3600);
                            if (allowedPermissions && allowedPermissions.length > 0) {
                                const intersection: string[] = userDetail?.role?.permissions.filter((element: string) => allowedPermissions.includes(element));
                                if (intersection.length > 0) {
                                    next();
                                }
                                next(new GenericForbiddenException("Authroization failed"));
                            } else {
                                next();
                            }
                        }
                    } else {
                        next(new GenericAuthenticationException("your token has expired"));

                    }
                });
             }
            }); 
        }
    }

}



