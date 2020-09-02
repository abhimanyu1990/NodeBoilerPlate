'use strict';
import { IsOptional, IsString, IsEmail ,ValidateNested } from 'class-validator';
import IsMatchedRegex from '../utilities/password.validator';

export default class LoginDtO {

    @IsEmail()
    @IsString()
    public email: string;

    @IsString()
    // @IsMatchedRegex("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})", {
    //     message: '$property must be Alphanumeric and have minimum length of 8 charaters. It contain atleast 1 capital letter, 1 small letter , atleast one special character !@#$%^&*',
    //   })
    public password: string;

}