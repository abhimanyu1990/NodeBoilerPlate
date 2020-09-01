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
            ref: 'Permission',
            type: mongoose.Schema.Types.ObjectId,
          
    }]
});

export default mongoose.model<IRole & mongoose.Document>('Role', RoleSchema);