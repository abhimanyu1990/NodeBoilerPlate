


import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import GenericHttpException from '../exceptions/http.exception';
import {GenericBadRequestException} from '../exceptions/generic.exception';

function validationMiddleware<T>(type: any, skipMissingProperties = false): RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, req.body), { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
        let message : any[] = [];
        errors.forEach((error: ValidationError) => {
              if(error.constraints){
                  let obj = { "property":error.property, "message":Object.values(error.constraints)[0]};
                  message.push(JSON.stringify(obj));
              } 
         });
          next(new GenericBadRequestException(message));
        } else {
          next();
        }
      });
  };
}

export default validationMiddleware;