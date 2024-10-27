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
    password:{
        type: String,
        required: true,
        min:6,
    },
    imgLink: {
        type: String,
        default: 'https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png', 
    }
},{timestamps:true})

export default model("User", UserSchema);