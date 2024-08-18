import mongoose from "mongoose";
import {z} from "zod";

//Zod validation
const UserSchemaZod = z.object({
    name:z.string().min(3,"Name is required"),
    email:z.string().email("Email is required"),
    password:z.string().min(6,"Password must be 6 character long"),
    phone:z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
});

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    // isAdmin:{
    //     type:Boolean,
    //     default:false,
    // }
    phone:{
        type:String,
        required:true,
        unique:true,
    },
},
{
    timestamps:true
});

export const User = mongoose.model("User",UserSchema);
export { UserSchemaZod};