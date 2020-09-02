'use strict';
export default class GenericHttpException extends Error{
     public timestamp : Date;
     public errorId : number;
     public status: number;
     public name: string;
     public message: any;
    constructor(message:any, status:number){
        
        super(message);
        const myObject = {};
        this.message=message;
        this.timestamp = new Date();
        this.errorId = <number> new Date().getTime();
        this.status = status;
        this.name="Error";
        
    }
}