import {User, UserSchemaZod} from "../models/User.js";
import bcrypt from "bcryptjs";

export const getMyProfile = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false,
            })
        }

        return res.status(200).json({
            user,
            success:true
        })
    }
    catch(error){
        console.error("Error in getMyProfile:", error);
        return res.status(400).json({
            message: error.errors ? error.errors[0].message : "Invalid input data",
            success: false,
        });
    }
}