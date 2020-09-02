import AuthMiddleware from "../middleware/auth.middleware";


export default class BaseRoutes{
    public baseAPI="/api/v1";
    public auth:AuthMiddleware;
    constructor(){
        this.auth = new AuthMiddleware();
    }
}