


export default class GenericHttpException extends Error{
     public timestamp : Date;
     public errorId : number;
     public status: number;
     public msg: string;
     public name: string;
    constructor(message:string, status:number){
        super(message);
        const myObject = {};
        this.msg=message;
        this.timestamp = new Date();
        this.errorId = this.timestamp.getTime();
        this.status = status;
        this.name="Error";
        
    }
}