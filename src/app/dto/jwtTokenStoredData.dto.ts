'use strict';
import { IsEmail, IsObject, IsNumberString } from "class-validator";
import * as mongoose from 'mongoose';


export default class JwtTokenStoredDataDto {


    _id : mongoose.Schema.Types.ObjectId;

    @IsEmail()
    public email : string;
    
}