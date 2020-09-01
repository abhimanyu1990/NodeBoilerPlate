'use strict';
import mongoose, { Schema, Document } from 'mongoose';

export interface IPermission extends Document {
    permissionName:string;
    permissionDescription:string;
    permissionValue:string;
    allowedRoles: Array<String>;
}


const PermissionSchema: Schema =  new Schema({
    permissionName: { type: String, required: true , unique:true},
    permissionValue: { type: String, required: true, unique: true},
    permissionDescription: {type: String, required: true},
    allowedRoles: [{type:String, required:true}]
});

export default mongoose.model<IPermission>('Permission', PermissionSchema);