import mongoose from "mongoose";
import { z } from "zod";

// Zod schema for validation
const ItemSchemaZod = z.object({
    name: z.string().min(1, "Name is required"),
    category: z.string().min(1, "Category is required"),
    description: z.string().min(1, "Description is required"),
    location: z.string().min(1, "Location is required"),
    date: z.date(),
    status: z.enum(["lost", "found"]),
    image: z.string().optional(),
    user: z.string().min(1, "User ID is required"), // We use z.string here, validation of ObjectId is handled by Mongoose
});

// Mongoose schema
const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["lost", "found"], required: true },
    image: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Item = mongoose.model("Item", ItemSchema);
export { ItemSchemaZod };
