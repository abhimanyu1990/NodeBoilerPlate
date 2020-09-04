'use strict';
import GenericHttpException from "./http.exception";

export  class GenericNotFoundException extends GenericHttpException {
    constructor(message:any){
        super(message,404);  
        this.name ="GenericNotFoundException";
          
    }
}


export  class GenericAuthenticationException extends GenericHttpException{
    constructor(message:any){
        super(message,401);  
        this.message=message; 
        this.name="GenericAuthenticationException";
        this.stack="";
    }
}


export  class GenericBadRequestException extends GenericHttpException{
    constructor(message:any){
        super(message,400);     
        this.name = "GenericBadRequestException";
    }
}

export class GenericForbiddenException extends GenericHttpException{
    constructor(message:any){
        super(message,403);   
        this.name = "GenericForbiddenException";
    }
}