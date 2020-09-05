

export default class Configurations {
    public env:string;
    constructor(env:string){
        this.env=env;
    }

   public loadDatabase(){
       this.env="development";
   }
}