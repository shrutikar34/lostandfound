import { Item } from "../models/Item";

export const createReport = async (req,res)=>{
    try{
        const {nameItem,description,location,date,contact,id,image} = req.body;
        if(!nameItem || !description || !location || !date || !contact, !id){
            return res.status(401).json({
                message:"All fields are required",
                success:false
            })
        }
        await Item.create({
            nameItem,
            description,
            location,
            date,
            contact,
            user:id,
            image // this is optional
        })

        return res.status(201).json({
            message:"Report created successfully",
            success:true
        });
    }catch(error){
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}