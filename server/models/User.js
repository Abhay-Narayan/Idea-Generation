import { Schema, model } from "mongoose";

const UserSchema= new Schema({
    username:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    description:{
        type: String,
    },
    password:{
        type: String,
        required: true,
        min:6,
    },
    profilePic: {
        data: Buffer,
        contentType: String,
      },
},{timestamps:true})

export default model("User", UserSchema);