
import { NextFunction, Request, Response } from 'express';
import GenericHttpException from '../exceptions/http.exception';

function errorMiddleware(error: GenericHttpException, request: Request, response: Response, next: NextFunction) {
    if (error) {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        const timestamp = error.timestamp;
        const errorId = error.timestamp;
        const name = error.name;

        response
            .status(status)
            .send({
                message,
                status,
                timestamp,
                errorId,
                name
            }).end();
    } else {
        next();
    }
}

export default errorMiddleware;