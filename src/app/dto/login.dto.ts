
import { IsOptional, IsString, IsEmail ,ValidateNested } from 'class-validator';

export default class LoginDtO {

    @IsEmail()
    @IsString()
    public email: string;

    @IsString()
    public password: string;

}