import {User, UserSchemaZod} from "../models/User.js";
import bcrypt from "bcryptjs";

export const getMyProfile = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await User.findById(id).select("-password -phone");

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

export const updateMyProfile = async (req, res) => {
    try{
        const validatedData = UserSchemaZod.partial().parse(req.body);
        
        const {name, email, password, phone} = validatedData;

        const updatedData = {}; //here we are creating an object to store the updated data

        // here we are checking if the data is not empty and if it is not empty then we are updating the data
        if(name) updatedData.name = name;
        if(email) updatedData.email = email;
        if(password) updatedData.password = await bcrypt.hash(password, 10);
        if(phone) updatedData.phone = await bcrypt.hash(phone, 10);

        const updatedProfile = await User.findByIdAndUpdate(req.user, updatedData, {new:true, select:"-password -phone"});

        if(!updatedProfile){
            return res.status(404).json({
                message:"User not found",
                success:false,
            })
        }

        return res.status(200).json({
            message:"Profile updated successfully",
            success:true,
            user:updatedProfile
        })
    }
    catch(error){
        console.error("Error in updateMyProfile:", error);
        return res.status(400).json({
            message: error.errors ? error.errors[0].message : "Invalid input data",
            success: false,
        });
    }
}

export const deleteMyProfile = async (req, res) => {
    try{
        const {id} = req.params;
        const deleteUser = await User.findByIdAndDelete(id);

        if(!deleteUser){
            return res.status(404).json({
                message:"User not found",
                success:false,
            })
        }
        return res.status(200).json({
            message:"User deleted successfully",
            success:true
        })
    }
    catch(error){
        console.error("Error in deleteMyProfile:", error);
        return res.status(400).json({
            message: error.errors ? error.errors[0].message : "Invalid input data",
            success: false,
        });
    }
}