import mongoose,{ Document, Schema } from "mongoose";



export interface IRegistrationToken extends Document{
    email:String;
    token:String;
}

const RegistrationTokenSchema :Schema = new Schema({
    email:{type:String,required:true},
    token:{type:String,required:true}
});

export default mongoose.model<IRegistrationToken & mongoose.Document>('RegistrationToken',RegistrationTokenSchema);