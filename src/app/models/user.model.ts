'use strict';

import mongoose, { Schema, Document } from 'mongoose';
import Role, { IRole } from "./role.model";
export enum Gender {
  male = 'male',
  female = 'female',
  undisclosed = 'undisclosed'
}

export interface Address extends Document {
  street: string;
  city: string;
  postCode: string;
}

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  gender?: Gender;
  address?: Address;
  role?:IRole;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true},
  // Gets the Mongoose enum from the TypeScript enum
  gender: { type: String, enum: Object.values(Gender) },
  address: {
    street: { type: String },
    city: { type: String },
    postCode: { type: String }
  },
  role: {
    ref: 'Role',
    type: mongoose.Schema.Types.ObjectId,
  }
});

// Export the model and return your IUser interface
export default mongoose.model<IUser & mongoose.Document>('User', UserSchema);