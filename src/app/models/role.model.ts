'use strict';
import mongoose, { Schema, Document } from 'mongoose';
import Permission, { IPermission } from './permission.model';

export interface IRole extends Document {
    roleName:string;
    roleValue:string;
    roleDescription:string;
    permissions?: Array<IPermission>;
}

const RoleSchema: Schema =  new Schema({
    roleName: { type: String, required: true , unique:true},
    roleValue: { type: String, required: true, unique: true},
    roleDescription: {type: String, required: true},
    permissions:[{
        permissionName:{ type:String},
        permissionDescription:{ type:String},
        permissionValue:{ type:String}
    }]
});

export default mongoose.model<IRole>('Role', RoleSchema);