// this is for the find items report
import mongoose from "mongoose";
import { z } from "zod";

const FoundSchemaZod = z.object({
    nameItem: z.string().min(5, "Item name is required"),
    // item: z.string().min(1, "Item ID is required"),
    finder: z.string().min(1, "Finder ID is required"),
    category: z.enum(["Electronics", "Clothing", "Documents", "Other"], {  
        required_error: "Category is required",
    }),
    status: z.enum([ "claimed", "unclaimed"],{
        required_error: "Status is required",
    }),
    location: z.string().min(5, "Location is required"),
    date: z.string().min(10, "Date is required"),
    description: z.string().min(5, "Description is required"),
    contact: z.string().regex(/^\d{10}$/, "Contact number must be exactly 10 digits"),
    image: z.string().optional(),
})

const FoundSchema = new mongoose.Schema({
    nameItem: {type: String, required: true},
    // item : {type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true},
    finder: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    status: {type: String, enum: ["claimed", "unclaimed"], default: "unclaimed", required: true},
    location: {type: String, required: true},
    category: { type: String, enum: ["Electronics", "Clothing", "Documents", "Other"], default: "Other", required: true },
    date: {type: String, required: true},
    description: {type: String, required: true},
    contact: {type: String},
    image: {type: String},
    createdAt: {type: Date, default: Date.now},
})

export const Found = mongoose.model("Found", FoundSchema);
export { FoundSchemaZod };