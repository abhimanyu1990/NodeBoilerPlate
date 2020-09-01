import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import RedisConnect from "../../conf/redis.configurations";
import GlobalObjects from "../globalObjects";

export default class AuthMiddleware {
    constructor() { }

    public authMiddleware(allowedRoles?: string[]) {
        return async (request: Request, response: Response, next: NextFunction) => {
            const authToken = <string>request.headers.authorization;
            const secret = GlobalObjects.app.get("jwt.secret-token");
            jwt.verify(authToken, secret, async (err: any, jwtObject: any) => {
                console.log(jwtObject);
                const userDetail: any = await RedisConnect.client.get(authToken, (err, value) => {
                    if (value != null && err == null) {
                        let userDetail: any = JSON.parse(value);
                        if (userDetail.email == jwtObject.email) {
                            RedisConnect.client.expire(authToken, 3600);
                            if (allowedRoles && allowedRoles.length > 0) {
                                const intersection: string[] = userDetail?.role?.permissions.filter((element: string) => allowedRoles.includes(element));
                                if (intersection.length > 0) {
                                    next();
                                }
                            } else {
                                next();
                            }
                        }
                    } else {
                        next(new Error("error"));

                    }
                });
            });
        }
    }


    public async authMiddlewareForOrgAndMemberCheck(allowedRoles: string[], paramIdForOrg: string) {
        return async (request: Request, response: Response, next: NextFunction) => {
            const authToken = <string>request.headers.authorization;
            const userDetail: any = await RedisConnect.client.get(authToken, (err, value) => {
                if (value != null) {
                    RedisConnect.client.expire(authToken, 3600);
                    next();
                } else {
                    next(new Error("error"));

                }
            });
        }
    }
}



