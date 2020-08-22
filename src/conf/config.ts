

export default class Configurations {
    public env:string;
    constructor(env:string){
        this.env=env;
    }

   function loadDatabase(){
       this.env="development";
       console.log("test");
   }
}