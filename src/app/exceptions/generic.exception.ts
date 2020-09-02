
import GenericHttpException from "./http.exception";
import { json } from "express";

export  class GenericNotFoundException extends GenericHttpException {
    constructor(message:string){
        super(message,404);  
        this.name ="GenericNotFoundException";
          
    }
}


export  class GenericAuthenticationException extends GenericHttpException{
    
    constructor(message:string){
        super(message,401);  
        this.message=message; 
        this.name="GenericAuthenticationException";
        this.stack="";
    }
}


export  class GenericBadRequestException extends GenericHttpException{
    constructor(message:string){
        super(message,400);     
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class GenericForbiddenException extends GenericHttpException{
    constructor(message:string){
        super(message,403);     
        Object.setPrototypeOf(this, new.target.prototype);
    }
}