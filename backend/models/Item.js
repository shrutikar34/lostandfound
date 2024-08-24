// this is for the lost items report
import mongoose from "mongoose";
import { z } from "zod";

// Zod schema for validation
const ItemSchemaZod = z.object({
    nameItem: z.string().min(1,"Item name is required"),
    category: z.enum(["Electronics", "Clothing", "Documents", "Other"], {  
        required_error: "Category is required",
    }),
    description: z.string().min(3, "Description is required"),
    location: z.string().min(5, "Location is required"),
    date: z.string().min(10, "Date is required"),
    contact: z.string().regex(/^\d{10}$/, "Contact number must be exactly 10 digits").optional(),
    status: z.enum(["lost", "found"]).default("lost"), // Allow optional and set default to "lost"
    image: z.string().optional(),
    user: z.string().min(1, "User ID is required"), // We use z.string here, validation of ObjectId is handled by Mongoose
});

// Mongoose schema
const ItemSchema = new mongoose.Schema({
    nameItem: { type: String, required: true },
    category: { type: String, enum: ["Electronics", "Clothing", "Documents", "Other"], default: "Other", required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ["lost", "found"], default: "lost" ,required: true},
    contact: { type: String},
    image: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Item = mongoose.model("Item", ItemSchema);
export { ItemSchemaZod };
