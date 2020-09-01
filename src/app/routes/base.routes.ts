import AuthMiddleware from "../middleware/authenticationAndAuthorizations";


export default class BaseRoutes{
    public baseAPI="/api/v1";
    public authFunction:AuthMiddleware;
    constructor(){
        this.authFunction = new AuthMiddleware();
    }
}