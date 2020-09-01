import { IsString, IsEmail, IsNumber } from "class-validator";

export default class AuthTokenDto {

    @IsString()
    public token : string;

    @IsEmail()
    public email : string;

    @IsNumber()
    public expiry: number;
}