import User, { IUser } from "../models/user.model";
import UserDto from "../dto/user.dto";
import { NextFunction } from "express";
import { GenericBadRequestException } from "../exceptions/generic.exception";
import EmailService from "./email.service";
import GlobalObjects from "../globalObjects";
import { v4 as uuidv4 } from 'uuid';
import RegistrationToken from "../models/registrationToken.model";
import Role, { IRole } from "../models/role.model";



export default class UserService {
    
    constructor(){}

    async createUser(userData:UserDto,next:NextFunction){
        let ifUserAvailable = await this.ifUserAlreadyExist(userData.email);
        if(!ifUserAvailable){
            let data:any =  await this.addUserRole(userData);
            let user = await User.create(data);
            if(user != null){
                this.generateRegistrationVerificationToken(user.email);
            }
            return user;
        }else{
            next(new GenericBadRequestException("Account already exist"));
        }
    }

    private async ifUserAlreadyExist(emailStr:string){
        let user  =  await User.findOne({ 'email' : emailStr});
        return (user != null)?true:false;
    }

    private async generateRegistrationVerificationToken(email:string){
        let registartionToken:string =  uuidv4();
        let tokenObj:any = await RegistrationToken.create({email:email,token:registartionToken});
        this.sendUserVerificationEmail(tokenObj.email,tokenObj.token);
    }


    private async sendUserVerificationEmail(email:string, registrationToken:string){
            let emailService = new EmailService();
            let subject = "Welcome";
            let host = GlobalObjects.app.get("server.host");
            let port = GlobalObjects.app.get("server.port");
            let textBody = " Your verification link is http://"+host+":"+port+"/verification/"+registrationToken;
            emailService.sendEmailTextBody(email,subject,textBody)
    }

    private async addUserRole(userData:UserDto){
        let role:any = await Role.find({roleValue:"ROLE_USER"});
        Object.assign(userData,{"role":role._id});
        return userData;
    }

}