'use strict';

import { IsOptional, IsString, IsEmail ,ValidateNested,  IsEnum, IsNotEmpty } from 'class-validator';
import IsMatchedRegex from '../validators/password.validator';
import { Gender } from '../models/user.model';


export default class  UserDto{
    
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsMatchedRegex("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})", {
        message: '$property must be Alphanumeric and have minimum length of 8 charaters. It contain atleast 1 capital letter, 1 small letter , atleast one special character !@#$%^&*',
      })
    password: string;

    @IsEnum(Gender)
    gender?: Gender;

  }